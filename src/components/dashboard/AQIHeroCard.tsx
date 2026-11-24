import React from 'react'
import {
  Thermometer,
  Droplets,
  Wind,
  Clock,
  Info,
  ArrowRight,
} from 'lucide-react'
import type { AirQualityData } from '../../types'
import { getCategoryBadgeColor } from '../../services/airQualityService'
import { CategoryBadge } from '../common/CategoryBadge'

interface AQIHeroCardProps {
  data: AirQualityData
  onNavigateTab: (tabId: string) => void
}

export const AQIHeroCard: React.FC<AQIHeroCardProps> = ({ data, onNavigateTab }) => {
  const badge = getCategoryBadgeColor(data.category)

  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 p-6 sm:p-8 shadow-2xl">
      <div
        className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ backgroundColor: badge.hex }}
      />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-2xl">{data.location.flag}</span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {data.location.name}
            </h1>
            <span className="text-slate-400 text-sm">
              ({data.location.region}, {data.location.country})
            </span>
            <CategoryBadge category={data.category} />
          </div>

          <p className="text-slate-300 text-sm leading-relaxed">
            {data.location.typicalWinterPhenomenon}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
            <span className="flex items-center gap-1.5">
              <Thermometer className="w-3.5 h-3.5 text-cyan-400" />
              {data.temperature}°C Temp
            </span>
            <span className="flex items-center gap-1.5">
              <Droplets className="w-3.5 h-3.5 text-blue-400" />
              {data.humidity}% Humidity
            </span>
            <span className="flex items-center gap-1.5">
              <Wind className="w-3.5 h-3.5 text-indigo-400" />
              {data.windSpeed} km/h Wind
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              Updated: {new Date(data.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>

        {/* Master AQI Dial */}
        <div className="flex items-center gap-4 bg-slate-950/60 border border-slate-800/80 rounded-2xl p-5 sm:p-6 backdrop-blur-md">
          <div className="text-center">
            <span className="text-xs uppercase tracking-wider font-semibold text-slate-400 block mb-1">
              US EPA Air Quality Index
            </span>
            <div className="flex items-baseline justify-center gap-1">
              <span
                className="text-5xl sm:text-6xl font-black tracking-tight"
                style={{ color: badge.hex }}
              >
                {data.aqi}
              </span>
              <span className="text-sm font-bold text-slate-500">AQI</span>
            </div>
            <div className="mt-2 text-xs font-medium text-slate-300">
              PM2.5: <strong className="text-white">{data.pm25} µg/m³</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Navigation Footer */}
      <div className="mt-6 pt-5 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Info className="w-4 h-4 text-cyan-400" />
          <span>
            WHO 24-hr guideline for PM2.5 is 15 µg/m³. Current air is{' '}
            <strong>{Math.round((data.pm25 / 15) * 10) / 10}x</strong> above safe limits.
          </span>
        </div>

        <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-2">
          <button
            onClick={() => onNavigateTab('routine')}
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shadow-md active:scale-98 transition-all cursor-pointer"
          >
            <span>Build Family Routine</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onNavigateTab('iaq-lab')}
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold active:scale-98 transition-all cursor-pointer"
          >
            <span>Test IAQ Hacks</span>
          </button>
        </div>
      </div>
    </div>
  )
}
