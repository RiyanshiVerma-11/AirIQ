import React from 'react'
import { Gauge } from 'lucide-react'
import type { AirQualityData } from '../../types'

interface PollutantBreakdownGridProps {
  data: AirQualityData
}

export const PollutantBreakdownGrid: React.FC<PollutantBreakdownGridProps> = ({ data }) => {
  const pollutants = [
    {
      name: 'Fine Soot (PM2.5)',
      value: data.pm25,
      unit: 'µg/m³',
      color: 'text-rose-300',
      source: 'Vehicle exhaust, biomass, and trash smoke that penetrates deep into lungs.',
    },
    {
      name: 'Road Dust (PM10)',
      value: data.pm10,
      unit: 'µg/m³',
      color: 'text-amber-300',
      source: 'Coarse road dirt and construction dust that triggers coughing and eye irritation.',
    },
    {
      name: 'Traffic Gas (NO2)',
      value: data.no2,
      unit: 'µg/m³',
      color: 'text-orange-300',
      source: 'Diesel trucks, buses, and heavy traffic during morning rush hours.',
    },
    {
      name: 'Incomplete Burn (CO)',
      value: data.co,
      unit: 'mg/m³',
      color: 'text-purple-300',
      source: 'Odorless smoke gas from engine idling, unvented heaters, and wood burning.',
    },
    {
      name: 'Factory Fumes (SO2)',
      value: data.so2,
      unit: 'µg/m³',
      color: 'text-yellow-300',
      source: 'Coal combustion, industrial boilers, and brick kilns around outer rings.',
    },
    {
      name: 'Midday Ozone (O3)',
      value: data.o3,
      unit: 'µg/m³',
      color: 'text-blue-300',
      source: 'Ground-level smog formed when bright midday sunlight reacts with car fumes.',
    },
  ]

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs">
        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Gauge className="w-3.5 h-3.5 text-cyan-400" />
            <span>Air Pollutants in Plain Words</span>
          </h2>
          <p className="text-[11px] text-slate-500 mt-0.5">
            What each atmospheric reading means and where it originates in your city.
          </p>
        </div>
      </div>

      {/* Open, borderless metric columns */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {pollutants.map((p, idx) => (
          <div
            key={idx}
            className="p-3 rounded-2xl bg-slate-900/30 border border-slate-800/60 space-y-1"
          >
            <span className="text-[11px] font-bold text-slate-300 block truncate">{p.name}</span>
            <div className={`text-xl sm:text-2xl font-black ${p.color}`}>
              {p.value}{' '}
              <span className="text-[11px] font-normal text-slate-500">{p.unit}</span>
            </div>
            <p className="text-[10px] text-slate-400 leading-snug line-clamp-3">
              {p.source}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
