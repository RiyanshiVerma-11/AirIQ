import React, { useState } from 'react'
import { WelcomeSplash } from './WelcomeSplash'
import { SignUpForm } from './SignUpForm'
import { SignInForm } from './SignInForm'
import { useAuthContext } from '../../contexts/useAuthContext'

interface AuthContainerProps {
  onAuthSuccess: () => void
}

type AuthScreen = 'welcome' | 'signup' | 'signin'

export const AuthContainer: React.FC<AuthContainerProps> = ({ onAuthSuccess }) => {
  const [screen, setScreen] = useState<AuthScreen>('welcome')
  const { signInAsGuest } = useAuthContext()

  const handleGuest = () => {
    signInAsGuest()
    onAuthSuccess()
  }

  if (screen === 'signup') {
    return (
      <SignUpForm
        onBackToWelcome={() => setScreen('welcome')}
        onSwitchToSignIn={() => setScreen('signin')}
        onSuccess={onAuthSuccess}
      />
    )
  }

  if (screen === 'signin') {
    return (
      <SignInForm
        onBackToWelcome={() => setScreen('welcome')}
        onSwitchToSignUp={() => setScreen('signup')}
        onSuccess={onAuthSuccess}
      />
    )
  }

  return (
    <WelcomeSplash
      onStartSignUp={() => setScreen('signup')}
      onStartSignIn={() => setScreen('signin')}
      onGuestAccess={handleGuest}
    />
  )
}
