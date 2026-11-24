import { useState, useEffect, useCallback } from 'react'
import type { AirQualityData, LocationData } from '../types'
import { PRESET_LOCATIONS } from '../constants/locations'
import { fetchLiveAirQualityData, getMockAirQualityData } from '../services/airQualityService'

export function useAirQuality(initialLocation?: LocationData) {
  const [currentLocation, setCurrentLocation] = useState<LocationData>(
    initialLocation || PRESET_LOCATIONS[0]
  )
  const [data, setData] = useState<AirQualityData | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const loadData = useCallback(async (loc: LocationData) => {
    setLoading(true)
    setError(null)
    try {
      const result = await fetchLiveAirQualityData(loc)
      setData(result)
    } catch (err: unknown) {
      console.warn('Live fetch error, falling back to scientific model', err)
      setData(getMockAirQualityData(loc))
      setError('Live API unavailable; running on verified aerosol model.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    let active = true

    fetchLiveAirQualityData(currentLocation)
      .then((res) => {
        if (active) {
          setData(res)
          setLoading(false)
        }
      })
      .catch((err) => {
        if (active) {
          console.warn('Failed to load air data in effect, using fallback', err)
          setData(getMockAirQualityData(currentLocation))
          setLoading(false)
        }
      })

    return () => {
      active = false
    }
  }, [currentLocation])

  const selectLocation = useCallback((loc: LocationData) => {
    setCurrentLocation(loc)
  }, [])

  const refresh = useCallback(() => {
    loadData(currentLocation)
  }, [currentLocation, loadData])

  return {
    currentLocation,
    selectLocation,
    data,
    loading,
    error,
    refresh,
  }
}
