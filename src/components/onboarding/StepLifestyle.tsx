import React from 'react'
import { Flame, Clock, Home, Bike, Car, Train, Bus, ShieldCheck } from 'lucide-react'
import type { LifestyleProfile } from '../../types/onboarding'

interface StepLifestyleProps {
  lifestyle: LifestyleProfile
  onChangeLifestyle: (lifestyle: LifestyleProfile) => void
}

export const StepLifestyle: React.FC<StepLifestyleProps> = ({
  lifestyle,
  onChangeLifestyle,
}) => {
  const updateField = <K extends keyof LifestyleProfile>(field: K, val: LifestyleProfile[K]) => {
    onChangeLifestyle({
      ...lifestyle,
      [field]: val,
    })
  }

  const commuteOptions: {
    id: LifestyleProfile['commuteMode']
    label: string
    example: string
    icon: React.ComponentType<{ className?: string }>
  }[] = [
    { id: 'two_wheeler', label: 'Two-Wheeler / Scooter', example: 'e.g. Motorcycle or e-scooter (Direct unshielded particulate blast)', icon: Bike },
    { id: 'car_petrol', label: 'Car / Cab (Petrol/EV)', example: 'e.g. Sedan with cabin AC filter on recirculation mode', icon: Car },
    { id: 'car_diesel', label: 'Car (Diesel Engine)', example: 'e.g. High NOx & black carbon tailpipe emissions', icon: Car },
    { id: 'metro_subway', label: 'Metro / Rapid Transit', example: 'e.g. Underground / elevated rail (cleanest high-speed commute)', icon: Train },
    { id: 'bus_transit', label: 'Bus Transit', example: 'e.g. City public bus (exposure at roadside stops)', icon: Bus },
    { id: 'remote_wfh', label: 'Work From Home / Remote', example: 'e.g. Zero daily commute road exposure', icon: Home },
  ]

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="space-y-1">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-800/60 text-[11px] font-semibold text-cyan-300">
          <Flame className="w-3.5 h-3.5 text-cyan-400" />
          <span>Step 4: Commute, Home & Energy Profile</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white">How does your daily routine run?</h2>
        <p className="text-xs text-slate-400 leading-relaxed">
          AirIQ cross-checks your commute departure time against morning inversion smog traps and computes your home CADR clean air requirements.
        </p>
      </div>

      {/* 1. Commute Mode Selection with Explicit Examples */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
          <span>Primary Commute Mode</span>
          <span className="text-[10px] text-cyan-400">Select one</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {commuteOptions.map((opt) => {
            const Icon = opt.icon
            const isSelected = lifestyle.commuteMode === opt.id

            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => updateField('commuteMode', opt.id)}
                className={`p-3 rounded-xl border text-left cursor-pointer transition-all flex items-start gap-2.5 ${
                  isSelected
                    ? 'bg-cyan-950/80 border-cyan-500 text-white shadow-sm'
                    : 'bg-slate-900/70 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <div className={`p-1.5 rounded-lg shrink-0 ${isSelected ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800 text-slate-400'}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">{opt.label}</div>
                  <div className="text-[10px] text-slate-400 line-clamp-2 mt-0.5">{opt.example}</div>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* 2. Commute Distance & Departure Time with Clear Examples */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Commute Distance */}
        <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
            <span>Daily Commute Distance (km)</span>
            <span className="text-[11px] font-bold text-cyan-400">{lifestyle.dailyCommuteKm} km</span>
          </label>
          <input
            type="range"
            min="0"
            max="60"
            step="2"
            value={lifestyle.dailyCommuteKm}
            onChange={(e) => updateField('dailyCommuteKm', Number(e.target.value))}
            className="w-full accent-cyan-400 cursor-pointer"
          />
          <div className="text-[10px] text-slate-400 flex items-center justify-between">
            <span>e.g. 15 km round trip</span>
            <span className="text-slate-500">Max: 60 km</span>
          </div>
        </div>

        {/* Departure Time */}
        <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <span>Morning Departure Time</span>
            </span>
            <span className="text-[10px] text-slate-500">e.g. 08:30 AM</span>
          </label>
          <input
            type="time"
            value={lifestyle.departureTime}
            onChange={(e) => updateField('departureTime', e.target.value)}
            className="w-full px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
          />
          <div className="text-[10px] text-amber-400/90 leading-tight">
            ⚠️ Peak nocturnal inversion traps smog between 06:00 and 09:30 AM.
          </div>
        </div>
      </div>

      {/* 3. Home Type & Floor Area (Used by Physics Engine) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Home Type */}
        <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-1.5">
          <label className="text-xs font-semibold text-slate-300">
            Home Type (Building Infiltration)
          </label>
          <select
            value={lifestyle.homeType}
            onChange={(e) => updateField('homeType', e.target.value as any)}
            className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
          >
            <option value="apartment">Apartment / High-Rise (Mid Floor) — e.g. Moderate sealing</option>
            <option value="independent_house">Independent House (Ground + Floors) — e.g. Higher draft</option>
            <option value="ground_floor">Ground Floor Unit — e.g. High street dust accumulation</option>
            <option value="high_rise">High-Rise 10+ Floor — e.g. Above surface inversion layer</option>
          </select>
          <div className="text-[10px] text-slate-400">
            <span className="text-cyan-400 font-semibold">Example:</span> 3rd floor apartment with double-glazed windows.
          </div>
        </div>

        {/* Floor Area */}
        <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-1.5">
          <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
            <span>Approximate Floor Area (sq ft)</span>
            <span className="text-[11px] font-bold text-cyan-400">{lifestyle.homeAreaSqFt} sq ft</span>
          </label>
          <input
            type="range"
            min="300"
            max="3500"
            step="50"
            value={lifestyle.homeAreaSqFt}
            onChange={(e) => updateField('homeAreaSqFt', Number(e.target.value))}
            className="w-full accent-cyan-400 cursor-pointer"
          />
          <div className="text-[10px] text-slate-400 flex items-center justify-between">
            <span>e.g. 1,200 sq ft (Typical 2-3 BHK)</span>
            <span className="text-slate-500">Max: 3500 sq ft</span>
          </div>
        </div>
      </div>

      {/* 4. Cooking Fuel & Winter Heating */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Cooking Fuel */}
        <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-1.5">
          <label className="text-xs font-semibold text-slate-300">
            Primary Cooking Fuel
          </label>
          <select
            value={lifestyle.cookingFuel}
            onChange={(e) => updateField('cookingFuel', e.target.value as any)}
            className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
          >
            <option value="lpg">LPG Cylinder Gas — e.g. Standard pressurized gas stove</option>
            <option value="induction">Induction / Electric — e.g. Zero combustion emissions</option>
            <option value="piped_gas">Piped Natural Gas (PNG) — e.g. City utility connection</option>
            <option value="traditional_biomass">Traditional Biomass / Wood — e.g. High indoor soot</option>
          </select>
          <div className="text-[10px] text-slate-400">
            <span className="text-cyan-400 font-semibold">Example:</span> LPG gas burner with kitchen chimney.
          </div>
        </div>

        {/* Winter Heating */}
        <div className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-1.5">
          <label className="text-xs font-semibold text-slate-300">
            Winter Room Heating
          </label>
          <select
            value={lifestyle.winterHeating}
            onChange={(e) => updateField('winterHeating', e.target.value as any)}
            className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500"
          >
            <option value="reverse_ac_heatpump">Reverse AC / Heat Pump — e.g. Cleanest efficiency</option>
            <option value="electric_radiator">Electric Oil-filled Radiator — e.g. Zero indoor combustion</option>
            <option value="gas_heater">Unvented Gas Room Heater — e.g. Generates CO and NO2</option>
            <option value="wood_coal_angithi">Wood / Coal Angithi — e.g. Severe indoor carbon hazard</option>
            <option value="none">No Active Heating — e.g. Heavy blankets only</option>
          </select>
          <div className="text-[10px] text-slate-400">
            <span className="text-cyan-400 font-semibold">Example:</span> Electric oil radiator or reverse-cycle AC.
          </div>
        </div>
      </div>

      <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/60 text-[11px] text-slate-400 flex items-center gap-2">
        <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
        <span>
          <strong>Physics Verification:</strong> Room floor area and building sealing level are directly fed into the single-zone aerosol mass-balance equation: C(in) = [ACH(inf) · P · C(out)] / [ACH(inf) + ACH(cadr)].
        </span>
      </div>
    </div>
  )
}
