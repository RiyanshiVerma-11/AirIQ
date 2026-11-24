import type { LocationData } from '../types'
import { PRESET_LOCATIONS } from '../constants/locations'

export interface GeocodingResult {
  id: string
  name: string
  region: string
  country: string
  latitude: number
  longitude: number
  typicalWinterPhenomenon: string
}

export async function searchGlobalLocations(query: string): Promise<LocationData[]> {
  const trimmed = query.trim()
  if (!trimmed || trimmed.length < 2) return PRESET_LOCATIONS

  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 4000)

    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
      trimmed
    )}&count=6&language=en&format=json`

    const res = await fetch(url, { signal: controller.signal })
    clearTimeout(timeoutId)

    if (!res.ok) {
      return filterPresetLocations(trimmed)
    }

    const data = await res.json()
    if (!data.results || data.results.length === 0) {
      return filterPresetLocations(trimmed)
    }

    return data.results.map((item: any, idx: number) => ({
      id: `custom-${item.id || idx}-${item.name.toLowerCase()}`,
      name: item.name,
      region: item.admin1 || item.country || 'Region',
      country: item.country || '',
      flag: getCountryFlag(item.country_code),
      latitude: item.latitude,
      longitude: item.longitude,
      isCustom: true,
      typicalWinterPhenomenon: `Urban atmospheric conditions at ${item.name} (${item.latitude.toFixed(2)}°, ${item.longitude.toFixed(2)}°). Dynamic boundary layer and diurnal inversion tracking active.`,
    }))
  } catch (err) {
    console.warn('Geocoding search error, filtering local presets', err)
    return filterPresetLocations(trimmed)
  }
}

export async function detectUserGeolocation(): Promise<LocationData | null> {
  if (typeof window === 'undefined' || !navigator.geolocation) {
    throw new Error('Geolocation is not supported by your browser')
  }

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords
        try {
          // Attempt reverse geocoding via Open-Meteo or fallback to coordinates
          const url = `https://geocoding-api.open-meteo.com/v1/search?name=${latitude.toFixed(2)}&count=1&format=json`
          const res = await fetch(url).catch(() => null)
          let cityName = 'My Local Coordinates'
          let countryName = 'Live GPS'
          let countryCode = 'AQ'

          if (res && res.ok) {
            const data = await res.json()
            if (data.results && data.results[0]) {
              cityName = data.results[0].name
              countryName = data.results[0].country || countryName
              countryCode = data.results[0].country_code || countryCode
            }
          }

          resolve({
            id: `gps-${latitude.toFixed(3)}-${longitude.toFixed(3)}`,
            name: cityName,
            region: `GPS (${latitude.toFixed(2)}°, ${longitude.toFixed(2)}°)`,
            country: countryName,
            flag: getCountryFlag(countryCode),
            latitude,
            longitude,
            isCustom: true,
            typicalWinterPhenomenon:
              'Real-time geolocation coordinates. Atmospheric boundary layer height and local thermal inversion dynamically tracked.',
          })
        } catch {
          resolve({
            id: `gps-${latitude.toFixed(3)}-${longitude.toFixed(3)}`,
            name: 'Current Location',
            region: `${latitude.toFixed(2)}°, ${longitude.toFixed(2)}°`,
            country: 'Live GPS',
            flag: '📍',
            latitude,
            longitude,
            isCustom: true,
            typicalWinterPhenomenon:
              'Live GPS location. Real-time atmospheric sensors and inversion trapping calculated dynamically.',
          })
        }
      },
      (error) => {
        reject(error)
      },
      { timeout: 8000, enableHighAccuracy: false }
    )
  })
}

function filterPresetLocations(query: string): LocationData[] {
  const q = query.toLowerCase()
  const matches = PRESET_LOCATIONS.filter(
    (loc) =>
      loc.name.toLowerCase().includes(q) ||
      loc.country.toLowerCase().includes(q) ||
      loc.region.toLowerCase().includes(q)
  )
  return matches.length > 0 ? matches : PRESET_LOCATIONS
}

function getCountryFlag(countryCode?: string): string {
  if (!countryCode || countryCode.length !== 2) return '🌐'
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0))
  return String.fromCodePoint(...codePoints)
}
