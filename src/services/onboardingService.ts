// ─────────────────────────────────────────────────────────────
// AirIQ – Onboarding Service
// Persists wizard progress step-by-step so users can resume.
// ─────────────────────────────────────────────────────────────

import type { OnboardingProfile, OnboardingStep } from '../types/onboarding'
import { EMPTY_ONBOARDING_PROFILE } from '../types/onboarding'
import type { HouseholdProfile } from '../types'

const ONBOARDING_STORAGE_KEY = 'airiq_onboarding_profile'
const ONBOARDING_STEP_KEY = 'airiq_onboarding_step'

/** Load the full onboarding profile from localStorage. */
export function getOnboardingProfile(): OnboardingProfile {
  try {
    const raw = localStorage.getItem(ONBOARDING_STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {
    // corrupted — return empty
  }
  return { ...EMPTY_ONBOARDING_PROFILE }
}

/** Save a partial update to the onboarding profile. */
export function saveOnboardingProfile(profile: OnboardingProfile): void {
  localStorage.setItem(ONBOARDING_STORAGE_KEY, JSON.stringify(profile))
}

/** Save which step the user last completed or is on. */
export function saveOnboardingStep(step: OnboardingStep): void {
  localStorage.setItem(ONBOARDING_STEP_KEY, step)
}

/** Get the step the user was on (for resume). */
export function getOnboardingStep(): OnboardingStep | null {
  const raw = localStorage.getItem(ONBOARDING_STEP_KEY)
  return raw as OnboardingStep | null
}

/** Is the full wizard complete? */
export function isOnboardingComplete(): boolean {
  const profile = getOnboardingProfile()
  return profile.completedAt !== null
}

/** Mark onboarding as complete. */
export function completeOnboarding(profile: OnboardingProfile): OnboardingProfile {
  const completed = { ...profile, completedAt: new Date().toISOString() }
  saveOnboardingProfile(completed)
  localStorage.removeItem(ONBOARDING_STEP_KEY)
  return completed
}

/** Reset onboarding (for settings / re-onboard). */
export function resetOnboarding(): void {
  localStorage.removeItem(ONBOARDING_STORAGE_KEY)
  localStorage.removeItem(ONBOARDING_STEP_KEY)
}

/**
 * Convert the richer OnboardingProfile → legacy HouseholdProfile
 * so existing features (routine, swaps, action plan) keep working.
 */
export function toHouseholdProfile(onb: OnboardingProfile): HouseholdProfile {
  const adults = onb.members.filter((m) => m.role === 'adult').length
  const children = onb.members.filter((m) => m.role === 'child').length
  const seniors = onb.members.filter((m) => m.role === 'senior').length

  return {
    locationId: onb.location?.id ?? 'delhi',
    adults: Math.max(adults, 1),
    children,
    seniors,
    hasAsthmaOrCOPD: onb.health.hasAsthmaOrCOPD,
    hasPets: onb.health.hasPets,
    homeType: onb.lifestyle.homeType,
    homeAreaSqFt: onb.lifestyle.homeAreaSqFt,
    ventilationSealing: onb.lifestyle.ventilationSealing,
    existingPurifier: onb.lifestyle.existingPurifier,
    commuteMode: onb.lifestyle.commuteMode,
    dailyCommuteKm: onb.lifestyle.dailyCommuteKm,
    cookingFuel: onb.lifestyle.cookingFuel,
    winterHeating: onb.lifestyle.winterHeating,
    budgetSensitivity: onb.lifestyle.budgetSensitivity,
  }
}
