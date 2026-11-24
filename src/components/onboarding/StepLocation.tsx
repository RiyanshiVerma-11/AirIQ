import React, { useState, useEffect } from 'react'
import { MapPin, Search, Loader2, Sparkles, Check, Compass } from 'lucide-react'
import type { LocationData } from '../../types'
import { PRESET_LOCATIONS } from '../../constants/locations'
import { searchGlobalLocations, detectUserGeolocation } from '../../services/geocodingService'

interface StepLocationProps {
  selectedLocation: LocationData | null
  onSelect: (loc: LocationData) => void
}

export const StepLocation: React.FC<StepLocationProps> = ({
  selectedLocation,
  onSelect,
}) => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<LocationData[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [isDetectingGps, setIsDetectingGps] = useState(false)

  const handleQueryChange = (val: string) => {
    setQuery(val)
    if (!val.trim() || val.trim().length < 2) {
      setResults([])
      setIsSearching(false)
    }
  }

  // Debounced search
  useEffect(() => {
    if (!query.trim() || query.trim().length < 2) {
      return
    }

    const timer = setTimeout(async () => {
      setIsSearching(true)
      try {
        const res = await searchGlobalLocations(query)
        setResults(res)
      } finally {
        setIsSearching(false)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [query])

  const handleGps = async () => {
    setIsDetectingGps(true)
    try {
      const loc = await detectUserGeolocation()
      if (loc) onSelect(loc)
    } catch {
      alert('Could not detect GPS coordinates. Please select or search your city.')
    } finally {
      setIsDetectingGps(false)
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="space-y-1">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-800/60 text-[11px] font-semibold text-cyan-300">
          <Compass className="w-3.5 h-3.5 text-cyan-400" />
          <span>Step 1: Atmospheric Boundary Location</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white">Where is your household located?</h2>
        <p className="text-xs text-slate-400 leading-relaxed">
          AirIQ uses planetary boundary layer heights and inversion tracking from Open-Meteo sensors to calibrate your exposure risk.
        </p>
      </div>

      {/* Search Input with Explicit Examples */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
          <span>Search Any Global City, Neighborhood, or District</span>
          <span className="text-[10px] text-cyan-400 font-mono">Real-time Worldwide Geocoding</span>
        </label>
        <div className="relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          <input
            type="text"
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            placeholder="e.g. Anand Vihar, New Delhi, or Gulberg, Lahore, or Chaoyang, Beijing"
            className="w-full pl-10 pr-10 py-3 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
            autoFocus
          />
          {isSearching && (
            <Loader2 className="w-4 h-4 text-cyan-400 animate-spin absolute right-3.5 top-3" />
          )}
        </div>
        <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800/60 text-[11px] text-slate-400 flex items-center gap-2">
          <span className="font-semibold text-cyan-300 shrink-0">💡 Example:</span>
          <span>
            Type <strong className="text-slate-200">"Delhi"</strong>, <strong className="text-slate-200">"Lahore"</strong>, <strong className="text-slate-200">"Beijing"</strong>, or your exact residential district.
          </span>
        </div>
      </div>

      {/* GPS Detection Button */}
      <button
        type="button"
        onClick={handleGps}
        disabled={isDetectingGps}
        className="w-full py-2.5 px-4 rounded-xl bg-cyan-950/40 hover:bg-cyan-900/50 border border-cyan-800/50 text-cyan-300 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.99]"
      >
        <MapPin className={`w-4 h-4 text-cyan-400 ${isDetectingGps ? 'animate-bounce' : ''}`} />
        <span>{isDetectingGps ? 'Detecting Local Microclimate GPS...' : '📍 Auto-Detect My Live Location via GPS'}</span>
      </button>

      {/* Search Results Dropdown or Presets */}
      <div className="space-y-2">
        <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
          {results.length > 0 ? 'Search Matches' : 'Popular Winter Smog Hotspots'}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
          {(results.length > 0 ? results : PRESET_LOCATIONS).map((loc) => {
            const isSelected = selectedLocation?.id === loc.id || selectedLocation?.name === loc.name
            return (
              <button
                key={loc.id}
                type="button"
                onClick={() => onSelect(loc)}
                className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-cyan-950/80 border-cyan-500 text-white shadow-md shadow-cyan-950'
                    : 'bg-slate-900/70 border-slate-800 text-slate-300 hover:bg-slate-850 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <span className="text-base shrink-0">{loc.flag}</span>
                  <div className="truncate">
                    <div className="text-xs font-bold text-white truncate">{loc.name}</div>
                    <div className="text-[10px] text-slate-400 truncate">
                      {loc.region}, {loc.country}
                    </div>
                  </div>
                </div>

                {isSelected ? (
                  <div className="w-5 h-5 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                ) : (
                  <span className="text-[9px] font-mono text-slate-500">
                    {loc.latitude.toFixed(1)}°N
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Selected Location Confirmation Pill */}
      {selectedLocation && (
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-cyan-950/60 to-blue-950/60 border border-cyan-800/60 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">{selectedLocation.flag}</span>
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <span>Selected: {selectedLocation.name}</span>
                <span className="text-[10px] font-normal text-cyan-300 font-mono">
                  ({selectedLocation.latitude.toFixed(2)}°, {selectedLocation.longitude.toFixed(2)}°)
                </span>
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                Thermal inversion model calibrated for {selectedLocation.country}.
              </div>
            </div>
          </div>
          <Sparkles className="w-4 h-4 text-cyan-400" />
        </div>
      )}
    </div>
  )
}
