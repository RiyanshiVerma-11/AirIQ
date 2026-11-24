import React from 'react'
import { CheckCircle2, XCircle, Wind, Sun, Car, ShieldAlert, ArrowUpRight } from 'lucide-react'
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
  const optimalHour = data.hourlyForecast.find((h) => h.isOptimalVentilationWindow)
  const windowTime = optimalHour ? `${optimalHour.time}` : '1:00 PM – 3:30 PM'

  // 3. Mask
  const maskNeeded = aqi > 100

  // 4. Commute advice
  const commuteMode = onboarding.lifestyle.commuteMode || profile.commuteMode || 'car_diesel'
  const isCar = commuteMode.includes('car')
  const isTwoWheeler = commuteMode.includes('two_wheeler')

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between text-xs">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <ShieldAlert className="w-3.5 h-3.5 text-cyan-400" />
          <span>Immediate Family Action Advisory</span>
        </h2>
        <button
          onClick={() => onNavigateTab('routine')}
          className="text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-0.5 cursor-pointer text-[11px]"
        >
          <span>Full 24-Hour Routine</span>
          <ArrowUpRight className="w-3 h-3" />
        </button>
      </div>

      {/* Seamless 4-Action Strip without box-in-a-box */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
        {/* Action 1: Outdoor Play */}
        <div
          className={`p-3.5 rounded-2xl border transition-all ${
            canKidsPlay
              ? 'bg-emerald-950/20 border-emerald-800/40'
              : 'bg-rose-950/20 border-rose-900/40'
          }`}
        >
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              {hasKids ? 'Outdoor Play' : 'Outdoor Exercise'}
            </span>
            {canKidsPlay ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            ) : (
              <XCircle className="w-4 h-4 text-rose-400" />
            )}
          </div>
          <div className={`text-sm font-black ${canKidsPlay ? 'text-emerald-300' : 'text-rose-300'}`}>
            {canKidsPlay ? 'Safe Outdoors' : hasAsthma ? 'Keep Kids Indoors' : 'Avoid Workouts'}
          </div>
          <p className="text-[11px] text-slate-400 mt-1 leading-snug">
            {canKidsPlay
              ? 'Clean air window. Great for play and walks.'
              : isMorningPeak
              ? 'Cold air trapping soot. Keep windows & doors shut.'
              : 'High particulate smog. Postpone until afternoon.'}
          </p>
        </div>

        {/* Action 2: Window Ventilation */}
        <div className="p-3.5 rounded-2xl border bg-slate-900/30 border-slate-800/60">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Fresh Air Windows
            </span>
            <Sun className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-sm font-black text-slate-100">
            {isMorningPeak ? 'Keep Windows Closed' : `Ventilate at ${windowTime.split('–')[0].trim()}`}
          </div>
          <p className="text-[11px] text-slate-400 mt-1 leading-snug">
            {isMorningPeak
              ? `Keep sealed now. Air out around ${windowTime} when sunlight warms the air.`
              : 'Open for 25–30 mins max to flush stuffy air without letting smog settle.'}
          </p>
        </div>

        {/* Action 3: Mask Outside */}
        <div className="p-3.5 rounded-2xl border bg-slate-900/30 border-slate-800/60">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Stepping Outside
            </span>
            <Wind className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-sm font-black text-slate-100">
            {maskNeeded ? 'Wear Fitted N95' : 'No Mask Needed'}
          </div>
          <p className="text-[11px] text-slate-400 mt-1 leading-snug">
            {maskNeeded
              ? 'Ordinary cloth masks leak fine soot. N95 filters >95% of toxic roadside particles.'
              : 'Ambient soot is low. Normal breathing outside is fine.'}
          </p>
        </div>

        {/* Action 4: Commute Advice */}
        <div className="p-3.5 rounded-2xl border bg-slate-900/30 border-slate-800/60">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Commute Protection
            </span>
            <Car className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-sm font-black text-slate-100">
            {isCar
              ? 'AC Recirculation'
              : isTwoWheeler
              ? 'Scarf + N95 Mask'
              : 'Metro is Cleanest'}
          </div>
          <p className="text-[11px] text-slate-400 mt-1 leading-snug">
            {isCar
              ? 'Roll up windows and turn AC to cabin recirc to block direct exhaust fumes.'
              : isTwoWheeler
              ? 'Two-wheelers inhale 3.4x more exhaust. Keep nose & mouth fully covered.'
              : 'Subway trains filter passenger cabin air. Optimal transit mode.'}
          </p>
        </div>
      </div>
    </div>
  )
}
