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
    <div className="p-4 rounded-2xl border border-slate-800/60 bg-slate-900/40 flex flex-col justify-between space-y-3 hover:border-slate-700/60 transition-all">
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="p-1.5 rounded-lg bg-slate-950 text-cyan-400 border border-slate-800/60">
            {c.icon === 'Train' ? (
              <Train className="w-4 h-4" />
            ) : c.icon === 'Leaf' ? (
              <Leaf className="w-4 h-4" />
            ) : (
              <Wind className="w-4 h-4" />
            )}
          </span>
          <span className="text-[10px] font-mono text-slate-400">
            {c.daysLeft} days left
          </span>
        </div>

        <h3 className="text-sm font-bold text-white">{c.title}</h3>
        <p className="text-xs text-slate-400 leading-snug">{c.description}</p>
      </div>

      <div className="space-y-2 pt-2 border-t border-slate-800/50 text-xs">
        <div className="flex justify-between font-semibold text-[11px]">
          <span className="text-slate-400">Progress:</span>
          <span className="text-cyan-300 font-bold">
            {c.currentAvertedPM25Kg} / {c.targetAvertedPM25Kg} kg ({pct}%)
          </span>
        </div>

        <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>

        <div className="flex items-center justify-between pt-0.5">
          <span className="text-[10px] text-slate-400">
            <strong className="text-slate-200">{c.participantsCount.toLocaleString()}</strong> neighbors joined
          </span>
          <button
            onClick={() => onToggle(c.id)}
            className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${c.joined
                ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-600/40'
                : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-sm'
              }`}
          >
            {c.joined ? 'Joined ✓' : 'Join Pledge'}
          </button>
        </div>
      </div>
    </div>
  )
}
