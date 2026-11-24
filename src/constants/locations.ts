import type { LocationData } from '../types'

export const PRESET_LOCATIONS: LocationData[] = [
  {
    id: 'delhi',
    name: 'Delhi NCR',
    region: 'National Capital Region',
    country: 'India',
    flag: '🇮🇳',
    latitude: 28.6139,
    longitude: 77.2090,
    typicalWinterPhenomenon:
      'Severe winter nocturnal thermal inversion, stubble smoke stagnation, dense smog (smoky fog) trapping PM2.5 at breathing level.',
  },
  {
    id: 'lahore',
    name: 'Lahore',
    region: 'Punjab',
    country: 'Pakistan',
    flag: '🇵🇰',
    latitude: 31.5497,
    longitude: 74.3436,
    typicalWinterPhenomenon:
      'Indo-Gangetic basin particulate entrapment with zero wind speed and low mixing height (< 150m) causing hazardous multi-week smog curtains.',
  },
  {
    id: 'beijing',
    name: 'Beijing',
    region: 'Hebei Plain',
    country: 'China',
    flag: '🇨🇳',
    latitude: 39.9042,
    longitude: 116.4074,
    typicalWinterPhenomenon:
      'Winter heating season coal and industrial aerosol accumulation under regional high-pressure atmospheric caps.',
  },
  {
    id: 'mumbai',
    name: 'Mumbai',
    region: 'Maharashtra',
    country: 'India',
    flag: '🇮🇳',
    latitude: 19.0760,
    longitude: 72.8777,
    typicalWinterPhenomenon:
      'Coastal sea-breeze reversals combined with heavy construction dust and vehicle idling creating dense morning haze belts.',
  },
  {
    id: 'saltlakecity',
    name: 'Salt Lake City',
    region: 'Utah Valley (Wasatch)',
    country: 'United States',
    flag: '🇺🇸',
    latitude: 40.7608,
    longitude: -111.8910,
    typicalWinterPhenomenon:
      'Topographic valley cold-air pooling: snow cover traps cold air between mountain ranges while high pressure acts as an airtight ceiling.',
  },
  {
    id: 'bakersfield',
    name: 'Bakersfield',
    region: 'San Joaquin Valley, CA',
    country: 'United States',
    flag: '🇺🇸',
    latitude: 35.3733,
    longitude: -119.0187,
    typicalWinterPhenomenon:
      'Agricultural basin inversion with stagnant Tule fog, trapping diesel particulate and ammonium nitrate particles.',
  },
  {
    id: 'krakow',
    name: 'Krakow',
    region: 'Lesser Poland',
    country: 'Poland',
    flag: '🇵🇱',
    latitude: 50.0647,
    longitude: 19.9450,
    typicalWinterPhenomenon:
      'Vistula river basin thermal inversion combined with residential solid fuel (coal/wood) winter heating emissions.',
  },
  {
    id: 'london',
    name: 'London',
    region: 'Greater London',
    country: 'United Kingdom',
    flag: '🇬🇧',
    latitude: 51.5074,
    longitude: -0.1278,
    typicalWinterPhenomenon:
      'Winter anticyclonic conditions causing stagnant roadside NO2 and PM2.5 spikes during calm, frosty mornings.',
  },
]
