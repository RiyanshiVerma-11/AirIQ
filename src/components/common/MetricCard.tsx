import React from 'react'
import type { LucideIcon } from 'lucide-react'

interface MetricCardProps {
  label: string
  value: string | number
  unit?: string
  description?: string
  icon?: LucideIcon
  accentColor?: 'cyan' | 'emerald' | 'rose' | 'amber' | 'indigo' | 'blue'
  tag?: string
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  unit,
  description,
  icon: Icon,
  accentColor = 'cyan',
  tag,
}) => {
  const colorMap = {
    cyan: {
      border: 'border-cyan-800/40',
      bg: 'from-cyan-950/30 to-slate-900/80',
      text: 'text-cyan-400',
      tagBg: 'bg-cyan-950 text-cyan-300',
    },
    emerald: {
      border: 'border-emerald-800/40',
      bg: 'from-emerald-950/30 to-slate-900/80',
      text: 'text-emerald-400',
      tagBg: 'bg-emerald-950 text-emerald-300',
    },
    rose: {
      border: 'border-rose-800/40',
      bg: 'from-rose-950/30 to-slate-900/80',
      text: 'text-rose-400',
      tagBg: 'bg-rose-950 text-rose-300',
    },
    amber: {
      border: 'border-amber-800/40',
      bg: 'from-amber-950/30 to-slate-900/80',
      text: 'text-amber-400',
      tagBg: 'bg-amber-950 text-amber-300',
    },
    indigo: {
      border: 'border-indigo-800/40',
      bg: 'from-indigo-950/30 to-slate-900/80',
      text: 'text-indigo-400',
      tagBg: 'bg-indigo-950 text-indigo-300',
    },
    blue: {
      border: 'border-blue-800/40',
      bg: 'from-blue-950/30 to-slate-900/80',
      text: 'text-blue-400',
      tagBg: 'bg-blue-950 text-blue-300',
    },
  }

  const c = colorMap[accentColor]

  return (
    <div className={`p-4 rounded-xl border ${c.border} bg-gradient-to-br ${c.bg}`}>
      <div className="flex items-center justify-between mb-1">
        <span className={`text-[11px] font-bold uppercase tracking-wider ${c.text} flex items-center gap-1.5`}>
          {Icon && <Icon className="w-3.5 h-3.5" />}
          {label}
        </span>
        {tag && (
          <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${c.tagBg}`}>
            {tag}
          </span>
        )}
      </div>

      <div className="flex items-baseline gap-1.5">
        <span className="text-2xl sm:text-3xl font-extrabold text-white">{value}</span>
        {unit && <span className="text-xs font-semibold text-slate-400">{unit}</span>}
      </div>

      {description && (
        <span className="text-xs text-slate-300 mt-1 block leading-relaxed">{description}</span>
      )}
    </div>
  )
}
