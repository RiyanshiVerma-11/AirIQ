import React from 'react'
import { Train, Leaf, Wind } from 'lucide-react'
import type { CommunityChallenge } from '../../types'

interface ChallengeItemCardProps {
  challenge: CommunityChallenge
  onToggle: (id: string) => void
}

export const ChallengeItemCard: React.FC<ChallengeItemCardProps> = ({
  challenge: c,
  onToggle,
}) => {
  const pct = Math.min(100, Math.round((c.currentAvertedPM25Kg / c.targetAvertedPM25Kg) * 100))

  return (
    <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 flex flex-col justify-between space-y-3">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="p-2 rounded-lg bg-slate-900 text-cyan-400 border border-slate-800">
            {c.icon === 'Train' ? (
              <Train className="w-4 h-4" />
            ) : c.icon === 'Leaf' ? (
              <Leaf className="w-4 h-4" />
            ) : (
              <Wind className="w-4 h-4" />
            )}
          </span>
          <span className="text-[11px] font-mono text-slate-400">
            {c.daysLeft} days remaining
          </span>
        </div>

        <h3 className="text-sm font-bold text-white">{c.title}</h3>
        <p className="text-xs text-slate-400 leading-relaxed">{c.description}</p>
      </div>

      <div className="space-y-2 pt-2 border-t border-slate-800/80 text-xs">
        <div className="flex justify-between font-semibold">
          <span className="text-slate-400">Target Progress:</span>
          <span className="text-cyan-300 font-bold">
            {c.currentAvertedPM25Kg} / {c.targetAvertedPM25Kg} kg PM2.5 ({pct}%)
          </span>
        </div>

        <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="text-[11px] text-slate-400">
            <strong>{c.participantsCount.toLocaleString()}</strong> neighbors joined
          </span>
          <button
            onClick={() => onToggle(c.id)}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              c.joined
                ? 'bg-emerald-950 text-emerald-300 border border-emerald-600/50'
                : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-md'
            }`}
          >
            {c.joined ? 'Joined ✓' : 'Join Pledge'}
          </button>
        </div>
      </div>
    </div>
  )
}
