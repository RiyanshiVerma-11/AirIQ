import {
  AirQualityCategory,
  IAQSimulationInput,
  IAQSimulationResult,
} from '../types'
import { getCategoryFromAQI } from './airQualityService'
import { SCIENCE_BACKED_HACKS, type DIYHackGuide } from '../constants/hacks'

export { SCIENCE_BACKED_HACKS, type DIYHackGuide }

export function simulateIndoorAirQuality(input: IAQSimulationInput): IAQSimulationResult {
  const roomVolumeM3 = Math.max(10, input.roomLengthM * input.roomWidthM * input.roomHeightM)

  // Infiltration rate and penetration factor based on building sealing
  let naturalInfiltrationACH = 0.6
  let penetrationFactor = 0.55

  switch (input.buildingSealingLevel) {
    case 'drafty':
      naturalInfiltrationACH = 1.2
      penetrationFactor = 0.75
      break
    case 'standard':
      naturalInfiltrationACH = 0.6
      penetrationFactor = 0.55
      break
    case 'weather_sealed':
      naturalInfiltrationACH = 0.28
      penetrationFactor = 0.35
      break
  }

  // CADR (Clean Air Delivery Rate) per unit in CFM
  let unitCADR_CFM = 0
  let unitCostUsd = 0
  let commercialCostUsd = 0
  let powerWatts = 0

  switch (input.filtrationMode) {
    case 'none':
      unitCADR_CFM = 0
      unitCostUsd = 0
      commercialCostUsd = 0
      powerWatts = 0
      break
    case 'diy_box_fan_merv13':
      unitCADR_CFM = 220
      unitCostUsd = 40
      commercialCostUsd = 180
      powerWatts = 55
      break
    case 'diy_corsi_rosenthal_4filter':
      unitCADR_CFM = 485
      unitCostUsd = 65
      commercialCostUsd = 420
      powerWatts = 65
      break
    case 'hepa_compact':
      unitCADR_CFM = 140
      unitCostUsd = 120
      commercialCostUsd = 120
      powerWatts = 35
      break
    case 'hepa_premium':
      unitCADR_CFM = 310
      unitCostUsd = 350
      commercialCostUsd = 350
      powerWatts = 60
      break
  }

  const totalCADR_CFM = unitCADR_CFM * input.purifierCount
  // 1 CFM = 1.69901 m³/h
  const cadrM3H = totalCADR_CFM * 1.69901
  const filtrationACH = cadrM3H / roomVolumeM3

  // Natural surface deposition rate for PM2.5 in typical residential setting (~0.15 h⁻¹)
  const kDepositionRate = 0.15

  // Indoor particulate generation sources (μg/h)
  let indoorSourceRateUgPerHour = 0
  if (input.indoorSources.fryingCooking) indoorSourceRateUgPerHour += 12000 // Frying / tadka releases massive fine carbon
  if (input.indoorSources.incenseCandles) indoorSourceRateUgPerHour += 9500 // Incense sticks release high particulate load
  if (input.indoorSources.unventedGasHeater) indoorSourceRateUgPerHour += 4500
  if (input.indoorSources.smoking) indoorSourceRateUgPerHour += 28000

  // Mass balance steady state:
  // C_in = [ACH_inf * P * C_out + (Source / Volume)] / [ACH_inf + ACH_purifier + k_dep]
  const outdoorInflowTerm = naturalInfiltrationACH * penetrationFactor * input.outdoorPM25
  const indoorSourceTerm = indoorSourceRateUgPerHour / roomVolumeM3
  const totalRemovalACH = naturalInfiltrationACH + filtrationACH + kDepositionRate

  const equilibriumPM25Raw = (outdoorInflowTerm + indoorSourceTerm) / totalRemovalACH
  const equilibriumIndoorPM25 = Math.max(3, Math.round(equilibriumPM25Raw * 10) / 10)

  // Estimated AQI from indoor PM2.5 (simplified linear approximation for EPA range)
  let estimatedIndoorAQI = equilibriumIndoorPM25 * 1.3
  if (equilibriumIndoorPM25 > 35) estimatedIndoorAQI = 50 + (equilibriumIndoorPM25 - 12) * 2.1
  const indoorCategory: AirQualityCategory = getCategoryFromAQI(estimatedIndoorAQI)

  // Clean Air Retention: % reduction relative to raw outdoor air
  const reductionFraction = Math.max(0, 1 - equilibriumIndoorPM25 / (input.outdoorPM25 || 1))
  const cleanAirRetentionPercent = Math.round(reductionFraction * 100)

  // Time to achieve 90% steady state cleanup: t_90 = ln(10) / totalRemovalACH * 60 minutes
  const minutesToCleanRoom90Pct = Math.round((Math.log(10) / totalRemovalACH) * 60)

  const diyCostEstimateUsd = unitCostUsd * input.purifierCount
  const commercialEquivalentCostUsd = commercialCostUsd * input.purifierCount
  const annualElectricityKwh = Math.round(((powerWatts * input.purifierCount * 12 * 120) / 1000)) // 12 hours/day for 120 winter days

  return {
    roomVolumeM3: Math.round(roomVolumeM3 * 10) / 10,
    airChangesPerHourACH: Math.round(totalRemovalACH * 10) / 10,
    totalCADR_CFM,
    equilibriumIndoorPM25,
    indoorCategory,
    cleanAirRetentionPercent,
    minutesToCleanRoom90Pct,
    naturalInfiltrationACH: Math.round(naturalInfiltrationACH * 100) / 100,
    filtrationACH: Math.round(filtrationACH * 10) / 10,
    diyCostEstimateUsd,
    commercialEquivalentCostUsd,
    annualElectricityKwh,
  }
}


