import React, { useState, useMemo } from 'react'
import { Users, AlertTriangle, PlusCircle, Sparkles, Search, Filter } from 'lucide-react'
import { useCommunityData } from '../hooks/useCommunityData'
import { SmogReportForm } from './community/SmogReportForm'
import { ReportItemCard } from './community/ReportItemCard'
import { ChallengeItemCard } from './community/ChallengeItemCard'

const CATEGORY_FILTERS = [
  { id: 'all', label: 'All Incidents', icon: '🚨' },
  { id: 'biomass_leaf_burning', label: 'Leaf & Biomass', icon: '🍂' },
  { id: 'construction_dust_uncovered', label: 'Construction Dust', icon: '🏗️' },
  { id: 'vehicular_idling_hotspot', label: 'Diesel Idling', icon: '🚚' },
  { id: 'illegal_waste_incineration', label: 'Plastic/Waste Burning', icon: '🔥' },
]

export const CommunityWatch: React.FC = () => {
  const {
    reports,
    challenges,
    upvoteReport,
    addReport,
    toggleChallengeParticipation,
  } = useCommunityData()

  const [showReportForm, setShowReportForm] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const filteredReports = useMemo(() => {
    return reports.filter((r) => {
      const matchesCategory = selectedCategory === 'all' || r.category === selectedCategory
      const query = searchQuery.toLowerCase().trim()
      const matchesSearch =
        !query ||
        r.locationNeighborhood.toLowerCase().includes(query) ||
        r.description.toLowerCase().includes(query) ||
        r.reporterName.toLowerCase().includes(query)
      return matchesCategory && matchesSearch
    })
  }, [reports, selectedCategory, searchQuery])

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Open Modern Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-800/60 pb-5">
        <div className="space-y-1 max-w-2xl">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-cyan-400" />
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Community Smog Watch & Action
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Crowdsource ground-level smog violations, join neighborhood clean-air pledges, and protect our shared airshed.
          </p>
        </div>

        <button
          onClick={() => setShowReportForm(!showReportForm)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-md shadow-rose-950/40 transition-colors self-start sm:self-auto cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{showReportForm ? 'Cancel Report' : 'Report Smog Source'}</span>
        </button>
      </div>

      {/* New Report Form Popup/Panel */}
      {showReportForm && (
        <div className="p-4 sm:p-5 rounded-2xl border border-rose-900/40 bg-slate-900/60">
          <SmogReportForm
            onSubmit={(newReport) => {
              addReport(newReport)
              setShowReportForm(false)
            }}
            onCancel={() => setShowReportForm(false)}
          />
        </div>
      )}

      {/* Community Clean Air Challenges */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Active Neighborhood Clean Air Pledges</span>
            </h2>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Community initiatives scaling collective particulate reduction
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {challenges.map((c) => (
            <ChallengeItemCard
              key={c.id}
              challenge={c}
              onToggle={toggleChallengeParticipation}
            />
          ))}
        </div>
      </div>

      {/* Community Smog Reports Feed */}
      <div className="space-y-3 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
              <span>Smog Hotspot & Open Burning Incident Watch</span>
            </h2>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Verified resident reports forwarded to local environmental control task forces
            </p>
          </div>
        </div>

        {/* Search & Category Filter Pills */}
        <div className="flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center justify-between">
          <div className="relative flex-1">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search reports by neighborhood, description, or reporter..."
              className="w-full bg-slate-900/60 border border-slate-800/80 rounded-xl pl-9 pr-4 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="flex items-center gap-1 overflow-x-auto pb-1 text-xs">
            {CATEGORY_FILTERS.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer flex items-center gap-1 ${
                  selectedCategory === cat.id
                    ? 'bg-rose-600 text-white'
                    : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800/60'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Incident Reports List */}
        <div className="space-y-2.5">
          {filteredReports.length === 0 ? (
            <div className="text-center py-10 text-xs text-slate-500">
              No matching smog incident reports found.
            </div>
          ) : (
            filteredReports.map((r) => (
              <ReportItemCard key={r.id} report={r} onUpvote={upvoteReport} />
            ))
          )}
        </div>
      </div>
    </div>
  )
}
