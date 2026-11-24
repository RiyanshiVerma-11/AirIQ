// ─────────────────────────────────────────────────────────────
// AirIQ – Auth Service (localStorage MVP)
// Abstracted behind a clean interface so Firebase/Supabase
// can replace internals by touching only this file.
// ─────────────────────────────────────────────────────────────

import type { UserAccount } from '../types/onboarding'

const AUTH_STORAGE_KEY = 'airiq_auth_session'
const USERS_STORAGE_KEY = 'airiq_users_registry'

// ── Types ────────────────────────────────────────────────────

interface StoredUser {
  id: string
  name: string
  email: string
  passwordHash: string
  createdAt: string
}

interface AuthSession {
  userId: string
  token: string
  expiresAt: string
  isGuest: boolean
}

// ── Helpers ──────────────────────────────────────────────────

/** Simple deterministic hash (non-cryptographic, MVP only). */
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(password + 'airiq_salt_2024')
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

function generateId(): string {
  return `user_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`
}

function generateToken(): string {
  return `sess_${Date.now()}_${Math.random().toString(36).slice(2, 16)}`
}

function getUsers(): StoredUser[] {
  try {
    const raw = localStorage.getItem(USERS_STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveUsers(users: StoredUser[]): void {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users))
}

function getSession(): AuthSession | null {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY)
    if (!raw) return null
    const session: AuthSession = JSON.parse(raw)
    if (new Date(session.expiresAt) < new Date()) {
      localStorage.removeItem(AUTH_STORAGE_KEY)
      return null
    }
    return session
  } catch {
    return null
  }
}

function saveSession(session: AuthSession): void {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session))
}

// ── Public API ───────────────────────────────────────────────

export async function signUp(
  name: string,
  email: string,
  password: string
): Promise<UserAccount> {
  const users = getUsers()
  const normalizedEmail = email.toLowerCase().trim()

  if (users.some((u) => u.email === normalizedEmail)) {
    throw new Error('An account with this email already exists. Try signing in.')
  }

  if (password.length < 6) {
    throw new Error('Password must be at least 6 characters long.')
  }

  const hash = await hashPassword(password)
  const newUser: StoredUser = {
    id: generateId(),
    name: name.trim(),
    email: normalizedEmail,
    passwordHash: hash,
    createdAt: new Date().toISOString(),
  }

  users.push(newUser)
  saveUsers(users)

  const session: AuthSession = {
    userId: newUser.id,
    token: generateToken(),
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days
    isGuest: false,
  }
  saveSession(session)

  return { id: newUser.id, name: newUser.name, email: newUser.email, createdAt: newUser.createdAt }
}

export async function signIn(
  email: string,
  password: string
): Promise<UserAccount> {
  const users = getUsers()
  const normalizedEmail = email.toLowerCase().trim()
  const user = users.find((u) => u.email === normalizedEmail)

  if (!user) {
    throw new Error('No account found with this email. Create a new account?')
  }

  const hash = await hashPassword(password)
  if (hash !== user.passwordHash) {
    throw new Error('Incorrect password. Please try again.')
  }

  const session: AuthSession = {
    userId: user.id,
    token: generateToken(),
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    isGuest: false,
  }
  saveSession(session)

  return { id: user.id, name: user.name, email: user.email, createdAt: user.createdAt }
}

export function signInAsGuest(): UserAccount {
  const guestId = `guest_${Date.now()}`
  const session: AuthSession = {
    userId: guestId,
    token: generateToken(),
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days
    isGuest: true,
  }
  saveSession(session)

  return {
    id: guestId,
    name: 'Guest',
    email: '',
    createdAt: new Date().toISOString(),
  }
}

export function getCurrentUser(): { user: UserAccount; isGuest: boolean } | null {
  const session = getSession()
  if (!session) return null

  if (session.isGuest) {
    return {
      user: { id: session.userId, name: 'Guest', email: '', createdAt: '' },
      isGuest: true,
    }
  }

  const users = getUsers()
  const user = users.find((u) => u.id === session.userId)
  if (!user) return null

  return {
    user: { id: user.id, name: user.name, email: user.email, createdAt: user.createdAt },
    isGuest: false,
  }
}

export function signOut(): void {
  localStorage.removeItem(AUTH_STORAGE_KEY)
}

export function isAuthenticated(): boolean {
  return getSession() !== null
}

export function updateUserName(newName: string): void {
  const session = getSession()
  if (!session || session.isGuest) return

  const users = getUsers()
  const idx = users.findIndex((u) => u.id === session.userId)
  if (idx >= 0) {
    users[idx].name = newName.trim()
    saveUsers(users)
  }
}
