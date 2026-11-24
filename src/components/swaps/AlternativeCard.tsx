import React from 'react'
import { Car, Utensils, Leaf, Wind, CheckCircle2 } from 'lucide-react'
import type { SustainableAlternative } from '../../types'

interface AlternativeCardProps {
  alt: SustainableAlternative
}

export const AlternativeCard: React.FC<AlternativeCardProps> = ({ alt }) => {
  return (
    <div className="p-5 rounded-2xl border border-slate-800 bg-slate-900/80 space-y-4 hover:border-slate-700 transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2.5">
          <span className="p-2 rounded-xl bg-slate-950 text-cyan-400 border border-slate-800">
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
            <h3 className="text-base font-bold text-white">{alt.title}</h3>
            <span className="text-[11px] text-cyan-400 uppercase tracking-wider font-semibold">
              {alt.difficultyLevel} Difficulty
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <span className="font-bold text-emerald-400 bg-emerald-950/40 px-2.5 py-1 rounded-lg border border-emerald-800/40">
            -{alt.pm25AvertedGramsPerMonth}g PM2.5 / mo
          </span>
          <span className="font-bold text-blue-400 bg-blue-950/40 px-2.5 py-1 rounded-lg border border-blue-800/40">
            -{alt.co2AvertedKgPerMonth}kg CO2 / mo
          </span>
        </div>
      </div>

      {/* Baseline vs Alternative Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
        <div className="p-3 rounded-xl bg-rose-950/15 border border-rose-900/30">
          <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 block mb-1">
            Current Baseline Habit:
          </span>
          <p className="text-slate-300 leading-relaxed">{alt.baselineBehavior}</p>
        </div>

        <div className="p-3 rounded-xl bg-emerald-950/15 border border-emerald-900/30">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block mb-1">
            Recommended Sustainable Swap:
          </span>
          <p className="text-slate-200 font-medium leading-relaxed">{alt.sustainableAlternative}</p>
        </div>
      </div>

      {/* Science Rationale & Multiplier Impact */}
      <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2 text-xs">
        <div>
          <strong className="text-indigo-300 block mb-0.5">The Science Behind It:</strong>
          <p className="text-slate-400 leading-relaxed">{alt.scienceExplanation}</p>
        </div>

        <div className="pt-2 border-t border-slate-800/80">
          <strong className="text-cyan-300 block mb-0.5">Community Airshed Ripple Effect:</strong>
          <p className="text-slate-300 leading-relaxed">{alt.communityMultiplierImpact}</p>
        </div>
      </div>

      {/* Action Steps */}
      <div className="space-y-1.5 pt-1">
        <span className="text-xs font-bold text-white block">Practical Action Steps:</span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          {alt.actionSteps.map((step, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-300"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>{step}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
