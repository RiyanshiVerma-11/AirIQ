import { useContext } from 'react'
import { AuthContext } from './authContextDef'
import type { AuthActions } from '../hooks/useAuth'

export function useAuthContext(): AuthActions {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }
  return ctx
}
