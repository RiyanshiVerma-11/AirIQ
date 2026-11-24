import type { SustainableAlternative } from '../types'

export const SUSTAINABLE_ALTERNATIVES: SustainableAlternative[] = [
  {
    id: 'commute-metro-switch',
    title: 'Switch Solo Diesel/Petrol Drive to Electric Metro Rail',
    category: 'commute',
    baselineBehavior: 'Driving a single-occupant fossil fuel car (20 km daily roundtrip) in stop-and-go winter traffic.',
    sustainableAlternative: 'Utilizing underground/elevated rapid electric metro transit or bus rapid transit corridor.',
    pm25AvertedGramsPerMonth: 85,
    co2AvertedKgPerMonth: 120,
    personalExposureDropPct: 62,
    householdSavingsPerMonthUsd: 75,
    communityMultiplierImpact:
      'If 1,000 neighborhood commuters switch to electric metro, 85 kg of primary PM2.5 and 120 metric tons of CO2 are eliminated from the ground-level airshed each month.',
    scienceExplanation:
      'Diesel and petrol engines in congested, cold winter traffic undergo poor thermal efficiency, emitting elevated levels of elemental black carbon and volatile organic precursors that react with sunlight to form secondary organic aerosols. Furthermore, sitting in traffic behind exhaust pipes exposes drivers to in-cabin PM2.5 concentrations up to 4x higher than ambient city background levels.',
    actionSteps: [
      'Locate your nearest metro or express transit hub and map connecting e-rickshaw or pedestrian feeder paths.',
      'Purchase an automated smart transit pass for frictionless entry.',
      'Check morning departure times to avoid the 08:30-09:15 station crush.',
      'Wear an N95 respirator while transitioning from platform to street level.',
    ],
    difficultyLevel: 'Moderate',
  },
  {
    id: 'heating-clean-heatpump',
    title: 'Replace Biomass / Coal / Gas Heating with Inverter Heat Pump',
    category: 'cooking_heating',
    baselineBehavior: 'Using open wood/coal angithi fire pits or unvented gas heaters for evening winter warmth.',
    sustainableAlternative: 'Switching to reverse-cycle inverter AC (heat pump) or sealed electric oil-filled radiators.',
    pm25AvertedGramsPerMonth: 420,
    co2AvertedKgPerMonth: 160,
    personalExposureDropPct: 88,
    householdSavingsPerMonthUsd: 40,
    communityMultiplierImpact:
      'Replacing 500 biomass/coal heating sources prevents over 210 kg of toxic carcinogenic polycyclic aromatic hydrocarbons (PAHs) and coarse soot from choking residential streets during night inversion.',
    scienceExplanation:
      'Solid biomass and coal combustion produce massive amounts of coarse PM10, ultra-fine PM2.5, carbon monoxide, and toxic dioxins right at breathing level. Modern heat pumps do not burn any fuel on site; they extract thermodynamic heat from exterior air at 300-400% coefficient of performance (COP), producing zero localized emissions.',
    actionSteps: [
      'Set your existing split AC to Heating (Sun icon) mode at a comfortable 21°C (70°F).',
      'If using portable space heaters, opt for sealed oil-filled radiators that do not burn dust or emit combustion gases.',
      'Weather-strip exterior bedroom doors to conserve room heat without needing continuous burner output.',
    ],
    difficultyLevel: 'High Impact',
  },
  {
    id: 'cooking-clean-induction',
    title: 'Transition Cooking from Gas Flame to Magnetic Induction',
    category: 'cooking_heating',
    baselineBehavior: 'Cooking all family meals on unvented LPG / Natural gas stove burners.',
    sustainableAlternative: 'Transitioning core boiling, simmering, and curries to a high-efficiency magnetic induction cooktop.',
    pm25AvertedGramsPerMonth: 28,
    co2AvertedKgPerMonth: 35,
    personalExposureDropPct: 45,
    householdSavingsPerMonthUsd: 15,
    communityMultiplierImpact:
      'Widespread induction adoption reduces citywide residential NO2 plumes and avoids indoor asthma hospitalizations in children by an estimated 14% (Stanford Pediatric Air Study).',
    scienceExplanation:
      'Methane combustion on gas stovetops produces significant indoor nitrogen dioxide (NO2), carbon monoxide, and unburned benzene. NO2 is a potent respiratory irritant that inflames bronchial linings and triggers asthma attacks. Induction transfers 85-90% of electromagnetic energy directly into the cookware base with zero flame byproducts.',
    actionSteps: [
      'Procure an inexpensive 1800W-2000W portable induction hotplate.',
      'Use compatible ferromagnetic stainless steel or cast iron cookware.',
      'Shift daily water boiling, tea, lentils, and soups to induction; reserve gas only when flame is strictly essential.',
      'Always run the kitchen exhaust vent during meal prep.',
    ],
    difficultyLevel: 'Easy',
  },
  {
    id: 'waste-anti-leaf-burning',
    title: 'Community Leaf & Garden Waste Composting vs Open Burning',
    category: 'waste_leaf',
    baselineBehavior: 'Sweeping dried autumn leaves and garden trimmings into street piles and setting them on fire.',
    sustainableAlternative: 'Establishing neighborhood aerobic composting pits or decentralized bio-mulching trenches.',
    pm25AvertedGramsPerMonth: 650,
    co2AvertedKgPerMonth: 380,
    personalExposureDropPct: 75,
    householdSavingsPerMonthUsd: 0,
    communityMultiplierImpact:
      'Eliminating 10 street leaf burn piles in a neighborhood spares residents over 15 kg of pure black carbon soot and acrolein, preventing acute bronchial spasms across nearby homes.',
    scienceExplanation:
      'Damp fallen leaves smolder at low temperatures (<400°C), resulting in incomplete combustion. This emits up to 5x more hazardous hydrocarbons and respirable particulates per kilogram than dry wood, creating dense ground-level smoke plumes that linger in stagnant winter air.',
    actionSteps: [
      'Designate a 4x4 ft corner in the garden or society park for a simple wire-mesh compost bin.',
      'Layer dry leaves (browns) with kitchen vegetable peelings (greens) and moisten lightly with water.',
      'Educate neighborhood sweepers and guards: provide composting sacks instead of matches.',
      'Report any open burning to local municipal anti-pollution hotlines via the Community Smog Watch module.',
    ],
    difficultyLevel: 'Moderate',
  },
  {
    id: 'diy-air-sanctuary',
    title: 'Create a Household "Clean Air Sanctuary" Bedroom with C-R Box',
    category: 'indoor_filtration',
    baselineBehavior: 'Running single small underpowered air purifier with doors opening and unsealed drafts.',
    sustainableAlternative: 'Designating one primary bedroom as a sealed Clean Air Sanctuary with a DIY Corsi-Rosenthal unit running continuously.',
    pm25AvertedGramsPerMonth: 110,
    co2AvertedKgPerMonth: 0,
    personalExposureDropPct: 78,
    householdSavingsPerMonthUsd: 30,
    communityMultiplierImpact:
      'When families create clean air sanctuaries, emergency room visits for winter bronchitis drop by 40%, easing winter hospital ICU capacity across the city.',
    scienceExplanation:
      'Humans spend 7-9 hours continuously sleeping in the bedroom, accounting for over one-third of daily inhalation volume. Delivering a sustained CADR of >400 CFM into a sealed 200 sq ft room reduces PM2.5 from 300+ μg/m³ down to <15 μg/m³, giving the pulmonary immune system crucial recovery time.',
    actionSteps: [
      'Pick the family bedroom where vulnerable children or elders sleep.',
      'Install rubber weatherstripping on windows and an under-door draft stopper.',
      'Assemble a Corsi-Rosenthal box or position a high-CADR HEPA cleaner away from walls.',
      'Keep bedroom doors closed; prohibit indoor candle burning or dry sweeping in this sanctuary.',
    ],
    difficultyLevel: 'Easy',
  },
]
