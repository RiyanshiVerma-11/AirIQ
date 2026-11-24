import React from 'react'
import { Wind, ShieldCheck, Sparkles, ArrowRight, Activity, Users, Flame } from 'lucide-react'

interface WelcomeSplashProps {
  onStartSignUp: () => void
  onStartSignIn: () => void
  onGuestAccess: () => void
}

export const WelcomeSplash: React.FC<WelcomeSplashProps> = ({
  onStartSignUp,
  onStartSignIn,
  onGuestAccess,
}) => {
  return (
    <div className="min-h-screen bg-[#0b0f19] flex flex-col justify-between text-slate-100 p-4 sm:p-6 md:p-10 relative overflow-hidden">
      {/* Background atmospheric decorative glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-cyan-600/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-600/15 blur-[120px] pointer-events-none" />

      {/* Header bar */}
      <header className="max-w-6xl w-full mx-auto flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 via-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <Wind className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-xl font-black tracking-tight text-white">
              Air<span className="text-cyan-400">IQ</span>
            </span>
            <span className="ml-2 text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-cyan-950/60 text-cyan-300 border border-cyan-800/60 hidden sm:inline-block">
              CleanAir AI
            </span>
          </div>
        </div>

        <button
          onClick={onStartSignIn}
          className="text-xs font-semibold text-slate-300 hover:text-white px-3.5 py-1.5 rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-800/80 transition-all cursor-pointer"
        >
          Sign In
        </button>
      </header>

      {/* Hero Content */}
      <main className="max-w-3xl w-full mx-auto my-auto py-10 z-10 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs text-cyan-300 shadow-inner">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
          <span>Next-Gen Urban Winter Smog Navigation</span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-tight sm:leading-tight">
          Navigate Severe Smog. <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300 bg-clip-text text-transparent">
            Protect Your Family with Science.
          </span>
        </h1>

        <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto leading-relaxed">
          AirIQ transforms live atmospheric physics, indoor aerosol mass-balance, and Google Gemini GenAI into daily routines, budget DIY hacks, and high-impact sustainable habits tailored directly to your home.
        </p>

        {/* 3 Core Value Props */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 text-left">
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md">
            <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-800/50 flex items-center justify-center text-cyan-400 mb-2">
              <Activity className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold text-white">Diurnal Inversion Shield</h3>
            <p className="text-[11px] text-slate-400 mt-1 leading-snug">
              Know the exact morning smog trapping hours vs. safe midday solar ventilation windows.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md">
            <div className="w-8 h-8 rounded-lg bg-blue-950/80 border border-blue-800/50 flex items-center justify-center text-blue-400 mb-2">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold text-white">Indoor Aerosol Physics</h3>
            <p className="text-[11px] text-slate-400 mt-1 leading-snug">
              Calculate your room's CADR, exponential PM2.5 decay curves, and build $25 Corsi-Rosenthal boxes.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md">
            <div className="w-8 h-8 rounded-lg bg-indigo-950/80 border border-indigo-800/50 flex items-center justify-center text-indigo-400 mb-2">
              <Users className="w-4 h-4" />
            </div>
            <h3 className="text-xs font-bold text-white">Duolingo-Style Plan</h3>
            <p className="text-[11px] text-slate-400 mt-1 leading-snug">
              Get an ultra-personalized 6-step household plan tailored to your kids, elders, commute, and goals.
            </p>
          </div>
        </div>

        {/* Action CTAs */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onStartSignUp}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white font-bold text-sm shadow-xl shadow-cyan-600/25 hover:shadow-cyan-600/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Create Free Account</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onGuestAccess}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-850 text-slate-300 hover:text-white border border-slate-800 font-semibold text-sm transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Try as Guest (Instant Access)</span>
          </button>
        </div>

        {/* Trust badge */}
        <div className="pt-4 flex items-center justify-center gap-2 text-[11px] text-slate-500">
          <Flame className="w-3.5 h-3.5 text-amber-500" />
          <span>Real-time Open-Meteo Air API • Berkeley Earth Equivalence • Corsi-Rosenthal Physics</span>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-6xl w-full mx-auto text-center py-4 text-[11px] text-slate-500 z-10 border-t border-slate-900">
        AirIQ Assistive Environmental Intelligence Platform • Google Engineering & Product CleanAir Initiative
      </footer>
    </div>
  )
}
