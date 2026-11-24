import { useState, useCallback } from 'react'
import type { AuthState } from '../types/onboarding'
import * as authService from '../services/authService'

export function useAuth() {
  const [state, setState] = useState<AuthState>(() => {
    const existing = authService.getCurrentUser()
    if (existing) {
      return {
        user: existing.user,
        isAuthenticated: true,
        isLoading: false,
        isGuest: existing.isGuest,
      }
    }
    return {
      user: null,
      isAuthenticated: false,
      isLoading: false,
      isGuest: false,
    }
  })

  const handleSignUp = useCallback(async (name: string, email: string, password: string) => {
    const user = await authService.signUp(name, email, password)
    setState({ user, isAuthenticated: true, isLoading: false, isGuest: false })
    return user
  }, [])

  const handleSignIn = useCallback(async (email: string, password: string) => {
    const user = await authService.signIn(email, password)
    setState({ user, isAuthenticated: true, isLoading: false, isGuest: false })
    return user
  }, [])

  const handleGuestSignIn = useCallback(() => {
    const user = authService.signInAsGuest()
    setState({ user, isAuthenticated: true, isLoading: false, isGuest: true })
    return user
  }, [])

  const handleSignOut = useCallback(() => {
    authService.signOut()
    setState({ user: null, isAuthenticated: false, isLoading: false, isGuest: false })
  }, [])

  const updateName = useCallback((newName: string) => {
    authService.updateUserName(newName)
    setState((prev) => ({
      ...prev,
      user: prev.user ? { ...prev.user, name: newName } : null,
    }))
  }, [])

  return {
    ...state,
    signUp: handleSignUp,
    signIn: handleSignIn,
    signInAsGuest: handleGuestSignIn,
    signOut: handleSignOut,
    updateName,
  }
}

export type AuthActions = ReturnType<typeof useAuth>
