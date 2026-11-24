import React from 'react'
import type { AirQualityData } from '../types'
import { AQIHeroCard } from './dashboard/AQIHeroCard'
import { PhysiologicalExposureCard } from './dashboard/PhysiologicalExposureCard'
import { DiurnalTimeline } from './dashboard/DiurnalTimeline'
import { PollutantBreakdownGrid } from './dashboard/PollutantBreakdownGrid'

interface AQIDashboardProps {
  data: AirQualityData
  onNavigateTab: (tabId: string) => void
}

export const AQIDashboard: React.FC<AQIDashboardProps> = ({ data, onNavigateTab }) => {
  return (
    <div className="space-y-6">
      <AQIHeroCard data={data} onNavigateTab={onNavigateTab} />
      <PhysiologicalExposureCard data={data} />
      <DiurnalTimeline hourlyForecast={data.hourlyForecast} />
      <PollutantBreakdownGrid data={data} />
    </div>
  )
}
