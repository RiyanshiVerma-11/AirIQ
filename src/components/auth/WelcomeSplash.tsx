import React, { useState } from 'react'
import {
  Wind,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Activity,
  Users,
  CheckCircle2,
  Compass,
  Zap,
  ChevronRight,
  Sun,
  Moon,
  CloudFog,
} from 'lucide-react'

interface WelcomeSplashProps {
  onStartSignUp: () => void
  onStartSignIn: () => void
  onGuestAccess: () => void
}

type DiurnalPreviewSlot = 'morning' | 'midday' | 'evening'

export const WelcomeSplash: React.FC<WelcomeSplashProps> = ({
  onStartSignUp,
  onStartSignIn,
  onGuestAccess,
}) => {
  const [selectedSlot, setSelectedSlot] = useState<DiurnalPreviewSlot>('morning')

  const diurnalScenarios = {
    morning: {
      time: '07:30 AM',
      name: 'Nocturnal Inversion Trap',
      aqi: 384,
      category: 'Hazardous (Severe Smog)',
      boundaryLayerM: 140,
      cigarettes: '17.5/day',
      statusColor: 'text-rose-400 bg-rose-950/60 border-rose-800/60',
      badgeHex: '#f43f5e',
      icon: CloudFog,
      action: 'High-risk commute. Seal windows, equip N95 mask, run Corsi-Rosenthal purifier on high.',
      science: 'Radiative surface cooling compresses boundary layer to <150m, trapping ground emissions.',
    },
    midday: {
      time: '01:30 PM',
      name: 'Solar Ventilation Window',
      aqi: 135,
      category: 'Moderate / Sensitive Alert',
      boundaryLayerM: 920,
      cigarettes: '6.1/day',
      statusColor: 'text-emerald-400 bg-emerald-950/60 border-emerald-800/60',
      badgeHex: '#10b981',
      icon: Sun,
      action: 'Optimal window open! Ventilate rooms for 35–45 minutes; safe for children outdoor activities.',
      science: 'Solar ground warming lifts boundary layer to >900m, dispersing particulate concentration by 65%.',
    },
    evening: {
      time: '08:30 PM',
      name: 'Secondary Inversion Descending',
      aqi: 298,
      category: 'Very Unhealthy',
      boundaryLayerM: 260,
      cigarettes: '13.5/day',
      statusColor: 'text-purple-400 bg-purple-950/60 border-purple-800/60',
      badgeHex: '#a855f7',
      icon: Moon,
      action: 'Nighttime bedroom prep. Close exterior vents, activate HEPA sleep mode, avoid evening jogging.',
      science: 'Sunset terminates convective mixing; atmospheric boundary layer drops rapidly.',
    },
  }

  const currentScenario = diurnalScenarios[selectedSlot]
  const ScenarioIcon = currentScenario.icon

  return (
    <div className="min-h-screen bg-[#0b0f19] flex flex-col text-slate-100 relative overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Background Atmospheric Glow Orbs */}
      <div className="absolute top-[-12%] left-[-10%] w-[550px] h-[550px] rounded-full bg-cyan-600/12 blur-[130px] pointer-events-none" />
      <div className="absolute top-[20%] right-[-12%] w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[25%] w-[500px] h-[500px] rounded-full bg-indigo-600/12 blur-[140px] pointer-events-none" />

      {/* Top Navbar */}
      <header className="sticky top-0 z-40 glass-panel border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-md px-4 sm:px-8 py-3.5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 via-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 text-white font-bold">
              <Wind className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-tight text-white">
                  Air<span className="text-cyan-400">IQ</span>
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-bold uppercase rounded-full bg-cyan-950/70 text-cyan-300 border border-cyan-800/60">
                  CleanAir AI
                </span>
              </div>
              <p className="text-[10px] text-slate-400 hidden sm:block">
                Google CleanAir Initiative
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onStartSignIn}
              className="text-xs font-semibold text-slate-300 hover:text-white px-3.5 py-1.5 rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-850 transition-all cursor-pointer"
            >
              Sign In
            </button>
            <button
              onClick={onStartSignUp}
              className="text-xs font-bold text-white px-4 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md shadow-cyan-600/25 cursor-pointer"
            >
              Get Started Free
            </button>
          </div>
        </div>
      </header>

      {/* Main Hero Section */}
      <main className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16 z-10">
        {/* Section 1: Hero Typography & Primary CTAs */}
        <section className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs text-cyan-300 shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
            <span className="font-semibold">Urban Smog Navigation & Aerosol Physics Assistant</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.15]">
            Turn Severe Winter Smog Into{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300 bg-clip-text text-transparent">
              CleanAir Science.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
            AirIQ couples real-time planetary boundary layer meteorology, single-zone aerosol mass-balance physics, and Google Gemini GenAI into a Duolingo-style personalized defense routine for urban families.
          </p>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onStartSignUp}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white font-extrabold text-sm shadow-xl shadow-cyan-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Build My Family Plan (2 Min)</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onGuestAccess}
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-slate-900 hover:bg-slate-850 text-slate-200 hover:text-white border border-slate-800 font-bold text-sm transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              <Zap className="w-4 h-4 text-cyan-400" />
              <span>Explore Interactive Live Demo</span>
            </button>
          </div>

          {/* Live Metric Pills */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3 text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/60 border border-slate-800">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Open-Meteo Real-time Sensors</span>
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/60 border border-slate-800">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
              <span>UC Davis Corsi-Rosenthal Protocols</span>
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/60 border border-slate-800">
              <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
              <span>Gemini 2.0 Aura AI Assistant</span>
            </span>
          </div>
        </section>

        {/* Section 2: UNIQUE INTERACTIVE MICRO-PREVIEW (Diurnal Inversion Simulator) */}
        <section className="rounded-3xl border border-slate-800/90 bg-gradient-to-b from-slate-900/80 to-slate-950 p-6 sm:p-8 shadow-2xl backdrop-blur-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 mb-1">
                <Activity className="w-4 h-4" />
                <span>Interactive Micro-Preview</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                How AirIQ Navigates Winter Inversions in Real-Time
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Click a time of day below to see how our atmospheric physics engine re-computes family routines.
              </p>
            </div>

            {/* Time Slot Toggle Tabs */}
            <div className="inline-flex p-1 rounded-xl bg-slate-950 border border-slate-800 self-start sm:self-auto">
              {(['morning', 'midday', 'evening'] as DiurnalPreviewSlot[]).map((slot) => {
                const isSelected = selectedSlot === slot
                const labels: Record<DiurnalPreviewSlot, string> = {
                  morning: '🌅 07:30 AM Peak Trap',
                  midday: '☀️ 01:30 PM Safe Window',
                  evening: '🌙 08:30 PM Night Trap',
                }
                return (
                  <button
                    key={slot}
                    onClick={() => setSelectedSlot(slot)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-cyan-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {labels[slot]}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Dynamic Scenario Display Card */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Real-Time Atmospheric Metrics */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  {currentScenario.time} Microclimate
                </span>
                <span
                  className="px-2 py-0.5 text-[10px] font-bold rounded-md"
                  style={{ backgroundColor: `${currentScenario.badgeHex}22`, color: currentScenario.badgeHex }}
                >
                  {currentScenario.category}
                </span>
              </div>

              <div className="flex items-baseline gap-2">
                <span
                  className="text-5xl font-black tracking-tight"
                  style={{ color: currentScenario.badgeHex }}
                >
                  {currentScenario.aqi}
                </span>
                <span className="text-sm font-bold text-slate-500">AQI</span>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-900 text-xs">
                <div className="flex items-center justify-between text-slate-300">
                  <span className="text-slate-400">Boundary Layer:</span>
                  <strong className="font-mono text-cyan-300">{currentScenario.boundaryLayerM} meters</strong>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="text-slate-400">Berkeley Cigarettes:</span>
                  <strong className="font-mono text-amber-300">{currentScenario.cigarettes}</strong>
                </div>
              </div>
            </div>

            {/* AirIQ Precision Action Card */}
            <div className="lg:col-span-2 p-5 rounded-2xl bg-gradient-to-r from-slate-950/90 to-cyan-950/40 border border-cyan-800/40 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className={`p-1.5 rounded-lg ${currentScenario.statusColor}`}>
                    <ScenarioIcon className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-white">
                    AirIQ Automated Recommendation: {currentScenario.name}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                  "{currentScenario.action}"
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 text-[11px] text-slate-400 flex items-start gap-2">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Peer-Reviewed Physics:</strong> {currentScenario.science}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: The 3 Core Pillars (Short, crisp, punchy briefs) */}
        <section className="space-y-6">
          <div className="text-center space-y-1">
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              The 3 Pillars of AirIQ Intelligence
            </h2>
            <p className="text-xs text-slate-400 max-w-lg mx-auto">
              Engineered like Google products: scientifically grounded, privacy-preserving, and built for real families.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Pillar 1 */}
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/50 transition-all space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-cyan-950/80 border border-cyan-800/60 flex items-center justify-center text-cyan-400">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">1. Diurnal Inversion Tracking</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Tracks nocturnal radiative cooling inversions to pinpoint when boundary layers trap particulate clouds vs. when solar heating opens safe ventilation windows.
              </p>
              <div className="pt-2 text-[11px] font-semibold text-cyan-300 flex items-center gap-1">
                <span>Learn about boundary physics</span>
                <ChevronRight className="w-3 h-3" />
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 hover:border-blue-500/50 transition-all space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-950/80 border border-blue-800/60 flex items-center justify-center text-blue-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">2. Indoor Aerosol Mass Balance</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Input your room dimensions and window draftiness to calculate required CADR airflow, 60-minute exponential PM2.5 decay curves, and build $25 Corsi-Rosenthal boxes.
              </p>
              <div className="pt-2 text-[11px] font-semibold text-blue-300 flex items-center gap-1">
                <span>Explore Corsi-Rosenthal CADR</span>
                <ChevronRight className="w-3 h-3" />
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 hover:border-indigo-500/50 transition-all space-y-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-950/80 border border-indigo-800/60 flex items-center justify-center text-indigo-400">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">3. Duolingo-Style Family Onboarding</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                6 progressive steps capture toddlers, seniors, asthma risks, and morning departure times to calibrate alert thresholds and auto-assign specialized Aura AI personas.
              </p>
              <div className="pt-2 text-[11px] font-semibold text-indigo-300 flex items-center gap-1">
                <span>See personalized onboarding</span>
                <ChevronRight className="w-3 h-3" />
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Duolingo-Style 6-Step Journey Teaser */}
        <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900/90 to-slate-950 border border-slate-800/80 text-center space-y-6">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">
              The 2-Minute Setup Flow
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              Personalized Like Duolingo. Powerful Like Enterprise Software.
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-left">
            {[
              { step: '01', title: 'Location', desc: 'Global GPS & microclimate sensors' },
              { step: '02', title: 'Household', desc: 'Infants, seniors & pets' },
              { step: '03', title: 'Health', desc: 'Asthma, heart & allergy flags' },
              { step: '04', title: 'Commute', desc: 'Mode, distance & departure' },
              { step: '05', title: 'Goals', desc: 'Science, family, or footprint' },
              { step: '06', title: 'Shield', desc: 'Auto-tuned Aura AI persona' },
            ].map((s) => (
              <div key={s.step} className="p-3 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono font-bold text-cyan-400">STEP {s.step}</span>
                <div className="text-xs font-bold text-white">{s.title}</div>
                <div className="text-[10px] text-slate-400 leading-tight">{s.desc}</div>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <button
              onClick={onStartSignUp}
              className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs shadow-lg shadow-cyan-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <span>Start Onboarding Wizard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </section>

        {/* Section 5: Impact Metrics Banner */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80">
            <div className="text-2xl sm:text-3xl font-black text-cyan-400">485 CFM</div>
            <div className="text-[11px] text-slate-400 mt-1">Corsi-Rosenthal Clean Air Flow</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80">
            <div className="text-2xl sm:text-3xl font-black text-blue-400">&gt;90%</div>
            <div className="text-[11px] text-slate-400 mt-1">PM2.5 Removal in 25 Minutes</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80">
            <div className="text-2xl sm:text-3xl font-black text-indigo-400">15.5 kg</div>
            <div className="text-[11px] text-slate-400 mt-1">Monthly PM2.5/CO2 Averted</div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80">
            <div className="text-2xl sm:text-3xl font-black text-emerald-400">5 Personas</div>
            <div className="text-[11px] text-slate-400 mt-1">Specialized Gemini Aura AI</div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-8 text-xs text-slate-400 mt-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 text-center">
          <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] text-slate-500">
            <span>Berkeley Earth Muller Metric</span>
            <span>•</span>
            <span>ICRP 66 Alveolar Deposition</span>
            <span>•</span>
            <span>UC Davis Box Testing</span>
            <span>•</span>
            <span>Open-Meteo Meteorology</span>
            <span>•</span>
            <span>Google Gemini 2.0</span>
          </div>
          <p className="text-[11px] text-slate-600 max-w-xl mx-auto">
            AirIQ Assistive Environmental Intelligence Platform • Google CleanAir Initiative. For severe acute respiratory emergencies, consult emergency medical personnel immediately.
          </p>
        </div>
      </footer>
    </div>
  )
}
