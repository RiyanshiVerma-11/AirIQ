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
      className={`p-3.5 sm:p-4 rounded-2xl border transition-all ${
        isDanger
          ? 'border-rose-900/40 bg-rose-950/10'
          : isSafe
          ? 'border-emerald-900/40 bg-emerald-950/10'
          : isCaution
          ? 'border-amber-900/40 bg-amber-950/10'
          : 'border-slate-800/60 bg-slate-900/30'
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/50 pb-2.5 mb-2.5">
        <div className="flex items-center gap-2.5">
          <span className="px-2 py-0.5 text-xs font-mono font-bold rounded-lg bg-slate-950/80 text-cyan-300 border border-slate-800/60">
            {slot.timeRange}
          </span>
          <h3 className="text-sm font-bold text-white">{slot.title}</h3>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border ${
              isDanger
                ? 'bg-rose-950/60 text-rose-300 border-rose-500/30'
                : isSafe
                ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/30'
                : 'bg-amber-950/60 text-amber-300 border-amber-500/30'
            }`}
          >
            {slot.riskLevel} risk
          </span>

          <span className="text-[11px] font-bold text-cyan-400">
            -{slot.exposureDropPercent}% exposure
          </span>
        </div>
      </div>

      <div className="space-y-2 text-xs">
        <p className="text-slate-200 leading-relaxed font-medium">
          {slot.actionableRecommendation}
        </p>

        <div className="pt-1.5 grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
          <div className="flex items-start gap-2 text-slate-300">
            <Shield className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-200">The Science: </span>
              <span className="text-slate-400">{slot.scienceWhy}</span>
            </div>
          </div>

          <div className="flex items-start gap-2 text-slate-300">
            <Flame className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-200">Averted Emission: </span>
              <span className="text-slate-400">{slot.emissionAvertedDescription}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
