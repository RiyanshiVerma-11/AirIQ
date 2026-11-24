import type { HouseholdProfile } from '../types'

export const DEFAULT_HOUSEHOLD_PROFILE: HouseholdProfile = {
  locationId: 'delhi',
  adults: 2,
  children: 1,
  seniors: 1,
  hasAsthmaOrCOPD: true,
  hasPets: false,
  homeType: 'apartment',
  homeAreaSqFt: 1200,
  ventilationSealing: 'moderate',
  existingPurifier: 'commercial_hepa',
  commuteMode: 'car_diesel',
  dailyCommuteKm: 22,
  cookingFuel: 'lpg',
  winterHeating: 'reverse_ac_heatpump',
  budgetSensitivity: 'moderate',
}
