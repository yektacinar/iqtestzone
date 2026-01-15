import fs from 'fs';
import path from 'path';

// Simple file-based database for purchase tracking, users, and entitlements
// In production, replace with a real database (PostgreSQL, MySQL, etc.)

interface Purchase {
  transactionId: string;
  sessionId: string;
  userId?: string;
  packageType: 'premium';
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
  completedAt?: string;
  locale?: string;
}

interface User {
  id: string;
  email: string;
  createdAt: string;
}

interface Entitlement {
  userId: string;
  premiumActive: boolean;
  premiumUntil: string | null;
  providerCustomerId: string | null;
  providerSubscriptionId: string | null;
  updatedAt: string;
}

const DB_DIR = path.join(process.cwd(), 'data');
const PURCHASES_FILE = path.join(DB_DIR, 'purchases.json');
const USERS_FILE = path.join(DB_DIR, 'users.json');
const ENTITLEMENTS_FILE = path.join(DB_DIR, 'entitlements.json');

// Ensure data directory exists
function ensureDataDir() {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }
  if (!fs.existsSync(PURCHASES_FILE)) {
    fs.writeFileSync(PURCHASES_FILE, JSON.stringify([], null, 2));
  }
  if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, JSON.stringify([], null, 2));
  }
  if (!fs.existsSync(ENTITLEMENTS_FILE)) {
    fs.writeFileSync(ENTITLEMENTS_FILE, JSON.stringify([], null, 2));
  }
}

// Read purchases from file
export function getPurchases(): Purchase[] {
  ensureDataDir();
  try {
    const data = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// Write purchases to file
function savePurchases(purchases: Purchase[]) {
  ensureDataDir();
  fs.writeFileSync(DB_FILE, JSON.stringify(purchases, null, 2));
}

// Create a new purchase record
export function createPurchase(purchase: Omit<Purchase, 'createdAt'>): Purchase {
  const purchases = getPurchases();
  const newPurchase: Purchase = {
    ...purchase,
    createdAt: new Date().toISOString(),
  };
  purchases.push(newPurchase);
  savePurchases(purchases);
  return newPurchase;
}

// Update purchase status
export function updatePurchaseStatus(
  transactionId: string,
  status: Purchase['status']
): Purchase | null {
  const purchases = getPurchases();
  const purchase = purchases.find(p => p.transactionId === transactionId);
  if (!purchase) return null;
  
  purchase.status = status;
  if (status === 'completed') {
    purchase.completedAt = new Date().toISOString();
  }
  savePurchases(purchases);
  return purchase;
}

// Find purchase by transaction ID
export function getPurchaseByTransactionId(transactionId: string): Purchase | null {
  const purchases = getPurchases();
  return purchases.find(p => p.transactionId === transactionId) || null;
}

// Find purchase by session ID
export function getPurchaseBySessionId(sessionId: string): Purchase | null {
  const purchases = getPurchases();
  return purchases.find(p => p.sessionId === sessionId) || null;
}

// Check if user has premium access
export function hasPremiumAccess(sessionId: string): boolean {
  const purchase = getPurchaseBySessionId(sessionId);
  return purchase?.status === 'completed' || false;
}

// ========== USER MANAGEMENT ==========

// Read users from file
function getUsers(): User[] {
  ensureDataDir();
  try {
    const data = fs.readFileSync(USERS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// Write users to file
function saveUsers(users: User[]) {
  ensureDataDir();
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

// Create a new user
export function createUser(email: string): User {
  const users = getUsers();
  // Check if user already exists
  const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existingUser) {
    return existingUser;
  }
  
  const newUser: User = {
    id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    email: email.toLowerCase(),
    createdAt: new Date().toISOString(),
  };
  users.push(newUser);
  saveUsers(users);
  
  // Create default entitlement
  createEntitlement(newUser.id);
  
  return newUser;
}

// Find user by email
export function getUserByEmail(email: string): User | null {
  const users = getUsers();
  return users.find(u => u.email.toLowerCase() === email.toLowerCase()) || null;
}

// Find user by ID
export function getUserById(id: string): User | null {
  const users = getUsers();
  return users.find(u => u.id === id) || null;
}

// ========== ENTITLEMENT MANAGEMENT ==========

// Read entitlements from file
function getEntitlements(): Entitlement[] {
  ensureDataDir();
  try {
    const data = fs.readFileSync(ENTITLEMENTS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// Write entitlements to file
function saveEntitlements(entitlements: Entitlement[]) {
  ensureDataDir();
  fs.writeFileSync(ENTITLEMENTS_FILE, JSON.stringify(entitlements, null, 2));
}

// Create a new entitlement
export function createEntitlement(userId: string): Entitlement {
  const entitlements = getEntitlements();
  // Check if entitlement already exists
  const existing = entitlements.find(e => e.userId === userId);
  if (existing) {
    return existing;
  }
  
  const newEntitlement: Entitlement = {
    userId,
    premiumActive: false,
    premiumUntil: null,
    providerCustomerId: null,
    providerSubscriptionId: null,
    updatedAt: new Date().toISOString(),
  };
  entitlements.push(newEntitlement);
  saveEntitlements(entitlements);
  return newEntitlement;
}

// Get entitlement by user ID
export function getEntitlementByUserId(userId: string): Entitlement | null {
  const entitlements = getEntitlements();
  return entitlements.find(e => e.userId === userId) || null;
}

// Update entitlement
export function updateEntitlement(
  userId: string,
  updates: Partial<Omit<Entitlement, 'userId' | 'updatedAt'>>
): Entitlement | null {
  const entitlements = getEntitlements();
  let entitlement = entitlements.find(e => e.userId === userId);
  
  if (!entitlement) {
    entitlement = createEntitlement(userId);
  }
  
  Object.assign(entitlement, updates, {
    updatedAt: new Date().toISOString(),
  });
  
  saveEntitlements(entitlements);
  return entitlement;
}

// Check if user has active premium subscription
export function hasActivePremium(userId: string): boolean {
  const entitlement = getEntitlementByUserId(userId);
  if (!entitlement) return false;
  
  // Check mock mode override
  if (process.env.MOCK_PREMIUM_ACTIVE === 'true') {
    return true;
  }
  
  if (!entitlement.premiumActive) return false;
  
  // Check if subscription is still valid
  if (entitlement.premiumUntil) {
    const untilDate = new Date(entitlement.premiumUntil);
    return untilDate > new Date();
  }
  
  return entitlement.premiumActive;
}

// Find user by provider customer ID
export function getUserByProviderCustomerId(providerCustomerId: string): User | null {
  const entitlements = getEntitlements();
  const entitlement = entitlements.find(e => e.providerCustomerId === providerCustomerId);
  if (!entitlement) return null;
  return getUserById(entitlement.userId);
}

// Find user by provider subscription ID
export function getUserByProviderSubscriptionId(providerSubscriptionId: string): User | null {
  const entitlements = getEntitlements();
  const entitlement = entitlements.find(e => e.providerSubscriptionId === providerSubscriptionId);
  if (!entitlement) return null;
  return getUserById(entitlement.userId);
}
