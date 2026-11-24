import { useState, useMemo } from 'react'
import type { IAQSimulationInput, IAQSimulationResult } from '../types'
import { simulateIndoorAirQuality } from '../services/iaqPhysicsService'

const DEFAULT_SIM_INPUT: Omit<IAQSimulationInput, 'outdoorPM25'> = {
  roomLengthM: 5.0,
  roomWidthM: 4.0,
  roomHeightM: 2.8,
  buildingSealingLevel: 'standard',
  filtrationMode: 'diy_corsi_rosenthal_4filter',
  purifierCount: 1,
  indoorSources: {
    fryingCooking: false,
    incenseCandles: false,
    unventedGasHeater: false,
    smoking: false,
  },
}

export function useIAQSimulation(outdoorPM25: number) {
  const [simConfig, setSimConfig] = useState(DEFAULT_SIM_INPUT)

  // Full simulation input derived cleanly during render
  const fullInput: IAQSimulationInput = useMemo(
    () => ({
      ...simConfig,
      outdoorPM25,
    }),
    [simConfig, outdoorPM25]
  )

  // Physics simulation result computed via memoization
  const result: IAQSimulationResult = useMemo(
    () => simulateIndoorAirQuality(fullInput),
    [fullInput]
  )

  const updateDimensions = (length: number, width: number, height: number) => {
    setSimConfig((prev) => ({
      ...prev,
      roomLengthM: length,
      roomWidthM: width,
      roomHeightM: height,
    }))
  }

  const updateSealing = (level: IAQSimulationInput['buildingSealingLevel']) => {
    setSimConfig((prev) => ({ ...prev, buildingSealingLevel: level }))
  }

  const updateFiltration = (mode: IAQSimulationInput['filtrationMode']) => {
    setSimConfig((prev) => ({ ...prev, filtrationMode: mode }))
  }

  const updatePurifierCount = (count: number) => {
    setSimConfig((prev) => ({ ...prev, purifierCount: count }))
  }

  const toggleIndoorSource = (sourceKey: keyof IAQSimulationInput['indoorSources']) => {
    setSimConfig((prev) => ({
      ...prev,
      indoorSources: {
        ...prev.indoorSources,
        [sourceKey]: !prev.indoorSources[sourceKey],
      },
    }))
  }

  return {
    simConfig,
    fullInput,
    result,
    updateDimensions,
    updateSealing,
    updateFiltration,
    updatePurifierCount,
    toggleIndoorSource,
  }
}
