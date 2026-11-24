import React from 'react'
import { ThumbsUp } from 'lucide-react'
import type { CommunityReport } from '../../types'

interface ReportItemCardProps {
  report: CommunityReport
  onUpvote: (id: string) => void
}

export const ReportItemCard: React.FC<ReportItemCardProps> = ({ report, onUpvote }) => {
  return (
    <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
      <div className="space-y-1.5 max-w-2xl text-xs sm:text-sm">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase ${
              report.severity === 'critical'
                ? 'bg-rose-950 text-rose-300 border border-rose-700'
                : report.severity === 'high'
                ? 'bg-amber-950 text-amber-300 border border-amber-700'
                : 'bg-blue-950 text-blue-300 border border-blue-700'
            }`}
          >
            {report.severity}
          </span>

          <span className="font-bold text-white">{report.locationNeighborhood}</span>
          <span className="text-slate-400 text-xs">({report.timestamp})</span>

          <span
            className={`px-2 py-0.5 text-[10px] font-semibold rounded-full ${
              report.status === 'mitigated'
                ? 'bg-emerald-950 text-emerald-300'
                : report.status === 'investigating'
                ? 'bg-cyan-950 text-cyan-300'
                : 'bg-slate-800 text-slate-400'
            }`}
          >
            Status: {report.status}
          </span>
        </div>

        <p className="text-slate-300 leading-relaxed text-xs">{report.description}</p>
        <div className="text-[11px] text-slate-500">Reported by: {report.reporterName}</div>
      </div>

      <div className="flex items-center sm:flex-col items-end gap-2 shrink-0">
        <button
          onClick={() => onUpvote(report.id)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 hover:text-white transition-colors cursor-pointer"
        >
          <ThumbsUp className="w-3.5 h-3.5 text-cyan-400" />
          <span>Confirm ({report.upvotes})</span>
        </button>
      </div>
    </div>
  )
}
