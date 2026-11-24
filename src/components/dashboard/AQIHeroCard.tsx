import React from 'react'
import {
  Thermometer,
  Droplets,
  Wind,
  Clock,
  Info,
  ArrowRight,
  ShieldAlert,
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
  const whoRatio = Math.round((data.pm25 / 15) * 10) / 10

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
    <div className="relative pt-2 pb-4">
      {/* Ambient Atmospheric Glow directly on canvas */}
      <div
        className="absolute top-1/2 left-1/3 -translate-y-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full opacity-15 blur-[100px] pointer-events-none"
        style={{ backgroundColor: badge.hex }}
      />

      <div className="relative z-10 space-y-5">
        {/* Top Location & Category Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="text-3xl">{data.location.flag}</span>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                  {data.location.name}
                </h1>
                <CategoryBadge category={data.category} />
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                {data.location.region}, {data.location.country} • Sensor live feed
              </p>
            </div>
          </div>

          {/* Timestamp */}
          <div className="flex items-center gap-1.5 text-xs text-slate-400 bg-slate-900/40 border border-slate-800/60 px-3 py-1.5 rounded-xl">
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            <span>Updated {new Date(data.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        </div>

        {/* Hero Splash: Direct AQI Score & Meaning without boxed walls */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Main Giant AQI Display */}
          <div className="lg:col-span-4 flex items-baseline gap-4 sm:gap-6">
            <div className="flex flex-col">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                Current Air Quality
              </span>
              <div className="flex items-baseline gap-2">
                <span
                  className="text-7xl sm:text-8xl font-black tracking-tight leading-none drop-shadow-md"
                  style={{ color: badge.hex }}
                >
                  {data.aqi}
                </span>
                <span className="text-base font-bold text-slate-400">AQI</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-300 mt-2 font-medium">
                <span>Fine Soot (PM2.5):</span>
                <strong className="text-white">{data.pm25} µg/m³</strong>
              </div>
            </div>

            {/* WHO Comparison Ribbon */}
            <div className="border-l border-slate-800/80 pl-4 py-1 flex flex-col justify-center">
              <span className="text-[10px] uppercase font-bold text-slate-400">vs WHO Standard</span>
              <div className="text-xl sm:text-2xl font-black text-rose-400">
                {whoRatio}x
              </div>
              <span className="text-[10px] text-slate-400">above safe limit</span>
            </div>
          </div>

          {/* Plain Human Meaning Splash */}
          <div className="lg:col-span-8 flex flex-col justify-center space-y-2 border-t lg:border-t-0 lg:border-l border-slate-800/60 pt-4 lg:pt-0 lg:pl-6">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400">
              <ShieldAlert className="w-4 h-4 text-cyan-400" />
              <span>What this means for your family right now</span>
            </div>
            <p className="text-base sm:text-lg text-slate-100 font-medium leading-relaxed">
              {plainMeaning}
            </p>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <button
                onClick={() => onNavigateTab('routine')}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow-lg shadow-cyan-950/40 active:scale-98 transition-all cursor-pointer"
              >
                <span>View Family Routine</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onNavigateTab('iaq-lab')}
                className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800/60 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700/60 text-xs font-medium active:scale-98 transition-all cursor-pointer"
              >
                <span>Indoor Air Hacks</span>
              </button>
            </div>
          </div>
        </div>

        {/* Ambient Environmental Ticker (Temp, Humidity, Wind) */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-slate-400 pt-2 border-t border-slate-800/40">
          <span className="flex items-center gap-1.5 font-medium text-slate-300">
            <Thermometer className="w-3.5 h-3.5 text-cyan-400" />
            {data.temperature}°C Temperature
          </span>
          <span className="flex items-center gap-1.5 font-medium text-slate-300">
            <Droplets className="w-3.5 h-3.5 text-blue-400" />
            {data.humidity}% Humidity
          </span>
          <span className="flex items-center gap-1.5 font-medium text-slate-300">
            <Wind className="w-3.5 h-3.5 text-indigo-400" />
            {data.windSpeed} km/h Wind Speed
          </span>
          <span className="flex items-center gap-1.5 text-slate-400">
            <Info className="w-3.5 h-3.5 text-amber-400" />
            Safe WHO limit is 15 µg/m³
          </span>
        </div>
      </div>
    </div>
  )
}
