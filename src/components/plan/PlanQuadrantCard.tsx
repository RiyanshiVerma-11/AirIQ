import React from 'react'
import type { LucideIcon } from 'lucide-react'

interface PlanQuadrantCardProps {
  icon: LucideIcon
  title: string
  color: 'rose' | 'cyan' | 'amber' | 'emerald'
  items: React.ReactNode[]
}

export const PlanQuadrantCard: React.FC<PlanQuadrantCardProps> = ({
  icon: Icon,
  title,
  color,
  items,
}) => {
  const colorMap = {
    rose: {
      border: 'border-rose-900/30',
      titleColor: 'text-rose-400 print:text-red-700',
      bg: 'bg-rose-950/10',
    },
    cyan: {
      border: 'border-cyan-900/30',
      titleColor: 'text-cyan-400 print:text-blue-700',
      bg: 'bg-cyan-950/10',
    },
    amber: {
      border: 'border-amber-900/30',
      titleColor: 'text-amber-400 print:text-amber-800',
      bg: 'bg-amber-950/10',
    },
    emerald: {
      border: 'border-emerald-900/30',
      titleColor: 'text-emerald-400 print:text-emerald-800',
      bg: 'bg-emerald-950/10',
    },
  }

  const c = colorMap[color]

  return (
    <div
      className={`p-4 rounded-xl border ${c.border} ${c.bg} print:border-gray-400 print:bg-gray-50 space-y-2`}
    >
      <h3
        className={`text-xs font-bold uppercase tracking-wider ${c.titleColor} flex items-center gap-1.5`}
      >
        <Icon className="w-4 h-4" />
        {title}
      </h3>
      <ul className="text-xs space-y-1.5 list-disc list-inside text-slate-300 print:text-black">
        {items.map((item, idx) => (
          <li key={idx} className="leading-relaxed">{item}</li>
        ))}
      </ul>
    </div>
  )
}
