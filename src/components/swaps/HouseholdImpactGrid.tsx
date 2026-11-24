import React from 'react'
import type { HouseholdImpactSummary } from '../../services/alternativesEngineService'

interface HouseholdImpactGridProps {
  impact: HouseholdImpactSummary
}

export const HouseholdImpactGrid: React.FC<HouseholdImpactGridProps> = ({ impact }) => {
  return (
    <div className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-5 sm:p-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-5">
        <h2 className="text-sm font-bold text-white flex items-center gap-2">
          Your Household's Potential Clean Air Impact
        </h2>
        <span className="text-xs text-slate-400 font-mono">
          Based on your customized lifestyle profile
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        <div className="p-3.5 rounded-xl border border-emerald-900/40 bg-emerald-950/20">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block mb-1">
            PM2.5 Averted / Mo
          </span>
          <div className="text-2xl font-black text-white">
            {impact.monthlyPM25AvertedG} <span className="text-xs font-semibold text-slate-400">g</span>
          </div>
          <span className="text-[11px] text-slate-300 mt-1 block">
            Direct particulate soot kept out of ambient airshed
          </span>
        </div>

        <div className="p-3.5 rounded-xl border border-blue-900/40 bg-blue-950/20">
          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 block mb-1">
            CO2 Averted / Mo
          </span>
          <div className="text-2xl font-black text-white">
            {impact.monthlyCO2AvertedKg} <span className="text-xs font-semibold text-slate-400">kg</span>
          </div>
          <span className="text-[11px] text-slate-300 mt-1 block">
            Greenhouse gas emissions eliminated
          </span>
        </div>

        <div className="p-3.5 rounded-xl border border-indigo-900/40 bg-indigo-950/20">
          <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 block mb-1">
            Personal Exposure Drop
          </span>
          <div className="text-2xl font-black text-white">
            -{impact.personalExposureDropPercent}%
          </div>
          <span className="text-[11px] text-slate-300 mt-1 block">
            Reduction in daily alveolar particulate load
          </span>
        </div>

        <div className="p-3.5 rounded-xl border border-rose-900/40 bg-rose-950/20">
          <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 block mb-1">
            Cigarettes Avoided / Yr
          </span>
          <div className="text-2xl font-black text-white">
            ~{impact.cigarettesAvoidedPerYear}
          </div>
          <span className="text-[11px] text-slate-300 mt-1 block">
            Passive cigarette equivalent lung damage spared
          </span>
        </div>

        <div className="p-3.5 rounded-xl border border-amber-900/40 bg-amber-950/20 col-span-2 sm:col-span-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block mb-1">
            Annual Money Saved
          </span>
          <div className="text-2xl font-black text-emerald-400">
            ${impact.annualMoneySavedUsd}
          </div>
          <span className="text-[11px] text-slate-300 mt-1 block">
            Fuel, medical copays, & energy savings
          </span>
        </div>
      </div>
    </div>
  )
}
