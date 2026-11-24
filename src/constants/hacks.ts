export interface DIYHackGuide {
  id: string
  title: string
  subtitle: string
  tag: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  estimatedCostUsd: number
  effectivenessRating: string
  scientificMechanism: string
  materialsNeeded: string[]
  stepByStepInstructions: string[]
  proTips: string[]
  whatToAvoid: string[]
}

export const SCIENCE_BACKED_HACKS: DIYHackGuide[] = [
  {
    id: 'corsi-rosenthal-box',
    title: 'The Corsi-Rosenthal (C-R) Box Purifier',
    subtitle: 'Proven open-source air cleaner delivering 450-550 CFM CADR for under $70.',
    tag: 'Highest Impact / High CADR',
    difficulty: 'Intermediate',
    estimatedCostUsd: 65,
    effectivenessRating: '95% PM2.5 Removal (Surpasses $500 commercial HEPA units)',
    scientificMechanism:
      'Engineered by Prof. Richard Corsi & Jim Rosenthal. By utilizing 4 deep-pleated MERV 13 filters in a cube formation, the effective filtration surface area expands to >36 square feet. This dramatically lowers face velocity and static pressure resistance across each filter, allowing a standard box fan to operate at peak volumetric airflow without motor strain or noise.',
    materialsNeeded: [
      '1x 20" x 20" Box Fan (3-speed, standard utility model)',
      '4x 20" x 20" x 2" (or 1") MERV 13 furnace filters (with wire-backed pleats)',
      '1x Cardboard bottom piece (20" x 20")',
      '1x Roll of Duct tape or heavy-duty packaging tape',
      'Scissors / Utility knife',
      'Cardboard shroud ring (15" diameter inner cutout)',
    ],
    stepByStepInstructions: [
      'Tape the 4 MERV 13 filters together in a square box formation, ensuring all filter airflow directional arrows point INWARD toward the center.',
      'Cut a 20"x20" cardboard square and securely tape it as the bottom base of the cube.',
      'Place the 20" box fan on top of the 4 filters, oriented so the fan blows air UPWARD and OUTWARD away from the box.',
      'CRITICAL STEP (The Shroud): Cut a circular donut ring from leftover cardboard with an outer size of 20"x20" and an inner circle opening of 14-15 inches. Tape it over the front grille of the box fan. This prevents air recirculation vortices at blade tips and boosts airflow efficiency by 25-30%!',
      'Seal all seams with duct tape. Plug in and run on Medium speed for continuous, whisper-quiet whole-room filtration.',
    ],
    proTips: [
      'MERV 13 is the gold standard for trapping PM2.5 (captures >85% of 0.3-1.0 μm particles and >90% of 1.0-3.0 μm particles).',
      'Filters last 6 to 9 months because the huge surface area distributes dust loading evenly, unlike cramped commercial cylindrical cartridges.',
    ],
    whatToAvoid: [
      'Do not use MERV 8 filters; they only trap coarse dust and pass dangerous alveolar PM2.5 right through.',
      'Do not orient the fan blowing down into the box; blowing upwards prevents dust re-entrainment from the floor.',
    ],
  },
  {
    id: 'wet-mopping-aerodynamics',
    title: 'Microfiber Wet-Mopping vs Dry Broom Resuspension',
    subtitle: 'Stop re-injecting settled toxic heavy metal aerosols into your family’s breathing zone.',
    tag: 'Daily Habit Hack',
    difficulty: 'Beginner',
    estimatedCostUsd: 12,
    effectivenessRating: '80% Reduction in Resuspended Coarse & Fine Particulates',
    scientificMechanism:
      'Dry brooms create aerodynamic shear velocities exceeding 1.2 m/s right above the floor. This easily detaches sub-10-micron particles that have settled overnight and launches them back into suspension, keeping indoor PM10 and PM2.5 elevated for up to 3 hours after cleaning. A damp microfiber mop employs capillary liquid tension and static Van der Waals forces, permanently trapping particles on the cloth fibers without aerosolization.',
    materialsNeeded: [
      'Microfiber flat mop with washable pads',
      'Bucket of water with mild dish soap or white vinegar',
      'Spray bottle for spot misting',
    ],
    stepByStepInstructions: [
      'Eliminate traditional dry bristle broom sweeping entirely during severe smog season.',
      'Dampen the microfiber pad (wring out thoroughly so it is humid, not dripping).',
      'Mop with an S-pattern motion, moving continuously forward without lifting the mop head off the floor surface.',
      'Rinse the mop pad in a dedicated bucket every 150 square feet to prevent re-distributing trapped particulate mud.',
      'Wash microfiber pads in warm water without fabric softener (which coats fibers and ruins electrostatic retention).',
    ],
    proTips: [
      'Schedule wet-mopping around 10:00 AM after morning traffic peak to capture particles that infiltrated overnight.',
      'Always vacuum only if your vacuum cleaner features a sealed True HEPA exhaust filter; otherwise standard vacuums act as aerosol blasters.',
    ],
    whatToAvoid: [
      'Never dry-sweep with a broom in a bedroom where children or asthmatics sleep.',
      'Do not use feather dusters or dry rags on bookshelves and tables.',
    ],
  },
  {
    id: 'kitchen-micro-zoning',
    title: 'Kitchen Micro-Zoning & Negative Pressure Management',
    subtitle: 'Prevent high-heat cooking and tadka from converting your living room into a smog chamber.',
    tag: 'Indoor Source Control',
    difficulty: 'Beginner',
    estimatedCostUsd: 5,
    effectivenessRating: 'Cuts Indoor Cooking Spikes by up to 250 μg/m³ PM2.5',
    scientificMechanism:
      'Cooking oils heated above their smoke point (especially frying, grilling, and tempering spices) undergo thermal pyrolysis, releasing ultrafine carbon soot and acrolein aerosols that can shoot indoor PM2.5 over 600 μg/m³ in minutes. Establishing negative pressure in the kitchen by sealing adjoining doors and running a dedicated exhaust fan ensures air flows FROM living areas INTO the kitchen and directly OUTDOORS.',
    materialsNeeded: [
      'Door draft seal or rolled towel',
      'Kitchen exhaust fan or chimney',
      'Cookware lid covers',
    ],
    stepByStepInstructions: [
      'Before turning on the burner, turn on the kitchen exhaust hood or chimney on high speed.',
      'Close all interior doors connecting the kitchen to the dining room, living area, and bedrooms.',
      'Crack the kitchen window facing away from the street by 1-2 inches to provide make-up air for the exhaust fan, preventing backdrafting from dirty building shafts.',
      'Keep pans covered with lids whenever simmering, shallow frying, or boiling.',
      'Leave the kitchen exhaust running for at least 15 minutes after cooking finishes to exhaust residual ultrafine particulate plume.',
    ],
    proTips: [
      'Switching to induction cooking eliminates combustion byproducts (NO2 and CO) generated by LPG flame burners.',
      'Wipe down stove splash guards immediately; vaporized oils continue outgassing VOCs as they cool.',
    ],
    whatToAvoid: [
      'Do not leave kitchen doors wide open while searing or deep frying with the exhaust off.',
      'Avoid unvented range hoods that only recirculate through a greasy mesh without venting outside.',
    ],
  },
  {
    id: 'weatherstripping-draft-blocker',
    title: 'Door & Window Weatherstripping & Crack Sealing',
    subtitle: 'Cut ambient smog infiltration by 45% without costly window replacements.',
    tag: 'Building Envelope',
    difficulty: 'Beginner',
    estimatedCostUsd: 18,
    effectivenessRating: 'Cuts Infiltration Rate from 1.2 ACH to 0.35 ACH',
    scientificMechanism:
      'Buildings undergo the stack effect: cold outdoor air is drawn through low-level cracks around exterior doors and windows. Sub-micron PM2.5 behaves like a gas, entering unhindered through 1mm gaps. Applying closed-cell EPDM rubber weatherstripping and door bottom sweeps dramatically increases flow resistance, restricting particulate penetration by up to 60%.',
    materialsNeeded: [
      'Self-adhesive D-profile or V-profile EPDM rubber weatherstripping tape',
      'Under-door twin draft stopper (fabric sleeve with foam rods)',
      'Rubbing alcohol for surface cleaning',
      'Painter tape for temporary window sash sealing during smog emergencies',
    ],
    stepByStepInstructions: [
      'Inspect exterior doors and windows with a flashlight at night; any light visible through edges indicates a particulate superhighway.',
      'Clean window and door frame jambs thoroughly with rubbing alcohol and dry completely.',
      'Peel and press the rubber weatherstripping tape firmly along all four inner frame stops.',
      'Slide an adjustable dual-sided foam draft stopper beneath main entry doors.',
      'During severe Level-4 hazardous smog episodes (AQI > 400), seal perimeter seams of unused windows with low-tack painter tape.',
    ],
    proTips: [
      'EPDM rubber retains elasticity in freezing winter temperatures much better than cheap open-cell foam.',
      'Sealing drafts also slashes heating energy consumption by 15-20%!',
    ],
    whatToAvoid: [
      'Never seal a room that uses an unvented gas or kerosene heater (risk of fatal carbon monoxide poisoning).',
      'Do not tape over fire emergency escape windows permanently.',
    ],
  },
  {
    id: 'mask-fit-physics',
    title: 'N95 / FFP2 Fit Optimization & Mask Physics',
    subtitle: 'Why cloth and surgical masks fail in smog, and how head-strap N95s protect alveoli.',
    tag: 'Personal Protection',
    difficulty: 'Beginner',
    estimatedCostUsd: 8,
    effectivenessRating: 'Up to 98% Inhaled PM2.5 Filtration with proper seal',
    scientificMechanism:
      'Surgical masks and cloth face coverings have large peripheral gaps near the cheeks and nose bridge. Because air follows the path of least resistance, 40-70% of inhaled air bypasses the fabric entirely without filtration. In contrast, certified N95 / FFP2 / KF94 respirators utilize an electrostatically charged meltblown polypropylene matrix with stiff contouring and headbands to maintain airtight facial contact.',
    materialsNeeded: [
      'Certified NIOSH N95, FFP2, or KF94 respirator (head-strap models preferred over ear-loops)',
      'Mask ear-saver strap clip (if using ear-loop models)',
      'Adjustable metal nose-bridge clip',
    ],
    stepByStepInstructions: [
      'Cup the respirator in your hand with the nosepiece resting at your fingertips.',
      'Hold the respirator against your face, positioning the bottom strap over your head beneath the ears and the top strap over the crown of your head.',
      'Use both index fingers to mold the metal nosepiece snugly across the bridge of your nose (do not pinch with one hand, which creates a sharp peak gap).',
      'Perform a User Seal Check: Cup both hands over the respirator face and exhale sharply. If air leaks around your nose, readjust the nosepiece; if air leaks at edges, tighten straps.',
      'Discard or replace when breathing resistance noticeably increases or mask becomes soiled (typically 40 hours of cumulative wear).',
    ],
    proTips: [
      'Facial hair (even 1-2 days of stubble) breaks the micro-seal and drops filtration efficiency by up to 50%.',
      'Keep respirators in a clean, breathable paper bag between uses to let moisture evaporate without crushing the shape.',
    ],
    whatToAvoid: [
      'Never wash an N95 respirator with water or alcohol; moisture destroys the electrostatic charge of the meltblown fibers!',
      'Do not rely on standard fabric masks, bandanas, or single-layer surgical masks for PM2.5 protection.',
    ],
  },
]
