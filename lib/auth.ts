import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { createUser, getUserByEmail, getUserById } from './db';

const SECRET_KEY = process.env.AUTH_SECRET || 'your-secret-key-change-in-production';
const secret = new TextEncoder().encode(SECRET_KEY);

// Session duration: 30 days
const SESSION_DURATION = 30 * 24 * 60 * 60 * 1000;

export interface SessionPayload {
  userId: string;
  email: string;
  expiresAt: number;
}

// Create a session token
export async function createSession(userId: string, email: string): Promise<string> {
  const expiresAt = Date.now() + SESSION_DURATION;
  
  const token = await new SignJWT({ userId, email, expiresAt })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(Math.floor(expiresAt / 1000))
    .sign(secret);
  
  return token;
}

// Verify a session token
export async function verifySession(token: string): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    
    if (typeof payload.userId !== 'string' || typeof payload.email !== 'string') {
      return null;
    }
    
    const expiresAt = typeof payload.expiresAt === 'number' ? payload.expiresAt : 0;
    
    if (expiresAt < Date.now()) {
      return null;
    }
    
    return {
      userId: payload.userId as string,
      email: payload.email as string,
      expiresAt,
    };
  } catch (error) {
    return null;
  }
}

// Get current session from cookies
export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get('session')?.value;
  
  if (!token) {
    return null;
  }
  
  return verifySession(token);
}

// Set session cookie
export async function setSessionCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set('session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: SESSION_DURATION / 1000,
    path: '/',
  });
}

// Clear session cookie
export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete('session');
}

// Generate magic link token (short-lived, 15 minutes)
export async function createMagicLinkToken(email: string): Promise<string> {
  const expiresAt = Date.now() + 15 * 60 * 1000; // 15 minutes
  
  const token = await new SignJWT({ email, expiresAt, type: 'magic_link' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(Math.floor(expiresAt / 1000))
    .sign(secret);
  
  return token;
}

// Verify magic link token
export async function verifyMagicLinkToken(token: string): Promise<string | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    
    if (payload.type !== 'magic_link' || typeof payload.email !== 'string') {
      return null;
    }
    
    const expiresAt = typeof payload.expiresAt === 'number' ? payload.expiresAt : 0;
    
    if (expiresAt < Date.now()) {
      return null;
    }
    
    return payload.email as string;
  } catch (error) {
    return null;
  }
}

// Get or create user by email
export async function getOrCreateUser(email: string) {
  let user = getUserByEmail(email);
  if (!user) {
    user = createUser(email);
  }
  return user;
}
