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
    <div className="space-y-3 pt-2">
      <div className="flex items-center gap-2">
        <AlertOctagon className="w-4 h-4 text-rose-400" />
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
          Family Smog Emergency Readiness Checklist (AQI &gt; 350)
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {items.map((item, idx) => (
          <label
            key={idx}
            className={`flex items-start gap-3 p-3 rounded-xl border text-xs cursor-pointer transition-all ${
              checkedItems[idx]
                ? 'border-emerald-600/40 bg-emerald-950/20 text-slate-300'
                : 'border-slate-800/60 bg-slate-900/30 text-slate-300 hover:border-slate-700'
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
