import React from 'react'
import { CheckCircle2, XCircle, AlertTriangle, Wind, ShieldCheck, Sun, Car } from 'lucide-react'
import type { AirQualityData, HouseholdProfile } from '../../types'
import type { OnboardingProfile } from '../../types/onboarding'

interface QuickFamilyGuidanceProps {
  data: AirQualityData
  profile: HouseholdProfile
  onboarding: OnboardingProfile
  onNavigateTab: (tabId: string) => void
}

export const QuickFamilyGuidance: React.FC<QuickFamilyGuidanceProps> = ({
  data,
  profile,
  onboarding,
  onNavigateTab,
}) => {
  const aqi = data.aqi
  const hasKids = profile.children > 0
  const hasAsthma = profile.hasAsthmaOrCOPD || onboarding.health.hasAsthmaOrCOPD

  // 1. Can kids play outside?
  const canKidsPlay = aqi <= 100
  const isMorningPeak = data.inversionRisk === 'High' || data.inversionRisk === 'Extreme'

  // 2. Can windows be opened?
  // Check if current hour is in optimal window
  const optimalHour = data.hourlyForecast.find((h) => h.isOptimalVentilationWindow)
  const windowTime = optimalHour ? `${optimalHour.time}` : '12:30 PM – 03:00 PM'

  return (
    <div className="space-y-3">
      <div>
        <h2 className="text-base font-black text-white flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Quick Family Action Guide (What to do right now)</span>
        </h2>
        <p className="text-xs text-slate-400 mt-0.5">
          Simple yes/no answers tailored to your household's kids, health, and commute.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Card 1: Kids & Outdoor Exercise */}
        <div
          className={`p-4 rounded-2xl border flex flex-col justify-between space-y-2 ${
            canKidsPlay
              ? 'bg-emerald-950/30 border-emerald-800/50'
              : 'bg-rose-950/30 border-rose-800/50'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase text-slate-400">
              {hasKids ? "Kids' Outdoor Play" : 'Outdoor Exercise'}
            </span>
            {canKidsPlay ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            ) : (
              <XCircle className="w-5 h-5 text-rose-400" />
            )}
          </div>

          <div>
            <div className={`text-base font-black ${canKidsPlay ? 'text-emerald-300' : 'text-rose-300'}`}>
              {canKidsPlay ? 'Safe to Go Outside' : 'Keep Kids Indoors'}
            </div>
            <p className="text-xs text-slate-300 mt-1 leading-snug">
              {canKidsPlay
                ? 'Air is in a safe range. Great time for outdoor sports and walks.'
                : hasAsthma
                ? 'Air contains high soot. Children and asthma sufferers should stay indoors.'
                : 'Current air is unhealthy. Postpone outdoor sports until afternoon.'}
            </p>
          </div>

          <div className="text-[10px] text-slate-400 font-medium pt-1 border-t border-slate-800/60">
            {isMorningPeak ? '⚠️ Morning cold air is trapping soot.' : '☀️ Sunlight is helping air disperse.'}
          </div>
        </div>

        {/* Card 2: Open Windows for Fresh Air? */}
        <div className="p-4 rounded-2xl border bg-slate-900/60 border-slate-800 flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase text-slate-400">Fresh Air Windows</span>
            <Sun className="w-5 h-5 text-amber-400" />
          </div>

          <div>
            <div className="text-base font-black text-white">
              {isMorningPeak ? 'Keep Windows Closed' : 'Open Around 1:00 PM'}
            </div>
            <p className="text-xs text-slate-300 mt-1 leading-snug">
              {isMorningPeak
                ? 'Do not open windows right now. Morning smog will enter your home.'
                : `Best time to air out rooms is around ${windowTime} when the sun warms the air.`}
            </p>
          </div>

          <div className="text-[10px] text-cyan-300 font-medium pt-1 border-t border-slate-800/60 flex items-center justify-between">
            <span>Air out for 30–45 mins max</span>
            <button
              onClick={() => onNavigateTab('iaq-lab')}
              className="text-cyan-400 hover:underline cursor-pointer"
            >
              See DIY Hacks →
            </button>
          </div>
        </div>

        {/* Card 3: Mask Outside */}
        <div className="p-4 rounded-2xl border bg-slate-900/60 border-slate-800 flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase text-slate-400">Stepping Outside</span>
            <Wind className="w-5 h-5 text-cyan-400" />
          </div>

          <div>
            <div className="text-base font-black text-white">
              {aqi > 150 ? 'Wear an N95 Mask' : aqi > 50 ? 'Mask Recommended' : 'No Mask Needed'}
            </div>
            <p className="text-xs text-slate-300 mt-1 leading-snug">
              {aqi > 150
                ? 'Ordinary cloth masks do not stop fine PM2.5 soot. Use a well-fitted N95 mask.'
                : 'Sensitive family members should carry an N95 mask just in case.'}
            </p>
          </div>

          <div className="text-[10px] text-slate-400 font-medium pt-1 border-t border-slate-800/60">
            N95 filters over 95% of toxic roadside soot
          </div>
        </div>

        {/* Card 4: Safe Travel & Commute */}
        <div className="p-4 rounded-2xl border bg-slate-900/60 border-slate-800 flex flex-col justify-between space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase text-slate-400">Your Daily Commute</span>
            <Car className="w-5 h-5 text-blue-400" />
          </div>

          <div>
            <div className="text-base font-black text-white">
              {onboarding.lifestyle.commuteMode.includes('car')
                ? 'Use AC Recirculation'
                : onboarding.lifestyle.commuteMode.includes('two_wheeler')
                ? 'Wear Scarf + N95'
                : 'Metro is Cleanest'}
            </div>
            <p className="text-xs text-slate-300 mt-1 leading-snug">
              {onboarding.lifestyle.commuteMode.includes('car')
                ? "Keep car windows rolled up. Switch AC to 'Internal Recirculation' to block road exhaust."
                : onboarding.lifestyle.commuteMode.includes('two_wheeler')
                ? 'Two-wheeler riders inhale 3.4x more exhaust. Keep mouth and nose fully covered.'
                : 'Metro trains have clean cabin air filters. Great choice for smoggy mornings.'}
            </p>
          </div>

          <div className="text-[10px] text-cyan-300 font-medium pt-1 border-t border-slate-800/60 flex items-center justify-between">
            <span>{profile.dailyCommuteKm || 15} km journey</span>
            <button
              onClick={() => onNavigateTab('swaps')}
              className="text-cyan-400 hover:underline cursor-pointer"
            >
              See Green Swaps →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
