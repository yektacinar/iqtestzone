import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { updateEntitlement } from '@/lib/db';

// Admin route to toggle premium access for testing
// In production, add proper admin authentication
export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    
    if (!session) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }
    
    const body = await request.json();
    const { premiumActive } = body;
    
    if (typeof premiumActive !== 'boolean') {
      return NextResponse.json(
        { error: 'premiumActive must be a boolean' },
        { status: 400 }
      );
    }
    
    // Update entitlement
    const entitlement = updateEntitlement(session.userId, {
      premiumActive,
      premiumUntil: premiumActive 
        ? new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 days from now
        : null,
    });
    
    return NextResponse.json({
      success: true,
      entitlement: {
        premiumActive: entitlement?.premiumActive,
        premiumUntil: entitlement?.premiumUntil,
      },
    });
  } catch (error: any) {
    console.error('Toggle mock error:', error);
    return NextResponse.json(
      { error: 'Failed to toggle premium access' },
      { status: 500 }
    );
  }
}
