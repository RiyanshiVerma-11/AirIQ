import React from 'react'
import type { AirQualityData, HouseholdProfile } from '../types'
import { AQIHeroCard } from './dashboard/AQIHeroCard'
import { PhysiologicalExposureCard } from './dashboard/PhysiologicalExposureCard'
import { DiurnalTimeline } from './dashboard/DiurnalTimeline'
import { PollutantBreakdownGrid } from './dashboard/PollutantBreakdownGrid'
import { PersonalizedFamilyCard } from './dashboard/PersonalizedFamilyCard'
import { QuickFamilyGuidance } from './dashboard/QuickFamilyGuidance'
import { useAuthContext } from '../contexts/useAuthContext'
import { getOnboardingProfile } from '../services/onboardingService'

interface AQIDashboardProps {
  data: AirQualityData
  onNavigateTab: (tabId: string) => void
  profile: HouseholdProfile
  onOpenSettings?: () => void
}

export const AQIDashboard: React.FC<AQIDashboardProps> = ({
  data,
  onNavigateTab,
  profile,
  onOpenSettings,
}) => {
  const { user } = useAuthContext()
  const onboarding = getOnboardingProfile()

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* 1. Personalized Connected Family Profile Banner */}
      <PersonalizedFamilyCard
        onboarding={onboarding}
        profile={profile}
        userName={user?.name || ''}
        onEditProfile={() => onOpenSettings?.()}
      />

      {/* 2. Quick Family Guidance (Can kids play? Windows? Mask? Commute?) */}
      <QuickFamilyGuidance
        data={data}
        profile={profile}
        onboarding={onboarding}
        onNavigateTab={onNavigateTab}
      />

      {/* 3. Master Air Quality Hero Card */}
      <AQIHeroCard data={data} onNavigateTab={onNavigateTab} />

      {/* 4. What Breathing Outside Feels Like (Cigarette equivalence & Lung protection) */}
      <PhysiologicalExposureCard data={data} />

      {/* 5. 24-Hour Clean Air Schedule (Diurnal Inversion Cycles in plain words) */}
      <DiurnalTimeline hourlyForecast={data.hourlyForecast} />

      {/* 6. Pollutants in Plain Words */}
      <PollutantBreakdownGrid data={data} />
    </div>
  )
}
