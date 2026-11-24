import React from 'react'
import type { IAQSimulationInput } from '../../types'

interface IndoorSourcesSelectorProps {
  sources: IAQSimulationInput['indoorSources']
  onToggleSource: (key: keyof IAQSimulationInput['indoorSources']) => void
}

export const IndoorSourcesSelector: React.FC<IndoorSourcesSelectorProps> = ({
  sources,
  onToggleSource,
}) => {
  return (
    <div className="space-y-2 pt-1 border-t border-slate-800">
      <label className="text-xs font-semibold text-slate-300 block">
        Indoor Particulate Generation Sources:
      </label>
      <div className="grid grid-cols-2 gap-2 text-xs">
        <label className="flex items-center gap-2 p-2 rounded-lg bg-slate-950 border border-slate-800 cursor-pointer">
          <input
            type="checkbox"
            checked={sources.fryingCooking}
            onChange={() => onToggleSource('fryingCooking')}
            className="rounded bg-slate-900 border-slate-700 text-cyan-600 focus:ring-0"
          />
          <span className="text-slate-300">High-Heat Frying</span>
        </label>

        <label className="flex items-center gap-2 p-2 rounded-lg bg-slate-950 border border-slate-800 cursor-pointer">
          <input
            type="checkbox"
            checked={sources.incenseCandles}
            onChange={() => onToggleSource('incenseCandles')}
            className="rounded bg-slate-900 border-slate-700 text-cyan-600 focus:ring-0"
          />
          <span className="text-slate-300">Incense / Candles</span>
        </label>

        <label className="flex items-center gap-2 p-2 rounded-lg bg-slate-950 border border-slate-800 cursor-pointer">
          <input
            type="checkbox"
            checked={sources.unventedGasHeater}
            onChange={() => onToggleSource('unventedGasHeater')}
            className="rounded bg-slate-900 border-slate-700 text-cyan-600 focus:ring-0"
          />
          <span className="text-slate-300">Unvented Gas Heater</span>
        </label>

        <label className="flex items-center gap-2 p-2 rounded-lg bg-slate-950 border border-slate-800 cursor-pointer">
          <input
            type="checkbox"
            checked={sources.smoking}
            onChange={() => onToggleSource('smoking')}
            className="rounded bg-slate-900 border-slate-700 text-cyan-600 focus:ring-0"
          />
          <span className="text-slate-300">Indoor Smoking</span>
        </label>
      </div>
    </div>
  )
}
