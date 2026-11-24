import React from 'react'
import { Users, ShieldAlert, Car, MapPin, Edit3 } from 'lucide-react'
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
      if (m.ageBracket === 'infant_0_2') return 'Infant (0–2 yrs)'
      if (m.ageBracket === 'toddler_3_5') return 'Toddler (3–5 yrs)'
      if (m.ageBracket === 'child_6_12') return 'Child (6–12 yrs)'
      if (m.ageBracket === 'teen_13_17') return 'Teen (13–17 yrs)'
      return 'Child'
    })

  // Format health sensitivities in plain English
  const healthBadges: string[] = []
  if (onboarding.health.hasAsthmaOrCOPD || profile.hasAsthmaOrCOPD) healthBadges.push('Asthma / Wheezing')
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

  return (
    <div className="rounded-3xl border border-cyan-800/50 bg-gradient-to-r from-slate-900 via-slate-900/95 to-cyan-950/30 p-5 sm:p-6 shadow-xl space-y-4">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3.5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center text-cyan-400 font-bold shrink-0">
            <Users className="w-5 h-5 text-cyan-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-black text-white">
                Personalized CleanAir Plan for {userName || 'Your Family'}
              </h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-950/60 text-emerald-300 border border-emerald-800/50">
                Connected & Active
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              These are the exact household settings you provided in your onboarding setup.
            </p>
          </div>
        </div>

        <button
          onClick={onEditProfile}
          className="self-start sm:self-auto px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-750 border border-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
        >
          <Edit3 className="w-3.5 h-3.5 text-cyan-400" />
          <span>Edit Profile</span>
        </button>
      </div>

      {/* 4 Connected Fact Blocks */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        {/* 1. Household Composition */}
        <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1.5">
          <div className="flex items-center gap-1.5 text-slate-400 font-semibold text-[11px]">
            <Users className="w-3.5 h-3.5 text-blue-400" />
            <span>Your Family Setup</span>
          </div>
          <div className="text-sm font-black text-white">
            {adultsCount} Adult{adultsCount > 1 ? 's' : ''}
            {childrenCount > 0 && ` • ${childrenCount} Kid${childrenCount > 1 ? 's' : ''}`}
            {seniorsCount > 0 && ` • ${seniorsCount} Senior${seniorsCount > 1 ? 's' : ''}`}
          </div>
          <div className="text-[11px] text-slate-400">
            {childBrackets.length > 0 ? (
              <span className="text-amber-300 font-medium">{childBrackets.join(', ')}</span>
            ) : (
              <span>Standard adult vital capacity</span>
            )}
          </div>
        </div>

        {/* 2. Medical & Respiratory Shields */}
        <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1.5">
          <div className="flex items-center gap-1.5 text-slate-400 font-semibold text-[11px]">
            <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
            <span>Health Protections</span>
          </div>
          <div className="text-sm font-black text-white">
            {healthBadges.length > 0 ? (
              <span className="text-rose-300 font-bold">{healthBadges[0]}</span>
            ) : (
              <span className="text-emerald-300">Standard Baseline</span>
            )}
          </div>
          <div className="text-[11px] text-slate-400">
            {healthBadges.length > 0 ? (
              <span>Alerts trigger earlier (at AQI 80)</span>
            ) : (
              <span>Alerts trigger at standard AQI 150</span>
            )}
          </div>
        </div>

        {/* 3. Daily Commute */}
        <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1.5">
          <div className="flex items-center gap-1.5 text-slate-400 font-semibold text-[11px]">
            <Car className="w-3.5 h-3.5 text-cyan-400" />
            <span>Your Commute</span>
          </div>
          <div className="text-sm font-black text-white">
            {commuteLabel}
          </div>
          <div className="text-[11px] text-slate-400">
            {onboarding.lifestyle.dailyCommuteKm || profile.dailyCommuteKm} km daily • Departs {onboarding.lifestyle.departureTime || '08:30 AM'}
          </div>
        </div>

        {/* 4. Target City & Atmosphere */}
        <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1.5">
          <div className="flex items-center gap-1.5 text-slate-400 font-semibold text-[11px]">
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            <span>Atmosphere Location</span>
          </div>
          <div className="text-sm font-black text-white truncate">
            {onboarding.location?.name || 'Selected City'}
          </div>
          <div className="text-[11px] text-slate-400 truncate">
            {onboarding.location?.region || 'Local microclimate tracking active'}
          </div>
        </div>
      </div>
    </div>
  )
}
