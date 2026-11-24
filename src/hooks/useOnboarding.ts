// ─────────────────────────────────────────────────────────────
// AirIQ – useOnboarding hook
// Step navigation, partial persistence, validation.
// ─────────────────────────────────────────────────────────────

import { useState, useCallback } from 'react'
import type { OnboardingProfile, OnboardingStep } from '../types/onboarding'
import { ONBOARDING_STEPS, EMPTY_ONBOARDING_PROFILE } from '../types/onboarding'
import * as onboardingService from '../services/onboardingService'

export function useOnboarding() {
  const [profile, setProfile] = useState<OnboardingProfile>(() => {
    return onboardingService.getOnboardingProfile()
  })

  const [currentStepIndex, setCurrentStepIndex] = useState<number>(() => {
    const savedStep = onboardingService.getOnboardingStep()
    if (savedStep) {
      const idx = ONBOARDING_STEPS.indexOf(savedStep)
      return idx >= 0 ? idx : 0
    }
    return 0
  })

  const currentStep = ONBOARDING_STEPS[currentStepIndex]
  const totalSteps = ONBOARDING_STEPS.length
  const isFirstStep = currentStepIndex === 0
  const isLastStep = currentStepIndex === totalSteps - 1
  const progressPercent = ((currentStepIndex + 1) / totalSteps) * 100

  const updateProfile = useCallback((partial: Partial<OnboardingProfile>) => {
    setProfile((prev) => {
      const updated = { ...prev, ...partial }
      onboardingService.saveOnboardingProfile(updated)
      return updated
    })
  }, [])

  const nextStep = useCallback(() => {
    setCurrentStepIndex((prev) => {
      const next = Math.min(prev + 1, totalSteps - 1)
      onboardingService.saveOnboardingStep(ONBOARDING_STEPS[next])
      return next
    })
  }, [totalSteps])

  const prevStep = useCallback(() => {
    setCurrentStepIndex((prev) => {
      const next = Math.max(prev - 1, 0)
      onboardingService.saveOnboardingStep(ONBOARDING_STEPS[next])
      return next
    })
  }, [])

  const goToStep = useCallback((step: OnboardingStep) => {
    const idx = ONBOARDING_STEPS.indexOf(step)
    if (idx >= 0) {
      setCurrentStepIndex(idx)
      onboardingService.saveOnboardingStep(step)
    }
  }, [])

  const completeOnboarding = useCallback(() => {
    const completed = onboardingService.completeOnboarding(profile)
    setProfile(completed)
    return completed
  }, [profile])

  const resetOnboarding = useCallback(() => {
    onboardingService.resetOnboarding()
    setProfile({ ...EMPTY_ONBOARDING_PROFILE })
    setCurrentStepIndex(0)
  }, [])

  return {
    profile,
    currentStep,
    currentStepIndex,
    totalSteps,
    isFirstStep,
    isLastStep,
    progressPercent,
    updateProfile,
    nextStep,
    prevStep,
    goToStep,
    completeOnboarding,
    resetOnboarding,
  }
}
