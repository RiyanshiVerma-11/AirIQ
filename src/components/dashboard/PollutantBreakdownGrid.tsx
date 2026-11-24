import React from 'react'
import { Gauge } from 'lucide-react'
import type { AirQualityData } from '../../types'

interface PollutantBreakdownGridProps {
  data: AirQualityData
}

export const PollutantBreakdownGrid: React.FC<PollutantBreakdownGridProps> = ({ data }) => {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 sm:p-6">
      <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
        <Gauge className="w-4 h-4 text-cyan-400" />
        Full Atmospheric Pollutant Breakdown
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/60">
          <span className="text-[11px] font-medium text-slate-400 block mb-0.5">PM2.5 (Fine Soot)</span>
          <div className="text-xl font-bold text-white">
            {data.pm25} <span className="text-xs font-normal text-slate-400">µg/m³</span>
          </div>
          <span className="text-[10px] text-rose-400 font-semibold mt-1 block">Alveolar penetrator</span>
        </div>

        <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/60">
          <span className="text-[11px] font-medium text-slate-400 block mb-0.5">PM10 (Dust & Silt)</span>
          <div className="text-xl font-bold text-white">
            {data.pm10} <span className="text-xs font-normal text-slate-400">µg/m³</span>
          </div>
          <span className="text-[10px] text-amber-400 font-semibold mt-1 block">Upper airway irritant</span>
        </div>

        <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/60">
          <span className="text-[11px] font-medium text-slate-400 block mb-0.5">NO2 (Vehicular Gas)</span>
          <div className="text-xl font-bold text-white">
            {data.no2} <span className="text-xs font-normal text-slate-400">µg/m³</span>
          </div>
          <span className="text-[10px] text-orange-400 font-semibold mt-1 block">Diesel combustion</span>
        </div>

        <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/60">
          <span className="text-[11px] font-medium text-slate-400 block mb-0.5">CO (Carbon Monoxide)</span>
          <div className="text-xl font-bold text-white">
            {data.co} <span className="text-xs font-normal text-slate-400">mg/m³</span>
          </div>
          <span className="text-[10px] text-purple-400 font-semibold mt-1 block">Incomplete burning</span>
        </div>

        <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/60">
          <span className="text-[11px] font-medium text-slate-400 block mb-0.5">SO2 (Sulphur Dioxide)</span>
          <div className="text-xl font-bold text-white">
            {data.so2} <span className="text-xs font-normal text-slate-400">µg/m³</span>
          </div>
          <span className="text-[10px] text-yellow-400 font-semibold mt-1 block">Coal / Heavy oil</span>
        </div>

        <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/60">
          <span className="text-[11px] font-medium text-slate-400 block mb-0.5">O3 (Ozone)</span>
          <div className="text-xl font-bold text-white">
            {data.o3} <span className="text-xs font-normal text-slate-400">µg/m³</span>
          </div>
          <span className="text-[10px] text-blue-400 font-semibold mt-1 block">Photochemical smog</span>
        </div>
      </div>
    </div>
  )
}
