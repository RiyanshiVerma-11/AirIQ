import React, { useState } from 'react'
import { Shield, Sliders, Wrench } from 'lucide-react'
import type { AirQualityData } from '../types'
import { SCIENCE_BACKED_HACKS } from '../constants/hacks'
import { useIAQSimulation } from '../hooks/useIAQSimulation'
import { RoomDimensionsForm } from './iaq/RoomDimensionsForm'
import { BuildingSealingSelector } from './iaq/BuildingSealingSelector'
import { FiltrationSelector } from './iaq/FiltrationSelector'
import { IndoorSourcesSelector } from './iaq/IndoorSourcesSelector'
import { IAQResultsCard } from './iaq/IAQResultsCard'
import { DIYHackAccordion } from './iaq/DIYHackAccordion'

interface IAQSimulatorProps {
  airQualityData: AirQualityData
}

export const IAQSimulator: React.FC<IAQSimulatorProps> = ({ airQualityData }) => {
  const [activeTab, setActiveTab] = useState<'simulator' | 'hacks'>('simulator')
  const [expandedHack, setExpandedHack] = useState<string>('corsi-rosenthal-box')

  const {
    simConfig,
    result,
    updateDimensions,
    updateSealing,
    updateFiltration,
    updatePurifierCount,
    toggleIndoorSource,
  } = useIAQSimulation(airQualityData.pm25)

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Open Modern Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-800/60 pb-5">
        <div className="space-y-1 max-w-2xl">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-cyan-400" />
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Indoor Air Quality (IAQ) Lab & Science Hacks
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Aerosol mass-balance physics engine and DIY engineering hacks to build safe clean-air sanctuaries at home.
          </p>
        </div>

        {/* Sub-Nav Pills */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-900/60 border border-slate-800/80 self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('simulator')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'simulator'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Physics Simulator
          </button>
          <button
            onClick={() => setActiveTab('hacks')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'hacks'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            DIY Hacks Library
          </button>
        </div>
      </div>

      {activeTab === 'simulator' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Input Controls (Left Column, 7 cols) */}
          <div className="lg:col-span-7 space-y-4 rounded-2xl border border-slate-800/60 bg-slate-900/30 p-5">
            <div className="flex items-center justify-between border-b border-slate-800/60 pb-2.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                <span>Room & Filtration Parameters</span>
              </h3>
            </div>

            <RoomDimensionsForm
              lengthM={simConfig.roomLengthM}
              widthM={simConfig.roomWidthM}
              heightM={simConfig.roomHeightM}
              volumeM3={result.roomVolumeM3}
              onDimensionsChange={updateDimensions}
            />

            <BuildingSealingSelector
              currentSealing={simConfig.buildingSealingLevel}
              onSelectSealing={updateSealing}
            />

            <FiltrationSelector
              currentMode={simConfig.filtrationMode}
              purifierCount={simConfig.purifierCount}
              onSelectMode={updateFiltration}
              onUpdateCount={updatePurifierCount}
            />

            <IndoorSourcesSelector
              sources={simConfig.indoorSources}
              onToggleSource={toggleIndoorSource}
            />
          </div>

          {/* Results Output Panel (Right Column, 5 cols) */}
          <div className="lg:col-span-5">
            <IAQResultsCard result={result} outdoorPM25={airQualityData.pm25} />
          </div>
        </div>
      ) : (
        /* DIY Hacks Library */
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Wrench className="w-3.5 h-3.5 text-cyan-400" />
              <span>Science-Validated DIY Clean Air Blueprints</span>
            </h2>
            <span className="text-[11px] text-slate-500">
              {SCIENCE_BACKED_HACKS.length} Open Source Blueprints
            </span>
          </div>

          <div className="space-y-2.5">
            {SCIENCE_BACKED_HACKS.map((hack) => (
              <DIYHackAccordion
                key={hack.id}
                hack={hack}
                isExpanded={expandedHack === hack.id}
                onToggle={() =>
                  setExpandedHack(expandedHack === hack.id ? '' : hack.id)
                }
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
