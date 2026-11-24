import React from 'react'
import { Shield, Flame } from 'lucide-react'
import type { RoutineTimeSlot } from '../../types'

interface HourlySlotCardProps {
  slot: RoutineTimeSlot
}

export const HourlySlotCard: React.FC<HourlySlotCardProps> = ({ slot }) => {
  const isDanger = slot.riskLevel === 'danger'
  const isSafe = slot.riskLevel === 'safe'
  const isCaution = slot.riskLevel === 'caution'

  return (
    <div
      className={`p-5 rounded-2xl border transition-all ${
        isDanger
          ? 'border-rose-900/50 bg-slate-900/90 hover:border-rose-700/60'
          : isSafe
          ? 'border-emerald-900/50 bg-slate-900/90 hover:border-emerald-700/60'
          : isCaution
          ? 'border-amber-900/50 bg-slate-900/90 hover:border-amber-700/60'
          : 'border-slate-800 bg-slate-900/60'
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3 mb-3">
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-1 text-xs font-mono font-bold rounded-lg bg-slate-950 text-cyan-300 border border-slate-800">
            {slot.timeRange}
          </span>
          <h3 className="text-sm sm:text-base font-bold text-white">{slot.title}</h3>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${
              isDanger
                ? 'bg-rose-950/60 text-rose-300 border-rose-500/40'
                : isSafe
                ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40'
                : 'bg-amber-950/60 text-amber-300 border-amber-500/40'
            }`}
          >
            {slot.riskLevel} exposure risk
          </span>

          <span className="text-[11px] font-bold text-cyan-400">
            -{slot.exposureDropPercent}% exposure
          </span>
        </div>
      </div>

      <div className="space-y-2 text-xs sm:text-sm">
        <p className="text-slate-200 leading-relaxed font-medium">
          {slot.actionableRecommendation}
        </p>

        <div className="pt-2 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
            <span className="text-[11px] font-bold text-indigo-300 flex items-center gap-1.5 mb-1">
              <Shield className="w-3.5 h-3.5 text-indigo-400" />
              Scientific Mechanism (The "Why"):
            </span>
            <p className="text-slate-400 leading-relaxed">{slot.scienceWhy}</p>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
            <span className="text-[11px] font-bold text-emerald-300 flex items-center gap-1.5 mb-1">
              <Flame className="w-3.5 h-3.5 text-emerald-400" />
              Emissions & Exposure Impact:
            </span>
            <p className="text-slate-400 leading-relaxed">{slot.emissionAvertedDescription}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
