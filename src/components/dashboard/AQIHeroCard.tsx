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

  // Plain English explanation of the current score
  let plainMeaning = 'Air quality is acceptable. Normal outdoor activities are fine.'
  if (data.aqi > 300) {
    plainMeaning = 'Severe smog alert. The air outside is toxic. Keep all family members indoors and run air filters.'
  } else if (data.aqi > 200) {
    plainMeaning = 'Very high smog levels. Avoid outdoor workouts or play. Wear an N95 mask if you must go out.'
  } else if (data.aqi > 100) {
    plainMeaning = 'Unhealthy for sensitive people. Children, elderly members, and asthma sufferers should take precautions.'
  } else if (data.aqi > 50) {
    plainMeaning = 'Moderate air quality. Safe for most people, but sensitive individuals should monitor how they feel.'
  }

  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 p-6 sm:p-8 shadow-2xl">
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

          {/* Plain English Meaning */}
          <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1">
            <div className="text-[11px] font-bold uppercase tracking-wider text-cyan-400">
              What This Means For Your Family Right Now:
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
              {plainMeaning}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
            <span className="flex items-center gap-1.5">
              <Thermometer className="w-3.5 h-3.5 text-cyan-400" />
              {data.temperature}°C Temperature
            </span>
            <span className="flex items-center gap-1.5">
              <Droplets className="w-3.5 h-3.5 text-blue-400" />
              {data.humidity}% Humidity
            </span>
            <span className="flex items-center gap-1.5">
              <Wind className="w-3.5 h-3.5 text-indigo-400" />
              {data.windSpeed} km/h Wind Speed
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              Sensor Time: {new Date(data.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>

        {/* Master AQI Dial */}
        <div className="flex items-center gap-4 bg-slate-950/70 border border-slate-800/80 rounded-3xl p-5 sm:p-6 backdrop-blur-md shrink-0">
          <div className="text-center">
            <span className="text-[11px] uppercase tracking-wider font-bold text-slate-400 block mb-1">
              Air Quality Score (0–500)
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
              Fine Soot (PM2.5): <strong className="text-white">{data.pm25} µg/m³</strong>
            </div>
            <div className="text-[10px] text-slate-500 mt-0.5">
              (Safe WHO Limit: 15 µg/m³)
            </div>
          </div>
        </div>
      </div>

      {/* Quick Navigation Footer */}
      <div className="mt-6 pt-5 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Info className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>
            The air outside is currently{' '}
            <strong className="text-rose-300 font-bold">{Math.round((data.pm25 / 15) * 10) / 10}x</strong> above the World Health Organization's safe limit.
          </span>
        </div>

        <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-2">
          <button
            onClick={() => onNavigateTab('routine')}
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow-md active:scale-98 transition-all cursor-pointer"
          >
            <span>View Family Routine</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onNavigateTab('iaq-lab')}
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold active:scale-98 transition-all cursor-pointer"
          >
            <span>Indoor Air Hacks</span>
          </button>
        </div>
      </div>
    </div>
  )
}
