import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import {
  getUserByEmail,
  getUserByProviderCustomerId,
  getUserByProviderSubscriptionId,
  updateEntitlement,
} from '@/lib/db';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature || !webhookSecret) {
    return NextResponse.json({ error: 'Missing signature or webhook secret' }, { status: 400 });
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Handle subscription events
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    // For subscriptions, this fires when checkout is completed
    // The subscription is created but first payment may be pending
    console.log('Checkout session completed:', session.id);
    console.log('Mode:', session.mode);
    if (session.mode === 'subscription' && session.subscription) {
      const subscriptionId = typeof session.subscription === 'string' 
        ? session.subscription 
        : session.subscription.id;
      
      // Get user from metadata or customer email
      const userId = session.metadata?.userId;
      const customerEmail = session.customer_email;
      
      if (userId) {
        // Update entitlement with subscription info
        const subscription = await stripe.subscriptions.retrieve(subscriptionId);
        const premiumUntil = subscription.current_period_end 
          ? new Date(subscription.current_period_end * 1000).toISOString()
          : null;
        
        updateEntitlement(userId, {
          premiumActive: subscription.status === 'active' || subscription.status === 'trialing',
          premiumUntil,
          providerCustomerId: subscription.customer as string,
          providerSubscriptionId: subscriptionId,
        });
        
        console.log('Entitlement updated for user:', userId);
      } else if (customerEmail) {
        // Fallback: find user by email
        const user = getUserByEmail(customerEmail);
        if (user) {
          const subscription = await stripe.subscriptions.retrieve(subscriptionId);
          const premiumUntil = subscription.current_period_end 
            ? new Date(subscription.current_period_end * 1000).toISOString()
            : null;
          
          updateEntitlement(user.id, {
            premiumActive: subscription.status === 'active' || subscription.status === 'trialing',
            premiumUntil,
            providerCustomerId: subscription.customer as string,
            providerSubscriptionId: subscriptionId,
          });
          
          console.log('Entitlement updated for user by email:', user.id);
        }
      }
    }
  }

  // Handle subscription activation/updates
  if (event.type === 'customer.subscription.created' || event.type === 'customer.subscription.updated') {
    const subscription = event.data.object as Stripe.Subscription;
    console.log('Subscription created/updated:', subscription.id);
    
    // Find user by subscription ID or customer ID
    let user = getUserByProviderSubscriptionId(subscription.id);
    if (!user && subscription.customer) {
      user = getUserByProviderCustomerId(subscription.customer as string);
    }
    
    if (user) {
      const premiumUntil = subscription.current_period_end 
        ? new Date(subscription.current_period_end * 1000).toISOString()
        : null;
      
      updateEntitlement(user.id, {
        premiumActive: subscription.status === 'active' || subscription.status === 'trialing',
        premiumUntil,
        providerCustomerId: subscription.customer as string,
        providerSubscriptionId: subscription.id,
      });
      
      console.log('Entitlement updated for subscription:', subscription.id);
    }
  }

  // Handle subscription cancellation
  if (event.type === 'customer.subscription.deleted') {
    const subscription = event.data.object as Stripe.Subscription;
    console.log('Subscription cancelled:', subscription.id);
    
    const user = getUserByProviderSubscriptionId(subscription.id);
    if (user) {
      updateEntitlement(user.id, {
        premiumActive: false,
        premiumUntil: null,
      });
      
      console.log('Premium access revoked for user:', user.id);
    }
  }

  // Handle successful invoice payment (subscription renewal or first payment)
  if (event.type === 'invoice.payment_succeeded') {
    const invoice = event.data.object as Stripe.Invoice;
    if (invoice.subscription) {
      const subscriptionId = typeof invoice.subscription === 'string' 
        ? invoice.subscription 
        : invoice.subscription.id;
      
      console.log('Subscription invoice paid:', invoice.id);
      
      // Refresh premium access
      const subscription = await stripe.subscriptions.retrieve(subscriptionId);
      const user = getUserByProviderSubscriptionId(subscriptionId);
      
      if (user) {
        const premiumUntil = subscription.current_period_end 
          ? new Date(subscription.current_period_end * 1000).toISOString()
          : null;
        
        updateEntitlement(user.id, {
          premiumActive: subscription.status === 'active' || subscription.status === 'trialing',
          premiumUntil,
        });
        
        console.log('Premium access refreshed for subscription:', subscriptionId);
      }
    }
  }

  return NextResponse.json({ received: true });
}
