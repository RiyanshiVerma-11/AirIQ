import type { CommunityChallenge, CommunityReport } from '../types'

export const INITIAL_COMMUNITY_REPORTS: CommunityReport[] = [
  {
    id: 'rep-01',
    timestamp: '25 mins ago',
    reporterName: 'Ananya S. (RWA Ward 4)',
    locationNeighborhood: 'Sector 14 Residential Belt',
    category: 'biomass_leaf_burning',
    severity: 'critical',
    description:
      'Municipal sweepers accumulated three 2-meter piles of dry fallen leaves and ignited them on the sidewalk directly opposite the elementary school. Dense acrid smoke drifting across playground.',
    status: 'investigating',
    upvotes: 24,
  },
  {
    id: 'rep-02',
    timestamp: '1 hour ago',
    reporterName: 'Marcus T.',
    locationNeighborhood: 'Industrial Bypass Corridor',
    category: 'construction_dust_uncovered',
    severity: 'high',
    description:
      'Major flyover excavation site operating with zero water sprinklers or anti-smog water mist canons. Dump trucks entering without washing tires; severe visible dust cloud over 4 lanes.',
    status: 'reported',
    upvotes: 18,
  },
  {
    id: 'rep-03',
    timestamp: '3 hours ago',
    reporterName: 'Priya & Rahul K.',
    locationNeighborhood: 'Central Market Square',
    category: 'vehicular_idling_hotspot',
    severity: 'moderate',
    description:
      'Over 20 diesel delivery vans and three-wheelers idling continuously outside the delivery dispatch bay while drivers wait for cargo loading.',
    status: 'mitigated',
    upvotes: 12,
  },
]

export const INITIAL_CHALLENGES: CommunityChallenge[] = [
  {
    id: 'chal-01',
    title: 'Winter Clean Commute: The Metro & Carpool Pledge',
    description:
      'Commit to taking electric transit, metro, or shared carpool at least 3 days per week to remove peak morning cold-start emissions from our city airshed.',
    participantsCount: 1420,
    targetAvertedPM25Kg: 250,
    currentAvertedPM25Kg: 184,
    daysLeft: 18,
    joined: true,
    icon: 'Train',
  },
  {
    id: 'chal-02',
    title: 'Zero-Burn Leaf Composting Initiative',
    description:
      'Equip neighborhood gardeners with wire-mesh compost bins and compost sacks to prevent open leaf and garden debris fires in residential lanes.',
    participantsCount: 830,
    targetAvertedPM25Kg: 600,
    currentAvertedPM25Kg: 495,
    daysLeft: 24,
    joined: false,
    icon: 'Leaf',
  },
  {
    id: 'chal-03',
    title: 'The Corsi-Rosenthal School Air Sanctuary Project',
    description:
      'Sponsor and assemble low-cost C-R box purifiers for local public classrooms and daycares to safeguard children during hazardous smog days.',
    participantsCount: 310,
    targetAvertedPM25Kg: 120,
    currentAvertedPM25Kg: 88,
    daysLeft: 11,
    joined: false,
    icon: 'Wind',
  },
]
