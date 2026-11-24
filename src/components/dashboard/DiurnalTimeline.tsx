import React from 'react'
import { Clock, Sun } from 'lucide-react'
import type { HourlyAQIForecast } from '../../types'
import { getCategoryBadgeColor } from '../../services/airQualityService'

interface DiurnalTimelineProps {
  hourlyForecast: HourlyAQIForecast[]
}

export const DiurnalTimeline: React.FC<DiurnalTimelineProps> = ({ hourlyForecast }) => {
  return (
    <div className="space-y-3">
      {/* Header and Legend */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>24-Hour Clean Air Windows (Diurnal Thermal Cycles)</span>
          </h2>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Hourly smog forecast showing when to seal windows vs when sunlight lifts the pollution lid.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-[11px]">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-slate-300 font-medium">Safe Window (12:30–3:30 PM)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            <span className="text-slate-300 font-medium">Peak Morning Smog</span>
          </div>
        </div>
      </div>

      {/* Hourly Timeline Strip (Clean open scrollable layout) */}
      <div className="flex sm:grid sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-2 overflow-x-auto pb-1 scrollbar-thin snap-x snap-mandatory sm:snap-none sm:overflow-visible">
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
              className={`shrink-0 w-24 sm:w-auto snap-center p-2.5 rounded-xl border text-center transition-all ${
                hour.isOptimalVentilationWindow
                  ? 'border-emerald-500/70 bg-emerald-950/30 shadow-md shadow-emerald-950/20 ring-1 ring-emerald-500/30'
                  : hour.isPeakSmogDanger
                  ? 'border-rose-900/50 bg-rose-950/20'
                  : 'border-slate-800/60 bg-slate-900/30'
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

      {/* Actionable Rule of Thumb Strip */}
      <div className="flex items-start gap-2.5 text-xs text-slate-300 pt-1">
        <Sun className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed text-slate-400">
          <strong className="text-slate-200">Winter Ventilation Golden Rule:</strong> Never air out your house early in the morning (before 11:30 AM). Opening windows for 20–30 minutes between 1:00 PM and 3:00 PM flushes stuffy indoor air while taking in the cleanest outdoor air of the day.
        </p>
      </div>
    </div>
  )
}
