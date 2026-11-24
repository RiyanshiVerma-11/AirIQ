import { useState, useCallback } from 'react'
import type { HouseholdProfile } from '../types'
import { DEFAULT_HOUSEHOLD_PROFILE } from '../constants/defaults'

const STORAGE_KEY = 'airiq_household_profile'

export function useHouseholdProfile() {
  const [profile, setProfileState] = useState<HouseholdProfile>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        return JSON.parse(stored)
      }
    } catch {
      // fallback
    }
    return DEFAULT_HOUSEHOLD_PROFILE
  })

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
