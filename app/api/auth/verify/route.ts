import { NextRequest, NextResponse } from 'next/server';
import { verifyMagicLinkToken, getOrCreateUser, createSession, setSessionCookie } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const token = searchParams.get('token');
    
    if (!token) {
      return NextResponse.redirect(new URL('/?error=missing_token', request.url));
    }
    
    // Verify magic link token
    const email = await verifyMagicLinkToken(token);
    
    if (!email) {
      return NextResponse.redirect(new URL('/?error=invalid_token', request.url));
    }
    
    // Get or create user
    const user = await getOrCreateUser(email);
    
    // Create session
    const sessionToken = await createSession(user.id, user.email);
    await setSessionCookie(sessionToken);
    
    // Redirect to home or return to previous page
    const returnUrl = searchParams.get('returnUrl') || '/';
    return NextResponse.redirect(new URL(returnUrl, request.url));
  } catch (error: any) {
    console.error('Verify error:', error);
    return NextResponse.redirect(new URL('/?error=verification_failed', request.url));
  }
}
