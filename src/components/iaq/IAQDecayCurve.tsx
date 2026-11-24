import React from 'react'
import { Activity, Clock } from 'lucide-react'
import type { IAQSimulationResult } from '../../types'

interface IAQDecayCurveProps {
  initialOutdoorPM25: number
  result: IAQSimulationResult
}

export const IAQDecayCurve: React.FC<IAQDecayCurveProps> = ({
  initialOutdoorPM25,
  result,
}) => {
  const c0 = initialOutdoorPM25
  const cEq = result.equilibriumIndoorPM25
  const kTotal = result.airChangesPerHourACH // total removal ACH in hr^-1

  // Generate 12 time-points across 60 minutes
  const points: { minute: number; pm25: number }[] = []
  for (let m = 0; m <= 60; m += 5) {
    const hours = m / 60
    const concentration = cEq + (c0 - cEq) * Math.exp(-kTotal * hours)
    points.push({ minute: m, pm25: Math.round(concentration * 10) / 10 })
  }

  // SVG dimensions
  const svgWidth = 460
  const svgHeight = 160
  const padLeft = 42
  const padRight = 20
  const padTop = 20
  const padBottom = 28

  const chartW = svgWidth - padLeft - padRight
  const chartH = svgHeight - padTop - padBottom

  const maxVal = Math.max(c0, 100)
  const minVal = 0

  const getX = (minute: number) => padLeft + (minute / 60) * chartW
  const getY = (pm25: number) => padTop + chartH - ((pm25 - minVal) / (maxVal - minVal)) * chartH

  // Build SVG path
  const pathD = points.reduce((acc, pt, i) => {
    const x = getX(pt.minute)
    const y = getY(pt.pm25)
    return i === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`
  }, '')

  // Area under curve path
  const areaD = `${pathD} L ${getX(60)} ${getY(0)} L ${getX(0)} ${getY(0)} Z`

  return (
    <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
      <div className="flex items-center justify-between text-xs">
        <span className="font-bold text-white flex items-center gap-1.5">
          <Activity className="w-4 h-4 text-cyan-400" />
          60-Minute Dynamic Aerosol Decay Curve
        </span>
        <span className="text-[11px] font-mono text-cyan-300">
          t_90% = {result.minutesToCleanRoom90Pct} mins
        </span>
      </div>

      <div className="w-full overflow-x-auto">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-36 select-none font-mono"
        >
          {/* Background grid lines */}
          <line
            x1={padLeft}
            y1={getY(15)}
            x2={svgWidth - padRight}
            y2={getY(15)}
            stroke="#10b981"
            strokeDasharray="4 4"
            strokeOpacity="0.4"
          />
          <text
            x={svgWidth - padRight}
            y={getY(15) - 4}
            fill="#10b981"
            fontSize="9"
            textAnchor="end"
            opacity="0.8"
          >
            WHO Safe Target (15 µg/m³)
          </text>

          {/* Area fill */}
          <path d={areaD} fill="url(#decayGradient)" opacity="0.3" />

          {/* Line curve */}
          <path
            d={pathD}
            fill="none"
            stroke="#06b6d4"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Data dots at key intervals */}
          {points.filter((_, idx) => idx % 3 === 0).map((pt) => (
            <g key={pt.minute}>
              <circle
                cx={getX(pt.minute)}
                cy={getY(pt.pm25)}
                r="3.5"
                fill="#06b6d4"
                stroke="#0f172a"
                strokeWidth="1.5"
              />
              <text
                x={getX(pt.minute)}
                y={getY(pt.pm25) - 6}
                fill="#cbd5e1"
                fontSize="8"
                textAnchor="middle"
              >
                {pt.pm25}
              </text>
            </g>
          ))}

          {/* Axes */}
          <line
            x1={padLeft}
            y1={padTop + chartH}
            x2={svgWidth - padRight}
            y2={padTop + chartH}
            stroke="#334155"
          />
          <line
            x1={padLeft}
            y1={padTop}
            x2={padLeft}
            y2={padTop + chartH}
            stroke="#334155"
          />

          {/* X axis labels */}
          {[0, 15, 30, 45, 60].map((m) => (
            <text
              key={m}
              x={getX(m)}
              y={svgHeight - 10}
              fill="#64748b"
              fontSize="9"
              textAnchor="middle"
            >
              {m}m
            </text>
          ))}

          {/* Y axis labels */}
          <text x={padLeft - 6} y={getY(c0)} fill="#f43f5e" fontSize="9" textAnchor="end">
            {c0}
          </text>
          <text x={padLeft - 6} y={getY(cEq)} fill="#06b6d4" fontSize="9" textAnchor="end">
            {cEq}
          </text>

          {/* Gradient definition */}
          <defs>
            <linearGradient id="decayGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800/80">
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3 text-cyan-400" />
          Purification speed: {result.airChangesPerHourACH} air changes/hr
        </span>
        <span className="text-emerald-400 font-semibold">
          Final Steady-State: {result.equilibriumIndoorPM25} µg/m³
        </span>
      </div>
    </div>
  )
}
