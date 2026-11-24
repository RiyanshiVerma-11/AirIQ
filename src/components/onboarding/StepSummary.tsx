import React from 'react'
import { CheckCircle2, Wind, Users, ShieldAlert, Sparkles, Flame, ArrowRight, Bot } from 'lucide-react'
import type { OnboardingProfile } from '../../types/onboarding'

interface StepSummaryProps {
  profile: OnboardingProfile
  userName: string
  onComplete: () => void
}

export const StepSummary: React.FC<StepSummaryProps> = ({
  profile,
  userName,
  onComplete,
}) => {
  const adultsCount = profile.members.filter((m) => m.role === 'adult').length
  const childrenCount = profile.members.filter((m) => m.role === 'child').length
  const seniorsCount = profile.members.filter((m) => m.role === 'senior').length
  const totalMembers = profile.members.length

  const activeSensitivities = Object.entries(profile.health).filter(
    ([k, v]) => k !== 'hasPets' && Boolean(v)
  )

  // Compute recommended persona automatically based on onboarding inputs
  let recommendedPersona = {
    name: 'Dr. Aisha Rao',
    role: 'Pediatric Pulmonology & Family Health',
    why: 'Auto-assigned because your household includes children and respiratory protection is vital.',
  }

  if (profile.goals.includes('understand_science')) {
    recommendedPersona = {
      name: 'Marcus Vance',
      role: 'Aerosol Scientist & CleanAir Engineer',
      why: 'Auto-assigned for deep aerosol physics, CADR decay calculations, and DIY Corsi-Rosenthal optimization.',
    }
  } else if (profile.goals.includes('reduce_footprint')) {
    recommendedPersona = {
      name: 'Maya Chen',
      role: 'Urban Environmentalist & Policy Activist',
      why: 'Auto-assigned to maximize your monthly avoided emissions and community advocacy.',
    }
  } else if (seniorsCount > 0 || profile.health.hasHeartCondition) {
    recommendedPersona = {
      name: 'Dr. Kabir Anand',
      role: 'Internal Medicine & Cardiopulmonary Specialist',
      why: 'Auto-assigned for senior vascular protection and thermal inversion morning precautions.',
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="text-center space-y-1.5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/60 text-xs font-semibold text-emerald-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Onboarding Complete</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white">
          Your CleanAir Defense Plan is Ready!
        </h2>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          Here is your personalized atmospheric and household profile, calibrated for {profile.location?.name || 'your city'}.
        </p>
      </div>

      {/* Summary Grid Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Location & Atmosphere */}
        <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-white">
            <Wind className="w-4 h-4 text-cyan-400" />
            <span>Target Atmosphere</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">{profile.location?.flag || '🌐'}</span>
            <div>
              <div className="text-sm font-black text-white">{profile.location?.name || 'Global Hotspot'}</div>
              <div className="text-[10px] text-slate-400">
                {profile.location?.region}, {profile.location?.country}
              </div>
            </div>
          </div>
          <p className="text-[10px] text-slate-400 leading-tight pt-1 border-t border-slate-800/80">
            Real-time planetary boundary layer height & thermal inversion tracking active.
          </p>
        </div>

        {/* Household Demographics */}
        <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-white">
            <Users className="w-4 h-4 text-blue-400" />
            <span>Household Composition</span>
          </div>
          <div className="text-sm font-black text-white">
            {totalMembers} Total Members
          </div>
          <div className="flex flex-wrap gap-1.5 text-[10px]">
            <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300">
              {adultsCount} Adults
            </span>
            {childrenCount > 0 && (
              <span className="px-2 py-0.5 rounded-md bg-amber-950/60 text-amber-300 border border-amber-800/50">
                {childrenCount} Children
              </span>
            )}
            {seniorsCount > 0 && (
              <span className="px-2 py-0.5 rounded-md bg-purple-950/60 text-purple-300 border border-purple-800/50">
                {seniorsCount} Seniors
              </span>
            )}
            {profile.health.hasPets && (
              <span className="px-2 py-0.5 rounded-md bg-cyan-950/60 text-cyan-300 border border-cyan-800/50">
                🐾 Pets Present
              </span>
            )}
          </div>
        </div>

        {/* Clinical Sensitivity Tier */}
        <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-white">
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            <span>Clinical Sensitivity Shield</span>
          </div>
          <div className="text-sm font-black text-white">
            {activeSensitivities.length > 0 ? (
              <span className="text-rose-300 font-bold">
                {activeSensitivities.length} High Sensitivity Flag(s)
              </span>
            ) : (
              <span className="text-emerald-300 font-semibold">Standard Urban Baseline</span>
            )}
          </div>
          <div className="text-[10px] text-slate-400 leading-tight">
            Alert trigger set to AQI {activeSensitivities.length > 0 ? '80' : '120'} (lowered for protective preventive care).
          </div>
        </div>

        {/* Daily Routine & Commute */}
        <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-white">
            <Flame className="w-4 h-4 text-amber-400" />
            <span>Commute & Home Energy</span>
          </div>
          <div className="text-xs font-bold text-slate-200">
            {profile.lifestyle.commuteMode.replace('_', ' ').toUpperCase()} • {profile.lifestyle.dailyCommuteKm} km daily
          </div>
          <div className="text-[10px] text-slate-400 leading-tight">
            Departure: {profile.lifestyle.departureTime} • Floor Area: {profile.lifestyle.homeAreaSqFt} sq ft
          </div>
        </div>
      </div>

      {/* Auto-Tuned Aura AI Specialist Card */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-950/60 via-indigo-950/60 to-purple-950/60 border border-blue-800/50 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-white">
            <Bot className="w-4 h-4 text-cyan-400" />
            <span>Auto-Configured Aura AI Specialist</span>
          </div>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-cyan-900/60 text-cyan-300 border border-cyan-700/60">
            Tailored for {userName || 'You'}
          </span>
        </div>

        <div className="flex items-center gap-3 pt-1">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 text-white font-bold flex items-center justify-center shrink-0 shadow-md">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-xs font-black text-white">{recommendedPersona.name}</div>
            <div className="text-[10px] text-cyan-300">{recommendedPersona.role}</div>
            <div className="text-[10px] text-slate-400 mt-0.5">{recommendedPersona.why}</div>
          </div>
        </div>
      </div>

      {/* Final Launch Button */}
      <div className="pt-2">
        <button
          type="button"
          onClick={onComplete}
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white font-black text-sm shadow-xl shadow-cyan-600/30 hover:scale-[1.01] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Launch AirIQ CleanAir Control Center</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
