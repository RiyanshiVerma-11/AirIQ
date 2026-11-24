import {
  AirQualityCategory,
  AirQualityData,
  HourlyAQIForecast,
  InversionRiskLevel,
  LocationData,
} from '../types'
import { PRESET_LOCATIONS } from '../constants/locations'

export { PRESET_LOCATIONS }

export function getCategoryFromAQI(aqi: number): AirQualityCategory {
  if (aqi <= 50) return 'Good'
  if (aqi <= 100) return 'Moderate'
  if (aqi <= 150) return 'Unhealthy for Sensitive Groups'
  if (aqi <= 200) return 'Unhealthy'
  if (aqi <= 300) return 'Very Unhealthy'
  if (aqi <= 400) return 'Hazardous'
  return 'Severe Emergency'
}

export function getCategoryBadgeColor(category: AirQualityCategory): {
  bg: string
  text: string
  border: string
  hex: string
} {
  switch (category) {
    case 'Good':
      return { bg: 'bg-emerald-950/40', text: 'text-emerald-400', border: 'border-emerald-500/40', hex: '#10b981' }
    case 'Moderate':
      return { bg: 'bg-yellow-950/40', text: 'text-yellow-400', border: 'border-yellow-500/40', hex: '#eab308' }
    case 'Unhealthy for Sensitive Groups':
      return { bg: 'bg-amber-950/40', text: 'text-amber-400', border: 'border-amber-500/40', hex: '#f59e0b' }
    case 'Unhealthy':
      return { bg: 'bg-orange-950/40', text: 'text-orange-400', border: 'border-orange-500/40', hex: '#f97316' }
    case 'Very Unhealthy':
      return { bg: 'bg-purple-950/40', text: 'text-purple-400', border: 'border-purple-500/40', hex: '#a855f7' }
    case 'Hazardous':
      return { bg: 'bg-rose-950/50', text: 'text-rose-400', border: 'border-rose-500/50', hex: '#f43f5e' }
    case 'Severe Emergency':
    default:
      return { bg: 'bg-red-950/80', text: 'text-red-300', border: 'border-red-600/80', hex: '#dc2626' }
  }
}

export function computeCigarettesEquivalent(pm25: number): number {
  // Richard Muller (Berkeley Earth) metric: 22 μg/m³ of PM2.5 continuous over 24h is roughly equivalent to smoking 1 cigarette
  const eq = pm25 / 22
  return Math.max(0, Math.round(eq * 10) / 10)
}

export function computeAlveolarLungDeposition(pm25: number): number {
  // Average resting-to-moderate adult breathing: ~15 m³ air/day
  // ICRP human respiratory tract model: ~58% of PM2.5 penetrates and deposits in deep alveolar tissue
  const totalInhaledUg = pm25 * 15
  const alveolarDepositedUg = totalInhaledUg * 0.58
  const mgDeposited = alveolarDepositedUg / 1000
  return Math.max(0, Math.round(mgDeposited * 100) / 100)
}

export function evaluateThermalInversion(
  windSpeedKmH: number,
  humidityPct: number,
  currentHour: number
): { risk: InversionRiskLevel; description: string; boundaryLayerM: number } {
  // Physical mechanism: Radiative cooling at night + low wind speed leads to strong ground inversion
  const isNightOrMorning = currentHour >= 21 || currentHour <= 9
  const isLowWind = windSpeedKmH < 7

  if (isNightOrMorning && isLowWind && humidityPct > 60) {
    return {
      risk: 'Extreme',
      boundaryLayerM: 120,
      description:
        'Severe Ground Inversion Active: Nocturnal radiative cooling has trapped a stagnant shallow atmospheric lid (<150m). Ground-level exhaust and smoke cannot disperse upward. Avoid any outdoor physical exertion.',
    }
  }

  if (isNightOrMorning && windSpeedKmH < 12) {
    return {
      risk: 'High',
      boundaryLayerM: 250,
      description:
        'Moderate Boundary Layer Inversion: Pollutant dispersion restricted vertically. Particulates accumulate near roads and ground floor residences.',
    }
  }

  if (currentHour >= 12 && currentHour <= 16) {
    return {
      risk: 'Low',
      boundaryLayerM: 850,
      description:
        'Solar Boundary Layer Lift: Midday solar radiation has warmed ground air, breaking the inversion lid. Mixing height expanded to ~850m. This is the optimal window for necessary errands or rapid indoor air renewal.',
    }
  }

  return {
    risk: 'Moderate',
    boundaryLayerM: 450,
    description:
      'Transitional Mixing Layer: Mild vertical ventilation with moderate ground stagnation.',
  }
}

export function generateRealisticHourlyProfile(baseAQI: number, basePM25: number): HourlyAQIForecast[] {
  const hours: HourlyAQIForecast[] = []
  const currentHour = new Date().getHours()

  for (let i = 0; i < 24; i++) {
    const hour = (currentHour + i) % 24

    // Diurnal inversion curve: high at 06-09 and 21-23, lowest at 13-15
    let factor = 1.0
    if (hour >= 6 && hour <= 9) {
      factor = 1.35 // Morning inversion peak + traffic
    } else if (hour >= 20 && hour <= 23) {
      factor = 1.25 // Evening cooling + biomass/cooking
    } else if (hour >= 12 && hour <= 15) {
      factor = 0.65 // Solar thermal lift & dispersion
    } else if (hour >= 1 && hour <= 5) {
      factor = 1.15 // Cold stagnant night accumulation
    } else {
      factor = 0.95
    }

    const calculatedPM25 = Math.round(basePM25 * factor)
    const calculatedAQI = Math.round(baseAQI * factor)
    const isPeak = hour >= 6 && hour <= 9 || hour >= 20 && hour <= 23
    const isOptimalVentilation = hour >= 13 && hour <= 15

    hours.push({
      time: `${hour.toString().padStart(2, '0')}:00`,
      hour,
      aqi: calculatedAQI,
      pm25: calculatedPM25,
      inversionTrapping: isPeak,
      isOptimalVentilationWindow: isOptimalVentilation,
      isPeakSmogDanger: isPeak && calculatedAQI > 200,
    })
  }

  return hours
}

export function getMockAirQualityData(location: LocationData): AirQualityData {
  let aqi = 345
  let pm25 = 285
  let pm10 = 420
  let no2 = 98
  let so2 = 24
  let co = 3.8
  let o3 = 35
  let temp = 14
  let humidity = 74
  let windSpeed = 4.2

  if (location.id === 'delhi') {
    aqi = 412
    pm25 = 340
    pm10 = 510
    no2 = 120
    so2 = 32
    co = 4.6
    temp = 13
    humidity = 82
    windSpeed = 3.5
  } else if (location.id === 'lahore') {
    aqi = 445
    pm25 = 390
    pm10 = 580
    no2 = 135
    so2 = 38
    co = 5.2
    temp = 12
    humidity = 85
    windSpeed = 2.8
  } else if (location.id === 'beijing') {
    aqi = 195
    pm25 = 145
    pm10 = 210
    no2 = 65
    so2 = 18
    co = 2.1
    temp = 2
    humidity = 48
    windSpeed = 8.5
  } else if (location.id === 'mumbai') {
    aqi = 210
    pm25 = 135
    pm10 = 240
    no2 = 82
    so2 = 19
    co = 2.4
    temp = 26
    humidity = 68
    windSpeed = 6.2
  } else if (location.id === 'saltlakecity') {
    aqi = 168
    pm25 = 88
    pm10 = 112
    no2 = 45
    so2 = 10
    co = 1.4
    temp = -2
    humidity = 76
    windSpeed = 3.1
  } else if (location.id === 'bakersfield') {
    aqi = 175
    pm25 = 96
    pm10 = 130
    no2 = 52
    so2 = 8
    co = 1.6
    temp = 11
    humidity = 78
    windSpeed = 4.0
  } else if (location.id === 'krakow') {
    aqi = 182
    pm25 = 110
    pm10 = 155
    no2 = 58
    so2 = 28
    co = 2.2
    temp = 1
    humidity = 88
    windSpeed = 3.8
  } else if (location.id === 'london') {
    aqi = 72
    pm25 = 22
    pm10 = 38
    no2 = 42
    so2 = 5
    co = 0.8
    temp = 7
    humidity = 82
    windSpeed = 12.0
  }

  const currentHour = new Date().getHours()
  const inversion = evaluateThermalInversion(windSpeed, humidity, currentHour)

  return {
    location,
    timestamp: new Date().toISOString(),
    aqi,
    category: getCategoryFromAQI(aqi),
    pm25,
    pm10,
    no2,
    so2,
    co,
    o3,
    temperature: temp,
    humidity,
    windSpeed,
    windDirection: 315,
    inversionRisk: inversion.risk,
    inversionDescription: inversion.description,
    boundaryLayerHeightM: inversion.boundaryLayerM,
    cigarettesEquivalent: computeCigarettesEquivalent(pm25),
    lungParticulateRetentionMgPerDay: computeAlveolarLungDeposition(pm25),
    hourlyForecast: generateRealisticHourlyProfile(aqi, pm25),
  }
}

export async function fetchLiveAirQualityData(location: LocationData): Promise<AirQualityData> {
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 4500)

    // Call Open-Meteo Air Quality & Weather API (free, open-access, global)
    const aqUrl = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${location.latitude}&longitude=${location.longitude}&current=us_aqi,pm2_5,pm10,nitrogen_dioxide,sulphur_dioxide,carbon_monoxide,ozone&hourly=us_aqi,pm2_5&forecast_days=2`
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,wind_direction_10m`

    const [aqRes, weatherRes] = await Promise.all([
      fetch(aqUrl, { signal: controller.signal }),
      fetch(weatherUrl, { signal: controller.signal }),
    ])

    clearTimeout(timeoutId)

    if (!aqRes.ok || !weatherRes.ok) {
      console.warn('Live API response not OK, falling back to scientific simulation model')
      return getMockAirQualityData(location)
    }

    const aqJson = await aqRes.json()
    const weatherJson = await weatherRes.json()

    const currentAQ = aqJson.current || {}
    const currentWeather = weatherJson.current || {}

    const aqi = Math.round(currentAQ.us_aqi ?? 180)
    const pm25 = Math.round(currentAQ.pm2_5 ?? 120)
    const pm10 = Math.round(currentAQ.pm10 ?? 170)
    const no2 = Math.round(currentAQ.nitrogen_dioxide ?? 50)
    const so2 = Math.round(currentAQ.sulphur_dioxide ?? 15)
    const co = Math.round((currentAQ.carbon_monoxide ? currentAQ.carbon_monoxide / 1000 : 2.0) * 10) / 10
    const o3 = Math.round(currentAQ.ozone ?? 30)

    const temp = Math.round(currentWeather.temperature_2m ?? 15)
    const humidity = Math.round(currentWeather.relative_humidity_2m ?? 70)
    const windSpeed = Math.round((currentWeather.wind_speed_10m ?? 5) * 10) / 10
    const windDirection = Math.round(currentWeather.wind_direction_10m ?? 270)

    const currentHour = new Date().getHours()
    const inversion = evaluateThermalInversion(windSpeed, humidity, currentHour)

    // Build hourly forecast array from API if available
    let hourlyForecast: HourlyAQIForecast[] = []
    if (aqJson.hourly && aqJson.hourly.time && aqJson.hourly.us_aqi) {
      const times = aqJson.hourly.time as string[]
      const aqis = aqJson.hourly.us_aqi as number[]
      const pm25s = aqJson.hourly.pm2_5 as number[]

      // Find current hour index
      const nowIsoHour = new Date().toISOString().slice(0, 13)
      let startIndex = times.findIndex((t) => t.startsWith(nowIsoHour))
      if (startIndex === -1) startIndex = 0

      for (let i = 0; i < 24 && startIndex + i < times.length; i++) {
        const idx = startIndex + i
        const d = new Date(times[idx])
        const h = d.getHours()
        const hAQI = Math.round(aqis[idx] ?? aqi)
        const hPM25 = Math.round(pm25s[idx] ?? pm25)
        const isPeak = (h >= 6 && h <= 9) || (h >= 20 && h <= 23)
        const isOptimal = h >= 12 && h <= 15

        hourlyForecast.push({
          time: `${h.toString().padStart(2, '0')}:00`,
          hour: h,
          aqi: hAQI,
          pm25: hPM25,
          inversionTrapping: isPeak,
          isOptimalVentilationWindow: isOptimal,
          isPeakSmogDanger: isPeak && hAQI > 200,
        })
      }
    }

    if (hourlyForecast.length === 0) {
      hourlyForecast = generateRealisticHourlyProfile(aqi, pm25)
    }

    return {
      location,
      timestamp: new Date().toISOString(),
      aqi,
      category: getCategoryFromAQI(aqi),
      pm25,
      pm10,
      no2,
      so2,
      co,
      o3,
      temperature: temp,
      humidity,
      windSpeed,
      windDirection,
      inversionRisk: inversion.risk,
      inversionDescription: inversion.description,
      boundaryLayerHeightM: inversion.boundaryLayerM,
      cigarettesEquivalent: computeCigarettesEquivalent(pm25),
      lungParticulateRetentionMgPerDay: computeAlveolarLungDeposition(pm25),
      hourlyForecast,
    }
  } catch (err) {
    console.warn('Error fetching live air quality, using calibrated fallback:', err)
    return getMockAirQualityData(location)
  }
}
