import React from 'react'
import type { HouseholdImpactSummary } from '../../services/alternativesEngineService'

interface HouseholdImpactGridProps {
  impact: HouseholdImpactSummary
}

export const HouseholdImpactGrid: React.FC<HouseholdImpactGridProps> = ({ impact }) => {
  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between text-xs">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Your Household's Potential Clean Air Impact
        </h2>
        <span className="text-[11px] text-slate-500 font-mono">
          Based on your customized lifestyle profile
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
        <div className="p-3.5 rounded-2xl border border-slate-800/60 bg-slate-900/40 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">
            PM2.5 Averted / Mo
          </span>
          <div className="text-2xl font-black text-white">
            {impact.monthlyPM25AvertedG} <span className="text-xs font-normal text-slate-400">g</span>
          </div>
          <span className="text-[11px] text-slate-400 block leading-snug">
            Particulate soot kept out of ambient air
          </span>
        </div>

        <div className="p-3.5 rounded-2xl border border-slate-800/60 bg-slate-900/40 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 block">
            CO2 Averted / Mo
          </span>
          <div className="text-2xl font-black text-white">
            {impact.monthlyCO2AvertedKg} <span className="text-xs font-normal text-slate-400">kg</span>
          </div>
          <span className="text-[11px] text-slate-400 block leading-snug">
            Greenhouse emissions eliminated
          </span>
        </div>

        <div className="p-3.5 rounded-2xl border border-slate-800/60 bg-slate-900/40 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 block">
            Personal Exposure Drop
          </span>
          <div className="text-2xl font-black text-white">
            -{impact.personalExposureDropPercent}%
          </div>
          <span className="text-[11px] text-slate-400 block leading-snug">
            Reduction in inhaled soot
          </span>
        </div>

        <div className="p-3.5 rounded-2xl border border-slate-800/60 bg-slate-900/40 space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 block">
            Cigarettes Avoided / Yr
          </span>
          <div className="text-2xl font-black text-white">
            ~{impact.cigarettesAvoidedPerYear}
          </div>
          <span className="text-[11px] text-slate-400 block leading-snug">
            Equivalent passive smoke stress
          </span>
        </div>

        <div className="p-3.5 rounded-2xl border border-slate-800/60 bg-slate-900/40 space-y-1 col-span-2 sm:col-span-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">
            Annual Fuel Savings
          </span>
          <div className="text-2xl font-black text-emerald-300">
            ${impact.annualMoneySavedUsd}
          </div>
          <span className="text-[11px] text-slate-400 block leading-snug">
            Direct transit and energy savings
          </span>
        </div>
      </div>
    </div>
  )
}
