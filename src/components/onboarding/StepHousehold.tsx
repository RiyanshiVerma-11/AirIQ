import React from 'react'
import { Users, Baby, UserCheck, HeartHandshake, Plus, Minus, Info } from 'lucide-react'
import type { HouseholdMember, ChildAgeBracket } from '../../types/onboarding'

interface StepHouseholdProps {
  members: HouseholdMember[]
  hasPets: boolean
  onChangeMembers: (members: HouseholdMember[]) => void
  onTogglePets: (hasPets: boolean) => void
}

const AGE_BRACKETS: { id: ChildAgeBracket; label: string; example: string }[] = [
  { id: 'infant_0_2', label: 'Infant (0–2 yrs)', example: 'Breathes 35 breaths/min — ultra-sensitive airway' },
  { id: 'toddler_3_5', label: 'Toddler (3–5 yrs)', example: 'Developing alveoli & high outdoor playtime' },
  { id: 'child_6_12', label: 'Child (6–12 yrs)', example: 'Morning school bus route & playground exposure' },
  { id: 'teen_13_17', label: 'Teen (13–17 yrs)', example: 'Sports practice & active lung ventilation' },
]

export const StepHousehold: React.FC<StepHouseholdProps> = ({
  members,
  hasPets,
  onChangeMembers,
  onTogglePets,
}) => {
  const adultsCount = members.filter((m) => m.role === 'adult').length
  const childrenMembers = members.filter((m) => m.role === 'child')
  const seniorsCount = members.filter((m) => m.role === 'senior').length

  const handleUpdateRoleCount = (role: 'adult' | 'child' | 'senior', delta: number) => {
    if (delta > 0) {
      if (role === 'child') {
        onChangeMembers([...members, { role: 'child', ageBracket: 'toddler_3_5' }])
      } else {
        onChangeMembers([...members, { role }])
      }
    } else {
      // Remove one member of that role
      const idx = members.map((m) => m.role).lastIndexOf(role)
      if (idx >= 0) {
        const next = [...members]
        next.splice(idx, 1)
        onChangeMembers(next)
      }
    }
  }

  const handleUpdateChildBracket = (childIndex: number, bracket: ChildAgeBracket) => {
    let seenChild = 0
    const updated = members.map((m) => {
      if (m.role === 'child') {
        if (seenChild === childIndex) {
          seenChild++
          return { ...m, ageBracket: bracket }
        }
        seenChild++
      }
      return m
    })
    onChangeMembers(updated)
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="space-y-1">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-800/60 text-[11px] font-semibold text-cyan-300">
          <Users className="w-3.5 h-3.5 text-cyan-400" />
          <span>Step 2: Household & Physiological Demographics</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white">Who lives in your household?</h2>
        <p className="text-xs text-slate-400 leading-relaxed">
          Children and seniors possess significantly higher respiratory susceptibility to PM2.5 and nocturnal temperature inversions.
        </p>
      </div>

      {/* Household Member Counters with Explicit Examples */}
      <div className="space-y-3">
        {/* Adults Counter */}
        <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-950/80 border border-blue-800/50 flex items-center justify-center text-blue-400">
              <UserCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Adults (Age 18–64)</div>
              <div className="text-[11px] text-slate-400">
                <span className="text-cyan-400 font-semibold">Example:</span> 2 adults (e.g. Working parents)
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleUpdateRoleCount('adult', -1)}
              disabled={adultsCount <= 1}
              className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:text-white flex items-center justify-center cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-6 text-center text-sm font-black text-white">{adultsCount}</span>
            <button
              type="button"
              onClick={() => handleUpdateRoleCount('adult', 1)}
              className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:text-white flex items-center justify-center cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Children Counter */}
        <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-950/80 border border-amber-800/50 flex items-center justify-center text-amber-400">
              <Baby className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Children (Under 18)</div>
              <div className="text-[11px] text-slate-400">
                <span className="text-cyan-400 font-semibold">Example:</span> 1 child (e.g. Toddler or school-goer)
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleUpdateRoleCount('child', -1)}
              disabled={childrenMembers.length <= 0}
              className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:text-white flex items-center justify-center cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-6 text-center text-sm font-black text-white">{childrenMembers.length}</span>
            <button
              type="button"
              onClick={() => handleUpdateRoleCount('child', 1)}
              className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:text-white flex items-center justify-center cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Child Age Brackets (Conditional if children > 0) */}
        {childrenMembers.length > 0 && (
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/90 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <Baby className="w-4 h-4 text-amber-400" />
              <span>Select Child Age Brackets (Calibrates Pediatric Aura AI)</span>
            </div>

            {childrenMembers.map((child, idx) => (
              <div key={idx} className="space-y-1.5 pt-1 border-t border-slate-900 first:border-0 first:pt-0">
                <div className="text-[11px] font-semibold text-slate-300">
                  Child #{idx + 1} Age Bracket:
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                  {AGE_BRACKETS.map((bracket) => (
                    <button
                      key={bracket.id}
                      type="button"
                      onClick={() => handleUpdateChildBracket(idx, bracket.id)}
                      className={`p-2 rounded-xl border text-left cursor-pointer transition-all ${
                        child.ageBracket === bracket.id
                          ? 'bg-amber-950/60 border-amber-500 text-white shadow-sm'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <div className="text-[11px] font-bold text-white">{bracket.label}</div>
                      <div className="text-[9px] text-slate-400 line-clamp-1">{bracket.example}</div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Seniors Counter */}
        <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-950/80 border border-purple-800/50 flex items-center justify-center text-purple-400">
              <HeartHandshake className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Seniors (Age 65+)</div>
              <div className="text-[11px] text-slate-400">
                <span className="text-cyan-400 font-semibold">Example:</span> 1 senior (e.g. Grandparent with morning walk routine)
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleUpdateRoleCount('senior', -1)}
              disabled={seniorsCount <= 0}
              className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:text-white flex items-center justify-center cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-6 text-center text-sm font-black text-white">{seniorsCount}</span>
            <button
              type="button"
              onClick={() => handleUpdateRoleCount('senior', 1)}
              className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 text-slate-300 hover:text-white flex items-center justify-center cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Pets Toggle with Example */}
        <div
          onClick={() => onTogglePets(!hasPets)}
          className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
            hasPets
              ? 'bg-cyan-950/40 border-cyan-500/80'
              : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div>
            <div className="text-xs font-bold text-white flex items-center gap-2">
              <span>🐾 Household Pets (Dogs, Cats, Birds)</span>
              {hasPets && (
                <span className="px-1.5 py-0.5 rounded text-[10px] bg-cyan-500/20 text-cyan-300 font-bold">
                  Active
                </span>
              )}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              <span className="text-cyan-400 font-semibold">Example:</span> Pet dander interacts with closed winter ventilation, requiring higher CADR.
            </div>
          </div>

          <div
            className={`w-11 h-6 rounded-full transition-colors relative p-0.5 shrink-0 ${
              hasPets ? 'bg-cyan-500' : 'bg-slate-800'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white transition-transform ${
                hasPets ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </div>
        </div>
      </div>

      <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/60 text-[11px] text-slate-400 flex items-start gap-2">
        <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
        <span>
          <strong>Why this matters:</strong> If any infants or toddlers are present, AirIQ automatically arms Dr. Aisha Rao (Pediatric Specialist) as your Aura AI advisor and tightens outdoor window alerts.
        </span>
      </div>
    </div>
  )
}
