import React from 'react'
import { Wind, Clock, Shield, Sparkles, Flame, Users, ClipboardCheck } from 'lucide-react'
import type { AirQualityData } from '../types'
import { getCategoryBadgeColor } from '../services/airQualityService'

interface BottomDockNavProps {
  activeTab: string
  onSelectTab: (tabId: string) => void
  airQualityData?: AirQualityData | null
}

interface DockItem {
  id: string
  label: string
  shortLabel: string
  icon: React.ComponentType<{ className?: string }>
  isCenterpiece?: boolean
  badgeCount?: number
}

export const BottomDockNav: React.FC<BottomDockNavProps> = ({
  activeTab,
  onSelectTab,
  airQualityData,
}) => {
  const badgeStyle = airQualityData ? getCategoryBadgeColor(airQualityData.category) : null

  const dockItems: DockItem[] = [
    {
      id: 'dashboard',
      label: 'Smog Radar',
      shortLabel: 'Radar',
      icon: Wind,
    },
    {
      id: 'routine',
      label: 'Routine',
      shortLabel: 'Routine',
      icon: Clock,
    },
    {
      id: 'iaq-lab',
      label: 'IAQ Lab',
      shortLabel: 'IAQ Lab',
      icon: Shield,
    },
    {
      id: 'aura-ai',
      label: 'Aura AI',
      shortLabel: 'Aura AI',
      icon: Sparkles,
      isCenterpiece: true,
    },
    {
      id: 'swaps',
      label: 'Swaps',
      shortLabel: 'Swaps',
      icon: Flame,
    },
    {
      id: 'community',
      label: 'Watch',
      shortLabel: 'Watch',
      icon: Users,
    },
    {
      id: 'action-plan',
      label: 'Plan',
      shortLabel: 'Plan',
      icon: ClipboardCheck,
    },
  ]

  return (
    <nav
      aria-label="Mobile Bottom Navigation Dock"
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-slate-950/92 backdrop-blur-xl border-t border-slate-800/90 shadow-[0_-8px_32px_rgba(0,0,0,0.6)] px-1 pt-1.5 pb-safe select-none"
    >
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {dockItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id

          if (item.isCenterpiece) {
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className="relative -top-3.5 flex flex-col items-center group cursor-pointer focus:outline-none"
                aria-label={item.label}
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-200 shadow-lg ${
                    isActive
                      ? 'bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 text-white scale-110 shadow-cyan-500/40 ring-2 ring-cyan-400'
                      : 'bg-gradient-to-tr from-slate-900 to-slate-800 text-cyan-300 border border-slate-700 shadow-slate-950/80 group-hover:scale-105 group-hover:text-white'
                  }`}
                >
                  <Sparkles className="w-6 h-6 animate-pulse" />
                  <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400"></span>
                  </span>
                </div>
                <span
                  className={`text-[10px] font-bold mt-1 tracking-tight transition-colors ${
                    isActive ? 'text-cyan-300' : 'text-slate-400 group-hover:text-slate-200'
                  }`}
                >
                  {item.shortLabel}
                </span>
              </button>
            )
          }

          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className="flex-1 py-1 flex flex-col items-center justify-center relative group cursor-pointer focus:outline-none"
              aria-label={item.label}
            >
              <div
                className={`relative p-1.5 rounded-xl transition-all duration-150 ${
                  isActive
                    ? 'bg-cyan-500/15 text-cyan-300 scale-105'
                    : 'text-slate-400 group-hover:text-slate-200 group-active:scale-95'
                }`}
              >
                <Icon className="w-5 h-5" />

                {/* Live AQI indicator badge for radar */}
                {item.id === 'dashboard' && badgeStyle && (
                  <span
                    className="absolute top-1 right-1 w-2 h-2 rounded-full border border-slate-950"
                    style={{ backgroundColor: badgeStyle.hex }}
                  />
                )}
              </div>

              <span
                className={`text-[10px] font-medium tracking-tight mt-0.5 transition-colors leading-none ${
                  isActive ? 'text-cyan-300 font-bold' : 'text-slate-400 group-hover:text-slate-300'
                }`}
              >
                {item.shortLabel}
              </span>

              {/* Active glow indicator pill */}
              {isActive && (
                <span className="w-4 h-0.5 rounded-full bg-cyan-400 mt-1 shadow-sm shadow-cyan-400" />
              )}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
