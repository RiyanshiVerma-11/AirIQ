import React from 'react'
import { Clock, Sparkles } from 'lucide-react'
import type { HourlyAQIForecast } from '../../types'
import { getCategoryBadgeColor } from '../../services/airQualityService'

interface DiurnalTimelineProps {
  hourlyForecast: HourlyAQIForecast[]
}

export const DiurnalTimeline: React.FC<DiurnalTimelineProps> = ({ hourlyForecast }) => {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyan-400" />
            24-Hour Diurnal Smog & Ventilation Timeline
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Hourly particulate concentration mapped to atmospheric thermal inversion cycles
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-emerald-500" />
            <span className="text-slate-300">Solar Ventilation Window (12:30-15:30)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-rose-600" />
            <span className="text-slate-300">Severe Inversion Peak</span>
          </div>
        </div>
      </div>

      {/* Hourly Timeline Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-2">
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
              className={`p-2.5 rounded-xl border text-center transition-all ${
                hour.isOptimalVentilationWindow
                  ? 'border-emerald-500/80 bg-emerald-950/30 shadow-lg shadow-emerald-950/30 ring-1 ring-emerald-500/40'
                  : hour.isPeakSmogDanger
                  ? 'border-rose-900/60 bg-rose-950/20'
                  : 'border-slate-800 bg-slate-950/50'
              }`}
            >
              <div className="text-[11px] font-semibold text-slate-400 mb-1">{hour.time}</div>
              <div
                className="text-base font-extrabold tracking-tight mb-0.5"
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
                  Seal Room
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

      <div className="mt-4 p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-3 text-xs text-slate-300">
        <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-white">Smart Inversion Scheduling Hack:</strong> Never open windows
          before 11:30 AM during winter. Wait until the sun heats the ground, triggering vertical
          convective updrafts that disperse stagnant night soot. Conducting a 15-minute flush
          ventilation around 13:30 PM replaces indoor CO2 with the day’s cleanest outdoor air.
        </div>
      </div>
    </div>
  )
}
