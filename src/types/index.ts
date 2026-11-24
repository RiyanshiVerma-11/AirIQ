export interface LocationData {
  id: string
  name: string
  region: string
  country: string
  flag: string
  latitude: number
  longitude: number
  isCustom?: boolean
  typicalWinterPhenomenon: string
}

export interface AirQualityData {
  location: LocationData
  timestamp: string
  aqi: number // US AQI standard (0 - 500+)
  category: AirQualityCategory
  pm25: number // μg/m³
  pm10: number // μg/m³
  no2: number // μg/m³
  so2: number // μg/m³
  co: number // mg/m³
  o3: number // μg/m³
  temperature: number // °C
  humidity: number // %
  windSpeed: number // km/h
  windDirection: number // degrees
  inversionRisk: InversionRiskLevel
  inversionDescription: string
  boundaryLayerHeightM: number
  cigarettesEquivalent: number // Equivalent daily passive cigarettes
  lungParticulateRetentionMgPerDay: number // Estimated mg of PM2.5 deposited in alveolar sacs
  hourlyForecast: HourlyAQIForecast[]
}

export type AirQualityCategory =
  | 'Good'
  | 'Moderate'
  | 'Unhealthy for Sensitive Groups'
  | 'Unhealthy'
  | 'Very Unhealthy'
  | 'Hazardous'
  | 'Severe Emergency'

export type InversionRiskLevel = 'Low' | 'Moderate' | 'High' | 'Extreme'

export interface HourlyAQIForecast {
  time: string
  hour: number
  aqi: number
  pm25: number
  inversionTrapping: boolean
  isOptimalVentilationWindow: boolean
  isPeakSmogDanger: boolean
}

export interface HouseholdProfile {
  locationId: string
  adults: number
  children: number
  seniors: number
  hasAsthmaOrCOPD: boolean
  hasPets: boolean
  homeType: 'apartment' | 'independent_house' | 'ground_floor' | 'high_rise'
  homeAreaSqFt: number
  ventilationSealing: 'poor_drafty' | 'moderate' | 'well_sealed'
  existingPurifier: 'none' | 'diy_corsi_rosenthal' | 'commercial_hepa' | 'ac_filter_only'
  commuteMode: 'two_wheeler' | 'car_diesel' | 'car_petrol' | 'bus_transit' | 'metro_subway' | 'walk_cycle' | 'remote_wfh'
  dailyCommuteKm: number
  cookingFuel: 'lpg' | 'induction' | 'piped_gas' | 'traditional_biomass'
  winterHeating: 'reverse_ac_heatpump' | 'electric_radiator' | 'gas_heater' | 'wood_coal_angithi' | 'none'
  budgetSensitivity: 'low' | 'moderate' | 'strict_budget_diy'
}

export interface RoutineTimeSlot {
  timeRange: string
  hour: number
  title: string
  category: 'commute' | 'ventilation' | 'indoor_safe' | 'cooking' | 'exercise' | 'school_kids'
  riskLevel: 'safe' | 'moderate' | 'caution' | 'danger'
  actionableRecommendation: string
  scienceWhy: string
  emissionAvertedDescription: string
  exposureDropPercent: number
}

export interface DailySmogRoutine {
  profile: HouseholdProfile
  generatedAt: string
  overallExposureReductionPercent: number
  dailyAvertedEmissionsG: number // in grams of PM2.5
  peakInversionWindow: string
  bestVentilationWindow: string
  slots: RoutineTimeSlot[]
  emergencyChecklist: string[]
}

export interface IAQSimulationInput {
  outdoorPM25: number
  roomLengthM: number
  roomWidthM: number
  roomHeightM: number
  buildingSealingLevel: 'drafty' | 'standard' | 'weather_sealed'
  filtrationMode: 'none' | 'diy_box_fan_merv13' | 'diy_corsi_rosenthal_4filter' | 'hepa_compact' | 'hepa_premium'
  purifierCount: number
  indoorSources: {
    fryingCooking: boolean
    incenseCandles: boolean
    unventedGasHeater: boolean
    smoking: boolean
  }
}

export interface IAQSimulationResult {
  roomVolumeM3: number
  airChangesPerHourACH: number
  totalCADR_CFM: number
  equilibriumIndoorPM25: number
  indoorCategory: AirQualityCategory
  cleanAirRetentionPercent: number
  minutesToCleanRoom90Pct: number
  naturalInfiltrationACH: number
  filtrationACH: number
  diyCostEstimateUsd: number
  commercialEquivalentCostUsd: number
  annualElectricityKwh: number
}

export interface SustainableAlternative {
  id: string
  title: string
  category: 'commute' | 'cooking_heating' | 'waste_leaf' | 'indoor_filtration' | 'community_advocacy'
  baselineBehavior: string
  sustainableAlternative: string
  pm25AvertedGramsPerMonth: number
  co2AvertedKgPerMonth: number
  personalExposureDropPct: number
  householdSavingsPerMonthUsd: number
  communityMultiplierImpact: string
  scienceExplanation: string
  actionSteps: string[]
  difficultyLevel: 'Easy' | 'Moderate' | 'High Impact'
}

export interface CommunityReport {
  id: string
  timestamp: string
  reporterName: string
  locationNeighborhood: string
  category: 'biomass_leaf_burning' | 'construction_dust_uncovered' | 'vehicular_idling_hotspot' | 'illegal_waste_incineration'
  severity: 'moderate' | 'high' | 'critical'
  description: string
  evidenceSimulatedUrl?: string
  status: 'reported' | 'investigating' | 'mitigated'
  upvotes: number
}

export interface CommunityChallenge {
  id: string
  title: string
  description: string
  participantsCount: number
  targetAvertedPM25Kg: number
  currentAvertedPM25Kg: number
  daysLeft: number
  joined: boolean
  icon: string
}

export interface ChatMessage {
  id: string
  sender: 'user' | 'assistant'
  text: string
  timestamp: string
  quickActions?: string[]
  scientificSources?: string[]
}
