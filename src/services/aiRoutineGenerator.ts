import type { AirQualityData, DailySmogRoutine, HouseholdProfile, RoutineTimeSlot } from '../types'
import { getStoredGeminiKey, getStoredGeminiModel } from './geminiService'

export async function generateDynamicRoutine(
  profile: HouseholdProfile,
  aqData: AirQualityData
): Promise<DailySmogRoutine> {
  const apiKey = getStoredGeminiKey()

  if (apiKey) {
    try {
      const aiRoutine = await fetchGeminiGeneratedRoutine(profile, aqData, apiKey)
      if (aiRoutine) return aiRoutine
    } catch (err) {
      console.warn('Gemini dynamic routine generation failed, falling back to programmatic synthesis engine', err)
    }
  }

  // Programmatic dynamic synthesis engine based on live hourly forecast data
  return synthesizeProgrammaticDynamicRoutine(profile, aqData)
}

async function fetchGeminiGeneratedRoutine(
  profile: HouseholdProfile,
  aqData: AirQualityData,
  apiKey: string
): Promise<DailySmogRoutine | null> {
  const model = getStoredGeminiModel()
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`

  const prompt = `You are Aura, an expert urban air quality engineer and pediatric pulmonology specialist.
Generate a tailored 24-hour winter smog protection and low-emission schedule for a family living in ${aqData.location.name}, ${aqData.location.country}.

Live Environmental Context:
- Current AQI: ${aqData.aqi} (${aqData.category})
- Current PM2.5: ${aqData.pm25} µg/m³
- Temperature: ${aqData.temperature}°C, Humidity: ${aqData.humidity}%, Wind: ${aqData.windSpeed} km/h
- Inversion Mixing Height: ${aqData.boundaryLayerHeightM}m (${aqData.inversionRisk} risk)

Household Profile:
- Adults: ${profile.adults}, Children: ${profile.children}, Seniors: ${profile.seniors}
- Chronic Conditions: ${profile.hasAsthmaOrCOPD ? 'Asthma/COPD present (High Risk)' : 'None'}
- Commute Mode: ${profile.commuteMode} (${profile.dailyCommuteKm} km roundtrip)
- Winter Heating: ${profile.winterHeating}
- Cooking Fuel: ${profile.cookingFuel}
- Housing Type: ${profile.homeType}, Sealing: ${profile.ventilationSealing}

Return a valid JSON object matching this TypeScript structure:
{
  "overallExposureReductionPercent": number (e.g. 65),
  "dailyAvertedEmissionsG": number (e.g. 24.5),
  "peakInversionWindow": string (e.g. "06:30 - 09:30 & 20:00 - 23:00"),
  "bestVentilationWindow": string (e.g. "12:30 - 15:30 (Solar Thermal Lift)"),
  "slots": [
    {
      "timeRange": string,
      "hour": number,
      "title": string,
      "category": "commute" | "ventilation" | "indoor_safe" | "cooking" | "exercise" | "school_kids",
      "riskLevel": "safe" | "moderate" | "caution" | "danger",
      "actionableRecommendation": string,
      "scienceWhy": string,
      "emissionAvertedDescription": string,
      "exposureDropPercent": number
    }
  ],
  "emergencyChecklist": string[]
}
Output only raw JSON with NO markdown code fences.`

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.4,
        maxOutputTokens: 2048,
        responseMimeType: 'application/json',
      },
    }),
  })

  if (!res.ok) return null

  const data = await res.json()
  const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text
  if (!rawText) return null

  const cleaned = rawText.replace(/```json/g, '').replace(/```/g, '').trim()
  const parsed = JSON.parse(cleaned)

  return {
    profile,
    generatedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    overallExposureReductionPercent: parsed.overallExposureReductionPercent || 65,
    dailyAvertedEmissionsG: parsed.dailyAvertedEmissionsG || 18.2,
    peakInversionWindow: parsed.peakInversionWindow || '06:00 - 09:30 & 20:30 - 23:30',
    bestVentilationWindow: parsed.bestVentilationWindow || '12:30 - 15:30 (Solar Thermal Lift)',
    slots: parsed.slots || [],
    emergencyChecklist: parsed.emergencyChecklist || [],
  }
}

export function synthesizeProgrammaticDynamicRoutine(
  profile: HouseholdProfile,
  aqData: AirQualityData
): DailySmogRoutine {
  const currentAQI = aqData.aqi
  const forecast = aqData.hourlyForecast || []

  // Dynamically analyze the hourly curve to find actual peak danger hours and clean hours
  const peakHours = forecast.filter((h) => h.inversionTrapping || h.aqi > currentAQI * 1.15)
  const cleanHours = forecast.filter((h) => h.isOptimalVentilationWindow || h.aqi < currentAQI * 0.85)

  const morningPeakHour = peakHours.find((h) => h.hour >= 5 && h.hour <= 10)?.hour ?? 7
  const eveningPeakHour = peakHours.find((h) => h.hour >= 19 && h.hour <= 23)?.hour ?? 21
  const optimalVentHour = cleanHours.find((h) => h.hour >= 11 && h.hour <= 16)?.hour ?? 13

  const hasKids = profile.children > 0
  const hasAsthma = profile.hasAsthmaOrCOPD
  const hasSeniors = profile.seniors > 0

  const slots: RoutineTimeSlot[] = []

  // Dynamic Slot 1: Morning Inversion & Transit
  slots.push({
    timeRange: `${(morningPeakHour - 1).toString().padStart(2, '0')}:00 - ${(morningPeakHour + 2).toString().padStart(2, '0')}:00`,
    hour: morningPeakHour,
    title: `Morning Thermal Inversion Trap (Boundary Layer: ${aqData.boundaryLayerHeightM}m)`,
    category: hasKids ? 'school_kids' : 'commute',
    riskLevel: 'danger',
    actionableRecommendation: hasKids || hasAsthma || hasSeniors
      ? `High-risk morning stagnation active in ${aqData.location.name}. Ensure children, seniors, and vulnerable members seal N95/KF94 respirators before leaving. Postpone outdoor morning jogs; switch school commute to enclosed carpool or metro.`
      : `Keep building windows latched. If driving, engage in-cabin AC Recirculation mode to block roadside exhaust intake. Avoid idling engine in morning traffic.`,
    scienceWhy: `Ground radiative cooling has compressed the mixing boundary layer down to ~${aqData.boundaryLayerHeightM}m. Sub-micron PM2.5 is trapped at human breathing level (1.5m), causing 3x higher particle deposition in bronchial airways.`,
    emissionAvertedDescription: `Avoiding vehicle cold-starts in dense traffic cuts raw VOC and elemental black carbon output by ~45g per trip.`,
    exposureDropPercent: 55,
  })

  // Dynamic Slot 2: Mid-Morning Commute & Workplace Prep
  let commuteAdvice = ''
  let commuteDrop = 40
  if (profile.commuteMode === 'two_wheeler') {
    commuteAdvice = `Two-wheeler commute exposes lungs directly to diesel tailpipes. Wear an electrostatically sealed N95 respirator. On severe days (AQI ${currentAQI}), consider shifting commute to electric metro.`
    commuteDrop = 60
  } else if (profile.commuteMode === 'car_diesel') {
    commuteAdvice = `Your diesel vehicle emits higher fine PM2.5 and NOx. Keep in-cabin AC recirculation engaged and avoid unnecessary engine idling at signal stops.`
    commuteDrop = 38
  } else if (profile.commuteMode === 'metro_subway') {
    commuteAdvice = `Rapid electric metro shelters you from ground vehicular exhaust streams. Wear an N95 respirator during the first/last mile walking connections.`
    commuteDrop = 68
  } else {
    commuteAdvice = `Remote work saves travel exposure entirely. Keep your home workspace enclosed and run your indoor air cleaner on medium speed.`
    commuteDrop = 72
  }

  slots.push({
    timeRange: `${(morningPeakHour + 2).toString().padStart(2, '0')}:00 - 11:30`,
    hour: morningPeakHour + 2,
    title: `Commute Strategy & Indoor Micro-Zoning (${profile.commuteMode.replace('_', ' ').toUpperCase()})`,
    category: 'commute',
    riskLevel: currentAQI > 250 ? 'danger' : 'caution',
    actionableRecommendation: commuteAdvice,
    scienceWhy: `Rush-hour tailpipe plumes concentrate under low wind shear (${aqData.windSpeed} km/h), elevating localized NO2 and PM2.5 by over 300 µg/m³ along transit corridors.`,
    emissionAvertedDescription: `Switching from solo driving to carpool or electric transit eliminates ~${Math.round(profile.dailyCommuteKm * 3.8)}g of primary PM2.5 per day.`,
    exposureDropPercent: commuteDrop,
  })

  // Dynamic Slot 3: Midday Dust Suppression
  slots.push({
    timeRange: `11:30 - ${(optimalVentHour - 1).toString().padStart(2, '0')}:00`,
    hour: 11,
    title: `Indoor Dust Suppression & Respiratory Mucosa Care`,
    category: 'indoor_safe',
    riskLevel: 'moderate',
    actionableRecommendation: `Use a damp microfiber mop to capture settled heavy particulates. Do NOT dry sweep with a broom. Drink warm fluids to keep the pulmonary mucociliary escalator active.`,
    scienceWhy: `Dry sweeping creates aerodynamic velocities (>1.2 m/s) that resuspend coarse dust and dried soot into the breathing zone. Microfiber capillary adhesion traps dust without aerosolization.`,
    emissionAvertedDescription: `Prevents indoor PM10 from spiking by up to 140 µg/m³ during cleaning.`,
    exposureDropPercent: 35,
  })

  // Dynamic Slot 4: The Golden Solar Window
  slots.push({
    timeRange: `${(optimalVentHour).toString().padStart(2, '0')}:00 - ${(optimalVentHour + 3).toString().padStart(2, '0')}:00`,
    hour: optimalVentHour,
    title: `The Golden Solar Window — Rapid Flush Air Renewal & Essential Errands`,
    category: 'ventilation',
    riskLevel: 'safe',
    actionableRecommendation: `If indoor air feels stale or CO2 is high (>1200 ppm), perform a 15-minute flush ventilation by cracking windows facing away from primary roads. Schedule grocery runs and physical errands during this window.`,
    scienceWhy: `Solar thermal heating breaks the ground inversion, expanding the atmospheric mixing layer up to 850m. Particulate concentrations drop to diurnal lows (typically 40-50% cleaner than morning).`,
    emissionAvertedDescription: `Warm midday engine starts require 60% less fuel enrichment, significantly reducing cold-engine exhaust plumes.`,
    exposureDropPercent: 54,
  })

  // Dynamic Slot 5: Evening Cooking & Kitchen Negative Pressure
  slots.push({
    timeRange: `18:00 - 20:30`,
    hour: 19,
    title: `Dinner Preparation: Kitchen Micro-Zoning (${profile.cookingFuel.toUpperCase()} Setup)`,
    category: 'cooking',
    riskLevel: 'caution',
    actionableRecommendation: profile.cookingFuel === 'induction'
      ? `Cook with pan lids on and range hood active. Induction produces zero combustion gas byproducts.`
      : `Pre-ignite the kitchen exhaust fan before lighting your gas burner. Close interior doors to bedrooms and crack the kitchen window 1 inch to establish negative pressure.`,
    scienceWhy: `High-heat frying and gas combustion generate ultrafine carbon soot and acrolein droplets. Negative pressure directs airborne grease plumes outside instead of into living quarters.`,
    emissionAvertedDescription: `Induction prevents indoor NO2 concentrations from spiking by 40-80 ppb.`,
    exposureDropPercent: 58,
  })

  // Dynamic Slot 6: Nocturnal Inversion Lockdown
  slots.push({
    timeRange: `${(eveningPeakHour).toString().padStart(2, '0')}:00 - 23:30`,
    hour: eveningPeakHour,
    title: `Nocturnal Inversion Trap — Seal Clean Air Bedroom Sanctuary`,
    category: 'indoor_safe',
    riskLevel: 'danger',
    actionableRecommendation: `Ensure all exterior doors and windows are tightly latched with draft stoppers in place. Run your Corsi-Rosenthal box or HEPA cleaner on high for 45 minutes before sleep, then shift to whisper-quiet medium.`,
    scienceWhy: `Radiative cooling after sunset locks night traffic smoke and heating fires beneath a shallow boundary layer (<150m). Purifying before sleep brings sanctuary PM2.5 below WHO limits (<15 µg/m³).`,
    emissionAvertedDescription: `Using an electric reverse-cycle heat pump instead of open wood or coal angithi heating avoids releasing over 350g of carcinogenic black carbon soot per night.`,
    exposureDropPercent: 78,
  })

  const avgDrop = Math.round(slots.reduce((sum, s) => sum + s.exposureDropPercent, 0) / slots.length)
  const dailyAvertedG = Math.round((currentAQI * 0.075 + (hasKids || hasAsthma ? 3.2 : 1.5)) * 10) / 10

  const emergencyChecklist = [
    'Certified N95 / FFP2 / KF94 respirators stored in clean paper bags near the entry door',
    hasAsthma ? 'Prescription bronchodilators / rescue inhalers checked and kept at bedside with spacer' : 'Saline nasal spray and eye lubricating drops prepared for mucosal soothing',
    'Indoor air purifier / Corsi-Rosenthal box operational with clean filters',
    'Window weatherstripping and door draft stoppers verified against drafts',
    `Local clean air helpline and emergency pediatric/general medical clinic numbers posted on the fridge`,
    'Saline nasal rinse and throat soothing hydration ready for evening routine',
  ]

  return {
    profile,
    generatedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    overallExposureReductionPercent: Math.min(85, Math.max(45, avgDrop)),
    dailyAvertedEmissionsG: dailyAvertedG,
    peakInversionWindow: `${morningPeakHour.toString().padStart(2, '0')}:00 - ${(morningPeakHour + 2).toString().padStart(2, '0')}:00 & ${eveningPeakHour.toString().padStart(2, '0')}:00 - 23:30`,
    bestVentilationWindow: `${optimalVentHour.toString().padStart(2, '0')}:00 - ${(optimalVentHour + 3).toString().padStart(2, '0')}:00 (Solar Thermal Lift)`,
    slots,
    emergencyChecklist,
  }
}
