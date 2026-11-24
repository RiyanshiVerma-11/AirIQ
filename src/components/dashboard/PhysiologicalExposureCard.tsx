import React from 'react'
import { Cigarette, Activity, Layers } from 'lucide-react'
import type { AirQualityData } from '../../types'

interface PhysiologicalExposureCardProps {
  data: AirQualityData
}

export const PhysiologicalExposureCard: React.FC<PhysiologicalExposureCardProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {/* Cigarette Equivalence */}
      <div className="rounded-xl border border-rose-900/40 bg-gradient-to-b from-rose-950/20 to-slate-900/60 p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
            <Cigarette className="w-4 h-4" />
            Passive Cigarette Burden
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded bg-rose-900/40 text-rose-300 font-mono">
            Berkeley Earth Metric
          </span>
        </div>

        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-3xl sm:text-4xl font-extrabold text-rose-300">
            ~{data.cigarettesEquivalent}
          </span>
          <span className="text-xs text-slate-400 font-medium">cigarettes / day</span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed mb-3">
          Inhaling outdoor air today delivers pulmonary oxidative stress equivalent to smoking{' '}
          <strong className="text-rose-300">{data.cigarettesEquivalent}</strong> cigarettes over 24
          hours (based on 22 µg/m³ PM2.5 = 1 cigarette).
        </p>

        <div className="flex items-center gap-1 overflow-hidden opacity-85">
          {Array.from({ length: Math.min(12, Math.ceil(data.cigarettesEquivalent)) }).map((_, i) => (
            <span key={i} className="text-sm" title="Passive Cigarette Equivalent">
              🚬
            </span>
          ))}
          {data.cigarettesEquivalent > 12 && (
            <span className="text-xs text-rose-400 font-bold ml-1">
              +{Math.round(data.cigarettesEquivalent - 12)} more
            </span>
          )}
        </div>
      </div>

      {/* Alveolar Lung Deposition */}
      <div className="rounded-xl border border-indigo-900/40 bg-gradient-to-b from-indigo-950/20 to-slate-900/60 p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
            <Activity className="w-4 h-4" />
            Alveolar Lung Deposition
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-900/40 text-indigo-300 font-mono">
            ICRP Respiratory Model
          </span>
        </div>

        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-3xl sm:text-4xl font-extrabold text-indigo-300">
            {data.lungParticulateRetentionMgPerDay}
          </span>
          <span className="text-xs text-slate-400 font-medium">mg particulates / day</span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed mb-2">
          Based on average human resting inhalation (15,000 L of air/day), approx. 58% of fine sub-micron
          PM2.5 particles bypass upper bronchial cilia and lodge permanently in deep alveolar gas-exchange sacs.
        </p>

        <div className="text-[11px] text-cyan-300/90 font-medium">
          💡 <em>Wearing a sealed N95 respirator reduces deep lung mass deposition by over 95%.</em>
        </div>
      </div>

      {/* Atmospheric Inversion Risk */}
      <div className="rounded-xl border border-amber-900/40 bg-gradient-to-b from-amber-950/20 to-slate-900/60 p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
            <Layers className="w-4 h-4" />
            Atmospheric Inversion Lid
          </span>
          <span
            className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
              data.inversionRisk === 'Extreme'
                ? 'bg-red-900/60 text-red-300'
                : data.inversionRisk === 'High'
                ? 'bg-amber-900/60 text-amber-300'
                : 'bg-blue-900/60 text-blue-300'
            }`}
          >
            {data.inversionRisk} Risk
          </span>
        </div>

        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-3xl sm:text-4xl font-extrabold text-amber-300">
            {data.boundaryLayerHeightM}m
          </span>
          <span className="text-xs text-slate-400 font-medium">mixing height</span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">{data.inversionDescription}</p>
      </div>
    </div>
  )
}
