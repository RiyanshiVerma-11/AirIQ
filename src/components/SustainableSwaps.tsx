import React, { useState } from 'react'
import { Flame, ShieldCheck } from 'lucide-react'
import type { HouseholdProfile } from '../types'
import { SUSTAINABLE_ALTERNATIVES } from '../constants/alternatives'
import { calculateHouseholdImpact } from '../services/alternativesEngineService'
import { HouseholdImpactGrid } from './swaps/HouseholdImpactGrid'
import { CustomHabitCalculator } from './swaps/CustomHabitCalculator'
import { CommunityScaleSlider } from './swaps/CommunityScaleSlider'
import { AlternativeCard } from './swaps/AlternativeCard'

interface SustainableSwapsProps {
  profile: HouseholdProfile
}

export const SustainableSwaps: React.FC<SustainableSwapsProps> = ({ profile }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [communityScale, setCommunityScale] = useState<number>(1000)

  const householdImpact = calculateHouseholdImpact(profile)

  const filteredAlternatives =
    selectedCategory === 'all'
      ? SUSTAINABLE_ALTERNATIVES
      : SUSTAINABLE_ALTERNATIVES.filter((a) => a.category === selectedCategory)

  // Community multiplier calculations (4 winter months)
  const communityPM25Kg = Math.round(
    (communityScale * (householdImpact.monthlyPM25AvertedG || 140) * 4) / 1000
  )
  const communityCO2Tons = Math.round(
    (communityScale * (householdImpact.monthlyCO2AvertedKg || 120) * 4) / 1000
  )
  const equivalentDieselCarsRemoved = Math.round(communityScale * 0.75)
  const estimatedERVisitsAvoided = Math.round(communityScale * 0.18)

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-5 sm:p-6 rounded-2xl border border-slate-800 bg-slate-900/90 shadow-xl space-y-2">
        <div className="flex items-center gap-2">
          <Flame className="w-5 h-5 text-emerald-400" />
          <h1 className="text-xl sm:text-2xl font-extrabold text-white">
            Sustainable Alternatives & Quantified Impact Engine
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-slate-300">
          Transform daily winter routines into clean-air choices with clear scientific explanations and quantified health & emission savings.
        </p>
      </div>

      {/* Personalized Household Clean-Air Dashboard */}
      <HouseholdImpactGrid impact={householdImpact} />

      {/* Dynamic Custom Commute & Habit Calculator */}
      <CustomHabitCalculator />

      {/* Community Multiplier Simulator */}
      <CommunityScaleSlider
        scale={communityScale}
        onScaleChange={setCommunityScale}
        pm25Kg={communityPM25Kg}
        co2Tons={communityCO2Tons}
        dieselCarsRemoved={equivalentDieselCarsRemoved}
        erVisitsAvoided={estimatedERVisitsAvoided}
      />

      {/* Sustainable Alternatives Catalog */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            Curated Sustainable Alternatives Catalog
          </h2>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            {[
              { id: 'all', label: 'All Categories' },
              { id: 'commute', label: 'Transit & Commute' },
              { id: 'cooking_heating', label: 'Heating & Cooking' },
              { id: 'waste_leaf', label: 'Anti-Leaf Burning' },
              { id: 'indoor_filtration', label: 'Indoor Sanctuaries' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1 rounded-lg font-medium whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-cyan-600 text-white'
                    : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {filteredAlternatives.map((alt) => (
            <AlternativeCard key={alt.id} alt={alt} />
          ))}
        </div>
      </div>
    </div>
  )
}
