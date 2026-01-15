import { NextRequest, NextResponse } from 'next/server';
import { verifyPaddleWebhook } from '@/lib/payment-provider';
import { updatePurchaseStatus, getPurchaseByTransactionId } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    
    // Paddle sends signature in different ways:
    // - Paddle Billing: 'paddle-signature' header
    // - Paddle Classic: 'p-signature' in body or header
    const signature = request.headers.get('paddle-signature') || 
                     request.headers.get('p-signature') || 
                     '';

    // Verify webhook signature
    if (!verifyPaddleWebhook(body, signature)) {
      console.error('Paddle webhook signature verification failed');
      // In development, allow without signature for testing
      if (process.env.NODE_ENV === 'production') {
        return NextResponse.json(
          { error: 'Invalid signature' },
          { status: 401 }
        );
      }
      console.warn('Allowing webhook in development mode without signature verification');
    }

    // Parse event - Paddle Classic sends form data, Billing sends JSON
    let event: any;
    try {
      event = JSON.parse(body);
    } catch (e) {
      // Might be form-encoded (Paddle Classic)
      const formData = new URLSearchParams(body);
      event = Object.fromEntries(formData.entries());
    }

    // Handle different Paddle webhook events
    // Paddle Classic: payment_succeeded, payment_failed
    // Paddle Billing: transaction.completed, transaction.payment_failed
    const eventType = event.event_type || event.alert_name;
    
    if (eventType === 'payment_succeeded' || eventType === 'transaction.completed' || eventType === 'transaction.payment_succeeded') {
      // Extract transaction ID from different event formats
      let transactionId = event.data?.id || event.data?.transaction_id || event.subscription_id || event.order_id;
      
      // Try to get from passthrough data
      if (!transactionId && event.passthrough) {
        try {
          const passthrough = typeof event.passthrough === 'string' 
            ? JSON.parse(event.passthrough) 
            : event.passthrough;
          transactionId = passthrough.transaction_id;
        } catch (e) {
          // passthrough might not be JSON
        }
      }
      
      if (!transactionId) {
        console.error('No transaction ID in webhook event:', event);
        return NextResponse.json({ error: 'Missing transaction ID' }, { status: 400 });
      }

      // Update purchase status
      const purchase = getPurchaseByTransactionId(transactionId);
      if (purchase) {
        updatePurchaseStatus(transactionId, 'completed');
        console.log('Purchase completed:', transactionId);
      } else {
        // Try to find by passthrough transaction_id
        if (event.passthrough) {
          try {
            const passthrough = typeof event.passthrough === 'string' 
              ? JSON.parse(event.passthrough) 
              : event.passthrough;
            if (passthrough.transaction_id) {
              updatePurchaseStatus(passthrough.transaction_id, 'completed');
              console.log('Purchase completed via passthrough:', passthrough.transaction_id);
            }
          } catch (e) {
            console.error('Failed to parse passthrough:', e);
          }
        }
      }
    } else if (eventType === 'payment_failed' || eventType === 'transaction.payment_failed' || eventType === 'transaction.payment_declined') {
      let transactionId = event.data?.id || event.data?.transaction_id || event.subscription_id || event.order_id;
      
      if (transactionId) {
        updatePurchaseStatus(transactionId, 'failed');
        console.log('Purchase failed:', transactionId);
      }
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('Paddle webhook error:', error);
    return NextResponse.json(
      { error: error.message || 'Webhook processing failed' },
      { status: 500 }
    );
  }
}
