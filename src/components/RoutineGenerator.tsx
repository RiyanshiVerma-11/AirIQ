import React, { useState } from 'react'
import { Clock, Sliders, Sparkles, ChevronDown, ChevronUp } from 'lucide-react'
import type { AirQualityData, HouseholdProfile } from '../types'
import { generateDailySmogRoutine } from '../services/routineGeneratorService'
import { ProfileCustomizer } from './routine/ProfileCustomizer'
import { RoutineSummaryCards } from './routine/RoutineSummaryCards'
import { HourlySlotCard } from './routine/HourlySlotCard'
import { EmergencyChecklist } from './routine/EmergencyChecklist'

interface RoutineGeneratorProps {
  profile: HouseholdProfile
  onUpdateProfile: (newProfile: HouseholdProfile) => void
  airQualityData: AirQualityData
}

export const RoutineGenerator: React.FC<RoutineGeneratorProps> = ({
  profile,
  onUpdateProfile,
  airQualityData,
}) => {
  const [showProfileEditor, setShowProfileEditor] = useState(false)
  const routine = generateDailySmogRoutine(profile, airQualityData)

  return (
    <div className="space-y-6">
      {/* Top Banner & Profile Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border border-slate-800 bg-slate-900/90 shadow-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl sm:text-2xl font-extrabold text-white">
              Personalized Winter Smog & Emission Routine
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-300">
            Tailored hour-by-hour schedule designed to shield your family’s lungs and eliminate discretionary winter emissions in{' '}
            <strong className="text-white">{airQualityData.location.name}</strong> (AQI: {airQualityData.aqi}).
          </p>
        </div>

        <button
          onClick={() => setShowProfileEditor(!showProfileEditor)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-all self-start sm:self-center"
        >
          <Sliders className="w-3.5 h-3.5 text-cyan-400" />
          <span>{showProfileEditor ? 'Close Household Profile' : 'Edit Household Profile'}</span>
          {showProfileEditor ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Household Profile Customizer */}
      {showProfileEditor && (
        <ProfileCustomizer profile={profile} onUpdateProfile={onUpdateProfile} />
      )}

      {/* Routine Key Metrics Summary Bar */}
      <RoutineSummaryCards routine={routine} />

      {/* Hour-by-Hour Timeline Sequence */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            Hour-by-Hour Smog Shield Schedule
          </h2>
          <span className="text-xs text-slate-400">
            Ground-truth atmospheric physics combined with family safety protocols
          </span>
        </div>

        <div className="space-y-3">
          {routine.slots.map((slot, index) => (
            <HourlySlotCard key={index} slot={slot} />
          ))}
        </div>
      </div>

      {/* Emergency Smog Checklist */}
      <EmergencyChecklist items={routine.emergencyChecklist} />
    </div>
  )
}
