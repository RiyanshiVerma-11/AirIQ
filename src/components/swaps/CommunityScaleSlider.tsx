import React from 'react'
import { Users } from 'lucide-react'

interface CommunityScaleSliderProps {
  scale: number
  onScaleChange: (scale: number) => void
  pm25Kg: number
  co2Tons: number
  dieselCarsRemoved: number
  erVisitsAvoided: number
}

export const CommunityScaleSlider: React.FC<CommunityScaleSliderProps> = ({
  scale,
  onScaleChange,
  pm25Kg,
  co2Tons,
  dieselCarsRemoved,
  erVisitsAvoided,
}) => {
  return (
    <div className="rounded-2xl border border-cyan-900/40 bg-gradient-to-br from-cyan-950/20 via-slate-900 to-slate-950 p-5 sm:p-6 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Users className="w-4 h-4 text-cyan-400" />
            Community Scale Multiplier: Collective Airshed Action
          </h2>
          <p className="text-xs text-slate-400">
            See what happens when our neighborhood bands together to adopt these sustainable alternatives
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400">Adopting Households:</span>
          <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700 font-mono font-bold text-cyan-300">
            {scale.toLocaleString()} families
          </span>
        </div>
      </div>

      {/* Scale Slider */}
      <div className="space-y-1">
        <input
          type="range"
          min="100"
          max="10000"
          step="100"
          value={scale}
          onChange={(e) => onScaleChange(parseInt(e.target.value) || 1000)}
          className="w-full accent-cyan-500 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-500 font-mono">
          <span>100 Homes (1 Street)</span>
          <span>1,000 Homes (Neighborhood)</span>
          <span>5,000 Homes (Ward/Borough)</span>
          <span>10,000 Homes (City Suburb)</span>
        </div>
      </div>

      {/* Multiplier Results Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
        <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
          <span className="text-[10px] text-slate-400 block mb-0.5">Winter PM2.5 Eliminated</span>
          <span className="text-xl font-black text-cyan-300">{pm25Kg.toLocaleString()} kg</span>
          <span className="text-[10px] text-slate-500 block">From ground breathing zone</span>
        </div>

        <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
          <span className="text-[10px] text-slate-400 block mb-0.5">CO2 Emissions Slashed</span>
          <span className="text-xl font-black text-emerald-300">{co2Tons.toLocaleString()} MT</span>
          <span className="text-[10px] text-slate-500 block">Metric tons over winter</span>
        </div>

        <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
          <span className="text-[10px] text-slate-400 block mb-0.5">Diesel Traffic Removed</span>
          <span className="text-xl font-black text-indigo-300">~{dieselCarsRemoved.toLocaleString()}</span>
          <span className="text-[10px] text-slate-500 block">Daily car trips avoided</span>
        </div>

        <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
          <span className="text-[10px] text-slate-400 block mb-0.5">Hospital ER Visits Prevented</span>
          <span className="text-xl font-black text-rose-300">~{erVisitsAvoided.toLocaleString()}</span>
          <span className="text-[10px] text-slate-500 block">Pediatric & senior asthma episodes</span>
        </div>
      </div>
    </div>
  )
}
