import React from 'react'
import { DollarSign, Sparkles } from 'lucide-react'
import type { IAQSimulationResult } from '../../types'
import { getCategoryBadgeColor } from '../../services/airQualityService'
import { IAQDecayCurve } from './IAQDecayCurve'

interface IAQResultsCardProps {
  result: IAQSimulationResult
  outdoorPM25: number
}

export const IAQResultsCard: React.FC<IAQResultsCardProps> = ({ result, outdoorPM25 }) => {
  const indoorBadge = getCategoryBadgeColor(result.indoorCategory)

  return (
    <div className="space-y-4">
      {/* Steady-State Indoor Atmosphere Gauge */}
      <div className="rounded-2xl border border-slate-800/60 bg-slate-900/40 p-5 relative overflow-hidden">
        <div
          className="absolute -top-16 -right-16 w-56 h-56 rounded-full opacity-15 blur-3xl pointer-events-none"
          style={{ backgroundColor: indoorBadge.hex }}
        />

        <div className="relative z-10 space-y-3.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">
              Simulated Sanctuary Air
            </span>
            <span
              className={`px-2 py-0.5 text-[10px] font-bold rounded-full border ${indoorBadge.bg} ${indoorBadge.border} ${indoorBadge.text}`}
            >
              {result.indoorCategory}
            </span>
          </div>

          <div className="flex items-baseline gap-2">
            <span
              className="text-5xl font-black tracking-tight"
              style={{ color: indoorBadge.hex }}
            >
              {result.equilibriumIndoorPM25}
            </span>
            <span className="text-xs font-semibold text-slate-400">µg/m³ PM2.5</span>
          </div>

          {/* Visual Comparison: Outdoor vs Indoor */}
          <div className="space-y-1.5 text-xs pt-1">
            <div className="flex justify-between text-slate-400 text-[11px]">
              <span>Outdoor Smog: <strong className="text-rose-400">{outdoorPM25} µg/m³</strong></span>
              <span>Indoor Air: <strong className="text-emerald-400">{result.equilibriumIndoorPM25} µg/m³</strong></span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden flex">
              <div
                className="bg-emerald-500 h-full transition-all duration-500"
                style={{ width: `${result.cleanAirRetentionPercent}%` }}
              />
              <div
                className="bg-rose-500 h-full transition-all duration-500"
                style={{ width: `${100 - result.cleanAirRetentionPercent}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] font-bold">
              <span className="text-emerald-400">🛡️ {result.cleanAirRetentionPercent}% Particulates Filtered</span>
              <span className="text-slate-500">WHO Safe: &lt;15 µg/m³</span>
            </div>
          </div>

          {/* Physics Specs Grid */}
          <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-800/60">
            <div className="p-2.5 rounded-xl bg-slate-950/50 border border-slate-800/60">
              <span className="text-[10px] text-slate-400 block mb-0.5">Clean Air Delivery (CADR)</span>
              <span className="text-sm font-black text-cyan-300">{result.totalCADR_CFM} CFM</span>
              <span className="text-[10px] text-slate-500 block">({Math.round(result.totalCADR_CFM * 1.699)} m³/h)</span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-950/50 border border-slate-800/60">
              <span className="text-[10px] text-slate-400 block mb-0.5">Air Changes / Hour (ACH)</span>
              <span className="text-sm font-black text-indigo-300">{result.airChangesPerHourACH} / hr</span>
              <span className="text-[10px] text-slate-500 block">ASHRAE rec: &gt; 4.0</span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-950/50 border border-slate-800/60">
              <span className="text-[10px] text-slate-400 block mb-0.5">Time to 90% Clean</span>
              <span className="text-sm font-black text-white">{result.minutesToCleanRoom90Pct} mins</span>
              <span className="text-[10px] text-slate-500 block">From dirty to safe</span>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-950/50 border border-slate-800/60">
              <span className="text-[10px] text-slate-400 block mb-0.5">Annual Power Draw</span>
              <span className="text-sm font-black text-amber-300">~{result.annualElectricityKwh} kWh</span>
              <span className="text-[10px] text-slate-500 block">(&lt;$12 winter run)</span>
            </div>
          </div>

          {/* Economic ROI Callout */}
          {result.commercialEquivalentCostUsd > 0 && (
            <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-800/30 text-xs space-y-0.5">
              <div className="flex items-center gap-1.5 font-bold text-cyan-300 text-[11px]">
                <DollarSign className="w-3.5 h-3.5" />
                <span>Economic Value:</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                DIY Build: <strong className="text-white">${result.diyCostEstimateUsd}</strong> vs{' '}
                Retail Commercial: <strong className="text-white">${result.commercialEquivalentCostUsd}</strong>.
                Saves <strong className="text-emerald-400">${result.commercialEquivalentCostUsd - result.diyCostEstimateUsd}</strong>!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 60-Minute Dynamic Aerosol Decay Curve */}
      <IAQDecayCurve initialOutdoorPM25={outdoorPM25} result={result} />

      {/* Quick Science Explanation Note */}
      <div className="p-3.5 rounded-xl border border-slate-800/60 bg-slate-900/30 text-xs text-slate-400 space-y-1">
        <div className="font-semibold text-slate-200 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Mass-Balance Equation:</span>
        </div>
        <p className="leading-relaxed font-mono text-[10px] text-slate-300">
          C_in = (ACH_inf × P × C_out + S/V) ÷ (ACH_inf + ACH_cadr + k_dep)
        </p>
        <p className="text-[11px] leading-relaxed">
          Increasing <strong>ACH_cadr</strong> through high-flow Corsi-Rosenthal boxes dominates the denominator, driving indoor PM2.5 down exponentially even during 400+ outdoor smog spikes.
        </p>
      </div>
    </div>
  )
}
