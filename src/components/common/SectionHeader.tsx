import React from 'react'
import type { LucideIcon } from 'lucide-react'

interface SectionHeaderProps {
  icon: LucideIcon
  title: string
  subtitle: string
  action?: React.ReactNode
  iconColor?: string
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  icon: Icon,
  title,
  subtitle,
  action,
  iconColor = 'text-cyan-400',
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border border-slate-800 bg-slate-900/90 shadow-xl">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <Icon className={`w-5 h-5 ${iconColor}`} />
          <h1 className="text-xl sm:text-2xl font-extrabold text-white">{title}</h1>
        </div>
        <p className="text-xs sm:text-sm text-slate-300">{subtitle}</p>
      </div>

      {action && <div className="self-start sm:self-center">{action}</div>}
    </div>
  )
}
