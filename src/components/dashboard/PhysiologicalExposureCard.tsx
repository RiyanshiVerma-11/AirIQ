import React from 'react'
import { Cigarette, Shield, Sun } from 'lucide-react'
import type { AirQualityData } from '../../types'

interface PhysiologicalExposureCardProps {
  data: AirQualityData
}

export const PhysiologicalExposureCard: React.FC<PhysiologicalExposureCardProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {/* 1. What Breathing Outside Feels Like */}
      <div className="rounded-2xl border border-rose-900/40 bg-gradient-to-b from-rose-950/20 to-slate-900/60 p-5 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
            <Cigarette className="w-4 h-4" />
            Breathing Outside All Day
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded bg-rose-900/40 text-rose-300 font-semibold">
            Health Impact
          </span>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-3xl sm:text-4xl font-extrabold text-rose-300">
            ~{data.cigarettesEquivalent}
          </span>
          <span className="text-xs text-slate-400 font-medium">cigarettes / day equivalent</span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Breathing today's outdoor smog all day puts the same stress on your lungs as passively smoking{' '}
          <strong className="text-rose-300">{data.cigarettesEquivalent}</strong> cigarettes.
        </p>

        <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 text-[11px] text-emerald-300">
          💡 <strong>Good news:</strong> Inside your home with closed windows and a clean air purifier, this drops to <strong>less than 1 cigarette</strong>.
        </div>

        <div className="flex items-center gap-1 overflow-hidden opacity-85">
          {Array.from({ length: Math.min(10, Math.ceil(data.cigarettesEquivalent)) }).map((_, i) => (
            <span key={i} className="text-sm" title="Cigarette Equivalent">
              🚬
            </span>
          ))}
          {data.cigarettesEquivalent > 10 && (
            <span className="text-xs text-rose-400 font-bold ml-1">
              +{Math.round(data.cigarettesEquivalent - 10)} more
            </span>
          )}
        </div>
      </div>

      {/* 2. Protecting Your Family's Lungs */}
      <div className="rounded-2xl border border-indigo-900/40 bg-gradient-to-b from-indigo-950/20 to-slate-900/60 p-5 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
            <Shield className="w-4 h-4" />
            Your Family's Lung Shield
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-900/40 text-indigo-300 font-semibold">
            Deep Lungs
          </span>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-3xl sm:text-4xl font-extrabold text-indigo-300">
            {data.lungParticulateRetentionMgPerDay} mg
          </span>
          <span className="text-xs text-slate-400 font-medium">micro-dust / day inhaled</span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Winter smog contains ultra-fine soot particles that penetrate deep into children's and adults' lower breathing passages.
        </p>

        <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 text-[11px] text-cyan-300">
          🛡️ <strong>What stops it:</strong> Standard cloth masks do not block fine smog soot. Wearing a fitted <strong>N95 respirator</strong> blocks over 95% of this dust.
        </div>
      </div>

      {/* 3. When Does Air Clear Up? */}
      <div className="rounded-2xl border border-amber-900/40 bg-gradient-to-b from-amber-950/20 to-slate-900/60 p-5 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
            <Sun className="w-4 h-4" />
            Daily Smog Cycle
          </span>
          <span
            className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
              data.inversionRisk === 'Extreme'
                ? 'bg-red-900/60 text-red-300'
                : data.inversionRisk === 'High'
                ? 'bg-amber-900/60 text-amber-300'
                : 'bg-emerald-900/60 text-emerald-300'
            }`}
          >
            {data.inversionRisk === 'High' || data.inversionRisk === 'Extreme' ? 'Morning Trap' : 'Clearing Up'}
          </span>
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-3xl sm:text-4xl font-extrabold text-amber-300">
            {data.boundaryLayerHeightM}m
          </span>
          <span className="text-xs text-slate-400 font-medium">air ceiling height</span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Cold night temperatures act like a "lid" over the city, trapping exhaust smoke near street level between <strong>6:00 AM and 9:30 AM</strong>.
        </p>

        <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 text-[11px] text-amber-300">
          ☀️ <strong>Best time:</strong> Around <strong>1:00 PM – 3:30 PM</strong>, sunlight lifts this ceiling to over 850m, dispersing pollution. That is the safest time to air out rooms.
        </div>
      </div>
    </div>
  )
}
