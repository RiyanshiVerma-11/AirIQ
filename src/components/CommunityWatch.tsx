import React, { useState } from 'react'
import { Users, AlertTriangle, PlusCircle, Sparkles } from 'lucide-react'
import { useCommunityData } from '../hooks/useCommunityData'
import { SmogReportForm } from './community/SmogReportForm'
import { ReportItemCard } from './community/ReportItemCard'
import { ChallengeItemCard } from './community/ChallengeItemCard'

export const CommunityWatch: React.FC = () => {
  const {
    reports,
    challenges,
    upvoteReport,
    addReport,
    toggleChallengeParticipation,
  } = useCommunityData()

  const [showReportForm, setShowReportForm] = useState(false)

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

        {/* Live Reports Feed */}
        <div className="space-y-3">
          {reports.map((report) => (
            <ReportItemCard
              key={report.id}
              report={report}
              onUpvote={upvoteReport}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
