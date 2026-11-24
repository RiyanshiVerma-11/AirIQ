import React from 'react'
import { Sparkles, Shield, FlaskConical, Leaf, Bot, Check } from 'lucide-react'
import type { UserGoal } from '../../types/onboarding'

interface StepGoalsProps {
  selectedGoals: UserGoal[]
  onToggleGoal: (goal: UserGoal) => void
}

export const StepGoals: React.FC<StepGoalsProps> = ({ selectedGoals, onToggleGoal }) => {
  const goalCards: {
    id: UserGoal
    title: string
    subtitle: string
    icon: React.ComponentType<{ className?: string }>
    color: string
    exampleWhatYouGet: string
  }[] = [
    {
      id: 'protect_family',
      title: 'Protect My Family & Vulnerable Members',
      subtitle: 'Personalized exposure minimization for kids, elders, and pets.',
      icon: Shield,
      color: 'text-rose-400 bg-rose-950/60 border-rose-800/60',
      exampleWhatYouGet:
        'Example: Diurnal morning school commute alerts, safe outdoor play windows, and high-AQI respiratory reminders.',
    },
    {
      id: 'understand_science',
      title: 'Master the Aerosol Science & Physics',
      subtitle: 'Deep-dive into CADR, cigarette equivalence, and inversion trapping.',
      icon: FlaskConical,
      color: 'text-cyan-400 bg-cyan-950/60 border-cyan-800/60',
      exampleWhatYouGet:
        'Example: Real-time Berkeley Earth passive cigarette calculator, ICRP deep alveolar lung deposition mg, and exponential decay curves.',
    },
    {
      id: 'reduce_footprint',
      title: 'Reduce My Household Emissions Footprint',
      subtitle: 'Identify sustainable swaps and track collective neighborhood impact.',
      icon: Leaf,
      color: 'text-emerald-400 bg-emerald-950/60 border-emerald-800/60',
      exampleWhatYouGet:
        'Example: Metric tons of CO2 & grams of PM2.5 averted per month through clean transit, induction cooking, and anti-biomass reporting.',
    },
    {
      id: 'ai_guidance',
      title: 'Real-Time Gemini GenAI Consultation',
      subtitle: 'Chat with specialized Aura AI personas on DIY purifiers and health.',
      icon: Bot,
      color: 'text-indigo-400 bg-indigo-950/60 border-indigo-800/60',
      exampleWhatYouGet:
        'Example: Tailored advice from Dr. Aisha Rao (Pediatrics), Marcus Vance (Aerosol Engineering), or Maya Chen (Policy & Activism).',
    },
  ]

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="space-y-1">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-800/60 text-[11px] font-semibold text-cyan-300">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Step 5: Your Primary CleanAir Objectives</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white">What do you want AirIQ to focus on?</h2>
        <p className="text-xs text-slate-400 leading-relaxed">
          Select one or more goals. We will configure your dashboard widgets and AI prompts around your priorities.
        </p>
      </div>

      {/* Multi-Select Goal Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {goalCards.map((card) => {
          const Icon = card.icon
          const isSelected = selectedGoals.includes(card.id)

          return (
            <button
              key={card.id}
              type="button"
              onClick={() => onToggleGoal(card.id)}
              className={`p-4 rounded-2xl border text-left cursor-pointer transition-all flex flex-col justify-between gap-3 ${
                isSelected
                  ? 'bg-slate-900/90 border-cyan-500 shadow-md shadow-cyan-950/40 ring-1 ring-cyan-500/50'
                  : 'bg-slate-900/60 border-slate-800 hover:bg-slate-850 hover:border-slate-700'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 ${card.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div
                  className={`w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 transition-colors ${
                    isSelected
                      ? 'bg-cyan-500 border-cyan-400 text-slate-950'
                      : 'border-slate-700 bg-slate-800 text-transparent'
                  }`}
                >
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              </div>

              <div className="space-y-1">
                <h3 className="text-xs font-bold text-white">{card.title}</h3>
                <p className="text-[11px] text-slate-400 leading-snug">{card.subtitle}</p>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/80 text-[10px] text-cyan-300/90 leading-tight">
                <span className="font-semibold text-white">What AirIQ delivers:</span> {card.exampleWhatYouGet}
              </div>
            </button>
          )
        })}
      </div>

      <div className="text-center">
        <p className="text-[11px] text-slate-500">
          You can toggle or refine your primary goals anytime in Settings.
        </p>
      </div>
    </div>
  )
}
