import { useState, useCallback, useEffect } from 'react'
import type { HouseholdProfile } from '../types'
import { DEFAULT_HOUSEHOLD_PROFILE } from '../constants/defaults'
import { getOnboardingProfile, toHouseholdProfile } from '../services/onboardingService'

const STORAGE_KEY = 'airiq_household_profile'

export function useHouseholdProfile() {
  const [profile, setProfileState] = useState<HouseholdProfile>(() => {
    try {
      // 1. First check if onboarding profile has been completed
      const onb = getOnboardingProfile()
      if (onb.completedAt) {
        return toHouseholdProfile(onb)
      }

      // 2. Fall back to existing raw household profile in localStorage
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        return JSON.parse(stored)
      }
    } catch {
      // fallback
    }
    return DEFAULT_HOUSEHOLD_PROFILE
  })

  // Listen to storage events to keep tabs in sync if onboarding updates
  useEffect(() => {
    const handleSync = () => {
      const onb = getOnboardingProfile()
      if (onb.completedAt) {
        setProfileState(toHouseholdProfile(onb))
      }
    }
    window.addEventListener('storage', handleSync)
    return () => window.removeEventListener('storage', handleSync)
  }, [])

  const updateProfile = useCallback((newProfile: HouseholdProfile) => {
    setProfileState(newProfile)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newProfile))
    } catch (err) {
      console.error('Failed to save profile to localStorage', err)
    }
  }, [])

  const resetProfile = useCallback(() => {
    setProfileState(DEFAULT_HOUSEHOLD_PROFILE)
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch (err) {
      console.error('Failed to reset profile', err)
    }
  }, [])

  return {
    profile,
    updateProfile,
    resetProfile,
  }
}
