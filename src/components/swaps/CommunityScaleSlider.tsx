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
    <div className="rounded-2xl border border-slate-800/60 bg-slate-900/30 p-5 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Users className="w-4 h-4 text-cyan-400" />
            <span>Community Multiplier: Collective Airshed Action</span>
          </h2>
          <p className="text-[11px] text-slate-400">
            See what happens when our neighborhood bands together to adopt these sustainable alternatives
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400 text-[11px]">Adopting Households:</span>
          <span className="px-2 py-0.5 rounded-lg bg-slate-950 border border-slate-800 font-mono font-bold text-cyan-300">
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
          <span>100 Homes</span>
          <span>1,000 Homes (Neighborhood)</span>
          <span>5,000 Homes (Ward)</span>
          <span>10,000 Homes (Suburb)</span>
        </div>
      </div>

      {/* Community Multiplier Outcomes Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1 text-xs">
        <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800/60">
          <span className="text-[10px] text-slate-400 block mb-0.5">Winter Soot Averted</span>
          <span className="text-xl font-black text-emerald-400">{pm25Kg.toLocaleString()} kg</span>
          <span className="text-[10px] text-slate-500 block">PM2.5 kept out of air</span>
        </div>

        <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800/60">
          <span className="text-[10px] text-slate-400 block mb-0.5">CO2 Emissions Cut</span>
          <span className="text-xl font-black text-blue-400">{co2Tons.toLocaleString()} tons</span>
          <span className="text-[10px] text-slate-500 block">Greenhouse gas averted</span>
        </div>

        <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800/60">
          <span className="text-[10px] text-slate-400 block mb-0.5">Car Equivalent</span>
          <span className="text-xl font-black text-cyan-300">-{dieselCarsRemoved.toLocaleString()}</span>
          <span className="text-[10px] text-slate-500 block">Diesel cars off road</span>
        </div>

        <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800/60">
          <span className="text-[10px] text-slate-400 block mb-0.5">Health Benefit</span>
          <span className="text-xl font-black text-rose-300">~{erVisitsAvoided} fewer</span>
          <span className="text-[10px] text-slate-500 block">Winter ER asthma visits</span>
        </div>
      </div>
    </div>
  )
}
