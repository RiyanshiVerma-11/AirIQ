import React, { useState } from 'react'
import { Printer, HeartPulse, Home, Clock, Shield } from 'lucide-react'
import type { AirQualityData, HouseholdProfile } from '../types'
import { generateDailySmogRoutine } from '../services/routineGeneratorService'
import { PlanQuadrantCard } from './plan/PlanQuadrantCard'
import { EmergencyContactsBar } from './plan/EmergencyContactsBar'

interface FamilyActionPlanProps {
  profile: HouseholdProfile
  airQualityData: AirQualityData
}

export const FamilyActionPlan: React.FC<FamilyActionPlanProps> = ({
  profile,
  airQualityData,
}) => {
  const routine = generateDailySmogRoutine(profile, airQualityData)
  const [generationDate] = useState(() => new Date().toLocaleDateString())

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="space-y-6">
      {/* Top Banner & Print Trigger */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border border-slate-800 bg-slate-900/90 shadow-xl print:hidden">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Printer className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl sm:text-2xl font-extrabold text-white">
              Printable Family Smog Defense Action Plan
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-300">
            A comprehensive, one-page emergency protocol sheet ready to print and stick on the refrigerator or family noticeboard.
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow-lg shadow-cyan-600/20 transition-all self-start sm:self-center cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Save as PDF</span>
        </button>
      </div>

      {/* Printable Sheet Container */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6 sm:p-8 space-y-6 text-slate-200 print:border-none print:p-0 print:text-black print:bg-white">
        {/* Header Section */}
        <div className="border-b border-slate-800 print:border-black pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="text-xs uppercase font-extrabold tracking-widest text-cyan-400 print:text-blue-700">
              AirIQ Urban CleanAir Protocol
            </div>
            <h2 className="text-2xl font-black text-white print:text-black tracking-tight">
              Household Winter Smog Action Plan
            </h2>
            <div className="text-xs text-slate-400 print:text-gray-600 mt-1">
              Active Location: <strong>{airQualityData.location.name}</strong> ({airQualityData.location.country}) | Current AQI: <strong>{airQualityData.aqi} ({airQualityData.category})</strong>
            </div>
          </div>

          <div className="text-right text-xs text-slate-400 print:text-gray-600">
            <div>Household: {profile.adults} Adults, {profile.children} Kids, {profile.seniors} Seniors</div>
            <div>Asthma/Respiratory: {profile.hasAsthmaOrCOPD ? '⚠️ ACTIVE' : 'None Reported'}</div>
            <div className="font-mono text-[11px] mt-0.5">Plan Generated: {generationDate}</div>
          </div>
        </div>

        {/* 4 Core Action Quadrants */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <PlanQuadrantCard
            icon={HeartPulse}
            title="1. Respiratory Triage & Emergency Protocol"
            color="rose"
            items={[
              'Keep prescription bronchodilator / reliever inhalers next to vulnerable family beds.',
              'Administer inhalers with a spacer chamber for maximum deep alveolar deposition.',
              'Maintain warm hydration (herbal tea, warm water) to soothe airway mucosa.',
              'Emergency Red Flags: Chest retractions, unable to finish full sentences, blue lips ➔ Call Emergency Helpline immediately.',
            ]}
          />

          <PlanQuadrantCard
            icon={Home}
            title="2. Clean Air Sanctuary Bedroom Setup"
            color="cyan"
            items={[
              'Designate one bedroom as the sealed sanctuary for sleeping (where children/seniors sleep).',
              'Slide a twin foam draft-blocker under the bedroom door; seal window frames with EPDM rubber.',
              'Run Corsi-Rosenthal box or HEPA unit continuously on Medium/High.',
              'Strictly NO dry sweeping, burning candles, or mosquito coils inside this room.',
            ]}
          />

          <PlanQuadrantCard
            icon={Clock}
            title="3. Diurnal Inversion Timing Rules"
            color="amber"
            items={[
              <><strong>06:00 – 09:30 AM (Morning Inversion):</strong> STRICT LOCKDOWN. No morning walks, jogging, or window opening.</>,
              <><strong>12:30 – 15:30 PM (Golden Solar Window):</strong> Boundary layer lifts. Conduct rapid 15-min flush ventilation & essential errands.</>,
              <><strong>20:30 – 23:30 PM (Night Inversion):</strong> Seal doors, turn purifiers to sleep mode, eliminate outdoor evening exposure.</>,
            ]}
          />

          <PlanQuadrantCard
            icon={Shield}
            title="4. Masking & Outdoor Transit Rules"
            color="emerald"
            items={[
              'Wear certified N95 / FFP2 / KF94 respirators. Ensure metal noseband is molded with two hands.',
              <>In personal vehicle: Keep windows up and turn AC to <strong>Recirculation Mode</strong> at all times.</>,
              'Avoid standing directly behind idling diesel buses or trucks at road crossings.',
              'Upon returning home: Wash face and hands immediately to remove settled particulate soot.',
            ]}
          />
        </div>

        {/* Readiness Checklist */}
        <div className="p-4 rounded-xl border border-slate-800 print:border-gray-400 bg-slate-900/40 print:bg-white space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 print:text-black">
            Household Readiness Checklist
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {routine.emergencyChecklist.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-slate-300 print:text-black">
                <span className="w-3.5 h-3.5 border border-slate-600 print:border-black rounded shrink-0 inline-block" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Contacts Bar */}
        <EmergencyContactsBar />
      </div>
    </div>
  )
}
