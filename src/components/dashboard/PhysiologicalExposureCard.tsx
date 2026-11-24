import React from 'react'
import { Cigarette, Shield, Sun } from 'lucide-react'
import type { AirQualityData } from '../../types'

interface PhysiologicalExposureCardProps {
  data: AirQualityData
}

export const PhysiologicalExposureCard: React.FC<PhysiologicalExposureCardProps> = ({ data }) => {
  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between text-xs">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
          <Cigarette className="w-3.5 h-3.5 text-rose-400" />
          <span>Real-World Lung Impact & Atmospheric Trap</span>
        </h2>
        <span className="text-[11px] text-slate-500">Physiological equivalent for an active adult</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* 1. Cigarette Equivalence */}
        <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/60 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
              <Cigarette className="w-3.5 h-3.5" />
              Outdoor Smoke Stress
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-rose-950/60 text-rose-300 font-semibold border border-rose-900/40">
              Toxic Equivalence
            </span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-black text-rose-300">
              ~{data.cigarettesEquivalent}
            </span>
            <span className="text-xs text-slate-400 font-medium">cigarettes / day</span>
          </div>

          <div className="flex items-center gap-1 overflow-hidden opacity-90">
            {Array.from({ length: Math.min(8, Math.ceil(data.cigarettesEquivalent)) }).map((_, i) => (
              <span key={i} className="text-xs" title="Cigarette Equivalent">
                🚬
              </span>
            ))}
            {data.cigarettesEquivalent > 8 && (
              <span className="text-[11px] text-rose-400 font-bold ml-1">
                +{Math.round(data.cigarettesEquivalent - 8)} more
              </span>
            )}
          </div>

          <p className="text-xs text-slate-300 leading-snug">
            Breathing today's smog all day puts the same stress on your lungs as passively smoking{' '}
            <strong className="text-rose-300">{data.cigarettesEquivalent}</strong> cigarettes.
          </p>

          <div className="text-[11px] text-emerald-300 pt-1.5 border-t border-slate-800/60">
            💡 <strong>Indoor sanctuary:</strong> With closed windows and an air purifier, this drops to <strong>&lt;1 cigarette</strong>.
          </div>
        </div>

        {/* 2. Deep Lung Retained Dust */}
        <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/60 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5" />
              Lower Airway Inhalation
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-950/60 text-indigo-300 font-semibold border border-indigo-900/40">
              Micro-Soot
            </span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-black text-indigo-300">
              {data.lungParticulateRetentionMgPerDay} mg
            </span>
            <span className="text-xs text-slate-400 font-medium">toxic dust / day</span>
          </div>

          <p className="text-xs text-slate-300 leading-snug">
            Microscopic soot smaller than 2.5 micrometers bypasses nasal hairs, depositing deep in alveolar lung sacs.
          </p>

          <div className="text-[11px] text-cyan-300 pt-1.5 border-t border-slate-800/60">
            🛡️ <strong>Protection rule:</strong> Cloth masks do not filter fine soot. A fitted <strong>N95 mask</strong> blocks over 95% of inhaled particles.
          </div>
        </div>

        {/* 3. Smog Trap & Inversion Ceiling */}
        <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/60 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
              <Sun className="w-3.5 h-3.5" />
              Atmospheric Lid
            </span>
            <span
              className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase border ${
                data.inversionRisk === 'Extreme'
                  ? 'bg-rose-950/60 text-rose-300 border-rose-900/40'
                  : data.inversionRisk === 'High'
                  ? 'bg-amber-950/60 text-amber-300 border-amber-900/40'
                  : 'bg-emerald-950/60 text-emerald-300 border-emerald-900/40'
              }`}
            >
              {data.inversionRisk === 'High' || data.inversionRisk === 'Extreme' ? 'Morning Trap' : 'Clearing Up'}
            </span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-black text-amber-300">
              {data.boundaryLayerHeightM}m
            </span>
            <span className="text-xs text-slate-400 font-medium">smog ceiling height</span>
          </div>

          <p className="text-xs text-slate-300 leading-snug">
            Cold night air creates a thermal inversion "lid" over the city, trapping exhaust smoke near street level.
          </p>

          <div className="text-[11px] text-amber-300 pt-1.5 border-t border-slate-800/60">
            ☀️ <strong>Sunlight window:</strong> Around <strong>1:00 PM – 3:30 PM</strong>, heat expands the boundary layer, dispersing soot.
          </div>
        </div>
      </div>
    </div>
  )
}
