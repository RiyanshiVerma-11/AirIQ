import React from 'react'
import { Car, Utensils, Leaf, Wind, CheckCircle2 } from 'lucide-react'
import type { SustainableAlternative } from '../../types'

interface AlternativeCardProps {
  alt: SustainableAlternative
}

export const AlternativeCard: React.FC<AlternativeCardProps> = ({ alt }) => {
  return (
    <div className="p-4 sm:p-5 rounded-2xl border border-slate-800/60 bg-slate-900/40 space-y-3.5 hover:border-slate-700/60 transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/60 pb-3">
        <div className="flex items-center gap-2.5">
          <span className="p-1.5 rounded-xl bg-slate-950 text-cyan-400 border border-slate-800/60">
            {alt.category === 'commute' ? (
              <Car className="w-4 h-4" />
            ) : alt.category === 'cooking_heating' ? (
              <Utensils className="w-4 h-4" />
            ) : alt.category === 'waste_leaf' ? (
              <Leaf className="w-4 h-4" />
            ) : (
              <Wind className="w-4 h-4" />
            )}
          </span>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white">{alt.title}</h3>
            <span className="text-[10px] text-cyan-400 uppercase tracking-wider font-semibold">
              {alt.difficultyLevel} Difficulty
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="font-bold text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded-lg border border-emerald-800/40 text-[11px]">
            -{alt.pm25AvertedGramsPerMonth}g PM2.5 / mo
          </span>
          <span className="font-bold text-blue-400 bg-blue-950/40 px-2 py-0.5 rounded-lg border border-blue-800/40 text-[11px]">
            -{alt.co2AvertedKgPerMonth}kg CO2 / mo
          </span>
        </div>
      </div>

      {/* Baseline vs Alternative Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs">
        <div className="p-3 rounded-xl bg-rose-950/10 border border-rose-900/20">
          <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 block mb-0.5">
            Current Habit:
          </span>
          <p className="text-slate-300 leading-snug">{alt.baselineBehavior}</p>
        </div>

        <div className="p-3 rounded-xl bg-emerald-950/10 border border-emerald-900/20">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block mb-0.5">
            Sustainable Swap:
          </span>
          <p className="text-slate-200 font-medium leading-snug">{alt.sustainableAlternative}</p>
        </div>
      </div>

      {/* Science & Ripple Effect */}
      <div className="text-xs space-y-1 text-slate-400 pt-0.5">
        <p className="leading-relaxed">
          <strong className="text-indigo-300">The Science: </strong>
          {alt.scienceExplanation}
        </p>
        <p className="leading-relaxed text-slate-300">
          <strong className="text-cyan-300">Community Ripple: </strong>
          {alt.communityMultiplierImpact}
        </p>
      </div>

      {/* Action Steps */}
      <div className="pt-1.5 border-t border-slate-800/50">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs">
          {alt.actionSteps.map((step, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 py-1 text-slate-300"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span className="text-[11px]">{step}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
