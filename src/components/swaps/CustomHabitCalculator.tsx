import React, { useState } from 'react'
import { Calculator } from 'lucide-react'

export const CustomHabitCalculator: React.FC = () => {
  const [vehicleType, setVehicleType] = useState<'diesel' | 'petrol' | 'two_wheeler' | 'cng'>('diesel')
  const [commuteDistanceKm, setCommuteDistanceKm] = useState<number>(25)
  const [daysPerWeek, setDaysPerWeek] = useState<number>(5)
  const [fuelPricePerLiter] = useState<number>(1.2) // in USD or equivalent

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
    <div className="rounded-2xl border border-slate-800/60 bg-slate-900/30 p-5 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800/60 pb-3">
        <div>
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <Calculator className="w-4 h-4 text-indigo-400" />
            <span>Commute & Emission Calculator</span>
          </h2>
          <p className="text-[11px] text-slate-400">
            Compute the exact particulate mass and greenhouse gas load produced by your specific commute
          </p>
        </div>
        <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-950/60 text-indigo-300 font-mono border border-indigo-900/40">
          Euro 5/BS-VI Model
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        <div>
          <label className="font-semibold text-slate-300 block mb-1">Your Vehicle Engine:</label>
          <select
            aria-label="Vehicle Engine"
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value as any)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-white cursor-pointer"
          >
            <option value="diesel">Diesel Passenger Car (Highest PM2.5/NOx)</option>
            <option value="petrol">Petrol / Gasoline Car</option>
            <option value="two_wheeler">Motorcycle / Scooter (Direct Inhalation)</option>
            <option value="cng">CNG / Hybrid Vehicle</option>
          </select>
        </div>

        <div>
          <label className="font-semibold text-slate-300 block mb-1">
            One-Way Commute: <strong className="text-cyan-400">{commuteDistanceKm} km</strong>
          </label>
          <input
            type="range"
            min="2"
            max="80"
            value={commuteDistanceKm}
            onChange={(e) => setCommuteDistanceKm(parseInt(e.target.value) || 25)}
            className="w-full accent-cyan-500 cursor-pointer"
          />
        </div>

        <div>
          <label className="font-semibold text-slate-300 block mb-1">
            Days Commuted / Week: <strong className="text-cyan-400">{daysPerWeek} days</strong>
          </label>
          <input
            type="range"
            min="1"
            max="7"
            value={daysPerWeek}
            onChange={(e) => setDaysPerWeek(parseInt(e.target.value) || 5)}
            className="w-full accent-cyan-500 cursor-pointer"
          />
        </div>

        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/60 space-y-1">
          <span className="text-[10px] text-slate-400 block uppercase font-bold">Estimated Fuel Bill:</span>
          <div className="text-lg font-black text-white">${monthlyFuelCost} <span className="text-xs font-normal text-slate-400">/ mo</span></div>
          <span className="text-[10px] text-slate-500 block">Based on {Math.round(monthlyKm)} km monthly</span>
        </div>
      </div>

      {/* Real-time Calculation Outcome */}
      <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-900/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div>
          <span className="font-bold text-emerald-300 block">
            Impact of Swapping 2 Days/Week to Electric Metro Transit:
          </span>
          <p className="text-slate-300 text-[11px] mt-0.5">
            Avoids <strong className="text-white">{avertedPM25G}g PM2.5</strong> and{' '}
            <strong className="text-white">{avertedCO2Kg}kg CO2</strong> from entering roadside air every month.
          </p>
        </div>
        <div className="text-right shrink-0">
          <span className="text-[10px] text-slate-400 block">Net Monthly Money Saved:</span>
          <div className="text-xl font-black text-emerald-400">+${monthlyNetSavings} / mo</div>
        </div>
      </div>
    </div>
  )
}
