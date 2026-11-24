import React from 'react'
import {
  Wind,
  Shield,
  Clock,
  Sparkles,
  Users,
  Printer,
  Key,
  Flame,
  CheckCircle2,
} from 'lucide-react'
import { AirQualityData, LocationData } from '../types'
import { PRESET_LOCATIONS, getCategoryBadgeColor } from '../services/airQualityService'

interface NavbarProps {
  currentLocation: LocationData
  onSelectLocation: (loc: LocationData) => void
  airQualityData: AirQualityData | null
  activeTab: string
  onSelectTab: (tab: string) => void
  onOpenApiKeyModal: () => void
  hasApiKey: boolean
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLocation,
  onSelectLocation,
  airQualityData,
  activeTab,
  onSelectTab,
  onOpenApiKeyModal,
  hasApiKey,
}) => {
  const badgeStyle = airQualityData
    ? getCategoryBadgeColor(airQualityData.category)
    : { bg: 'bg-gray-800', text: 'text-gray-300', border: 'border-gray-700', hex: '#9ca3af' }

  const navItems = [
    { id: 'dashboard', label: 'Smog Radar', icon: Wind },
    { id: 'routine', label: 'Daily Routine', icon: Clock },
    { id: 'iaq-lab', label: 'IAQ Physics & Hacks', icon: Shield },
    { id: 'swaps', label: 'Sustainable Swaps', icon: Flame },
    { id: 'aura-ai', label: 'Aura GenAI', icon: Sparkles, highlight: true },
    { id: 'community', label: 'Community Watch', icon: Users },
    { id: 'action-plan', label: 'Action Plan', icon: Printer },
  ]

  return (
    <header className="sticky top-0 z-50 glass-panel border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Product Brand */}
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 via-blue-600 to-indigo-600 shadow-lg shadow-blue-500/20 text-white font-bold">
              <Wind className="w-5 h-5 text-white animate-pulse" />
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold tracking-tight text-white">
                  Air<span className="text-cyan-400">IQ</span>
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase rounded-full bg-slate-800 text-cyan-300 border border-slate-700">
                  CleanAir Assistant
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Urban Smog Navigation & Impact Intelligence
              </p>
            </div>
          </div>

          {/* Center Location Selector & Live AQI Pill */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-sm">
              <span className="text-base">{currentLocation.flag}</span>
              <select
                aria-label="Select City"
                value={currentLocation.id}
                onChange={(e) => {
                  const found = PRESET_LOCATIONS.find((l) => l.id === e.target.value)
                  if (found) onSelectLocation(found)
                }}
                className="bg-transparent text-slate-200 text-xs sm:text-sm font-medium focus:outline-none cursor-pointer"
              >
                {PRESET_LOCATIONS.map((loc) => (
                  <option key={loc.id} value={loc.id} className="bg-slate-900 text-slate-200">
                    {loc.name}, {loc.country}
                  </option>
                ))}
              </select>
            </div>

            {airQualityData && (
              <div
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${badgeStyle.bg} ${badgeStyle.border} ${badgeStyle.text} text-xs font-semibold`}
              >
                <span className="inline-block w-2 h-2 rounded-full" style={{ backgroundColor: badgeStyle.hex }} />
                <span>AQI {airQualityData.aqi}</span>
                <span className="text-slate-400 font-normal">|</span>
                <span className="hidden lg:inline">{airQualityData.category}</span>
              </div>
            )}
          </div>

          {/* Right Controls: Gemini AI Status & Settings */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onOpenApiKeyModal}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                hasApiKey
                  ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/40 hover:bg-emerald-900/50'
                  : 'bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800'
              }`}
              title="Configure Google Gemini API Key"
            >
              <Key className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {hasApiKey ? 'Gemini Live' : 'AI Offline Mode'}
              </span>
              {hasApiKey && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="flex items-center gap-1 overflow-x-auto py-2 scrollbar-none border-t border-slate-900/80 text-xs font-medium">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                  isActive
                    ? item.highlight
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-sm shadow-cyan-500/20 font-semibold'
                      : 'bg-slate-800 text-white font-semibold shadow-inner border border-slate-700'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : item.highlight ? 'text-cyan-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
                {item.highlight && !isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                )}
              </button>
            )
          })}
        </div>
      </div>
    </header>
  )
}
