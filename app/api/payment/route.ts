import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getPaymentProvider, createPaddleCheckout, getPaddleCheckoutUrl } from '@/lib/payment-provider';
import { createPurchase } from '@/lib/db';
import { getSession } from '@/lib/auth';

// Get payment mode from environment
const paymentMode = process.env.NEXT_PUBLIC_PAYMENT_MODE || 'mock';
const stripeSecretKey = process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder';

// Only initialize Stripe if needed
const stripe = 
  paymentMode === 'stripe' && stripeSecretKey !== 'sk_test_placeholder'
    ? new Stripe(stripeSecretKey, {
        apiVersion: '2023-10-16',
      })
    : null;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const packageType = searchParams.get('type');
  const locale = searchParams.get('locale') || 'en';

  if (!packageType || packageType !== 'premium') {
    return NextResponse.json({ error: 'Invalid package type' }, { status: 400 });
  }

  // Get current user session
  const session = await getSession();
  if (!session) {
    return NextResponse.redirect(new URL(`/${locale}/result-lock?error=login_required`, request.url));
  }

  const provider = getPaymentProvider();

  // Mock payment mode - only allow in development
  if (provider === 'mock') {
    // In production, mock mode should not grant access without payment
    // Only allow mock in development for testing
    if (process.env.NODE_ENV === 'production') {
      return NextResponse.json(
        { error: 'Payment is required. Mock mode is disabled in production.' },
        { status: 400 }
      );
    }
    
    const transactionId = `mock_${Date.now()}`;
    // Create mock purchase record
    createPurchase({
      transactionId,
      sessionId: transactionId,
      userId: session.userId,
      packageType: 'premium',
      status: 'completed',
      locale,
    });
    const origin = request.nextUrl.origin;
    return NextResponse.redirect(`${origin}/${locale}/result?transaction_id=${transactionId}`);
  }

  // Paddle payment
  if (provider === 'paddle') {
    // Check if Paddle is properly configured
    const paddleVendorId = process.env.PADDLE_VENDOR_ID;
    const paddleProductId = process.env.PADDLE_PRODUCT_ID;
    const paddleApiKey = process.env.PADDLE_API_KEY;
    const paddlePriceId = process.env.PADDLE_PRICE_ID;
    
    if (!paddleVendorId && !paddleProductId && !paddleApiKey && !paddlePriceId) {
      console.error('Paddle is not configured. Missing required environment variables.');
      const origin = request.nextUrl.origin;
      return NextResponse.redirect(
        `${origin}/${locale}/result-lock?error=payment_config&message=${encodeURIComponent('Payment system is not configured. Please contact support.')}`
      );
    }

    try {
      const transactionId = `paddle_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      // Create pending purchase record
      createPurchase({
        transactionId,
        sessionId: transactionId,
        userId: session.userId,
        packageType: 'premium',
        status: 'pending',
        locale,
      });

      // Use Paddle Checkout Overlay (simpler approach)
      // For Billing API, use createPaddleCheckout instead
      let checkoutUrl: string;
      try {
        // Try overlay URL first (simpler, uses product ID)
        checkoutUrl = getPaddleCheckoutUrl(request, transactionId, locale);
      } catch (error) {
        // Fallback to Billing API if overlay fails
        console.warn('Paddle overlay failed, trying Billing API:', error);
        try {
          const checkout = await createPaddleCheckout(request, locale);
          checkoutUrl = checkout.checkoutUrl;
        } catch (apiError) {
          throw new Error(`Both Paddle checkout methods failed: ${apiError}`);
        }
      }

      if (!checkoutUrl) {
        throw new Error('Failed to create Paddle checkout');
      }

      return NextResponse.redirect(checkoutUrl);
    } catch (error: any) {
      console.error('Paddle error:', error);
      // Don't grant access on error - redirect back to result-lock with error message
      const origin = request.nextUrl.origin;
      return NextResponse.redirect(
        `${origin}/${locale}/result-lock?error=payment_failed&message=${encodeURIComponent('Payment processing failed. Please try again or contact support.')}`
      );
    }
  }

  // Stripe payment - Weekly subscription with intro pricing
  if (provider === 'stripe' && stripe) {
    // Weekly subscription: €1 first week, then €30/week
    const regularAmount = 3000; // €30.00 in cents (weekly)

    try {
      // Create or retrieve coupon for intro pricing (97% off = €1 instead of €30)
      let introCouponId: string | null = null;
      try {
        // Try to find existing intro coupon
        const coupons = await stripe.coupons.list({ limit: 100 });
        const existingCoupon = coupons.data.find(c => c.name === 'intro_offer_week1');
        if (existingCoupon) {
          introCouponId = existingCoupon.id;
        } else {
          // Create new intro coupon (96.67% off to get €1 from €30)
          const coupon = await stripe.coupons.create({
            percent_off: 96.67,
            duration: 'once', // Only applies to first invoice
            name: 'intro_offer_week1',
            metadata: {
              description: 'Intro offer: €1 for first week',
            },
          });
          introCouponId = coupon.id;
        }
      } catch (couponError) {
        console.warn('Could not create/find intro coupon, proceeding without discount:', couponError);
      }

      // Create checkout session with subscription
      const checkoutSession = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        customer_email: session.email,
        line_items: [
          {
            price_data: {
              currency: 'eur',
              product_data: {
                name: 'IQ Test - Weekly Premium Access',
                description: 'Full AI-powered analysis, detailed insights, and progress tracking',
              },
              unit_amount: regularAmount, // €30/week
              recurring: {
                interval: 'week',
              },
            },
            quantity: 1,
          },
        ],
        mode: 'subscription',
        ...(introCouponId ? {
          discounts: [{
            coupon: introCouponId,
          }],
        } : {}),
        subscription_data: {
          metadata: {
            packageType: 'premium',
            locale,
            userId: session.userId,
          },
        },
        success_url: `${request.nextUrl.origin}/${locale}/result?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${request.nextUrl.origin}/${locale}/result-lock`,
        metadata: {
          packageType: 'premium',
          locale,
          userId: session.userId,
        },
      });

      return NextResponse.redirect(checkoutSession.url || `/${locale}/result-lock`);
    } catch (error: any) {
      console.error('Stripe error:', error);
      // Don't grant access on error - redirect back to result-lock with error message
      const origin = request.nextUrl.origin;
      return NextResponse.redirect(
        `${origin}/${locale}/result-lock?error=payment_failed&message=${encodeURIComponent('Payment processing failed. Please try again or contact support.')}`
      );
    }
  }

  // No valid payment provider configured
  console.error('No valid payment provider configured. Provider:', provider);
  const origin = request.nextUrl.origin;
  return NextResponse.redirect(
    `${origin}/${locale}/result-lock?error=payment_config&message=${encodeURIComponent('Payment system is not properly configured. Please contact support.')}`
  );
}
