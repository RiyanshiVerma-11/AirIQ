import React, { useState } from 'react'
import { Calculator, ShieldCheck } from 'lucide-react'

export const CustomHabitCalculator: React.FC = () => {
  const [vehicleType, setVehicleType] = useState<'diesel' | 'petrol' | 'two_wheeler' | 'cng'>('diesel')
  const [commuteDistanceKm, setCommuteDistanceKm] = useState<number>(25)
  const [daysPerWeek, setDaysPerWeek] = useState<number>(5)
  const [fuelPricePerLiter, setFuelPricePerLiter] = useState<number>(1.2) // in USD or equivalent

  // Physical emission factors (g/km) based on Euro 4/5 urban stop-and-go winter driving cycles
  const emissionFactors = {
    diesel: { pm25: 0.085, nox: 0.65, co2KgPerKm: 0.19, fuelLitersPer100Km: 7.5 },
    petrol: { pm25: 0.025, nox: 0.22, co2KgPerKm: 0.17, fuelLitersPer100Km: 8.2 },
    two_wheeler: { pm25: 0.045, nox: 0.18, co2KgPerKm: 0.06, fuelLitersPer100Km: 2.8 },
    cng: { pm25: 0.008, nox: 0.35, co2KgPerKm: 0.14, fuelLitersPer100Km: 6.0 },
  }

  const factor = emissionFactors[vehicleType]
  const monthlyKm = commuteDistanceKm * daysPerWeek * 4.33

  // Current baseline emissions per month
  const monthlyPM25G = Math.round(monthlyKm * factor.pm25)
  const monthlyNOxG = Math.round(monthlyKm * factor.nox)
  const monthlyCO2Kg = Math.round(monthlyKm * factor.co2KgPerKm)
  const monthlyFuelCost = Math.round((monthlyKm * (factor.fuelLitersPer100Km / 100)) * fuelPricePerLiter)

  // Swapped to Electric Metro Transit (assumes 92% reduction in localized ground-level emissions)
  const avertedPM25G = Math.round(monthlyPM25G * 0.92)
  const avertedCO2Kg = Math.round(monthlyCO2Kg * 0.78)
  const monthlyNetSavings = Math.max(15, Math.round(monthlyFuelCost * 0.65))

  return (
    <div className="rounded-2xl border border-indigo-900/40 bg-gradient-to-br from-indigo-950/20 via-slate-900 to-slate-950 p-5 sm:p-6 space-y-5">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Calculator className="w-4 h-4 text-indigo-400" />
            Dynamic Commute & Emission Stoichiometry Engine
          </h2>
          <p className="text-xs text-slate-400">
            Compute the exact particulate mass and greenhouse gas load produced by your specific commute
          </p>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 font-mono">
          Euro 5/BS-VI Model
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        <div>
          <label className="font-semibold text-slate-300 block mb-1">Your Vehicle Engine:</label>
          <select
            aria-label="Vehicle Engine"
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value as any)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-white cursor-pointer"
          >
            <option value="diesel">Diesel Passenger Car (Highest PM2.5/NOx)</option>
            <option value="petrol">Petrol / Gasoline Car</option>
            <option value="two_wheeler">Motorcycle / Scooter (Direct Inhalation)</option>
            <option value="cng">Compressed Natural Gas (CNG)</option>
          </select>
        </div>

        <div>
          <div className="flex justify-between font-semibold text-slate-300 mb-1">
            <span>Daily Roundtrip:</span>
            <span className="text-white font-bold">{commuteDistanceKm} km / day</span>
          </div>
          <input
            type="range"
            min="5"
            max="120"
            step="5"
            value={commuteDistanceKm}
            onChange={(e) => setCommuteDistanceKm(parseInt(e.target.value) || 20)}
            className="w-full accent-indigo-500 cursor-pointer mt-1"
          />
        </div>

        <div>
          <div className="flex justify-between font-semibold text-slate-300 mb-1">
            <span>Commute Days:</span>
            <span className="text-white font-bold">{daysPerWeek} days / week</span>
          </div>
          <input
            type="range"
            min="1"
            max="7"
            step="1"
            value={daysPerWeek}
            onChange={(e) => setDaysPerWeek(parseInt(e.target.value) || 5)}
            className="w-full accent-indigo-500 cursor-pointer mt-1"
          />
        </div>

        <div>
          <div className="flex justify-between font-semibold text-slate-300 mb-1">
            <span>Fuel Price:</span>
            <span className="text-white font-bold">${fuelPricePerLiter.toFixed(2)}/L</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="3.0"
            step="0.1"
            value={fuelPricePerLiter}
            onChange={(e) => setFuelPricePerLiter(parseFloat(e.target.value) || 1.2)}
            className="w-full accent-indigo-500 cursor-pointer mt-1"
          />
        </div>
      </div>

      {/* Calculated Emissions Output */}
      <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
        <div className="text-xs font-bold text-slate-300 flex items-center justify-between">
          <span>Monthly Travel Output ({Math.round(monthlyKm)} km driven):</span>
          <span className="text-rose-400">Baseline Carbon & Particulate Footprint</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
            <span className="text-[10px] text-slate-400 block">Primary PM2.5 Soot</span>
            <span className="text-lg font-black text-rose-300">{monthlyPM25G} g</span>
            <span className="text-[10px] text-slate-500 block">Exhaust mass</span>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
            <span className="text-[10px] text-slate-400 block">Nitrogen Oxides (NOx)</span>
            <span className="text-lg font-black text-amber-300">{monthlyNOxG} g</span>
            <span className="text-[10px] text-slate-500 block">Smog precursor</span>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
            <span className="text-[10px] text-slate-400 block">CO2 Greenhouse Gas</span>
            <span className="text-lg font-black text-blue-300">{monthlyCO2Kg} kg</span>
            <span className="text-[10px] text-slate-500 block">Carbon footprint</span>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
            <span className="text-[10px] text-slate-400 block">Estimated Fuel Spend</span>
            <span className="text-lg font-black text-white">${monthlyFuelCost}</span>
            <span className="text-[10px] text-slate-500 block">Monthly operational</span>
          </div>
        </div>

        {/* Transition Impact */}
        <div className="pt-2 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="space-y-0.5">
            <span className="font-bold text-emerald-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Impact if Swapped to Electric Rapid Transit (Metro):
            </span>
            <p className="text-slate-300">
              Eliminates <strong className="text-white">~{avertedPM25G}g of PM2.5</strong> and{' '}
              <strong className="text-white">~{avertedCO2Kg}kg of CO2</strong> from your city's breathing zone each month, while pocketing{' '}
              <strong className="text-emerald-300">~${monthlyNetSavings}/mo</strong> in transit savings.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
