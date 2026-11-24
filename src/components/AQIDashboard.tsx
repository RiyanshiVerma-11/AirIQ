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
    <div className="space-y-6 sm:space-y-7 animate-in fade-in duration-200">
      {/* 1. Master Air Quality Ambient Hero Splash */}
      <AQIHeroCard data={data} onNavigateTab={onNavigateTab} />

      {/* 2. Personalized Connected Family HUD Ribbon */}
      <PersonalizedFamilyCard
        onboarding={onboarding}
        profile={profile}
        userName={user?.name || ''}
        onEditProfile={() => onOpenSettings?.()}
      />

      {/* 3. Immediate Family Action Advisory (Outdoor Play, Windows, Mask, Commute) */}
      <QuickFamilyGuidance
        data={data}
        profile={profile}
        onboarding={onboarding}
        onNavigateTab={onNavigateTab}
      />

      {/* 4. Real-World Lung Impact & Atmospheric Trap (Cigarette equiv, Lung retention, Smog lid) */}
      <PhysiologicalExposureCard data={data} />

      {/* 5. 24-Hour Clean Air Schedule (Diurnal Inversion Cycles) */}
      <DiurnalTimeline hourlyForecast={data.hourlyForecast} />

      {/* 6. Pollutants in Plain Words */}
      <PollutantBreakdownGrid data={data} />
    </div>
  )
}
