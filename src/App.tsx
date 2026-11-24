import React, { useState } from 'react'
import { Sparkles, Wind, ShieldAlert, Loader2 } from 'lucide-react'
import { useAirQuality } from './hooks/useAirQuality'
import { useHouseholdProfile } from './hooks/useHouseholdProfile'
import { getStoredGeminiKey } from './services/geminiService'
import { AuthProvider } from './contexts/AuthContext'
import { useAuthContext } from './contexts/useAuthContext'
import { AuthContainer } from './components/auth/AuthContainer'
import { OnboardingWizard } from './components/onboarding/OnboardingWizard'
import { SettingsModal } from './components/settings/SettingsModal'
import { isOnboardingComplete, getOnboardingProfile, toHouseholdProfile } from './services/onboardingService'
import { Navbar } from './components/Navbar'
import { BottomDockNav } from './components/BottomDockNav'
import { AQIDashboard } from './components/AQIDashboard'
import { RoutineGenerator } from './components/RoutineGenerator'
import { IAQSimulator } from './components/IAQSimulator'
import { SustainableSwaps } from './components/SustainableSwaps'
import { AuraAIChat } from './components/AuraAIChat'
import { CommunityWatch } from './components/CommunityWatch'
import { FamilyActionPlan } from './components/FamilyActionPlan'
import type { LocationData } from './types'
import './App.css'

function AppContent() {
  const { isAuthenticated, isLoading: isLoadingAuth, user } = useAuthContext()

  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean>(() => {
    return isOnboardingComplete()
  })

  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  const { currentLocation, selectLocation, data: airQualityData, loading: isLoadingAQI, refresh } =
    useAirQuality()
  const { profile, updateProfile } = useHouseholdProfile()

  const [activeTab, setActiveTab] = useState<string>('dashboard')
  const [isKeyModalOpen, setIsKeyModalOpen] = useState<boolean>(false)
  const [hasApiKey, setHasApiKey] = useState<boolean>(() => !!getStoredGeminiKey())

  const handleKeyUpdated = () => {
    setHasApiKey(!!getStoredGeminiKey())
  }

  // When user finishes onboarding, IMMEDIATELY synchronize profile & location!
  const handleOnboardingFinish = (selectedLocation: LocationData | null) => {
    if (selectedLocation) {
      selectLocation(selectedLocation)
    }
    const completedOnboarding = getOnboardingProfile()
    updateProfile(toHouseholdProfile(completedOnboarding))
    setHasCompletedOnboarding(true)
  }

  // 1. Loading Authentication State
  if (isLoadingAuth) {
    return (
      <div className="min-h-screen bg-[#0b0f19] flex flex-col items-center justify-center space-y-4 text-white">
        <Loader2 className="w-10 h-10 text-cyan-400 animate-spin" />
        <p className="text-xs text-slate-400">Initializing AirIQ CleanAir Session...</p>
      </div>
    )
  }

  // 2. Unauthenticated State -> Welcome Splash, Sign Up, Sign In, or Guest
  if (!isAuthenticated) {
    return (
      <AuthContainer
        onAuthSuccess={() => {
          const completed = isOnboardingComplete()
          if (completed) {
            const onb = getOnboardingProfile()
            updateProfile(toHouseholdProfile(onb))
            if (onb.location) selectLocation(onb.location)
          }
          setHasCompletedOnboarding(completed)
        }}
      />
    )
  }

  // 3. Authenticated but Onboarding Not Completed -> 6-Step Duolingo Wizard
  if (!hasCompletedOnboarding) {
    return (
      <OnboardingWizard
        userName={user?.name || ''}
        onCompleteOnboarding={handleOnboardingFinish}
        onSkip={() => setHasCompletedOnboarding(true)}
      />
    )
  }

  // 4. Authenticated & Onboarded -> Main Full AirIQ Product Application
  return (
    <div className="min-h-screen flex flex-col bg-[#0b0f19] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Navigation Header */}
      <Navbar
        currentLocation={currentLocation}
        onSelectLocation={selectLocation}
        airQualityData={airQualityData}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onOpenApiKeyModal={() => setIsKeyModalOpen(true)}
        onOpenSettingsModal={() => setIsSettingsOpen(true)}
        hasApiKey={hasApiKey}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 pt-4 pb-28 md:pb-8">
        {isLoadingAQI && !airQualityData ? (
          <div className="flex flex-col items-center justify-center h-96 space-y-4">
            <Loader2 className="w-10 h-10 text-cyan-400 animate-spin" />
            <div className="text-center">
              <h3 className="text-base font-bold text-white">
                Gathering Atmospheric & Smog Intelligence...
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Querying planetary boundary layers and real-time particulate stations for {currentLocation.name}
              </p>
            </div>
          </div>
        ) : airQualityData ? (
          <div className="animate-in fade-in duration-200">
            {activeTab === 'dashboard' && (
              <AQIDashboard
                data={airQualityData}
                profile={profile}
                onOpenSettings={() => setIsSettingsOpen(true)}
                onNavigateTab={(tab) => setActiveTab(tab)}
              />
            )}

            {activeTab === 'routine' && (
              <RoutineGenerator
                profile={profile}
                onUpdateProfile={updateProfile}
                airQualityData={airQualityData}
              />
            )}

            {activeTab === 'iaq-lab' && <IAQSimulator airQualityData={airQualityData} />}

            {activeTab === 'swaps' && <SustainableSwaps profile={profile} />}

            {activeTab === 'aura-ai' && (
              <AuraAIChat
                airQualityData={airQualityData}
                profile={profile}
                isKeyModalOpen={isKeyModalOpen}
                onCloseKeyModal={() => setIsKeyModalOpen(false)}
                onKeyUpdated={handleKeyUpdated}
              />
            )}

            {activeTab === 'community' && <CommunityWatch />}

            {activeTab === 'action-plan' && (
              <FamilyActionPlan
                profile={profile}
                airQualityData={airQualityData}
              />
            )}
          </div>
        ) : (
          <div className="p-8 text-center text-slate-400">
            <ShieldAlert className="w-12 h-12 text-rose-400 mx-auto mb-2" />
            <p>Could not initialize air quality sensors. Please reload.</p>
            <button
              onClick={refresh}
              className="mt-3 px-4 py-2 rounded-xl bg-cyan-600 text-white text-xs font-bold cursor-pointer"
            >
              Retry Connection
            </button>
          </div>
        )}
      </main>

      {/* Floating Aura AI Quick Launcher (Desktop only) */}
      {activeTab !== 'aura-ai' && airQualityData && (
        <button
          onClick={() => setActiveTab('aura-ai')}
          className="hidden md:flex fixed bottom-6 right-6 z-40 items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 text-white shadow-xl shadow-cyan-600/30 hover:scale-105 transition-all text-xs font-bold print:hidden cursor-pointer"
        >
          <Sparkles className="w-4 h-4 animate-spin text-cyan-200" />
          <span>Ask Aura AI</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        </button>
      )}

      {/* Mobile Sticky Bottom Navigation Dock */}
      <BottomDockNav
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        airQualityData={airQualityData}
      />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onReOnboard={() => {
          setHasCompletedOnboarding(false)
        }}
        onOpenApiKeyModal={() => setIsKeyModalOpen(true)}
      />

      {/* API Key Modal fallback container */}
      {isKeyModalOpen && activeTab !== 'aura-ai' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-950 p-6 space-y-4 shadow-2xl">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              Configure Google Gemini
            </h3>
            <p className="text-xs text-slate-300">
              Switching to the Aura GenAI tab will allow you to configure and test your Google Gemini API key.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setIsKeyModalOpen(false)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setIsKeyModalOpen(false)
                  setActiveTab('aura-ai')
                }}
                className="px-4 py-1.5 rounded-lg bg-cyan-600 text-white text-xs font-bold cursor-pointer"
              >
                Go to Aura AI
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Scientific & Engineering Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/90 py-8 text-xs text-slate-400 print:hidden mt-auto mb-16 md:mb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-900 pb-4">
            <div className="flex items-center gap-2">
              <Wind className="w-4 h-4 text-cyan-400" />
              <span className="font-extrabold text-white text-sm">AirIQ</span>
              <span className="text-slate-500">—</span>
              <span className="text-slate-300">Google Engineering & Product CleanAir Initiative</span>
            </div>

            <div className="flex items-center gap-4 text-[11px] text-slate-400">
              <span>Open-Meteo Air API</span>
              <span>•</span>
              <span>Google Gemini 2.0</span>
              <span>•</span>
              <span>Corsi-Rosenthal Foundation</span>
              <span>•</span>
              <span>Berkeley Earth</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px] text-slate-500 leading-relaxed">
            <div>
              <strong className="text-slate-400 block mb-0.5">Atmospheric & Physiological Models:</strong>
              Cigarette equivalence derived from Richard Muller's Berkeley Earth metric (22 µg/m³ PM2.5 over 24h ≈ 1 cigarette). Deep lung deposition modeled via ICRP 66 Human Respiratory Tract Model. Diurnal boundary layer lift based on nocturnal radiative cooling inversions.
            </div>
            <div>
              <strong className="text-slate-400 block mb-0.5">Aerosol Clean Air Standards:</strong>
              Single-zone mass-balance physics for indoor filtration CADR verified through UC Davis / EPA Corsi-Rosenthal box testing protocols. Air quality classifications aligned with US EPA AQI breakpoints and WHO 2021 air quality guidelines.
            </div>
          </div>

          <div className="pt-2 text-[10px] text-slate-600 text-center">
            AirIQ is an assistive environmental intelligence platform. In cases of acute respiratory distress, always consult qualified emergency medical professionals.
          </div>
        </div>
      </footer>
    </div>
  )
}

export function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
