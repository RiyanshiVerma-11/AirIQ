import React from 'react'
import { ChevronDown, ChevronUp, Shield, CheckCircle2 } from 'lucide-react'
import type { DIYHackGuide } from '../../constants/hacks'

interface DIYHackAccordionProps {
  hack: DIYHackGuide
  isExpanded: boolean
  onToggle: () => void
}

export const DIYHackAccordion: React.FC<DIYHackAccordionProps> = ({
  hack,
  isExpanded,
  onToggle,
}) => {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 overflow-hidden transition-all">
      <button
        type="button"
        onClick={onToggle}
        className="w-full p-5 text-left flex items-start sm:items-center justify-between gap-4 hover:bg-slate-850/50 transition-colors cursor-pointer"
      >
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2 py-0.5 text-[10px] font-bold rounded uppercase bg-cyan-950 text-cyan-300 border border-cyan-800">
              {hack.tag}
            </span>
            <h3 className="text-base font-bold text-white">{hack.title}</h3>
            <span className="text-xs text-emerald-400 font-semibold">
              ~${hack.estimatedCostUsd} Build
            </span>
          </div>
          <p className="text-xs text-slate-400">{hack.subtitle}</p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="hidden sm:inline-block text-xs font-mono text-cyan-400">
            {hack.effectivenessRating}
          </span>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-slate-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-slate-400" />
          )}
        </div>
      </button>

      {isExpanded && (
        <div className="p-5 pt-0 border-t border-slate-800/80 space-y-4 text-xs sm:text-sm animate-in fade-in duration-200">
          {/* Scientific Mechanism */}
          <div className="p-3.5 rounded-xl bg-indigo-950/20 border border-indigo-900/40 space-y-1">
            <span className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5" />
              The Aerosol Physics Mechanism:
            </span>
            <p className="text-slate-300 leading-relaxed text-xs">{hack.scientificMechanism}</p>
          </div>

          {/* Materials List */}
          <div className="space-y-2">
            <span className="font-bold text-white text-xs block">Required Materials:</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {hack.materialsNeeded.map((mat, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-300"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>{mat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Step by Step Instructions */}
          <div className="space-y-2">
            <span className="font-bold text-white text-xs block">Step-by-Step Execution:</span>
            <ol className="space-y-2 text-xs">
              {hack.stepByStepInstructions.map((step, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 text-slate-300 leading-relaxed"
                >
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-cyan-600 text-white font-bold text-[10px] shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Pro Tips & What to Avoid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-2">
            <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-900/40 space-y-1">
              <span className="font-bold text-emerald-300 block">💡 Pro Tips:</span>
              <ul className="list-disc list-inside space-y-1 text-slate-300">
                {hack.proTips.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </div>

            <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-900/40 space-y-1">
              <span className="font-bold text-rose-300 block">⚠️ What to Avoid:</span>
              <ul className="list-disc list-inside space-y-1 text-slate-300">
                {hack.whatToAvoid.map((avoid, i) => (
                  <li key={i}>{avoid}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
