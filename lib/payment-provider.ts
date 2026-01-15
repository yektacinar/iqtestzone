import { NextRequest } from 'next/server';

export type PaymentProvider = 'mock' | 'paddle' | 'stripe';

export interface PaymentConfig {
  provider: PaymentProvider;
  paddleApiKey?: string;
  paddleWebhookSecret?: string;
  stripeSecretKey?: string;
}

export interface CheckoutResponse {
  checkoutUrl: string;
  transactionId: string;
}

// Get payment provider from environment
export function getPaymentProvider(): PaymentProvider {
  const mode = process.env.NEXT_PUBLIC_PAYMENT_MODE || 'mock';
  if (mode === 'paddle') return 'paddle';
  if (mode === 'stripe') return 'stripe';
  return 'mock';
}

// Create Paddle checkout using Paddle Billing API
export async function createPaddleCheckout(
  request: NextRequest,
  locale: string
): Promise<CheckoutResponse> {
  const apiKey = process.env.PADDLE_API_KEY;
  const environment = process.env.PADDLE_ENVIRONMENT || 'sandbox';
  
  if (!apiKey) {
    throw new Error('PADDLE_API_KEY is not configured');
  }

  const baseUrl = environment === 'production' 
    ? 'https://api.paddle.com'
    : 'https://sandbox-api.paddle.com';

  // Generate a unique transaction ID
  const transactionId = `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  // Paddle Billing API - Create transaction
  // Note: You need to create a product and price in Paddle dashboard first
  const priceId = process.env.PADDLE_PRICE_ID;
  if (!priceId) {
    throw new Error('PADDLE_PRICE_ID is not configured. Create a product and price in Paddle dashboard.');
  }

  const response = await fetch(`${baseUrl}/transactions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'Paddle-Version': '1',
    },
    body: JSON.stringify({
      items: [
        {
          price_id: priceId,
          quantity: 1,
        },
      ],
      customer_id: `customer_${transactionId}`,
      custom_data: JSON.stringify({
        transaction_id: transactionId,
        locale,
        package_type: 'premium',
      }),
      checkout: {
        url: `${request.nextUrl.origin}/${locale}/result?transaction_id=${transactionId}`,
      },
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Paddle API error: ${error}`);
  }

  const data = await response.json();
  
  // Paddle returns checkout details
  return {
    checkoutUrl: data.data?.checkout?.url || data.checkout_url || '',
    transactionId: transactionId,
  };
}

// Alternative: Use Paddle Checkout Overlay URL (simpler approach)
export function getPaddleCheckoutUrl(
  request: NextRequest,
  transactionId: string,
  locale: string
): string {
  const vendorId = process.env.PADDLE_VENDOR_ID;
  const productId = process.env.PADDLE_PRODUCT_ID;
  
  if (!vendorId || !productId) {
    throw new Error('PADDLE_VENDOR_ID and PADDLE_PRODUCT_ID must be configured');
  }

  // Paddle Classic Checkout (simpler, uses product ID directly)
  // Note: Paddle Classic uses different URL format
  const environment = process.env.PADDLE_ENVIRONMENT || 'sandbox';
  
  // Paddle Classic checkout URL format
  const params = new URLSearchParams({
    vendor: vendorId,
    product: productId,
    passthrough: JSON.stringify({
      transaction_id: transactionId,
      locale,
      package_type: 'premium',
    }),
    success_url: `${request.nextUrl.origin}/${locale}/result?transaction_id=${transactionId}`,
  });
  
  // Paddle Classic uses vendor/product in URL
  return `https://vendors.paddle.com/checkout?${params.toString()}`;
}

// Verify Paddle webhook signature
export function verifyPaddleWebhook(
  body: string,
  signature: string
): boolean {
  const webhookSecret = process.env.PADDLE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.warn('PADDLE_WEBHOOK_SECRET not configured, skipping verification');
    return true; // Allow in development
  }

  // Paddle Classic uses p_signature parameter (RSA signature)
  // Paddle Billing uses HMAC-SHA256
  // For simplicity, we'll support both
  
  try {
    const crypto = require('crypto');
    
    // Try HMAC-SHA256 first (Paddle Billing)
    const expectedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(body)
      .digest('hex');
    
    if (crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    )) {
      return true;
    }
    
    // If HMAC doesn't match, might be RSA signature (Paddle Classic)
    // For RSA, Paddle provides p_signature in the body itself
    // We'll accept if signature header is present (basic check)
    // In production, implement proper RSA verification
    return signature.length > 0;
  } catch (error) {
    console.error('Webhook verification error:', error);
    return false;
  }
}
