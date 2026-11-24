import React, { useState, useEffect, useRef } from 'react'
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
  MapPin,
  Search,
  Loader2,
} from 'lucide-react'
import type { AirQualityData, LocationData } from '../types'
import { PRESET_LOCATIONS } from '../constants/locations'
import { getCategoryBadgeColor } from '../services/airQualityService'
import { searchGlobalLocations, detectUserGeolocation } from '../services/geocodingService'

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
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<LocationData[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [showSearchDropdown, setShowSearchDropdown] = useState(false)
  const [isDetectingGps, setIsDetectingGps] = useState(false)

  const dropdownRef = useRef<HTMLDivElement>(null)

  const badgeStyle = airQualityData
    ? getCategoryBadgeColor(airQualityData.category)
    : { bg: 'bg-gray-800', text: 'text-gray-300', border: 'border-gray-700', hex: '#9ca3af' }

  // Handle outside click to close search dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowSearchDropdown(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearchChange = (val: string) => {
    setSearchQuery(val)
    setShowSearchDropdown(true)
    if (!val.trim() || val.trim().length < 2) {
      setSearchResults([])
      setIsSearching(false)
    }
  }

  // Debounced search for global locations
  useEffect(() => {
    if (!searchQuery.trim() || searchQuery.trim().length < 2) {
      return
    }

    const timer = setTimeout(async () => {
      setIsSearching(true)
      try {
        const results = await searchGlobalLocations(searchQuery)
        setSearchResults(results)
      } finally {
        setIsSearching(false)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [searchQuery])

  const handleGpsDetect = async () => {
    setIsDetectingGps(true)
    try {
      const loc = await detectUserGeolocation()
      if (loc) {
        onSelectLocation(loc)
        setShowSearchDropdown(false)
      }
    } catch {
      alert('Could not access GPS. Please check browser location permissions or search for your city directly.')
    } finally {
      setIsDetectingGps(false)
    }
  }

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

          {/* Dynamic Global Search & Location Selector (Desktop) */}
          <div className="relative hidden md:flex items-center gap-2" ref={dropdownRef}>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-sm focus-within:border-cyan-500 transition-colors">
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                placeholder={`${currentLocation.name}... (Search any global city)`}
                value={searchQuery}
                onFocus={() => setShowSearchDropdown(true)}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="bg-transparent text-slate-200 text-xs w-48 focus:outline-none placeholder-slate-400"
              />
              {isSearching ? (
                <Loader2 className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
              ) : (
                <button
                  type="button"
                  onClick={handleGpsDetect}
                  disabled={isDetectingGps}
                  title="Detect my current location with GPS"
                  className="p-1 rounded text-slate-400 hover:text-cyan-400 cursor-pointer transition-colors"
                >
                  <MapPin className={`w-3.5 h-3.5 ${isDetectingGps ? 'animate-bounce text-cyan-400' : ''}`} />
                </button>
              )}
            </div>

            {/* Dropdown Menu for Global Search Results & Presets (Desktop) */}
            {showSearchDropdown && (
              <div className="absolute top-11 left-0 w-80 rounded-xl border border-slate-800 bg-slate-950 p-2 shadow-2xl z-50 text-xs space-y-1 max-h-80 overflow-y-auto">
                <button
                  onClick={handleGpsDetect}
                  className="w-full flex items-center gap-2 p-2 rounded-lg bg-cyan-950/40 text-cyan-300 border border-cyan-800/40 hover:bg-cyan-900/50 text-left font-semibold cursor-pointer"
                >
                  <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Use My Current GPS Location</span>
                </button>

                <div className="text-[10px] uppercase font-bold text-slate-500 px-2 pt-2">
                  {searchResults.length > 0 ? 'Search Results' : 'Global Winter Smog Hotspots'}
                </div>

                {(searchResults.length > 0 ? searchResults : PRESET_LOCATIONS).map((loc) => (
                  <button
                    key={loc.id}
                    onClick={() => {
                      onSelectLocation(loc)
                      setShowSearchDropdown(false)
                      setSearchQuery('')
                    }}
                    className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition-colors cursor-pointer ${
                      currentLocation.id === loc.id
                        ? 'bg-slate-800 text-white font-bold'
                        : 'text-slate-300 hover:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>{loc.flag}</span>
                      <div>
                        <div className="font-medium text-white">{loc.name}</div>
                        <div className="text-[10px] text-slate-400">{loc.region}, {loc.country}</div>
                      </div>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {loc.latitude.toFixed(1)}°, {loc.longitude.toFixed(1)}°
                    </span>
                  </button>
                ))}
              </div>
            )}

            {/* Current AQI Badge */}
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

          {/* Mobile Location & AQI Trigger Pill */}
          <div className="flex md:hidden items-center gap-2" ref={dropdownRef}>
            <button
              onClick={() => setShowSearchDropdown(!showSearchDropdown)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white cursor-pointer active:scale-95 transition-all shadow-sm"
              aria-label="Change location"
            >
              <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span className="font-semibold max-w-[85px] truncate">{currentLocation.name}</span>
              {airQualityData && (
                <span
                  className="px-1.5 py-0.5 text-[10px] font-bold rounded-md"
                  style={{ backgroundColor: `${badgeStyle.hex}22`, color: badgeStyle.hex }}
                >
                  {airQualityData.aqi}
                </span>
              )}
            </button>

            {/* Mobile Dropdown Search & GPS Drawer */}
            {showSearchDropdown && (
              <div className="fixed top-16 inset-x-3 rounded-2xl border border-slate-800 bg-slate-950/98 p-3.5 shadow-2xl z-50 text-xs space-y-2.5 max-h-[75vh] overflow-y-auto backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="font-bold text-white text-sm">Select Global Smog Location</span>
                  <button
                    onClick={() => setShowSearchDropdown(false)}
                    className="p-1 rounded-md text-slate-400 hover:text-white"
                  >
                    ✕
                  </button>
                </div>

                {/* Mobile Search Input */}
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-sm focus-within:border-cyan-500">
                  <Search className="w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search any city or region globally..."
                    value={searchQuery}
                    autoFocus
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="bg-transparent text-slate-200 text-xs w-full focus:outline-none placeholder-slate-500"
                  />
                  {isSearching && <Loader2 className="w-3.5 h-3.5 text-cyan-400 animate-spin" />}
                </div>

                {/* Mobile GPS Trigger Button */}
                <button
                  onClick={handleGpsDetect}
                  disabled={isDetectingGps}
                  className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl bg-cyan-950/60 text-cyan-300 border border-cyan-800/60 font-semibold cursor-pointer active:scale-98 transition-all"
                >
                  <MapPin className={`w-4 h-4 text-cyan-400 ${isDetectingGps ? 'animate-bounce' : ''}`} />
                  <span>{isDetectingGps ? 'Detecting GPS...' : '📍 Use My Live GPS Geolocation'}</span>
                </button>

                <div className="text-[10px] uppercase font-bold text-slate-500 px-1 pt-1">
                  {searchResults.length > 0 ? 'Search Results' : 'Major Winter Smog Hotspots'}
                </div>

                <div className="space-y-1">
                  {(searchResults.length > 0 ? searchResults : PRESET_LOCATIONS).map((loc) => (
                    <button
                      key={loc.id}
                      onClick={() => {
                        onSelectLocation(loc)
                        setShowSearchDropdown(false)
                        setSearchQuery('')
                      }}
                      className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-colors cursor-pointer ${
                        currentLocation.id === loc.id
                          ? 'bg-slate-800 text-white font-bold border border-slate-700'
                          : 'text-slate-300 hover:bg-slate-900 active:bg-slate-900'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-base">{loc.flag}</span>
                        <div>
                          <div className="font-semibold text-white text-xs">{loc.name}</div>
                          <div className="text-[10px] text-slate-400">{loc.region}, {loc.country}</div>
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {loc.latitude.toFixed(1)}°, {loc.longitude.toFixed(1)}°
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Controls: Gemini AI Status & Settings */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onOpenApiKeyModal}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
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
              <span className="sm:hidden text-[11px]">
                {hasApiKey ? 'Live' : 'AI'}
              </span>
              {hasApiKey && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar (Desktop) */}
        <div className="hidden md:flex items-center gap-1 overflow-x-auto py-2 scrollbar-none border-t border-slate-900/80 text-xs font-medium">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-all cursor-pointer ${
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
