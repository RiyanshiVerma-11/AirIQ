import React from 'react'

export const EmergencyContactsBar: React.FC = () => {
  return (
    <div className="p-4 rounded-xl bg-slate-900 print:bg-gray-100 border border-slate-800 print:border-gray-300 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
      <div>
        <span className="text-slate-400 print:text-gray-600 block text-[10px] uppercase font-bold">
          Local Emergency Service:
        </span>
        <span className="font-bold text-white print:text-black">112 / 911 (Ambulance & Fire)</span>
      </div>
      <div>
        <span className="text-slate-400 print:text-gray-600 block text-[10px] uppercase font-bold">
          National Clean Air Control Taskforce:
        </span>
        <span className="font-bold text-white print:text-black">AirWatch Hotline: 1800-SMOG-ALERT</span>
      </div>
      <div>
        <span className="text-slate-400 print:text-gray-600 block text-[10px] uppercase font-bold">
          Family Physician / Pediatric Clinic:
        </span>
        <span className="font-mono text-cyan-300 print:text-blue-800 font-semibold">
          [Fill In: _______________]
        </span>
      </div>
    </div>
  )
}
