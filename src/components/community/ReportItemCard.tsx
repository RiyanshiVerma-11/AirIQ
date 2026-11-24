import React from 'react'
import { ThumbsUp } from 'lucide-react'
import type { CommunityReport } from '../../types'

interface ReportItemCardProps {
  report: CommunityReport
  onUpvote: (id: string) => void
}

export const ReportItemCard: React.FC<ReportItemCardProps> = ({ report, onUpvote }) => {
  return (
    <div className="p-3.5 sm:p-4 rounded-2xl border border-slate-800/60 bg-slate-900/40 flex flex-col sm:flex-row sm:items-start justify-between gap-3 hover:border-slate-700/60 transition-all">
      <div className="space-y-1 max-w-2xl text-xs sm:text-sm">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`px-2 py-0.5 text-[9px] font-bold rounded uppercase ${
              report.severity === 'critical'
                ? 'bg-rose-950/80 text-rose-300 border border-rose-800/60'
                : report.severity === 'high'
                ? 'bg-amber-950/80 text-amber-300 border border-amber-800/60'
                : 'bg-blue-950/80 text-blue-300 border border-blue-800/60'
            }`}
          >
            {report.severity}
          </span>

          <span className="font-bold text-white text-xs sm:text-sm">{report.locationNeighborhood}</span>
          <span className="text-slate-500 text-[11px]">({report.timestamp})</span>

          <span
            className={`px-2 py-0.2 text-[9px] font-semibold rounded-full ${
              report.status === 'mitigated'
                ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/40'
                : report.status === 'investigating'
                ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-800/40'
                : 'bg-slate-800/80 text-slate-400'
            }`}
          >
            Status: {report.status}
          </span>
        </div>

        <p className="text-slate-300 leading-snug text-xs">{report.description}</p>
        <div className="text-[10px] text-slate-500">Reported by: {report.reporterName}</div>
      </div>

      <div className="flex items-center sm:flex-col items-end gap-2 shrink-0">
        <button
          onClick={() => onUpvote(report.id)}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800/60 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700/60 text-xs transition-colors cursor-pointer"
        >
          <ThumbsUp className="w-3.5 h-3.5 text-cyan-400" />
          <span>Confirm ({report.upvotes})</span>
        </button>
      </div>
    </div>
  )
}
