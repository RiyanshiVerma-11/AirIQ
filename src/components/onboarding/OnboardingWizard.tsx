import React from 'react'
import { ArrowLeft, ArrowRight, CheckCircle2, Wind } from 'lucide-react'
import { useOnboarding } from '../../hooks/useOnboarding'
import { StepLocation } from './StepLocation'
import { StepHousehold } from './StepHousehold'
import { StepHealth } from './StepHealth'
import { StepLifestyle } from './StepLifestyle'
import { StepGoals } from './StepGoals'
import { StepSummary } from './StepSummary'
import { PRESET_LOCATIONS } from '../../constants/locations'
import type { LocationData } from '../../types'

interface OnboardingWizardProps {
  userName: string
  onCompleteOnboarding: (selectedLocation: LocationData | null) => void
  onSkip?: () => void
}

export const OnboardingWizard: React.FC<OnboardingWizardProps> = ({
  userName,
  onCompleteOnboarding,
  onSkip,
}) => {
  const {
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
    completeOnboarding,
  } = useOnboarding()

  // Make sure a default location exists if none selected
  const activeLocation = profile.location || PRESET_LOCATIONS[0]

  const handleFinish = () => {
    completeOnboarding()
    onCompleteOnboarding(activeLocation)
  }

  const stepTitles = [
    'Location & Meteorology',
    'Household Demographics',
    'Clinical Sensitivities',
    'Commute & Home Energy',
    'CleanAir Goals',
    'Customized Plan Ready',
  ]

  return (
    <div className="min-h-screen bg-[#0b0f19] flex flex-col justify-between text-slate-100 p-3 sm:p-6 md:p-8 relative">
      {/* Background ambient lighting */}
      <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] rounded-full bg-cyan-600/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[20%] w-[500px] h-[500px] rounded-full bg-indigo-600/10 blur-[130px] pointer-events-none" />

      {/* Top Header & Progress Bar */}
      <header className="max-w-2xl w-full mx-auto space-y-3 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-600 to-indigo-600 flex items-center justify-center text-white">
              <Wind className="w-4 h-4" />
            </div>
            <div>
              <span className="text-base font-black text-white">
                Air<span className="text-cyan-400">IQ</span> Setup
              </span>
              <span className="text-xs text-slate-400 ml-2">
                for {userName || 'Guest User'}
              </span>
            </div>
          </div>

          {onSkip && !isLastStep && (
            <button
              onClick={onSkip}
              className="text-xs font-semibold text-slate-400 hover:text-white px-3 py-1 rounded-lg border border-slate-800 bg-slate-900/50 cursor-pointer"
            >
              Skip Setup
            </button>
          )}
        </div>

        {/* Duolingo-style Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold">
            <span>
              Step {currentStepIndex + 1} of {totalSteps}: {stepTitles[currentStepIndex]}
            </span>
            <span className="text-cyan-400 font-mono">{Math.round(progressPercent)}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden border border-slate-800">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 rounded-full transition-all duration-300 shadow-sm shadow-cyan-500/50"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </header>

      {/* Main Step Body */}
      <main className="max-w-2xl w-full mx-auto my-auto py-6 z-10">
        <div className="rounded-3xl bg-slate-950/80 border border-slate-800/80 p-5 sm:p-8 backdrop-blur-xl shadow-2xl">
          {currentStep === 'location' && (
            <StepLocation
              selectedLocation={activeLocation}
              onSelect={(loc) => updateProfile({ location: loc })}
            />
          )}

          {currentStep === 'household' && (
            <StepHousehold
              members={profile.members}
              hasPets={profile.health.hasPets}
              onChangeMembers={(members) => updateProfile({ members })}
              onTogglePets={(hasPets) =>
                updateProfile({
                  health: { ...profile.health, hasPets },
                })
              }
            />
          )}

          {currentStep === 'health' && (
            <StepHealth
              health={profile.health}
              onChangeHealth={(health) => updateProfile({ health })}
            />
          )}

          {currentStep === 'lifestyle' && (
            <StepLifestyle
              lifestyle={profile.lifestyle}
              onChangeLifestyle={(lifestyle) => updateProfile({ lifestyle })}
            />
          )}

          {currentStep === 'goals' && (
            <StepGoals
              selectedGoals={profile.goals}
              onToggleGoal={(goal) => {
                const existing = profile.goals
                const next = existing.includes(goal)
                  ? existing.filter((g) => g !== goal)
                  : [...existing, goal]
                updateProfile({ goals: next })
              }}
            />
          )}

          {currentStep === 'summary' && (
            <StepSummary
              profile={{ ...profile, location: activeLocation }}
              userName={userName}
              onComplete={handleFinish}
            />
          )}
        </div>
      </main>

      {/* Navigation Footer Controls */}
      <footer className="max-w-2xl w-full mx-auto flex items-center justify-between pt-4 pb-2 z-10 border-t border-slate-900">
        <button
          type="button"
          onClick={prevStep}
          disabled={isFirstStep}
          className="px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-900 text-xs font-semibold text-slate-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5 transition-all cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>

        {!isLastStep ? (
          <button
            type="button"
            onClick={nextStep}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold shadow-lg shadow-cyan-600/30 hover:scale-[1.02] active:scale-[0.98] flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <span>Continue</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleFinish}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-600 text-white text-xs font-bold shadow-lg shadow-emerald-600/30 hover:scale-[1.02] active:scale-[0.98] flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <span>Launch Dashboard</span>
            <CheckCircle2 className="w-3.5 h-3.5" />
          </button>
        )}
      </footer>
    </div>
  )
}
