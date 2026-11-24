import { createContext } from 'react'
import type { AuthActions } from '../hooks/useAuth'

export const AuthContext = createContext<AuthActions | null>(null)
