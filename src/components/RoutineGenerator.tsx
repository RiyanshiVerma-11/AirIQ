import React, { useState, useCallback, useMemo } from 'react'
import { Clock, Sliders, Sparkles, ChevronDown, ChevronUp, Loader2, Wand2 } from 'lucide-react'
import type { AirQualityData, DailySmogRoutine, HouseholdProfile, RoutineTimeSlot } from '../types'
import {
  generateDynamicRoutine,
  synthesizeProgrammaticDynamicRoutine,
} from '../services/aiRoutineGenerator'
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
  const [isGeneratingAI, setIsGeneratingAI] = useState(false)
  const [customAIRoutine, setCustomAIRoutine] = useState<DailySmogRoutine | null>(null)

  const programmaticRoutine = useMemo(
    () => synthesizeProgrammaticDynamicRoutine(profile, airQualityData),
    [profile, airQualityData]
  )

  const routine = customAIRoutine ?? programmaticRoutine

  const handleTriggerGenAI = useCallback(async () => {
    setIsGeneratingAI(true)
    try {
      const generated = await generateDynamicRoutine(profile, airQualityData)
      setCustomAIRoutine(generated)
    } finally {
      setIsGeneratingAI(false)
    }
  }, [profile, airQualityData])

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Open Modern Header (No bounding box) */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-800/60 pb-5">
        <div className="space-y-1 max-w-2xl">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-cyan-400" />
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Winter Smog & Emission Routine
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Hour-by-hour schedule designed to shield your family’s lungs and avoid outdoor smog peaks in{' '}
            <strong className="text-slate-200">{airQualityData.location.name}</strong> (Current AQI: {airQualityData.aqi}).
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleTriggerGenAI}
            disabled={isGeneratingAI}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white text-xs font-bold shadow-md shadow-cyan-600/20 disabled:opacity-50 transition-all cursor-pointer"
          >
            {isGeneratingAI ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Wand2 className="w-3.5 h-3.5" />
            )}
            <span>{isGeneratingAI ? 'Synthesizing...' : 'Synthesize with AI'}</span>
          </button>

          <button
            onClick={() => setShowProfileEditor(!showProfileEditor)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800/60 hover:bg-slate-700/80 text-slate-300 hover:text-white border border-slate-700/60 text-xs font-medium transition-all cursor-pointer"
          >
            <Sliders className="w-3.5 h-3.5 text-cyan-400" />
            <span>{showProfileEditor ? 'Close Profile' : 'Edit Profile'}</span>
            {showProfileEditor ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Household Profile Customizer */}
      {showProfileEditor && (
        <ProfileCustomizer profile={profile} onUpdateProfile={onUpdateProfile} />
      )}

      {/* Open Metrics Strip */}
      <RoutineSummaryCards routine={routine} />

      {/* Hour-by-Hour Timeline Sequence */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Hour-by-Hour Smog Shield Schedule</span>
          </h2>
          <span className="text-[11px] text-slate-500">
            Updated dynamically at {routine.generatedAt}
          </span>
        </div>

        <div className="space-y-2.5">
          {routine.slots.map((slot: RoutineTimeSlot, index: number) => (
            <HourlySlotCard key={index} slot={slot} />
          ))}
        </div>
      </div>

      {/* Emergency Smog Checklist */}
      <EmergencyChecklist items={routine.emergencyChecklist} />
    </div>
  )
}
