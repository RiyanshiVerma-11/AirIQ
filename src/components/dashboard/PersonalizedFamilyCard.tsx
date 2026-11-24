import React from 'react'
import { Users, ShieldAlert, Car, MapPin, Edit3, CheckCircle } from 'lucide-react'
import type { OnboardingProfile } from '../../types/onboarding'
import type { HouseholdProfile } from '../../types'

interface PersonalizedFamilyCardProps {
  onboarding: OnboardingProfile
  profile: HouseholdProfile
  userName: string
  onEditProfile: () => void
}

export const PersonalizedFamilyCard: React.FC<PersonalizedFamilyCardProps> = ({
  onboarding,
  profile,
  userName,
  onEditProfile,
}) => {
  const adultsCount = profile.adults || 1
  const childrenCount = profile.children || 0
  const seniorsCount = profile.seniors || 0

  const childBrackets = onboarding.members
    .filter((m) => m.role === 'child' && m.ageBracket)
    .map((m) => {
      if (m.ageBracket === 'infant_0_2') return 'Infant (0–2y)'
      if (m.ageBracket === 'toddler_3_5') return 'Toddler (3–5y)'
      if (m.ageBracket === 'child_6_12') return 'Child (6–12y)'
      if (m.ageBracket === 'teen_13_17') return 'Teen (13–17y)'
      return 'Child'
    })

  // Format health sensitivities in plain English
  const healthBadges: string[] = []
  if (onboarding.health.hasAsthmaOrCOPD || profile.hasAsthmaOrCOPD) healthBadges.push('Asthma / COPD')
  if (onboarding.health.hasHeartCondition) healthBadges.push('Heart Condition')
  if (onboarding.health.isPregnant) healthBadges.push('Expecting Mother')
  if (onboarding.health.hasAllergies) healthBadges.push('Dust Allergy')

  // Commute mode plain English
  const commuteNames: Record<string, string> = {
    two_wheeler: 'Motorcycle / Scooter',
    car_diesel: 'Diesel Car',
    car_petrol: 'Petrol / EV Car',
    metro_subway: 'Metro / Subway',
    bus_transit: 'City Bus',
    walk_cycle: 'Walk / Bicycle',
    remote_wfh: 'Work From Home',
  }

  const commuteLabel = commuteNames[onboarding.lifestyle.commuteMode] || commuteNames[profile.commuteMode] || 'Daily Commute'
  const commuteKm = onboarding.lifestyle.dailyCommuteKm || profile.dailyCommuteKm || 15

  return (
    <div className="w-full rounded-2xl bg-slate-900/40 border border-slate-800/60 px-4 py-3 backdrop-blur-sm">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 text-xs">
        {/* Left: User Title & Connection Badge */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold shrink-0">
            <Users className="w-4 h-4 text-cyan-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-xs sm:text-sm">
                {userName ? `${userName}'s Family Profile` : 'Household CleanAir Setup'}
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.2 rounded-full bg-emerald-950/60 text-emerald-400 border border-emerald-800/40">
                <CheckCircle className="w-2.5 h-2.5" />
                <span>Active</span>
              </span>
            </div>
          </div>
        </div>

        {/* Center: Inline Glanceable Stats (No nested cards) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 lg:divide-x lg:divide-slate-800/60">
          {/* 1. Family Members */}
          <div className="flex items-center gap-2 lg:pl-4">
            <Users className="w-3.5 h-3.5 text-blue-400 shrink-0" />
            <div className="truncate">
              <div className="font-bold text-slate-200">
                {adultsCount}A{childrenCount > 0 ? ` • ${childrenCount} Kid${childrenCount > 1 ? 's' : ''}` : ''}{seniorsCount > 0 ? ` • ${seniorsCount}Sr` : ''}
              </div>
              <div className="text-[10px] text-slate-400 truncate">
                {childBrackets.length > 0 ? childBrackets.join(', ') : 'Standard vitality'}
              </div>
            </div>
          </div>

          {/* 2. Health Shield */}
          <div className="flex items-center gap-2 lg:pl-4">
            <ShieldAlert className="w-3.5 h-3.5 text-rose-400 shrink-0" />
            <div className="truncate">
              <div className="font-bold text-rose-300 truncate">
                {healthBadges.length > 0 ? healthBadges[0] : 'Standard Baseline'}
              </div>
              <div className="text-[10px] text-slate-400 truncate">
                {healthBadges.length > 0 ? 'Alerts trigger at AQI 80' : 'Alerts at AQI 150'}
              </div>
            </div>
          </div>

          {/* 3. Commute */}
          <div className="flex items-center gap-2 lg:pl-4">
            <Car className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <div className="truncate">
              <div className="font-bold text-slate-200 truncate">
                {commuteLabel}
              </div>
              <div className="text-[10px] text-slate-400 truncate">
                {commuteKm} km daily
              </div>
            </div>
          </div>

          {/* 4. Target Microclimate */}
          <div className="flex items-center gap-2 lg:pl-4">
            <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <div className="truncate">
              <div className="font-bold text-slate-200 truncate">
                {onboarding.location?.name || 'Selected City'}
              </div>
              <div className="text-[10px] text-slate-400 truncate">
                {onboarding.location?.region || 'Microclimate active'}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Quick Edit Profile */}
        <div className="shrink-0 flex items-center justify-end">
          <button
            onClick={onEditProfile}
            className="px-2.5 py-1 rounded-lg bg-slate-800/60 hover:bg-slate-700/80 border border-slate-700/60 text-slate-300 hover:text-white text-[11px] font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Edit3 className="w-3 h-3 text-cyan-400" />
            <span>Edit Profile</span>
          </button>
        </div>
      </div>
    </div>
  )
}
