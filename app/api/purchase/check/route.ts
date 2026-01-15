import { NextRequest, NextResponse } from 'next/server';
import { hasPremiumAccess, getPurchaseByTransactionId } from '@/lib/db';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const transactionId = searchParams.get('transaction_id');
  const sessionId = searchParams.get('session_id');

  if (!transactionId && !sessionId) {
    return NextResponse.json({ error: 'Missing transaction_id or session_id' }, { status: 400 });
  }

  let hasAccess = false;
  let purchase = null;

  if (transactionId) {
    purchase = getPurchaseByTransactionId(transactionId);
    hasAccess = purchase?.status === 'completed' || false;
  } else if (sessionId) {
    hasAccess = hasPremiumAccess(sessionId);
  }

  return NextResponse.json({
    hasAccess,
    purchase: purchase ? {
      transactionId: purchase.transactionId,
      status: purchase.status,
      packageType: purchase.packageType,
    } : null,
  });
}
