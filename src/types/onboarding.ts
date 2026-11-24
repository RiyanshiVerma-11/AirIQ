// ─────────────────────────────────────────────────────────────
// AirIQ – Auth & Onboarding Type Definitions
// ─────────────────────────────────────────────────────────────

import type { LocationData } from './index'

/** Persistent user account stored in auth layer. */
export interface UserAccount {
  id: string
  name: string
  email: string
  avatarUrl?: string
  createdAt: string
}

/** Auth state shape consumed by the AuthContext. */
export interface AuthState {
  user: UserAccount | null
  isAuthenticated: boolean
  isLoading: boolean
  isGuest: boolean
}

/** Which step of the wizard the user is currently on. */
export type OnboardingStep =
  | 'location'
  | 'household'
  | 'health'
  | 'lifestyle'
  | 'goals'
  | 'summary'

export const ONBOARDING_STEPS: OnboardingStep[] = [
  'location',
  'household',
  'health',
  'lifestyle',
  'goals',
  'summary',
]

/** Child age bracket – drives pediatric Aura persona auto-select. */
export type ChildAgeBracket = 'infant_0_2' | 'toddler_3_5' | 'child_6_12' | 'teen_13_17'

/** Household member definition – richer than the flat profile. */
export interface HouseholdMember {
  role: 'adult' | 'child' | 'senior'
  ageBracket?: ChildAgeBracket
}

/** Health sensitivities – privacy-sensitive flags. */
export interface HealthFlags {
  hasAsthmaOrCOPD: boolean
  hasHeartCondition: boolean
  isPregnant: boolean
  hasAllergies: boolean
  hasPets: boolean
}

/** Lifestyle choices – commute, cooking, heating. */
export interface LifestyleProfile {
  commuteMode: 'two_wheeler' | 'car_diesel' | 'car_petrol' | 'bus_transit' | 'metro_subway' | 'walk_cycle' | 'remote_wfh'
  dailyCommuteKm: number
  departureTime: string
  cookingFuel: 'lpg' | 'induction' | 'piped_gas' | 'traditional_biomass'
  winterHeating: 'reverse_ac_heatpump' | 'electric_radiator' | 'gas_heater' | 'wood_coal_angithi' | 'none'
  homeType: 'apartment' | 'independent_house' | 'ground_floor' | 'high_rise'
  homeAreaSqFt: number
  ventilationSealing: 'poor_drafty' | 'moderate' | 'well_sealed'
  existingPurifier: 'none' | 'diy_corsi_rosenthal' | 'commercial_hepa' | 'ac_filter_only'
  budgetSensitivity: 'low' | 'moderate' | 'strict_budget_diy'
}

/** Goal intent cards – multi-select. */
export type UserGoal =
  | 'protect_family'
  | 'understand_science'
  | 'reduce_footprint'
  | 'ai_guidance'

/** Full onboarding profile – persisted upon wizard completion. */
export interface OnboardingProfile {
  location: LocationData | null
  members: HouseholdMember[]
  health: HealthFlags
  lifestyle: LifestyleProfile
  goals: UserGoal[]
  completedAt: string | null
}

/** Default empty onboarding profile used as the starting state. */
export const EMPTY_ONBOARDING_PROFILE: OnboardingProfile = {
  location: null,
  members: [{ role: 'adult' }],
  health: {
    hasAsthmaOrCOPD: false,
    hasHeartCondition: false,
    isPregnant: false,
    hasAllergies: false,
    hasPets: false,
  },
  lifestyle: {
    commuteMode: 'car_petrol',
    dailyCommuteKm: 15,
    departureTime: '08:30',
    cookingFuel: 'lpg',
    winterHeating: 'none',
    homeType: 'apartment',
    homeAreaSqFt: 1000,
    ventilationSealing: 'moderate',
    existingPurifier: 'none',
    budgetSensitivity: 'moderate',
  },
  goals: [],
  completedAt: null,
}
