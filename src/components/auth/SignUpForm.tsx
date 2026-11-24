import React, { useState } from 'react'
import { ArrowLeft, Mail, Lock, User, AlertCircle, Loader2, Sparkles, CheckCircle2 } from 'lucide-react'
import { useAuthContext } from '../../contexts/useAuthContext'

interface SignUpFormProps {
  onBackToWelcome: () => void
  onSwitchToSignIn: () => void
  onSuccess: () => void
}

export const SignUpForm: React.FC<SignUpFormProps> = ({
  onBackToWelcome,
  onSwitchToSignIn,
  onSuccess,
}) => {
  const { signUp } = useAuthContext()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!name.trim()) {
      setError('Please enter your full name (e.g. Priya Sharma).')
      return
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address (e.g. priya@example.com).')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.')
      return
    }

    try {
      setIsSubmitting(true)
      await signUp(name, email, password)
      onSuccess()
    } catch (err: any) {
      setError(err?.message || 'Failed to create account. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0b0f19] flex flex-col justify-center items-center p-4 sm:p-6 text-slate-100 relative">
      <div className="absolute top-10 left-10 w-80 h-80 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full rounded-3xl bg-slate-950/80 border border-slate-800 p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative z-10 space-y-6">
        <button
          onClick={onBackToWelcome}
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>

        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/60 text-[10px] font-semibold text-cyan-300 mb-2">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            <span>Join AirIQ CleanAir Network</span>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">Create your account</h2>
          <p className="text-xs text-slate-400 mt-1">
            Build your personalized smog defense plan in under 2 minutes.
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-800/60 text-rose-300 text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name Field with Example */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
              <span>Full Name</span>
              <span className="text-[10px] text-slate-500 font-normal">Example: Priya Sharma</span>
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Priya Sharma or David Chen"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                autoFocus
              />
            </div>
          </div>

          {/* Email Address with Example */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
              <span>Email Address</span>
              <span className="text-[10px] text-slate-500 font-normal">Example: priya.cleanair@gmail.com</span>
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. priya.cleanair@gmail.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>
          </div>

          {/* Password with Example Helper */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
              <span>Password</span>
              <span className="text-[10px] text-slate-500 font-normal">Min 6 characters</span>
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
            <p className="text-[10px] text-slate-500">
              Encrypted locally in your browser session for rapid privacy.
            </p>
          </div>

          {/* Quick Perks */}
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-1.5 text-[11px] text-slate-400">
            <div className="flex items-center gap-1.5 text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Full access to Duolingo-style 6-step household onboarding</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Personalized Gemini Aura AI persona auto-tuning</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white font-bold text-xs shadow-lg shadow-cyan-600/30 hover:scale-[1.01] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Creating your account...</span>
              </>
            ) : (
              <span>Create Account & Start Onboarding →</span>
            )}
          </button>
        </form>

        <div className="text-center pt-2 border-t border-slate-900">
          <p className="text-xs text-slate-400">
            Already have an account?{' '}
            <button
              onClick={onSwitchToSignIn}
              className="font-bold text-cyan-400 hover:text-cyan-300 hover:underline cursor-pointer"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
