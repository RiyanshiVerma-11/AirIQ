import React, { useState } from 'react'
import { ArrowLeft, Mail, Lock, AlertCircle, Loader2, Sparkles, KeyRound } from 'lucide-react'
import { useAuthContext } from '../../contexts/useAuthContext'

interface SignInFormProps {
  onBackToWelcome: () => void
  onSwitchToSignUp: () => void
  onSuccess: () => void
}

export const SignInForm: React.FC<SignInFormProps> = ({
  onBackToWelcome,
  onSwitchToSignUp,
  onSuccess,
}) => {
  const { signIn } = useAuthContext()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!email.trim()) {
      setError('Please enter your email address (e.g. demo@airiq.org).')
      return
    }
    if (!password) {
      setError('Please enter your account password.')
      return
    }

    try {
      setIsSubmitting(true)
      await signIn(email, password)
      onSuccess()
    } catch (err: any) {
      setError(err?.message || 'Invalid email or password.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Helper to fill demo account for effortless testing
  const handleFillDemo = () => {
    setEmail('demo.family@airiq.org')
    setPassword('cleanair2024')
  }

  return (
    <div className="min-h-screen bg-[#0b0f19] flex flex-col justify-center items-center p-4 sm:p-6 text-slate-100 relative">
      <div className="absolute top-10 right-10 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full rounded-3xl bg-slate-950/80 border border-slate-800 p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative z-10 space-y-6">
        <button
          onClick={onBackToWelcome}
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>

        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-950/60 border border-blue-800/60 text-[10px] font-semibold text-blue-300 mb-2">
            <Sparkles className="w-3 h-3 text-blue-400" />
            <span>Welcome Back</span>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">Sign In to AirIQ</h2>
          <p className="text-xs text-slate-400 mt-1">
            Access your synchronized smog radar, diurnal schedule, and household profile.
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-800/60 text-rose-300 text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field with Example */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
              <span>Email Address</span>
              <span className="text-[10px] text-slate-500 font-normal">Example: priya@example.com</span>
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. priya.cleanair@gmail.com or demo.family@airiq.org"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                autoFocus
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
              <span>Password</span>
              <span className="text-[10px] text-slate-500 font-normal">Enter your password</span>
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>
          </div>

          {/* Quick Demo Pre-fill for reviewer ease */}
          <div className="pt-1">
            <button
              type="button"
              onClick={handleFillDemo}
              className="w-full py-2 px-3 rounded-lg bg-slate-900/80 border border-slate-800 text-[11px] text-cyan-300 hover:bg-slate-850 flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
            >
              <KeyRound className="w-3.5 h-3.5 text-cyan-400" />
              <span>Fill Demo Credentials (demo.family@airiq.org)</span>
            </button>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 text-white font-bold text-xs shadow-lg shadow-blue-600/30 hover:scale-[1.01] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Signing In...</span>
              </>
            ) : (
              <span>Sign In to CleanAir Assistant →</span>
            )}
          </button>
        </form>

        <div className="text-center pt-2 border-t border-slate-900">
          <p className="text-xs text-slate-400">
            New to AirIQ?{' '}
            <button
              onClick={onSwitchToSignUp}
              className="font-bold text-cyan-400 hover:text-cyan-300 hover:underline cursor-pointer"
            >
              Create Account
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
