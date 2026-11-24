import React from 'react'
import { Sparkles, Shield, AlertTriangle } from 'lucide-react'
import type { AirQualityData } from '../types'
import { AQIHeroCard } from './dashboard/AQIHeroCard'
import { PhysiologicalExposureCard } from './dashboard/PhysiologicalExposureCard'
import { DiurnalTimeline } from './dashboard/DiurnalTimeline'
import { PollutantBreakdownGrid } from './dashboard/PollutantBreakdownGrid'
import { useAuthContext } from '../contexts/useAuthContext'
import { getOnboardingProfile } from '../services/onboardingService'

interface AQIDashboardProps {
  data: AirQualityData
  onNavigateTab: (tabId: string) => void
}

export const AQIDashboard: React.FC<AQIDashboardProps> = ({ data, onNavigateTab }) => {
  const { user } = useAuthContext()
  const onb = getOnboardingProfile()

  const displayName = user?.name ? user.name.split(' ')[0] : 'there'
  const hasVulnerable =
    onb.members.some((m) => m.role === 'child' || m.role === 'senior') ||
    onb.health.hasAsthmaOrCOPD ||
    onb.health.isPregnant

  return (
    <div className="space-y-6">
      {/* Personalized CleanAir Greeting Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/90 to-cyan-950/40 border border-slate-800 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center text-cyan-400 shrink-0">
            <Sparkles className="w-5 h-5 text-cyan-300" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-black text-white flex items-center gap-2">
              <span>Good day, {displayName}!</span>
              {hasVulnerable && (
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-rose-950/60 text-rose-300 border border-rose-800/50">
                  <Shield className="w-3 h-3 text-rose-400" />
                  Family Shield Armed
                </span>
              )}
            </h2>
            <p className="text-xs text-slate-300 mt-0.5">
              Planetary boundary layer in {data.location.name} is currently at{' '}
              <strong className="text-cyan-300 font-mono">{Math.round(data.boundaryLayerHeightM)}m</strong>.
              {data.inversionRisk === 'High' || data.inversionRisk === 'Extreme' ? (
                <span className="text-amber-400 font-semibold ml-1 inline-flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3 inline" />
                  Thermal inversion trapping peak particulate concentrations.
                </span>
              ) : (
                <span className="text-slate-400 ml-1">
                  Solar heating is lifting ground particulates.
                </span>
              )}
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigateTab('routine')}
          className="self-start sm:self-auto px-3.5 py-1.5 rounded-xl bg-cyan-600/20 hover:bg-cyan-600/30 border border-cyan-500/40 text-cyan-300 text-xs font-bold transition-all cursor-pointer whitespace-nowrap"
        >
          View Today's Routine →
        </button>
      </div>

      <AQIHeroCard data={data} onNavigateTab={onNavigateTab} />
      <PhysiologicalExposureCard data={data} />
      <DiurnalTimeline hourlyForecast={data.hourlyForecast} />
      <PollutantBreakdownGrid data={data} />
    </div>
  )
}
