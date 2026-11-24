import React from 'react'
import type { IAQSimulationInput } from '../../types'

interface FiltrationSelectorProps {
  currentMode: IAQSimulationInput['filtrationMode']
  purifierCount: number
  onSelectMode: (mode: IAQSimulationInput['filtrationMode']) => void
  onUpdateCount: (count: number) => void
}

export const FiltrationSelector: React.FC<FiltrationSelectorProps> = ({
  currentMode,
  purifierCount,
  onSelectMode,
  onUpdateCount,
}) => {
  const options = [
    {
      id: 'diy_corsi_rosenthal_4filter',
      name: 'Corsi-Rosenthal Box (4-Filter Cube)',
      cadr: '485 CFM CADR',
      cost: '~$65 DIY',
      rec: true,
    },
    {
      id: 'diy_box_fan_merv13',
      name: 'Single Box Fan + 1x MERV 13',
      cadr: '220 CFM CADR',
      cost: '~$40 DIY',
      rec: false,
    },
    {
      id: 'hepa_premium',
      name: 'Premium Commercial HEPA',
      cadr: '310 CFM CADR',
      cost: '~$350 Retail',
      rec: false,
    },
    {
      id: 'hepa_compact',
      name: 'Compact Commercial HEPA',
      cadr: '140 CFM CADR',
      cost: '~$120 Retail',
      rec: false,
    },
    {
      id: 'none',
      name: 'No Air Filtration',
      cadr: '0 CFM CADR',
      cost: '$0',
      rec: false,
    },
  ] as const

  return (
    <div className="space-y-3">
      <label className="text-xs font-semibold text-slate-300 block">
        Air Cleaning & Filtration System:
      </label>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
        {options.map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => onSelectMode(opt.id)}
            className={`p-3 rounded-xl border text-left transition-all relative ${
              currentMode === opt.id
                ? 'border-cyan-500 bg-cyan-950/30 text-white ring-1 ring-cyan-500/40'
                : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:border-slate-700'
            }`}
          >
            {opt.rec && (
              <span className="absolute top-2 right-2 px-1.5 py-0.2 rounded text-[9px] font-bold uppercase bg-cyan-500 text-slate-950">
                Recommended
              </span>
            )}
            <div className="font-bold text-white text-xs mb-0.5">{opt.name}</div>
            <div className="text-[11px] text-slate-400 flex items-center justify-between">
              <span>{opt.cadr}</span>
              <span className="font-mono text-cyan-300">{opt.cost}</span>
            </div>
          </button>
        ))}
      </div>

      {currentMode !== 'none' && (
        <div className="flex items-center justify-between p-3 rounded-xl border border-slate-800 bg-slate-950/40 text-xs">
          <span className="font-semibold text-slate-300">Number of Air Cleaning Units:</span>
          <div className="flex items-center gap-2">
            {[1, 2, 3].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => onUpdateCount(num)}
                className={`w-7 h-7 rounded-lg font-bold text-xs ${
                  purifierCount === num
                    ? 'bg-cyan-600 text-white'
                    : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
