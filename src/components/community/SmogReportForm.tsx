import React, { useState } from 'react'
import { Navigation } from 'lucide-react'
import type { CommunityReport } from '../../types'
import { detectUserGeolocation } from '../../services/geocodingService'

interface SmogReportFormProps {
  onSubmit: (report: Omit<CommunityReport, 'id' | 'timestamp' | 'status' | 'upvotes'>) => void
  onCancel: () => void
}

export const SmogReportForm: React.FC<SmogReportFormProps> = ({ onSubmit, onCancel }) => {
  const [reporterName, setReporterName] = useState('')
  const [neighborhood, setNeighborhood] = useState('')
  const [category, setCategory] = useState<CommunityReport['category']>('biomass_leaf_burning')
  const [severity, setSeverity] = useState<CommunityReport['severity']>('high')
  const [description, setDescription] = useState('')
  const [isLocating, setIsLocating] = useState(false)
  const [geoNotice, setGeoNotice] = useState<string | null>(null)

  const handleGeoTag = async () => {
    setIsLocating(true)
    setGeoNotice(null)
    try {
      const geo = await detectUserGeolocation()
      if (geo) {
        setNeighborhood(`${geo.name}, ${geo.region} (GPS: ${geo.latitude.toFixed(3)}, ${geo.longitude.toFixed(3)})`)
        setGeoNotice(`📍 Coordinates pinned to ${geo.name}`)
      }
    } catch (err: unknown) {
      setGeoNotice(err instanceof Error ? err.message : 'Could not detect location')
    } finally {
      setIsLocating(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!neighborhood.trim() || !description.trim()) return

    onSubmit({
      reporterName: reporterName.trim() || 'Anonymous Resident',
      locationNeighborhood: neighborhood.trim(),
      category,
      severity,
      description: description.trim(),
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 sm:p-5 rounded-xl border border-rose-900/40 bg-slate-950 space-y-3.5 animate-in fade-in duration-150 text-xs"
    >
      <div className="font-bold text-white text-sm">Log an Ambient Air Quality Violation</div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="text-slate-300 font-semibold block mb-1">Your Name / Title:</label>
          <input
            type="text"
            value={reporterName}
            onChange={(e) => setReporterName(e.target.value)}
            placeholder="e.g. resident / RWA member"
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-white"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-slate-300 font-semibold">Neighborhood / Street:</label>
            <button
              type="button"
              onClick={handleGeoTag}
              disabled={isLocating}
              className="text-[10px] text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer disabled:opacity-50"
            >
              <Navigation className="w-3 h-3" />
              <span>{isLocating ? 'Detecting...' : 'Auto-detect GPS'}</span>
            </button>
          </div>
          <input
            type="text"
            required
            value={neighborhood}
            onChange={(e) => setNeighborhood(e.target.value)}
            placeholder="e.g. Sector 18 Park Lane"
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-white"
          />
          {geoNotice && (
            <p className="text-[10px] text-emerald-400 mt-1">{geoNotice}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="text-slate-300 font-semibold block mb-1">Violation Category:</label>
          <select
            aria-label="Violation Category"
            value={category}
            onChange={(e) => setCategory(e.target.value as any)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-white cursor-pointer"
          >
            <option value="biomass_leaf_burning">Open Leaf / Garden Waste Burning</option>
            <option value="construction_dust_uncovered">Uncovered Construction Dust / No Mist Cannon</option>
            <option value="vehicular_idling_hotspot">Heavy Commercial Diesel Idling Hotspot</option>
            <option value="illegal_waste_incineration">Municipal Waste / Plastic Incineration</option>
          </select>
        </div>

        <div>
          <label className="text-slate-300 font-semibold block mb-1">Severity Level:</label>
          <select
            aria-label="Severity Level"
            value={severity}
            onChange={(e) => setSeverity(e.target.value as any)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-white cursor-pointer"
          >
            <option value="critical">Critical (Immediate smoke drifting into homes/schools)</option>
            <option value="high">High (Major dust/smoke plume)</option>
            <option value="moderate">Moderate (Moderate nuisance)</option>
          </select>
        </div>
      </div>

      <div>
        <label className="text-slate-300 font-semibold block mb-1">Description & Details:</label>
        <textarea
          required
          rows={2}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe visible smoke plume, vehicle numbers, or exact cross streets..."
          className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-white"
        />
      </div>

      <div className="flex justify-end gap-2 pt-1">
        <button
          type="button"
          onClick={onCancel}
          className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold cursor-pointer"
        >
          Submit Incident to AirWatch
        </button>
      </div>
    </form>
  )
}
