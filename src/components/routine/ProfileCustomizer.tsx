import React from 'react'
import { Home, HeartPulse } from 'lucide-react'
import type { HouseholdProfile } from '../../types'

interface ProfileCustomizerProps {
  profile: HouseholdProfile
  onUpdateProfile: (newProfile: HouseholdProfile) => void
}

export const ProfileCustomizer: React.FC<ProfileCustomizerProps> = ({
  profile,
  onUpdateProfile,
}) => {
  return (
    <div className="rounded-2xl border border-cyan-900/40 bg-slate-950/90 p-5 sm:p-6 space-y-5 animate-in fade-in duration-200">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Home className="w-4 h-4 text-cyan-400" />
          Customize Family & Lifestyle Variables
        </h3>
        <span className="text-xs text-slate-400">
          Modifying these updates the routine & impact formulas in real-time
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        {/* Family Members */}
        <div className="space-y-2 p-3.5 rounded-xl border border-slate-800 bg-slate-900/60">
          <label className="font-semibold text-slate-300 block">Family Members</label>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <span className="text-[10px] text-slate-400">Adults</span>
              <input
                type="number"
                min="1"
                max="10"
                value={profile.adults}
                onChange={(e) => onUpdateProfile({ ...profile, adults: parseInt(e.target.value) || 1 })}
                className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1 text-white font-semibold text-xs mt-1"
              />
            </div>
            <div>
              <span className="text-[10px] text-slate-400">Children</span>
              <input
                type="number"
                min="0"
                max="8"
                value={profile.children}
                onChange={(e) => onUpdateProfile({ ...profile, children: parseInt(e.target.value) || 0 })}
                className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1 text-white font-semibold text-xs mt-1"
              />
            </div>
            <div>
              <span className="text-[10px] text-slate-400">Seniors</span>
              <input
                type="number"
                min="0"
                max="6"
                value={profile.seniors}
                onChange={(e) => onUpdateProfile({ ...profile, seniors: parseInt(e.target.value) || 0 })}
                className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1 text-white font-semibold text-xs mt-1"
              />
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <span className="text-slate-300 text-[11px] flex items-center gap-1">
              <HeartPulse className="w-3.5 h-3.5 text-rose-400" />
              Asthma / COPD Present?
            </span>
            <input
              type="checkbox"
              checked={profile.hasAsthmaOrCOPD}
              onChange={(e) => onUpdateProfile({ ...profile, hasAsthmaOrCOPD: e.target.checked })}
              className="rounded bg-slate-950 border-slate-700 text-cyan-600 focus:ring-0 cursor-pointer w-4 h-4"
            />
          </div>
        </div>

        {/* Commute Mode */}
        <div className="space-y-2 p-3.5 rounded-xl border border-slate-800 bg-slate-900/60">
          <label className="font-semibold text-slate-300 block">Primary Commute</label>
          <select
            aria-label="Commute Mode"
            value={profile.commuteMode}
            onChange={(e) =>
              onUpdateProfile({
                ...profile,
                commuteMode: e.target.value as HouseholdProfile['commuteMode'],
              })
            }
            className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1.5 text-white text-xs cursor-pointer"
          >
            <option value="two_wheeler">Motorcycle / Scooter (Direct Inhalation)</option>
            <option value="car_diesel">Diesel Car (High NOx / PM)</option>
            <option value="car_petrol">Petrol / Gasoline Car</option>
            <option value="metro_subway">Electric Metro / Subway (Clean)</option>
            <option value="bus_transit">City Bus Transit</option>
            <option value="walk_cycle">Bicycle / Walking</option>
            <option value="remote_wfh">Remote / Work from Home</option>
          </select>

          <div className="pt-1">
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>Roundtrip Distance</span>
              <span className="font-bold text-white">{profile.dailyCommuteKm} km</span>
            </div>
            <input
              type="range"
              min="2"
              max="80"
              step="2"
              value={profile.dailyCommuteKm}
              onChange={(e) =>
                onUpdateProfile({ ...profile, dailyCommuteKm: parseInt(e.target.value) || 10 })
              }
              className="w-full accent-cyan-500 mt-1 cursor-pointer"
            />
          </div>
        </div>

        {/* Heating Method */}
        <div className="space-y-2 p-3.5 rounded-xl border border-slate-800 bg-slate-900/60">
          <label className="font-semibold text-slate-300 block">Winter Space Heating</label>
          <select
            aria-label="Winter Space Heating"
            value={profile.winterHeating}
            onChange={(e) =>
              onUpdateProfile({
                ...profile,
                winterHeating: e.target.value as HouseholdProfile['winterHeating'],
              })
            }
            className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1.5 text-white text-xs cursor-pointer"
          >
            <option value="reverse_ac_heatpump">Inverter AC / Heat Pump (Zero Local Emission)</option>
            <option value="electric_radiator">Sealed Electric Oil Radiator</option>
            <option value="gas_heater">Unvented Gas / LPG Heater (High NO2/CO)</option>
            <option value="wood_coal_angithi">Open Wood / Coal Angithi (Heavy Soot)</option>
            <option value="none">No Space Heating</option>
          </select>

          <span className="text-[10px] text-slate-400 block pt-1">
            Open burning of wood/coal produces hazardous indoor VOC and particulate spikes.
          </span>
        </div>

        {/* Cooking Fuel */}
        <div className="space-y-2 p-3.5 rounded-xl border border-slate-800 bg-slate-900/60">
          <label className="font-semibold text-slate-300 block">Cooking Fuel</label>
          <select
            aria-label="Cooking Fuel"
            value={profile.cookingFuel}
            onChange={(e) =>
              onUpdateProfile({
                ...profile,
                cookingFuel: e.target.value as HouseholdProfile['cookingFuel'],
              })
            }
            className="w-full bg-slate-950 border border-slate-700 rounded px-2 py-1.5 text-white text-xs cursor-pointer"
          >
            <option value="induction">Electric Induction Cooktop (Cleanest)</option>
            <option value="lpg">LPG Gas Cylinder (Combustion flame)</option>
            <option value="piped_gas">Piped Natural Gas (Methane)</option>
            <option value="traditional_biomass">Biomass / Cowdung / Firewood</option>
          </select>

          <span className="text-[10px] text-slate-400 block pt-1">
            Induction avoids releasing 40-70 µg/m³ of nitrogen dioxide (NO2) into family rooms.
          </span>
        </div>
      </div>
    </div>
  )
}
