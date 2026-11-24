import React from 'react'
import { Gauge } from 'lucide-react'
import type { AirQualityData } from '../../types'

interface PollutantBreakdownGridProps {
  data: AirQualityData
}

export const PollutantBreakdownGrid: React.FC<PollutantBreakdownGridProps> = ({ data }) => {
  return (
    <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-5 sm:p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Gauge className="w-4 h-4 text-cyan-400" />
            <span>Air Pollutants in Plain Words</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            What each number means and where it comes from in your city.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* PM2.5 */}
        <div className="p-3.5 rounded-2xl border border-slate-800 bg-slate-950/70 space-y-1">
          <span className="text-[11px] font-bold text-white block">Fine Soot (PM2.5)</span>
          <div className="text-xl font-black text-rose-300">
            {data.pm25} <span className="text-xs font-normal text-slate-400">µg/m³</span>
          </div>
          <p className="text-[10px] text-slate-400 leading-snug">
            Tiny smoke particles from cars and trash burning that go deep into lungs.
          </p>
        </div>

        {/* PM10 */}
        <div className="p-3.5 rounded-2xl border border-slate-800 bg-slate-950/70 space-y-1">
          <span className="text-[11px] font-bold text-white block">Road Dust (PM10)</span>
          <div className="text-xl font-black text-amber-300">
            {data.pm10} <span className="text-xs font-normal text-slate-400">µg/m³</span>
          </div>
          <p className="text-[10px] text-slate-400 leading-snug">
            Coarse dirt from roads and construction. Causes coughing and eye burning.
          </p>
        </div>

        {/* NO2 */}
        <div className="p-3.5 rounded-2xl border border-slate-800 bg-slate-950/70 space-y-1">
          <span className="text-[11px] font-bold text-white block">Car Gas (NO2)</span>
          <div className="text-xl font-black text-orange-300">
            {data.no2} <span className="text-xs font-normal text-slate-400">µg/m³</span>
          </div>
          <p className="text-[10px] text-slate-400 leading-snug">
            Traffic gas from diesel engines and trucks during morning rush hours.
          </p>
        </div>

        {/* CO */}
        <div className="p-3.5 rounded-2xl border border-slate-800 bg-slate-950/70 space-y-1">
          <span className="text-[11px] font-bold text-white block">Smoke Gas (CO)</span>
          <div className="text-xl font-black text-purple-300">
            {data.co} <span className="text-xs font-normal text-slate-400">mg/m³</span>
          </div>
          <p className="text-[10px] text-slate-400 leading-snug">
            Odorless gas from unvented gas heaters, wood fires, and engine idling.
          </p>
        </div>

        {/* SO2 */}
        <div className="p-3.5 rounded-2xl border border-slate-800 bg-slate-950/70 space-y-1">
          <span className="text-[11px] font-bold text-white block">Factory Smoke (SO2)</span>
          <div className="text-xl font-black text-yellow-300">
            {data.so2} <span className="text-xs font-normal text-slate-400">µg/m³</span>
          </div>
          <p className="text-[10px] text-slate-400 leading-snug">
            Comes from coal burning and industrial brick kilns near the outskirts.
          </p>
        </div>

        {/* O3 */}
        <div className="p-3.5 rounded-2xl border border-slate-800 bg-slate-950/70 space-y-1">
          <span className="text-[11px] font-bold text-white block">Sunny Smog (O3)</span>
          <div className="text-xl font-black text-blue-300">
            {data.o3} <span className="text-xs font-normal text-slate-400">µg/m³</span>
          </div>
          <p className="text-[10px] text-slate-400 leading-snug">
            Forms when bright sunlight reacts with car fumes in the midday heat.
          </p>
        </div>
      </div>
    </div>
  )
}
