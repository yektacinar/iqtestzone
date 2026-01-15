import { NextRequest, NextResponse } from 'next/server';
import { createMagicLinkToken } from '@/lib/auth';

// In production, integrate with email service (SendGrid, Resend, etc.)
async function sendMagicLinkEmail(email: string, token: string) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const magicLink = `${baseUrl}/api/auth/verify?token=${token}`;
  
  // Mock email sending - in production, use real email service
  console.log('=== MAGIC LINK EMAIL (MOCK) ===');
  console.log(`To: ${email}`);
  console.log(`Magic Link: ${magicLink}`);
  console.log('================================');
  
  // In production, replace with:
  // await emailService.send({
  //   to: email,
  //   subject: 'Sign in to IQTestZone',
  //   html: `Click here to sign in: <a href="${magicLink}">${magicLink}</a>`
  // });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;
    
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }
    
    // Create magic link token
    const token = await createMagicLinkToken(email);
    
    // Send magic link email
    await sendMagicLinkEmail(email, token);
    
    return NextResponse.json({
      success: true,
      message: 'Magic link sent to your email',
      // In development, return the token for testing
      ...(process.env.NODE_ENV === 'development' && { token }),
    });
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Failed to send magic link' },
      { status: 500 }
    );
  }
}
