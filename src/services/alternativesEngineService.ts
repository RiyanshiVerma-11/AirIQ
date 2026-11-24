import { HouseholdProfile, SustainableAlternative } from '../types'
import { SUSTAINABLE_ALTERNATIVES } from '../constants/alternatives'

export { SUSTAINABLE_ALTERNATIVES }

export interface HouseholdImpactSummary {
  monthlyPM25AvertedG: number
  monthlyCO2AvertedKg: number
  monthlyNOxAvertedG: number
  annualMoneySavedUsd: number
  personalExposureDropPercent: number
  cigarettesAvoidedPerYear: number
  recommendedSwaps: SustainableAlternative[]
}

export function calculateHouseholdImpact(profile: HouseholdProfile): HouseholdImpactSummary {
  let monthlyPM25G = 0
  let monthlyCO2Kg = 0
  let monthlyNOxG = 0
  let monthlyMoneySaved = 0
  let totalExposureDrop = 0

  const recommendedSwaps: SustainableAlternative[] = []

  // Commute evaluation
  if (profile.commuteMode === 'car_diesel' || profile.commuteMode === 'car_petrol') {
    const commuteKm = profile.dailyCommuteKm || 20
    const factor = commuteKm / 20
    const pmG = Math.round(85 * factor)
    const co2Kg = Math.round(120 * factor)
    monthlyPM25G += pmG
    monthlyCO2Kg += co2Kg
    monthlyNOxG += Math.round(95 * factor)
    monthlyMoneySaved += Math.round(75 * factor)
    totalExposureDrop += 25

    const alt = SUSTAINABLE_ALTERNATIVES.find((a) => a.id === 'commute-metro-switch')
    if (alt) recommendedSwaps.push(alt)
  }

  // Heating evaluation
  if (profile.winterHeating === 'wood_coal_angithi' || profile.winterHeating === 'gas_heater') {
    monthlyPM25G += 420
    monthlyCO2Kg += 160
    monthlyNOxG += 180
    monthlyMoneySaved += 40
    totalExposureDrop += 35

    const alt = SUSTAINABLE_ALTERNATIVES.find((a) => a.id === 'heating-clean-heatpump')
    if (alt) recommendedSwaps.push(alt)
  }

  // Cooking evaluation
  if (profile.cookingFuel === 'traditional_biomass' || profile.cookingFuel === 'lpg') {
    monthlyPM25G += 28
    monthlyCO2Kg += 35
    monthlyNOxG += 45
    monthlyMoneySaved += 15
    totalExposureDrop += 15

    const alt = SUSTAINABLE_ALTERNATIVES.find((a) => a.id === 'cooking-clean-induction')
    if (alt) recommendedSwaps.push(alt)
  }

  // Waste & Indoor evaluation
  if (profile.existingPurifier === 'none' || profile.existingPurifier === 'ac_filter_only') {
    monthlyPM25G += 110
    totalExposureDrop += 30
    const alt = SUSTAINABLE_ALTERNATIVES.find((a) => a.id === 'diy-air-sanctuary')
    if (alt) recommendedSwaps.push(alt)
  }

  const leafAlt = SUSTAINABLE_ALTERNATIVES.find((a) => a.id === 'waste-anti-leaf-burning')
  if (leafAlt && !recommendedSwaps.includes(leafAlt)) {
    recommendedSwaps.push(leafAlt)
  }

  // Cap exposure drop at 88%
  const normalizedExposureDrop = Math.min(88, Math.max(30, totalExposureDrop))
  const annualMoneySavedUsd = monthlyMoneySaved * 12
  // 22 μg/m³ for 24h = 1 cigarette. With average inhalation of 15 m³/day:
  const cigarettesAvoidedPerYear = Math.round((monthlyPM25G * 12 * 1000) / (22 * 15 * 30))

  return {
    monthlyPM25AvertedG: monthlyPM25G,
    monthlyCO2AvertedKg: monthlyCO2Kg,
    monthlyNOxAvertedG: monthlyNOxG,
    annualMoneySavedUsd,
    personalExposureDropPercent: normalizedExposureDrop,
    cigarettesAvoidedPerYear: Math.max(45, cigarettesAvoidedPerYear),
    recommendedSwaps,
  }
}
