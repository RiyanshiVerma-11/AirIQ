import React from 'react'
import type { DailySmogRoutine } from '../../types'

interface RoutineSummaryCardsProps {
  routine: DailySmogRoutine
}

export const RoutineSummaryCards: React.FC<RoutineSummaryCardsProps> = ({ routine }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
      <div className="p-3.5 rounded-2xl bg-slate-900/40 border border-slate-800/60 space-y-1">
        <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 block">
          Exposure Reduction
        </span>
        <div className="text-2xl sm:text-3xl font-black text-white">
          -{routine.overallExposureReductionPercent}%
        </div>
        <span className="text-[11px] text-slate-400 leading-snug block">
          Estimated reduction in personal inhaled PM2.5 soot.
        </span>
      </div>

      <div className="p-3.5 rounded-2xl bg-slate-900/40 border border-slate-800/60 space-y-1">
        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">
          Avoided Soot Inhaled
        </span>
        <div className="text-2xl sm:text-3xl font-black text-white">
          {routine.dailyAvertedEmissionsG} <span className="text-xs font-medium text-slate-500">g PM2.5</span>
        </div>
        <span className="text-[11px] text-slate-400 leading-snug block">
          Through diurnal timing, clean transit, and sealed room filtration.
        </span>
      </div>

      <div className="p-3.5 rounded-2xl bg-slate-900/40 border border-slate-800/60 space-y-1">
        <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 block">
          Peak Inversion Trap
        </span>
        <div className="text-base sm:text-lg font-black text-rose-300">
          {routine.peakInversionWindow}
        </div>
        <span className="text-[11px] text-slate-400 leading-snug block">
          Strict lockdown: no morning jogging, bus stops, or open windows.
        </span>
      </div>

      <div className="p-3.5 rounded-2xl bg-slate-900/40 border border-slate-800/60 space-y-1">
        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">
          Safe Solar Window
        </span>
        <div className="text-base sm:text-lg font-black text-emerald-300">
          {routine.bestVentilationWindow}
        </div>
        <span className="text-[11px] text-slate-400 leading-snug block">
          Optimal timing for 15-minute flush ventilation and outdoor errands.
        </span>
      </div>
    </div>
  )
}
