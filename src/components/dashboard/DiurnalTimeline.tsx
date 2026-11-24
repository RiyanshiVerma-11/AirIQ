import React from 'react'
import { Clock, Sun } from 'lucide-react'
import type { HourlyAQIForecast } from '../../types'
import { getCategoryBadgeColor } from '../../services/airQualityService'

interface DiurnalTimelineProps {
  hourlyForecast: HourlyAQIForecast[]
}

export const DiurnalTimeline: React.FC<DiurnalTimelineProps> = ({ hourlyForecast }) => {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 sm:p-6 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyan-400" />
            <span>When is the Air Cleanest Today? (24-Hour Schedule)</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Hourly smog forecast showing when to keep windows sealed vs. when to air out your home.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-emerald-500" />
            <span className="text-slate-300 font-medium">Fresh Air Window (12:30–3:30 PM)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-rose-600" />
            <span className="text-slate-300 font-medium">Morning Heavy Smog</span>
          </div>
        </div>
      </div>

      {/* Hourly Timeline Grid */}
      <div className="flex sm:grid sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-2 overflow-x-auto pb-2 scrollbar-thin snap-x snap-mandatory sm:snap-none sm:overflow-visible">
        {hourlyForecast.slice(0, 12).map((hour, idx) => {
          const hBadge = getCategoryBadgeColor(
            hour.aqi <= 50
              ? 'Good'
              : hour.aqi <= 100
              ? 'Moderate'
              : hour.aqi <= 150
              ? 'Unhealthy for Sensitive Groups'
              : hour.aqi <= 200
              ? 'Unhealthy'
              : hour.aqi <= 300
              ? 'Very Unhealthy'
              : 'Hazardous'
          )

          return (
            <div
              key={idx}
              className={`shrink-0 w-24 sm:w-auto snap-center p-2.5 rounded-2xl border text-center transition-all ${
                hour.isOptimalVentilationWindow
                  ? 'border-emerald-500/80 bg-emerald-950/40 shadow-lg shadow-emerald-950/30 ring-1 ring-emerald-500/40'
                  : hour.isPeakSmogDanger
                  ? 'border-rose-900/60 bg-rose-950/20'
                  : 'border-slate-800 bg-slate-950/60'
              }`}
            >
              <div className="text-[11px] font-semibold text-slate-400 mb-1">{hour.time}</div>
              <div
                className="text-base font-black tracking-tight mb-0.5"
                style={{ color: hBadge.hex }}
              >
                {hour.aqi}
              </div>
              <div className="text-[10px] text-slate-400 mb-1.5">{hour.pm25} µg/m³</div>

              {hour.isOptimalVentilationWindow ? (
                <span className="inline-block px-1.5 py-0.5 text-[9px] font-bold uppercase rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Open Windows
                </span>
              ) : hour.isPeakSmogDanger ? (
                <span className="inline-block px-1.5 py-0.5 text-[9px] font-bold uppercase rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  Keep Sealed
                </span>
              ) : (
                <span className="inline-block px-1.5 py-0.5 text-[9px] text-slate-500 uppercase">
                  Moderate
                </span>
              )}
            </div>
          )
        })}
      </div>

      <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3 text-xs text-slate-300">
        <Sun className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-white">Everyday Rule of Thumb:</strong> Never air out your house early in the morning in winter (before 11:30 AM). Wait until the afternoon sun warms up the city. Opening windows for just 20–30 minutes around 1:30 PM flushes out stuffy indoor air while taking in the cleanest outdoor air of the day.
        </div>
      </div>
    </div>
  )
}
