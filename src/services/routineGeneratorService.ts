import { AirQualityData, DailySmogRoutine, HouseholdProfile, RoutineTimeSlot } from '../types'

export function generateDailySmogRoutine(
  profile: HouseholdProfile,
  aqData: AirQualityData
): DailySmogRoutine {
  const currentAQI = aqData.aqi
  const isExtremeSmog = currentAQI > 300
  const hasVulnerable = profile.children > 0 || profile.seniors > 0 || profile.hasAsthmaOrCOPD

  const slots: RoutineTimeSlot[] = []

  // 06:00 - 08:30: Morning Inversion Peak & School/Morning Routine
  slots.push({
    timeRange: '06:00 - 08:30',
    hour: 7,
    title: 'Severe Morning Inversion Stagnation — Shelter & Safe School Departure',
    category: hasVulnerable ? 'school_kids' : 'commute',
    riskLevel: 'danger',
    actionableRecommendation: hasVulnerable
      ? 'Postpone any outdoor jogging or walking. For school children, ensure a certified KF94 or small N95 respirator is sealed before stepping onto the bus or street. Avoid walking along primary arterial roads where heavy diesel trucks idle.'
      : 'Keep all windows tightly latched. If commuting, engage vehicle AC in Recirculation mode (orange curved arrow) to block roadside particulate intake. Do not dry-sweep floors.',
    scienceWhy:
      'Atmospheric boundary layer is compressed below 150m due to night radiative cooling. Fine PM2.5 concentration at 1.5m breathing height is 2.5x higher than midday levels. Inhaling cold smog triggers acute bronchoconstriction in children and asthmatics.',
    emissionAvertedDescription:
      'Keeping windows sealed and deferring vehicle cold-starts prevents cold-engine enrichment emissions (+300% unburned hydrocarbons).',
    exposureDropPercent: 48,
  })

  // 08:30 - 10:30: Morning Commute & Work / Indoor Prep
  let commuteAdvice = ''
  let commuteDrop = 35
  if (profile.commuteMode === 'two_wheeler') {
    commuteAdvice =
      'Two-wheeler riders directly face vehicle exhaust plumes. Wear a tight head-strap N95 respirator (cloth bandanas offer <15% filtration). Consider carpooling or switching to rapid metro transit on severe smog days.'
    commuteDrop = 55
  } else if (profile.commuteMode === 'car_diesel' || profile.commuteMode === 'car_petrol') {
    commuteAdvice =
      'Pre-seal vehicle cabin: ensure cabin air filter is rated MERV 13/HEPA. Keep windows rolled up and cabin recirculation active. Avoid idling in traffic jams; shut engine off if waiting over 30 seconds.'
    commuteDrop = 40
  } else if (profile.commuteMode === 'metro_subway') {
    commuteAdvice =
      'Excellent choice: Underground and elevated electric metro platforms shelter you from ground vehicular exhaust streams. Wear mask during the first/last mile walk.'
    commuteDrop = 65
  } else {
    commuteAdvice =
      'Work from home active: Run indoor air cleaner in your home workspace. Keep bedroom and home office doors closed to localize clean air delivery.'
    commuteDrop = 70
  }

  slots.push({
    timeRange: '08:30 - 10:30',
    hour: 9,
    title: 'Commute & Indoor Clean Air Zoning',
    category: 'commute',
    riskLevel: isExtremeSmog ? 'danger' : 'caution',
    actionableRecommendation: commuteAdvice,
    scienceWhy:
      'Morning rush-hour tailpipe emissions coincide with calm wind speeds (<4 km/h), causing acute roadside NO2 and PM2.5 spikes up to 600 μg/m³.',
    emissionAvertedDescription:
      'Taking transit or carpooling removes ~35g of primary PM2.5 and 5 kg of CO2 per trip compared to solo driving.',
    exposureDropPercent: commuteDrop,
  })

  // 10:30 - 12:30: Mid-Morning Household Maintenance & Deep Clean
  slots.push({
    timeRange: '10:30 - 12:30',
    hour: 11,
    title: 'Indoor Surface Dust Suppression & Hydration',
    category: 'indoor_safe',
    riskLevel: 'moderate',
    actionableRecommendation:
      'Perform wet-mopping using a damp microfiber cloth instead of dry sweeping. Wipe surfaces with a moist cloth. Encourage family members to drink warm fluids; hydration maintains the mucociliary escalator lining your bronchial tubes.',
    scienceWhy:
      'Dry brooms create micro-vortices that resuspend heavy metals, silica, and dried soot back into the air at head height. Microfiber captures particles through capillary action and Van der Waals forces.',
    emissionAvertedDescription:
      'Zero resuspension prevents indoor PM10 from spiking by up to 180 μg/m³.',
    exposureDropPercent: 32,
  })

  // 12:30 - 15:30: The Golden Midday Window — Ventilation & Necessary Outdoor Tasks
  slots.push({
    timeRange: '12:30 - 15:30',
    hour: 14,
    title: 'The Golden Solar Window — Rapid Air Renewal & Essential Errands',
    category: 'ventilation',
    riskLevel: 'safe',
    actionableRecommendation:
      'If indoor CO2 has accumulated (>1200 ppm) or air feels stale, conduct a "flush ventilation" for 15-20 minutes: open opposite windows facing away from busy streets, then close and reseal. Schedule all outdoor grocery runs, doctor visits, or dog walks during this midday block.',
    scienceWhy:
      'Solar thermal radiation warms the earth’s surface, breaking the overnight inversion layer and expanding the atmospheric boundary layer up to 900m. Particulate concentrations drop to their lowest diurnal point (typically 40-50% lower than morning).',
    emissionAvertedDescription:
      'Warm engine starts during midday require 60% less fuel enrichment than cold morning starts, slashing VOC and CO emissions.',
    exposureDropPercent: 52,
  })

  // 15:30 - 18:00: Afternoon School Return & Indoor Activity
  slots.push({
    timeRange: '15:30 - 18:00',
    hour: 16,
    title: 'School Return & Safe Indoor Recreation',
    category: 'school_kids',
    riskLevel: 'moderate',
    actionableRecommendation:
      'Upon returning home, have children change out of outdoor clothes and wash face and hands to remove deposited outdoor soot. Transition sports and playtime indoors in rooms with active filtration.',
    scienceWhy:
      'Children breathe 50% more air per pound of body weight than adults and breathe closer to the ground where heavy particles concentrate. Outdoor aerobic exercise during smog multiplies alveolar deposition 4-fold.',
    emissionAvertedDescription:
      'Transitioning to home indoor play prevents neighborhood vehicle trips to external gyms or clubs.',
    exposureDropPercent: 40,
  })

  // 18:00 - 20:30: Evening Cooking & Kitchen Negative Pressure
  slots.push({
    timeRange: '18:00 - 20:30',
    hour: 19,
    title: 'Dinner Preparation: Kitchen Micro-Zoning & Induction Cooking',
    category: 'cooking',
    riskLevel: 'caution',
    actionableRecommendation:
      'Power on the kitchen exhaust hood on high before lighting any stove or appliance. Close interior doors to living and bedrooms. If using induction, cook with lids on to trap grease droplets. Avoid open-flame roasting or high-temperature smoking oil frying without direct exhaust.',
    scienceWhy:
      'Thermal pyrolysis of cooking oils produces high concentrations of ultrafine PM2.5 and acrolein. Negative pressure forces air out through the vent, preventing cooking plumes from contaminating the entire home.',
    emissionAvertedDescription:
      'Using induction eliminates gas combustion byproducts (NO2 and CO) entirely, preventing indoor spikes up to 400 ppb NO2.',
    exposureDropPercent: 58,
  })

  // 20:30 - 23:30: Nocturnal Inversion Lockdown & Sanctuary Prep
  slots.push({
    timeRange: '20:30 - 23:30',
    hour: 21,
    title: 'Nighttime Inversion Descent — Seal & Run Clean Air Sanctuary',
    category: 'indoor_safe',
    riskLevel: 'danger',
    actionableRecommendation:
      'Ensure all windows and exterior doors are firmly latched with draft stoppers in place. Turn bedroom DIY Corsi-Rosenthal box or HEPA purifier to Medium/High setting at least 45 minutes before bedtime. Avoid burning mosquito coils, incense, or unvented heaters.',
    scienceWhy:
      'As the sun sets, ground temperature plummets and winds die down, trapping evening traffic exhaust, biomass smoke, and dust in a shallow ground inversion lid. Running purifiers before entering the bedroom ensures equilibrium PM2.5 drops below 15 μg/m³ before sleep.',
    emissionAvertedDescription:
      'Eliminating burning mosquito coils avoids the particulate emission equivalent of burning 75-100 cigarettes per coil (Liu et al. study).',
    exposureDropPercent: 75,
  })

  // Calculate overall exposure reduction
  const avgReduction = Math.round(
    slots.reduce((sum, s) => sum + s.exposureDropPercent, 0) / slots.length
  )
  const dailyAvertedGrams = Math.round((currentAQI * 0.08 + (hasVulnerable ? 2.5 : 1.2)) * 10) / 10

  const emergencyChecklist = [
    'Certified N95 / FFP2 / KF94 respirators stored in clean paper bags near the front door',
    'Prescription inhalers / bronchodilators verified and kept at bedside',
    'Indoor air purifier / Corsi-Rosenthal box operational with clean filters',
    'Weather-stripping and under-door draft stoppers checked for drafts',
    'Emergency municipal smog helpline and pediatric clinic numbers posted on the fridge',
    'Saline nasal spray and eye lubricating drops available for mucosal soothing',
  ]

  return {
    profile,
    generatedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    overallExposureReductionPercent: Math.min(85, Math.max(45, avgReduction)),
    dailyAvertedEmissionsG: dailyAvertedGrams,
    peakInversionWindow: '06:00 - 09:30 & 20:30 - 23:30',
    bestVentilationWindow: '12:30 - 15:30 (Solar Thermal Lift Window)',
    slots,
    emergencyChecklist,
  }
}
