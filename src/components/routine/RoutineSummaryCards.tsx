import React from 'react'
import type { DailySmogRoutine } from '../../types'

interface RoutineSummaryCardsProps {
  routine: DailySmogRoutine
}

export const RoutineSummaryCards: React.FC<RoutineSummaryCardsProps> = ({ routine }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="p-4 rounded-xl border border-cyan-800/40 bg-gradient-to-br from-cyan-950/30 to-slate-900/80">
        <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 block mb-1">
          Exposure Reduction
        </span>
        <div className="text-3xl font-extrabold text-white">
          -{routine.overallExposureReductionPercent}%
        </div>
        <span className="text-xs text-slate-300 mt-1 block">
          Estimated reduction in personal inhaled PM2.5 vs unmanaged routine.
        </span>
      </div>

      <div className="p-4 rounded-xl border border-emerald-800/40 bg-gradient-to-br from-emerald-950/30 to-slate-900/80">
        <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 block mb-1">
          Avoided Daily Particulates
        </span>
        <div className="text-3xl font-extrabold text-white">
          {routine.dailyAvertedEmissionsG} <span className="text-sm font-semibold text-slate-400">g PM2.5</span>
        </div>
        <span className="text-xs text-slate-300 mt-1 block">
          Through schedule optimization, clean transit, and sealed room filtration.
        </span>
      </div>

      <div className="p-4 rounded-xl border border-rose-800/40 bg-gradient-to-br from-rose-950/30 to-slate-900/80">
        <span className="text-[11px] font-bold uppercase tracking-wider text-rose-400 block mb-1">
          Peak Inversion Trap
        </span>
        <div className="text-lg font-bold text-rose-200 mt-1">
          {routine.peakInversionWindow}
        </div>
        <span className="text-xs text-slate-300 mt-1 block">
          Strictly avoid outdoor jogging, bus stop exposure, and opening windows.
        </span>
      </div>

      <div className="p-4 rounded-xl border border-blue-800/40 bg-gradient-to-br from-blue-950/30 to-slate-900/80">
        <span className="text-[11px] font-bold uppercase tracking-wider text-blue-400 block mb-1">
          The Golden Solar Window
        </span>
        <div className="text-lg font-bold text-emerald-300 mt-1">
          {routine.bestVentilationWindow}
        </div>
        <span className="text-xs text-slate-300 mt-1 block">
          Optimal timing for 15-minute flush ventilation and outdoor essential errands.
        </span>
      </div>
    </div>
  )
}
