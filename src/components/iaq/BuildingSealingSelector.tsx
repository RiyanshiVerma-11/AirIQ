import React from 'react'
import type { IAQSimulationInput } from '../../types'

interface BuildingSealingSelectorProps {
  currentSealing: IAQSimulationInput['buildingSealingLevel']
  onSelectSealing: (level: IAQSimulationInput['buildingSealingLevel']) => void
}

export const BuildingSealingSelector: React.FC<BuildingSealingSelectorProps> = ({
  currentSealing,
  onSelectSealing,
}) => {
  const options = [
    { id: 'drafty', title: 'Drafty', desc: 'Single-pane, door gaps (1.2 ACH)' },
    { id: 'standard', title: 'Standard', desc: 'Normal masonry/windows (0.6 ACH)' },
    { id: 'weather_sealed', title: 'Weather-Sealed', desc: 'EPDM tape & draft stoppers (0.28 ACH)' },
  ] as const

  return (
    <div className="space-y-2">
      <label className="text-xs font-semibold text-slate-300 block">
        Building Sealing & Draft Level:
      </label>
      <div className="grid grid-cols-3 gap-2">
        {options.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => onSelectSealing(s.id)}
            className={`p-2.5 rounded-xl border text-left transition-all ${
              currentSealing === s.id
                ? 'border-cyan-500 bg-cyan-950/30 text-white'
                : 'border-slate-800 bg-slate-950/40 text-slate-400 hover:border-slate-700'
            }`}
          >
            <div className="text-xs font-bold text-white mb-0.5">{s.title}</div>
            <div className="text-[10px] text-slate-400 leading-tight">{s.desc}</div>
          </button>
        ))}
      </div>
    </div>
  )
}
