import React, { useState } from 'react'
import { AlertOctagon } from 'lucide-react'

interface EmergencyChecklistProps {
  items: string[]
}

export const EmergencyChecklist: React.FC<EmergencyChecklistProps> = ({ items }) => {
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({})

  const toggleCheck = (idx: number) => {
    setCheckedItems((prev) => ({ ...prev, [idx]: !prev[idx] }))
  }

  return (
    <div className="p-5 sm:p-6 rounded-2xl border border-rose-900/40 bg-gradient-to-br from-rose-950/20 to-slate-900/80">
      <div className="flex items-center gap-2 mb-3">
        <AlertOctagon className="w-5 h-5 text-rose-400" />
        <h2 className="text-base font-bold text-white">
          Family Smog Emergency Readiness Checklist
        </h2>
      </div>
      <p className="text-xs text-slate-300 mb-4">
        Essential protocols to maintain during Level 4 / Hazardous smog alerts (AQI &gt; 350)
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {items.map((item, idx) => (
          <label
            key={idx}
            className={`flex items-start gap-3 p-3 rounded-xl border text-xs cursor-pointer transition-all ${
              checkedItems[idx]
                ? 'border-emerald-600/50 bg-emerald-950/20 text-slate-200'
                : 'border-slate-800 bg-slate-950/50 text-slate-300 hover:border-slate-700'
            }`}
          >
            <input
              type="checkbox"
              checked={!!checkedItems[idx]}
              onChange={() => toggleCheck(idx)}
              className="mt-0.5 rounded bg-slate-900 border-slate-700 text-emerald-500 focus:ring-0 cursor-pointer"
            />
            <span className={checkedItems[idx] ? 'line-through text-slate-400' : ''}>
              {item}
            </span>
          </label>
        ))}
      </div>
    </div>
  )
}
