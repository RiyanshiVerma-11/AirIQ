import React, { useState, useMemo } from 'react'
import { Users, AlertTriangle, PlusCircle, Sparkles, Search, Filter } from 'lucide-react'
import { useCommunityData } from '../hooks/useCommunityData'
import { SmogReportForm } from './community/SmogReportForm'
import { ReportItemCard } from './community/ReportItemCard'
import { ChallengeItemCard } from './community/ChallengeItemCard'

const CATEGORY_FILTERS = [
  { id: 'all', label: 'All Incidents', icon: '🚨' },
  { id: 'biomass_leaf_burning', label: 'Leaf & Biomass Burning', icon: '🍂' },
  { id: 'construction_dust_uncovered', label: 'Construction Dust', icon: '🏗️' },
  { id: 'vehicular_idling_hotspot', label: 'Diesel Idling Hotspots', icon: '🚚' },
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
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="p-5 sm:p-6 rounded-2xl border border-slate-800 bg-slate-900/90 shadow-xl space-y-2">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-cyan-400" />
          <h1 className="text-xl sm:text-2xl font-extrabold text-white">
            Community Smog Watch & Collective Action
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-slate-300">
          Crowdsource ground-level smog violations, join neighborhood clean-air pledges, and protect our shared airshed.
        </p>
      </div>

      {/* Community Clean Air Challenges */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              Active Neighborhood Clean Air Pledges
            </h2>
            <p className="text-xs text-slate-400">
              Community initiatives scaling collective particulate reduction
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
      <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              Smog Hotspot & Open Burning Incident Watch
            </h2>
            <p className="text-xs text-slate-400">
              Verified resident reports forwarded to local environmental control task forces
            </p>
          </div>

          <button
            onClick={() => setShowReportForm(!showReportForm)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-md transition-colors self-start sm:self-center cursor-pointer"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>{showReportForm ? 'Cancel Report' : 'Report Smog Source'}</span>
          </button>
        </div>

        {/* New Report Form */}
        {showReportForm && (
          <SmogReportForm
            onSubmit={(newReport) => {
              addReport(newReport)
              setShowReportForm(false)
            }}
            onCancel={() => setShowReportForm(false)}
          />
        )}

        {/* Live Reports Feed Header with Search & Filters */}
        <div className="space-y-3 pt-1">
          <div className="flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search reports by street, neighborhood, or violation keyword..."
                className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            {/* Results counter */}
            <div className="text-[11px] text-slate-400 font-mono flex items-center gap-1.5 shrink-0 px-1">
              <Filter className="w-3 h-3 text-cyan-400" />
              <span>Showing {filteredReports.length} of {reports.length} reports</span>
            </div>
          </div>

          {/* Category Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
            {CATEGORY_FILTERS.map((cat) => {
              const active = selectedCategory === cat.id
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer border ${
                    active
                      ? 'bg-rose-500/20 text-rose-300 border-rose-500/60 shadow-sm shadow-rose-500/20'
                      : 'bg-slate-950/60 text-slate-400 border-slate-800 hover:bg-slate-800 hover:text-slate-200'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Live Reports Feed */}
        <div className="space-y-3">
          {filteredReports.length > 0 ? (
            filteredReports.map((report) => (
              <ReportItemCard
                key={report.id}
                report={report}
                onUpvote={upvoteReport}
              />
            ))
          ) : (
            <div className="p-8 text-center rounded-xl bg-slate-950/50 border border-slate-800 text-xs text-slate-400 space-y-1">
              <p className="font-semibold text-slate-300">No smog violations match your current filters</p>
              <p className="text-[11px] text-slate-500">Try clearing the search query or selecting "All Incidents"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
