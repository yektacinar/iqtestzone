import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { hasActivePremium } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    
    if (!session) {
      return NextResponse.json({ 
        hasPremium: false,
        message: 'Not authenticated' 
      });
    }
    
    const hasPremium = hasActivePremium(session.userId);
    
    return NextResponse.json({
      hasPremium,
      userId: session.userId,
    });
  } catch (error: any) {
    console.error('Entitlement check error:', error);
    return NextResponse.json(
      { hasPremium: false, error: 'Failed to check entitlement' },
      { status: 500 }
    );
  }
}
