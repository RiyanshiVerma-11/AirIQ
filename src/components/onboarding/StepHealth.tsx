import React from 'react'
import { ShieldAlert, Activity, Heart, Stethoscope, Sparkles, Lock, Check } from 'lucide-react'
import type { HealthFlags } from '../../types/onboarding'

interface StepHealthProps {
  health: HealthFlags
  onChangeHealth: (health: HealthFlags) => void
}

export const StepHealth: React.FC<StepHealthProps> = ({ health, onChangeHealth }) => {
  const toggleFlag = (flag: keyof HealthFlags) => {
    onChangeHealth({
      ...health,
      [flag]: !health[flag],
    })
  }

  const healthConditions: {
    key: keyof HealthFlags
    title: string
    icon: React.ComponentType<{ className?: string }>
    color: string
    example: string
    scienceWhy: string
  }[] = [
    {
      key: 'hasAsthmaOrCOPD',
      title: 'Asthma, Wheezing, or COPD',
      icon: Activity,
      color: 'text-rose-400 bg-rose-950/60 border-rose-800/60',
      example: 'Example: Daily inhaler use, nighttime coughing or shortness of breath on smoggy winter evenings.',
      scienceWhy: 'PM2.5 particles <2.5µm bypass upper nasal filters and penetrate into bronchioles, triggering rapid spasms.',
    },
    {
      key: 'hasHeartCondition',
      title: 'Cardiovascular / Heart History',
      icon: Heart,
      color: 'text-amber-400 bg-amber-950/60 border-amber-800/60',
      example: 'Example: Hypertension, prior stent/bypass, or palpitations during cold morning walks.',
      scienceWhy: 'Nocturnal thermal inversions cause cold morning vasoconstriction; ultrafine particulates trigger systemic vascular inflammation.',
    },
    {
      key: 'isPregnant',
      title: 'Pregnancy / Expecting Mother',
      icon: Stethoscope,
      color: 'text-purple-400 bg-purple-950/60 border-purple-800/60',
      example: 'Example: 1st, 2nd, or 3rd trimester expecting mother in the household.',
      scienceWhy: 'Ultrafine combustion nanoparticles cross maternal-fetal placental barriers. Strict indoor CADR protection is prioritized.',
    },
    {
      key: 'hasAllergies',
      title: 'Dust, PM2.5, or Pollen Allergy',
      icon: Sparkles,
      color: 'text-cyan-400 bg-cyan-950/60 border-cyan-800/60',
      example: 'Example: Morning sneezing attacks, itchy burning eyes, dry throat irritation in winter haze.',
      scienceWhy: 'Aerosolized sulfate and polycyclic aromatic hydrocarbons trigger histamine cascades in mucous membranes.',
    },
  ]

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="space-y-1">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-800/60 text-[11px] font-semibold text-cyan-300">
          <ShieldAlert className="w-3.5 h-3.5 text-cyan-400" />
          <span>Step 3: Clinical & Respiratory Sensitivities</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white">Any sensitive health conditions?</h2>
        <p className="text-xs text-slate-400 leading-relaxed">
          Select any conditions present in your household. AirIQ will automatically lower alert thresholds and schedule precautionary medication reminders.
        </p>
      </div>

      {/* Condition Cards with Concrete Examples */}
      <div className="space-y-3">
        {healthConditions.map((cond) => {
          const Icon = cond.icon
          const isSelected = !!health[cond.key]

          return (
            <button
              key={cond.key}
              type="button"
              onClick={() => toggleFlag(cond.key)}
              className={`w-full p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-start justify-between gap-3 ${
                isSelected
                  ? 'bg-slate-900/90 border-cyan-500 shadow-md shadow-cyan-950/40'
                  : 'bg-slate-900/60 border-slate-800 hover:bg-slate-850 hover:border-slate-700'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 ${cond.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-bold text-white flex items-center gap-2">
                    <span>{cond.title}</span>
                    {isSelected && (
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300">
                        Active Shield
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-400 leading-snug">
                    <span className="text-cyan-400 font-semibold">{cond.example.split(':')[0]}:</span>{' '}
                    {cond.example.split(':')[1]}
                  </div>
                  <div className="text-[10px] text-slate-500 italic">
                    {cond.scienceWhy}
                  </div>
                </div>
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
            </button>
          )
        })}
      </div>

      {/* Privacy Guarantee Note */}
      <div className="p-3.5 rounded-2xl bg-emerald-950/30 border border-emerald-800/40 flex items-center gap-2.5 text-xs text-emerald-300">
        <Lock className="w-4 h-4 text-emerald-400 shrink-0" />
        <span className="text-[11px] leading-snug">
          <strong>Zero Health Data Leakage:</strong> Your respiratory conditions are processed strictly within your local browser sandbox to adjust diurnal alert curves and are never sold or transmitted to third parties.
        </span>
      </div>
    </div>
  )
}
