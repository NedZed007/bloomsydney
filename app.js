/* BloomSydney — Florist marketplace & postcode routing */

const FLORISTS = [
  {
    id: 'parramatta',
    name: 'Arcade Flowers',
    suburb: 'Parramatta',
    postcode: '2150',
    address: '48 George Street, Parramatta NSW 2150',
    phone: '02 9635 6566',
    email: 'info@arcadeflowers.com.au',
    website: 'https://www.arcadeflowers.com.au',
    region: 'Western Sydney',
    lat: -33.8142,
    lng: 151.0018,
    availability: 92,
    color: '#c45c6a',
    specialties: ['CBD corporate delivery', 'Same-day metro delivery', '60+ years established'],
  },
  {
    id: 'bankstown',
    name: 'Bright Flowers',
    suburb: 'Bankstown',
    postcode: '2200',
    address: 'Shop 19, Bankstown Centro, Bankstown NSW 2200',
    phone: '02 9793 2927',
    email: 'info@brightflowersflorist.com.au',
    website: 'https://www.brightflowersflorist.com.au',
    region: 'South-West Sydney',
    lat: -33.9173,
    lng: 151.0350,
    availability: 88,
    color: '#5c7a6b',
    specialties: ['Hospital & funeral delivery', 'Same-day Bankstown', 'Centro shopping centre'],
  },
  {
    id: 'penrith',
    name: "Donna's Flower Shop",
    suburb: 'Penrith',
    postcode: '2750',
    address: 'Shop 16, Memory Mall, 429 High Street, Penrith NSW 2750',
    phone: '02 4789 0722',
    email: 'info@donnasflowershop.com.au',
    website: 'https://www.donnasflowershoppenrith.com.au',
    region: 'Outer Western Sydney',
    lat: -33.7518,
    lng: 150.6945,
    availability: 90,
    color: '#7b6b9e',
    specialties: ['Family-owned since 2005', 'Blue Mountains delivery', 'Same-day before 2pm'],
  },
  {
    id: 'campbelltown',
    name: 'Flowers on Queen St',
    suburb: 'Campbelltown',
    postcode: '2560',
    address: 'Shop 2A, 261 Queen Street, Campbelltown NSW 2560',
    phone: '02 4656 2507',
    email: 'orders@flowersonqueenst.com.au',
    website: 'https://www.flowersonqueenst.com.au',
    region: 'Macarthur',
    lat: -34.0638,
    lng: 150.8135,
    availability: 91,
    color: '#d4845c',
    specialties: ['Own floral courier', 'In-store boutique', 'Macarthur weddings'],
  },
  {
    id: 'ashfield',
    name: 'Roses for You',
    suburb: 'Ashfield',
    postcode: '2131',
    address: 'Shop 20, Ashfield Mall, 260 Liverpool Road, Ashfield NSW 2131',
    phone: '02 9716 0277',
    email: 'info@rosesforyou.com.au',
    website: 'https://www.rosesforyou.com.au',
    region: 'Inner West',
    lat: -33.8895,
    lng: 151.1268,
    availability: 94,
    color: '#4a8fa8',
    specialties: ['Events & installations', '30+ years Inner West', 'Wedding florals'],
  },
  {
    id: 'chatswood',
    name: 'Throne of Flowers',
    suburb: 'Chatswood',
    postcode: '2067',
    address: 'Shop G10, 260 Victoria Avenue, Chatswood NSW 2067',
    phone: '02 9419 3711',
    email: 'info@flowerdeliverychatswood.com.au',
    website: 'https://www.flowerdeliverychatswood.com.au',
    region: 'Lower North Shore',
    lat: -33.7965,
    lng: 151.1815,
    availability: 89,
    color: '#8b5cf6',
    specialties: ['North Shore delivery', 'Victoria Ave retail', 'Hospital deliveries'],
  },
  {
    id: 'bondi',
    name: 'Pearsons Florist',
    suburb: 'Bondi Junction',
    postcode: '2022',
    address: 'Westfield Bondi Junction, Level 1 Shop 1030, 500 Oxford Street, Bondi Junction NSW 2022',
    phone: '02 9389 0111',
    email: 'bondijunction@pearsonsflorist.com.au',
    website: 'https://pearsonsflorist.com.au',
    region: 'Eastern Suburbs',
    lat: -33.8925,
    lng: 151.2503,
    availability: 93,
    color: '#e879a9',
    specialties: ['Family-owned since 1969', 'Eastern Suburbs wide', 'Flemington Markets daily'],
  },
  {
    id: 'manly',
    name: 'Manly Flower Boutique',
    suburb: 'Manly',
    postcode: '2095',
    address: '40 Sydney Road, Manly NSW 2095',
    phone: '0431 488 672',
    email: 'manlyflowerboys@gmail.com',
    website: 'https://manlyflower.com.au',
    region: 'Northern Beaches',
    lat: -33.7972,
    lng: 151.2880,
    availability: 87,
    color: '#0ea5e9',
    specialties: ['Handcrafted bouquets', 'Northern Beaches delivery', 'Daily market fresh'],
  },
  {
    id: 'liverpool',
    name: "Lillian's Florist",
    suburb: 'Liverpool',
    postcode: '2170',
    address: '4/220 George Street, Liverpool NSW 2170',
    phone: '02 9601 8776',
    email: 'info@lilliansfloristshop.com.au',
    website: 'https://www.lilliansfloristshop.com.au',
    region: 'South-West Corridor',
    lat: -33.9215,
    lng: 150.9235,
    availability: 86,
    color: '#f59e0b',
    specialties: ['South-west Sydney', 'Same-day Liverpool', 'Hand-crafted arrangements'],
  },
  {
    id: 'hornsby',
    name: 'Hornsby Floral Fantasy',
    suburb: 'Hornsby',
    postcode: '2077',
    address: 'Kiosk 1012, Westfield Hornsby, Hornsby NSW 2077',
    phone: '02 8379 2479',
    email: 'sales@floristinhornsby.com.au',
    website: 'https://www.floristinhornsby.com.au',
    region: 'Upper North Shore',
    lat: -33.7045,
    lng: 151.0995,
    availability: 88,
    color: '#84cc16',
    specialties: ['Upper North Shore', 'Westfield Hornsby', 'Hills district delivery'],
  },
];

const PRODUCTS = [
  { id: 'classic-rose', name: 'Classic Rose Bouquet', emoji: '🌹', desc: 'A dozen premium red roses with eucalyptus', price: 89 },
  { id: 'native-wild', name: 'Native Wildflower Mix', emoji: '🌼', desc: 'Banksia, waratah & kangaroo paw in rustic wrap', price: 75 },
  { id: 'spring-garden', name: 'Spring Garden Box', emoji: '🌷', desc: 'Tulips, daffodils & hyacinth in a gift box', price: 65 },
  { id: 'orchid-elegance', name: 'Orchid Elegance', emoji: '🪻', desc: 'Single white phalaenopsis in ceramic pot', price: 95 },
  { id: 'sunshine-bunch', name: 'Sunshine Bunch', emoji: '🌻', desc: 'Bright sunflowers with seasonal fillers', price: 55 },
  { id: 'sympathy-wreath', name: 'Sympathy Wreath', emoji: '🤍', desc: 'White lilies & chrysanthemums on standing wreath', price: 120 },
  { id: 'luxury-mixed', name: 'Luxury Mixed Arrangement', emoji: '💐', desc: 'Premium seasonal blooms in glass vase', price: 110 },
  { id: 'succulent-garden', name: 'Succulent Garden', emoji: '🌵', desc: 'Assorted succulents in modern concrete planter', price: 70 },
];

/* Greater Sydney postcode centroids (sample set for routing demo) */
const POSTCODE_COORDS = {
  '1000': { lat: -33.8688, lng: 151.2093, suburb: 'Sydney CBD' },
  '2000': { lat: -33.8688, lng: 151.2093, suburb: 'Sydney CBD' },
  '2010': { lat: -33.8840, lng: 151.2150, suburb: 'Surry Hills' },
  '2011': { lat: -33.8700, lng: 151.1950, suburb: 'Woolloomooloo' },
  '2015': { lat: -33.8950, lng: 151.1800, suburb: 'Alexandria' },
  '2016': { lat: -33.9100, lng: 151.1950, suburb: 'Redfern' },
  '2017': { lat: -33.9050, lng: 151.1700, suburb: 'Waterloo' },
  '2018': { lat: -33.9200, lng: 151.2050, suburb: 'Rosebery' },
  '2019': { lat: -33.9300, lng: 151.1950, suburb: 'Botany' },
  '2020': { lat: -33.9100, lng: 151.2200, suburb: 'Mascot' },
  '2021': { lat: -33.9150, lng: 151.2400, suburb: 'Paddington' },
  '2022': { lat: -33.9200, lng: 151.2550, suburb: 'Bondi Junction' },
  '2023': { lat: -33.8900, lng: 151.2500, suburb: 'Bellevue Hill' },
  '2024': { lat: -33.9000, lng: 151.2600, suburb: 'Bronte' },
  '2025': { lat: -33.9100, lng: 151.2650, suburb: 'Woollahra' },
  '2026': { lat: -33.8900, lng: 151.2750, suburb: 'Bondi Beach' },
  '2030': { lat: -33.8700, lng: 151.2400, suburb: 'Darlinghurst' },
  '2031': { lat: -33.8650, lng: 151.2300, suburb: 'Kings Cross' },
  '2035': { lat: -33.9200, lng: 151.2300, suburb: 'Maroubra' },
  '2040': { lat: -33.8800, lng: 151.1700, suburb: 'Leichhardt' },
  '2041': { lat: -33.8750, lng: 151.1550, suburb: 'Balmain' },
  '2042': { lat: -33.8950, lng: 151.1650, suburb: 'Newtown' },
  '2043': { lat: -33.9000, lng: 151.1750, suburb: 'Erskineville' },
  '2044': { lat: -33.9050, lng: 151.1550, suburb: 'St Peters' },
  '2046': { lat: -33.8700, lng: 151.1300, suburb: 'Five Dock' },
  '2047': { lat: -33.8550, lng: 151.1400, suburb: 'Drummoyne' },
  '2048': { lat: -33.8600, lng: 151.1200, suburb: 'Wareemba' },
  '2049': { lat: -33.8650, lng: 151.1100, suburb: 'Concord' },
  '2050': { lat: -33.8800, lng: 151.1850, suburb: 'Camperdown' },
  '2060': { lat: -33.8400, lng: 151.2100, suburb: 'North Sydney' },
  '2065': { lat: -33.8250, lng: 151.2400, suburb: 'Cremorne' },
  '2066': { lat: -33.8150, lng: 151.2200, suburb: 'Lane Cove' },
  '2067': { lat: -33.7968, lng: 151.1830, suburb: 'Chatswood' },
  '2070': { lat: -33.7900, lng: 151.1800, suburb: 'Lindfield' },
  '2077': { lat: -33.7020, lng: 151.0990, suburb: 'Hornsby' },
  '2071': { lat: -33.7800, lng: 151.1600, suburb: 'Turramurra' },
  '2074': { lat: -33.7600, lng: 151.1500, suburb: 'Thornleigh' },
  '2075': { lat: -33.7300, lng: 151.1200, suburb: 'St Ives' },
  '2076': { lat: -33.7100, lng: 151.1000, suburb: 'Wahroonga' },
  '2085': { lat: -33.7500, lng: 151.2200, suburb: 'Belrose' },
  '2089': { lat: -33.8300, lng: 151.2000, suburb: 'Neutral Bay' },
  '2090': { lat: -33.8400, lng: 151.2300, suburb: 'Cremorne Point' },
  '2095': { lat: -33.8000, lng: 151.2900, suburb: 'Manly' },
  '2100': { lat: -33.7900, lng: 151.2700, suburb: 'Brookvale' },
  '2110': { lat: -33.8200, lng: 151.0000, suburb: 'Hunters Hill' },
  '2112': { lat: -33.8000, lng: 151.0800, suburb: 'Ryde' },
  '2113': { lat: -33.8100, lng: 151.0600, suburb: 'Macquarie Park' },
  '2114': { lat: -33.8150, lng: 151.0400, suburb: 'West Ryde' },
  '2115': { lat: -33.8200, lng: 151.0200, suburb: 'Ermington' },
  '2116': { lat: -33.8250, lng: 151.0000, suburb: 'Rydalmere' },
  '2117': { lat: -33.8300, lng: 150.9800, suburb: 'Dundas' },
  '2118': { lat: -33.8350, lng: 151.0000, suburb: 'Carlingford' },
  '2120': { lat: -33.7900, lng: 151.0500, suburb: 'Eastwood' },
  '2121': { lat: -33.8400, lng: 151.0500, suburb: 'Epping' },
  '2122': { lat: -33.7700, lng: 151.0800, suburb: 'Marsfield' },
  '2125': { lat: -33.7500, lng: 151.0200, suburb: 'West Pennant Hills' },
  '2126': { lat: -33.7200, lng: 151.0500, suburb: 'Cherrybrook' },
  '2127': { lat: -33.6800, lng: 151.0200, suburb: 'Castle Hill' },
  '2130': { lat: -33.8700, lng: 151.1300, suburb: 'Summer Hill' },
  '2131': { lat: -33.8886, lng: 151.1256, suburb: 'Ashfield' },
  '2132': { lat: -33.8800, lng: 151.1400, suburb: 'Croydon' },
  '2133': { lat: -33.8700, lng: 151.1500, suburb: 'Croydon Park' },
  '2134': { lat: -33.8600, lng: 151.1600, suburb: 'Burwood' },
  '2135': { lat: -33.8500, lng: 151.1700, suburb: 'Strathfield' },
  '2136': { lat: -33.8400, lng: 151.1800, suburb: 'Homebush' },
  '2137': { lat: -33.8300, lng: 151.0900, suburb: 'Breakfast Point' },
  '2138': { lat: -33.8700, lng: 151.1000, suburb: 'Rhodes' },
  '2140': { lat: -33.8150, lng: 151.0300, suburb: 'Homebush West' },
  '2141': { lat: -33.8700, lng: 151.0800, suburb: 'Lidcombe' },
  '2142': { lat: -33.8500, lng: 151.0400, suburb: 'Granville' },
  '2143': { lat: -33.8400, lng: 151.0100, suburb: 'Birrong' },
  '2144': { lat: -33.8600, lng: 151.0000, suburb: 'Auburn' },
  '2145': { lat: -33.8350, lng: 150.9900, suburb: 'Westmead' },
  '2146': { lat: -33.8000, lng: 151.0000, suburb: 'Toongabbie' },
  '2147': { lat: -33.7900, lng: 150.9700, suburb: 'Kings Langley' },
  '2148': { lat: -33.7800, lng: 150.9500, suburb: 'Blacktown' },
  '2150': { lat: -33.8150, lng: 151.0010, suburb: 'Parramatta' },
  '2151': { lat: -33.8000, lng: 151.0200, suburb: 'North Parramatta' },
  '2152': { lat: -33.7900, lng: 151.0400, suburb: 'Northmead' },
  '2153': { lat: -33.7700, lng: 151.0600, suburb: 'Baulkham Hills' },
  '2154': { lat: -33.7500, lng: 151.0800, suburb: 'Castle Hill' },
  '2155': { lat: -33.7300, lng: 151.0000, suburb: 'Kellyville' },
  '2158': { lat: -33.7000, lng: 150.9500, suburb: 'Rouse Hill' },
  '2160': { lat: -33.8700, lng: 151.0200, suburb: 'Merrylands' },
  '2161': { lat: -33.8800, lng: 151.0000, suburb: 'Guildford' },
  '2163': { lat: -33.8500, lng: 150.9800, suburb: 'Villawood' },
  '2164': { lat: -33.8600, lng: 150.9600, suburb: 'Smithfield' },
  '2165': { lat: -33.8700, lng: 150.9500, suburb: 'Fairfield' },
  '2166': { lat: -33.8900, lng: 150.9400, suburb: 'Cabramatta' },
  '2170': { lat: -33.9200, lng: 150.9200, suburb: 'Liverpool' },
  '2171': { lat: -33.9000, lng: 150.9000, suburb: 'Casula' },
  '2176': { lat: -33.9500, lng: 150.8800, suburb: 'Green Valley' },
  '2190': { lat: -33.9100, lng: 151.0700, suburb: 'Chullora' },
  '2191': { lat: -33.9000, lng: 151.0600, suburb: 'Belfield' },
  '2192': { lat: -33.8900, lng: 151.0800, suburb: 'Belmore' },
  '2193': { lat: -33.9100, lng: 151.1000, suburb: 'Ashbury' },
  '2194': { lat: -33.9200, lng: 151.0900, suburb: 'Campsie' },
  '2195': { lat: -33.9300, lng: 151.1000, suburb: 'Lakemba' },
  '2196': { lat: -33.9400, lng: 151.1100, suburb: 'Punchbowl' },
  '2197': { lat: -33.9500, lng: 151.1200, suburb: 'Roselands' },
  '2198': { lat: -33.9600, lng: 151.1300, suburb: 'Georges Hall' },
  '2199': { lat: -33.9700, lng: 151.1400, suburb: 'Yagoona' },
  '2200': { lat: -33.9173, lng: 151.0350, suburb: 'Bankstown' },
  '2203': { lat: -33.9300, lng: 151.1500, suburb: 'Dulwich Hill' },
  '2204': { lat: -33.9200, lng: 151.1600, suburb: 'Marrickville' },
  '2205': { lat: -33.9100, lng: 151.1700, suburb: 'Arncliffe' },
  '2206': { lat: -33.9400, lng: 151.1500, suburb: 'Earlwood' },
  '2207': { lat: -33.9500, lng: 151.1400, suburb: 'Bass Hill' },
  '2208': { lat: -33.9600, lng: 151.1000, suburb: 'Kingsgrove' },
  '2209': { lat: -33.9700, lng: 151.0900, suburb: 'Beverly Hills' },
  '2210': { lat: -33.9800, lng: 151.0800, suburb: 'Riverwood' },
  '2211': { lat: -33.9900, lng: 151.0700, suburb: 'Padstow' },
  '2212': { lat: -34.0000, lng: 151.0600, suburb: 'Revesby' },
  '2213': { lat: -34.0100, lng: 151.0500, suburb: 'Panania' },
  '2214': { lat: -34.0200, lng: 151.0400, suburb: 'Milperra' },
  '2216': { lat: -33.9600, lng: 151.1500, suburb: 'Rockdale' },
  '2217': { lat: -33.9700, lng: 151.1300, suburb: 'Bexley' },
  '2218': { lat: -33.9800, lng: 151.1200, suburb: 'Carlton' },
  '2219': { lat: -33.9900, lng: 151.1100, suburb: 'Sans Souci' },
  '2220': { lat: -34.0000, lng: 151.1000, suburb: 'Hurstville' },
  '2221': { lat: -34.0100, lng: 151.0900, suburb: 'Blakehurst' },
  '2222': { lat: -34.0200, lng: 151.0800, suburb: 'Penshurst' },
  '2223': { lat: -34.0300, lng: 151.0700, suburb: 'Mortdale' },
  '2224': { lat: -34.0400, lng: 151.0600, suburb: 'Sylvania' },
  '2225': { lat: -34.0500, lng: 151.0500, suburb: 'Oyster Bay' },
  '2226': { lat: -34.0600, lng: 151.0400, suburb: 'Jannali' },
  '2227': { lat: -34.0700, lng: 151.0300, suburb: 'Gymea' },
  '2228': { lat: -34.0800, lng: 151.0200, suburb: 'Miranda' },
  '2229': { lat: -34.0900, lng: 151.0100, suburb: 'Caringbah' },
  '2230': { lat: -34.1000, lng: 151.0000, suburb: 'Cronulla' },
  '2250': { lat: -33.4200, lng: 151.3400, suburb: 'Gosford' },
  '2500': { lat: -34.4278, lng: 150.8931, suburb: 'Wollongong' },
  '2560': { lat: -34.0650, lng: 150.8140, suburb: 'Campbelltown' },
  '2564': { lat: -34.0500, lng: 150.8000, suburb: 'Bradbury' },
  '2565': { lat: -34.0800, lng: 150.7900, suburb: 'Bardia' },
  '2566': { lat: -34.1000, lng: 150.7800, suburb: 'St Andrews' },
  '2567': { lat: -34.1200, lng: 150.7700, suburb: 'Currans Hill' },
  '2570': { lat: -34.1700, lng: 150.7500, suburb: 'Camden' },
  '2745': { lat: -33.7200, lng: 150.6800, suburb: 'Werrington' },
  '2747': { lat: -33.7400, lng: 150.7000, suburb: 'Kingswood' },
  '2748': { lat: -33.7500, lng: 150.7100, suburb: 'Orchard Hills' },
  '2749': { lat: -33.7600, lng: 150.7200, suburb: 'Castlereagh' },
  '2750': { lat: -33.7510, lng: 150.6940, suburb: 'Penrith' },
  '2753': { lat: -33.7800, lng: 150.6700, suburb: 'Richmond' },
  '2756': { lat: -33.6200, lng: 150.7800, suburb: 'Windsor' },
  '2760': { lat: -33.7000, lng: 150.8500, suburb: 'St Marys' },
  '2761': { lat: -33.6800, lng: 150.8200, suburb: 'Plumpton' },
  '2762': { lat: -33.6600, lng: 150.8000, suburb: 'Schofields' },
  '2763': { lat: -33.6400, lng: 150.7800, suburb: 'Quakers Hill' },
  '2765': { lat: -33.6200, lng: 150.7600, suburb: 'Riverstone' },
  '2766': { lat: -33.6000, lng: 150.7400, suburb: 'Eastern Creek' },
  '2767': { lat: -33.5800, lng: 150.7200, suburb: 'Rooty Hill' },
  '2768': { lat: -33.5600, lng: 150.7000, suburb: 'Glenwood' },
  '2770': { lat: -33.5400, lng: 150.6800, suburb: 'Mount Druitt' },
};

const GREATER_SYDNEY_BOUNDS = {
  north: -33.40,
  south: -34.20,
  east: 151.35,
  west: 150.55,
};

const TIE_BREAK_KM = 2;
const DELIVERY_RATE_PER_10_KM = 35;

function calculateDeliveryFee(distanceKm) {
  return Math.round((distanceKm / 10) * DELIVERY_RATE_PER_10_KM * 100) / 100;
}

function formatDeliveryFee(distanceKm) {
  return `$${calculateDeliveryFee(distanceKm).toFixed(2)}`;
}

let cart = [];
let orderQueue = [];
let orderCounter = 1;
let lastOrder = null;

/* ── Geo utilities ── */

function haversineKm(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function lookupPostcode(postcode) {
  const pc = String(postcode).trim().padStart(4, '0').slice(0, 4);
  if (!/^\d{4}$/.test(pc)) return null;
  return POSTCODE_COORDS[pc] ? { ...POSTCODE_COORDS[pc], postcode: pc } : null;
}

function normalizeSuburbName(name) {
  return name.trim().toLowerCase().replace(/\s+/g, ' ');
}

function lookupSuburb(suburbInput) {
  const query = normalizeSuburbName(suburbInput);
  if (!query) return null;

  const entries = Object.entries(POSTCODE_COORDS).map(([postcode, coords]) => ({
    postcode,
    lat: coords.lat,
    lng: coords.lng,
    suburb: coords.suburb,
    normalized: normalizeSuburbName(coords.suburb),
  }));

  const exact = entries.filter((e) => e.normalized === query);
  if (exact.length >= 1) {
    const { normalized, ...loc } = exact[0];
    return loc;
  }

  const startsWith = entries.filter((e) => e.normalized.startsWith(query));
  if (startsWith.length === 1) {
    const { normalized, ...loc } = startsWith[0];
    return loc;
  }

  const contains = entries.filter((e) => e.normalized.includes(query));
  if (contains.length === 1) {
    const { normalized, ...loc } = contains[0];
    return loc;
  }

  const ambiguous = startsWith.length > 1 ? startsWith : contains.length > 1 ? contains : [];
  if (ambiguous.length > 1) {
    return {
      ambiguous: true,
      suggestions: [...new Set(ambiguous.map((e) => e.suburb))].slice(0, 6),
    };
  }

  return null;
}

function resolveDeliveryLocation(input) {
  const raw = String(input ?? '').trim();
  if (!raw) {
    return { success: false, error: 'empty_input', message: 'Please enter a postcode or suburb.' };
  }

  if (/^\d+$/.test(raw) && raw.length !== 4) {
    return {
      success: false,
      error: 'invalid_postcode',
      message: 'Postcodes must be 4 digits. Try a suburb name instead.',
    };
  }

  if (/^\d{4}$/.test(raw)) {
    const location = lookupPostcode(raw);
    if (!location) {
      return {
        success: false,
        error: 'unknown_postcode',
        message: `Postcode ${raw} not found in our Greater Sydney database. Please check and try again.`,
      };
    }
    return { success: true, matchedBy: 'postcode', ...location };
  }

  const suburbResult = lookupSuburb(raw);
  if (suburbResult?.ambiguous) {
    return {
      success: false,
      error: 'ambiguous_suburb',
      message: `Multiple suburbs match "${raw}". Did you mean: ${suburbResult.suggestions.join(', ')}?`,
      suggestions: suburbResult.suggestions,
    };
  }

  if (!suburbResult) {
    return {
      success: false,
      error: 'unknown_suburb',
      message: `"${raw}" not found in our Greater Sydney database. Try a suburb name or 4-digit postcode.`,
    };
  }

  return { success: true, matchedBy: 'suburb', ...suburbResult };
}

function isWithinGreaterSydney(lat, lng) {
  return (
    lat >= GREATER_SYDNEY_BOUNDS.south &&
    lat <= GREATER_SYDNEY_BOUNDS.north &&
    lng >= GREATER_SYDNEY_BOUNDS.west &&
    lng <= GREATER_SYDNEY_BOUNDS.east
  );
}

function estimatePostcodeFromCoords(lat, lng) {
  let best = null;
  let bestDist = Infinity;
  for (const [pc, coords] of Object.entries(POSTCODE_COORDS)) {
    const d = haversineKm(lat, lng, coords.lat, coords.lng);
    if (d < bestDist) {
      bestDist = d;
      best = { postcode: pc, ...coords };
    }
  }
  return best;
}

function routeOrder(input) {
  const resolved = resolveDeliveryLocation(input);

  if (!resolved.success) {
    return { success: false, error: resolved.error, message: resolved.message };
  }

  const location = {
    lat: resolved.lat,
    lng: resolved.lng,
    suburb: resolved.suburb,
    postcode: resolved.postcode,
  };

  const rankings = FLORISTS.map((florist) => ({
    florist,
    distanceKm: haversineKm(location.lat, location.lng, florist.lat, florist.lng),
  })).sort((a, b) => a.distanceKm - b.distanceKm);

  let winner = rankings[0];
  const withinTie = rankings.filter(
    (r) => r.distanceKm - winner.distanceKm <= TIE_BREAK_KM
  );

  if (withinTie.length > 1) {
    withinTie.sort((a, b) => b.florist.availability - a.florist.availability);
    winner = withinTie[0];
  }

  const outsideBounds = !isWithinGreaterSydney(location.lat, location.lng);

  return {
    success: true,
    location,
    matchedBy: resolved.matchedBy,
    winner: winner.florist,
    winnerDistanceKm: winner.distanceKm,
    deliveryFee: calculateDeliveryFee(winner.distanceKm),
    rankings,
    needsManualReview: outsideBounds,
    tieBreakApplied: withinTie.length > 1,
  };
}

/* ── Rendering ── */

function renderProducts() {
  const grid = document.getElementById('productGrid');
  grid.innerHTML = PRODUCTS.map(
    (p) => `
    <article class="product-card">
      <div class="product-image">${p.emoji}</div>
      <div class="product-body">
        <h3>${p.name}</h3>
        <p class="product-desc">${p.desc}</p>
        <div class="product-footer">
          <span class="product-price">$${p.price.toFixed(2)}</span>
          <button class="add-btn" data-id="${p.id}">Add to cart</button>
        </div>
      </div>
    </article>`
  ).join('');

  grid.querySelectorAll('.add-btn').forEach((btn) => {
    btn.addEventListener('click', () => addToCart(btn.dataset.id));
  });
}

function renderFlorists() {
  const grid = document.getElementById('floristGrid');
  grid.innerHTML = FLORISTS.map(
    (f) => `
    <article class="florist-card" style="border-left-color: ${f.color}">
      <p class="florist-region">${f.region}</p>
      <h3>${f.name}</h3>
      <p class="florist-meta"><strong>${f.suburb}</strong> · ${f.postcode}</p>
      <p class="florist-meta">${f.address}</p>
      <p class="florist-meta"><a href="tel:${f.phone.replace(/\s/g, '')}">${f.phone}</a> · <a href="${f.website}" target="_blank" rel="noopener">Website</a></p>
      <p class="florist-meta">Specialties: ${f.specialties.join(', ')}</p>
      <div class="florist-rating">
        <span>Availability</span>
        <div class="rating-bar"><div class="rating-fill" style="width: ${f.availability}%"></div></div>
        <span>${f.availability}%</span>
      </div>
    </article>`
  ).join('');

  const legend = document.getElementById('mapLegend');
  legend.innerHTML = FLORISTS.map(
    (f) => `
    <div class="legend-item">
      <span class="legend-dot" style="background: ${f.color}"></span>
      <span>${f.suburb} (${f.postcode})</span>
    </div>`
  ).join('');
}

function renderCart() {
  const itemsEl = document.getElementById('cartItems');
  const countEl = document.getElementById('cartCount');
  const totalEl = document.getElementById('cartTotal');
  const placeBtn = document.getElementById('placeOrderBtn');

  const totalQty = cart.reduce((s, i) => s + i.qty, 0);
  countEl.textContent = totalQty;

  if (cart.length === 0) {
    itemsEl.innerHTML = '<p class="cart-empty">Your cart is empty</p>';
    totalEl.textContent = '$0.00';
    placeBtn.disabled = true;
    return;
  }

  itemsEl.innerHTML = cart
    .map((item) => {
      const product = PRODUCTS.find((p) => p.id === item.id);
      return `
      <div class="cart-item" data-id="${item.id}">
        <span class="cart-item-emoji">${product.emoji}</span>
        <div class="cart-item-details">
          <h4>${product.name}</h4>
          <span class="cart-item-price">$${(product.price * item.qty).toFixed(2)}</span>
          <div class="cart-item-qty">
            <button class="qty-minus" data-id="${item.id}">−</button>
            <span>${item.qty}</span>
            <button class="qty-plus" data-id="${item.id}">+</button>
          </div>
        </div>
      </div>`;
    })
    .join('');

  const total = cart.reduce((s, i) => {
    const p = PRODUCTS.find((x) => x.id === i.id);
    return s + p.price * i.qty;
  }, 0);
  totalEl.textContent = `$${total.toFixed(2)}`;
  placeBtn.disabled = false;

  itemsEl.querySelectorAll('.qty-minus').forEach((btn) => {
    btn.addEventListener('click', () => updateQty(btn.dataset.id, -1));
  });
  itemsEl.querySelectorAll('.qty-plus').forEach((btn) => {
    btn.addEventListener('click', () => updateQty(btn.dataset.id, 1));
  });
}

function renderRoutingResult(result) {
  const el = document.getElementById('routingResult');
  if (!result.success) {
    el.innerHTML = `
      <div class="routing-placeholder">
        <span class="routing-icon">⚠️</span>
        <p>${result.message}</p>
      </div>`;
    return;
  }

  const { winner, winnerDistanceKm, location, needsManualReview, tieBreakApplied } = result;
  el.innerHTML = `
    <div class="routing-winner">
      <span class="winner-badge">Assigned florist</span>
      <h4>${winner.name}</h4>
      <p class="winner-distance">${winnerDistanceKm.toFixed(1)} km from ${location.suburb} (${location.postcode})</p>
      ${result.matchedBy === 'suburb' ? '<p class="winner-distance">Matched by suburb name</p>' : ''}
      <p class="winner-distance">Estimated delivery fee: ${formatDeliveryFee(winnerDistanceKm)} ($${DELIVERY_RATE_PER_10_KM} per 10 km)</p>
      <p class="winner-address">${winner.address}</p>
      ${tieBreakApplied ? '<p class="winner-distance" style="margin-top:0.5rem">Tie-break: higher availability rating</p>' : ''}
      ${needsManualReview ? '<div class="routing-flag">⚠ Outside typical Greater Sydney bounds — flag for manual review</div>' : ''}
    </div>`;
}

function renderDistanceTable(result) {
  const tbody = document.getElementById('distanceTableBody');
  if (!result || !result.success) {
    tbody.innerHTML = '<tr><td colspan="5" class="empty-row">No location entered</td></tr>';
    return;
  }

  tbody.innerHTML = result.rankings
    .map((r, i) => {
      const isWinner = r.florist.id === result.winner.id;
      return `
      <tr class="${isWinner ? 'winner' : ''}">
        <td>${i + 1}</td>
        <td>${r.florist.name}</td>
        <td>${r.florist.suburb}</td>
        <td>${r.distanceKm.toFixed(1)} km</td>
        <td><span class="status-badge ${isWinner ? 'assigned' : 'runner-up'}">${isWinner ? 'Assigned' : 'Runner-up'}</span></td>
      </tr>`;
    })
    .join('');
}

function buildFloristPickupEmail(order) {
  const florist = FLORISTS.find((f) => f.id === order.assignedFloristId);
  if (!florist) return null;

  const itemLines = order.items
    .map((i) => `  - ${i.name} x${i.qty}  ($${(i.price * i.qty).toFixed(2)})`)
    .join('\n');

  const subject = `Pick-up order ${order.id} — ${order.recipientName || 'BloomSydney customer'}`;

  const bodyLines = [
    `Hi ${florist.name},`,
    '',
    'Please prepare the following order for IN-STORE PICK-UP (not delivery):',
    '',
    `Order reference: ${order.id}`,
    `Pick-up name: ${order.recipientName || '(to be confirmed)'}`,
    `Pick-up location: ${florist.address}`,
    '',
    'Items:',
    itemLines,
    '',
    `Order total: $${order.total.toFixed(2)} (flowers only — pick-up, no delivery fee)`,
    order.notes ? `\nNotes: ${order.notes}` : '',
    '',
    'Please confirm availability and the expected ready-for-pick-up time.',
    '',
    'Thanks,',
    'BloomSydney',
  ];
  const body = bodyLines.join('\n');

  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(florist.email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function renderOrderQueue() {
  const el = document.getElementById('orderQueue');
  if (orderQueue.length === 0) {
    el.innerHTML = '<p class="empty-queue">No orders yet. Complete a checkout to see routed orders here.</p>';
    return;
  }

  el.innerHTML = orderQueue
    .map((order) => {
      const floristOptions = FLORISTS.map(
        (f) =>
          `<option value="${f.id}" ${f.id === order.assignedFloristId ? 'selected' : ''}>${f.name} (${f.suburb})</option>`
      ).join('');

      return `
      <div class="order-card" data-order-id="${order.id}">
        <div class="order-card-header">
          <span class="order-id">${order.id}</span>
          <span class="order-status">${order.status}</span>
        </div>
        <p><strong>${order.recipientName || 'No name'}</strong> · ${order.postcode} ${order.suburb ? `(${order.suburb})` : ''}</p>
        <p>${order.items.map((i) => `${i.name} ×${i.qty}`).join(', ')}</p>
        <p>Total: $${order.total.toFixed(2)} · Routed to <strong>${order.assignedFloristName}</strong> (${order.distanceKm.toFixed(1)} km)</p>
        <div class="order-actions">
          <button class="btn-email" data-email="${order.id}">✉ Email florist (pick-up)</button>
        </div>
        <div class="order-reassign">
          <select data-order-id="${order.id}">${floristOptions}</select>
          <button data-reassign="${order.id}">Reassign</button>
        </div>
      </div>`;
    })
    .join('');

  el.querySelectorAll('[data-reassign]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const orderId = btn.dataset.reassign;
      const select = el.querySelector(`select[data-order-id="${orderId}"]`);
      reassignOrder(orderId, select.value);
    });
  });

  el.querySelectorAll('[data-email]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const order = orderQueue.find((o) => o.id === btn.dataset.email);
      if (!order) return;
      const url = buildFloristPickupEmail(order);
      if (url) window.open(url, '_blank', 'noopener');
    });
  });
}

function updateAssignedFloristPreview() {
  const postcode = document.getElementById('checkoutPostcode').value.trim();
  const suburb = document.getElementById('checkoutSuburb').value.trim();
  const input = postcode || suburb;
  const el = document.getElementById('assignedFlorist');

  // Nothing entered, or still mid-typing a postcode — stay hidden.
  if (!input || /^\d{1,3}$/.test(input)) {
    el.hidden = true;
    return;
  }
  const result = routeOrder(input);
  if (!result.success) {
    el.hidden = false;
    el.innerHTML = `<strong>Delivery check</strong>${result.message}`;
    return;
  }
  el.hidden = false;
  el.innerHTML = `
    <strong>Your order will be fulfilled by:</strong>
    ${result.winner.name}, ${result.winner.suburb} (${result.winnerDistanceKm.toFixed(1)} km away)
    <br>Delivering to ${result.location.suburb} ${result.location.postcode}
    <br>Estimated delivery: ${formatDeliveryFee(result.winnerDistanceKm)} ($${DELIVERY_RATE_PER_10_KM} per 10 km)`;
}

/* ── Cart actions ── */

function addToCart(productId) {
  const existing = cart.find((i) => i.id === productId);
  if (existing) existing.qty += 1;
  else cart.push({ id: productId, qty: 1 });
  renderCart();
  openCart();
}

function updateQty(productId, delta) {
  const item = cart.find((i) => i.id === productId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter((i) => i.id !== productId);
  renderCart();
}

function openCart() {
  document.getElementById('cartDrawer').classList.add('open');
  document.getElementById('cartOverlay').classList.add('open');
  document.getElementById('cartDrawer').setAttribute('aria-hidden', 'false');
}

function closeCart() {
  document.getElementById('cartDrawer').classList.remove('open');
  document.getElementById('cartOverlay').classList.remove('open');
  document.getElementById('cartDrawer').setAttribute('aria-hidden', 'true');
}

function placeOrder() {
  const postcode = document.getElementById('checkoutPostcode').value.trim();
  const suburb = document.getElementById('checkoutSuburb').value.trim();
  const recipientName = document.getElementById('checkoutName').value.trim();
  const notes = document.getElementById('checkoutNotes').value.trim();

  // Use postcode if provided, otherwise fall back to the suburb field.
  const input = postcode || suburb;
  if (!input || cart.length === 0) return;

  const result = routeOrder(input);
  if (!result.success) {
    alert(result.message);
    return;
  }

  const items = cart.map((i) => {
    const p = PRODUCTS.find((x) => x.id === i.id);
    return { name: p.name, qty: i.qty, price: p.price };
  });
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);

  const order = {
    id: `BS-${String(orderCounter++).padStart(4, '0')}`,
    postcode: result.location.postcode,
    suburb: result.location.suburb,
    recipientName,
    notes,
    items,
    total,
    assignedFloristId: result.winner.id,
    assignedFloristName: result.winner.name,
    distanceKm: result.winnerDistanceKm,
    deliveryFee: result.deliveryFee,
    status: result.needsManualReview ? 'Needs review' : 'Routed',
    createdAt: new Date().toISOString(),
  };

  orderQueue.unshift(order);
  lastOrder = order;
  renderOrderQueue();

  const modal = document.getElementById('orderModal');
  document.getElementById('modalMessage').textContent =
    `Order ${order.id} has been routed to ${result.winner.name} in ${result.winner.suburb} (${result.winnerDistanceKm.toFixed(1)} km from ${order.suburb}).`;
  modal.showModal();

  cart = [];
  document.getElementById('checkoutPostcode').value = '';
  document.getElementById('checkoutSuburb').value = '';
  document.getElementById('checkoutName').value = '';
  document.getElementById('checkoutNotes').value = '';
  document.getElementById('assignedFlorist').hidden = true;
  renderCart();
  closeCart();
}

function reassignOrder(orderId, floristId) {
  const order = orderQueue.find((o) => o.id === orderId);
  const florist = FLORISTS.find((f) => f.id === floristId);
  if (!order || !florist) return;

  const resolved = [order.postcode, order.suburb]
    .map((value) => resolveDeliveryLocation(value))
    .find((result) => result.success);
  const distanceKm = resolved
    ? haversineKm(resolved.lat, resolved.lng, florist.lat, florist.lng)
    : 0;

  order.assignedFloristId = florist.id;
  order.assignedFloristName = florist.name;
  order.distanceKm = distanceKm;
  order.status = 'Manually reassigned';
  renderOrderQueue();
}

/* ── Navigation ── */

function switchView(viewName) {
  document.querySelectorAll('.view').forEach((v) => v.classList.remove('active'));
  document.querySelectorAll('.nav-tab').forEach((t) => t.classList.remove('active'));
  document.getElementById(`view-${viewName}`).classList.add('active');
  document.querySelector(`[data-view="${viewName}"]`).classList.add('active');
}

function simulateRouting() {
  const postcode = document.getElementById('routingPostcode').value.trim();
  if (!postcode) return;
  const result = routeOrder(postcode);
  renderRoutingResult(result);
  renderDistanceTable(result);
}

function checkHeroPostcode() {
  const postcode = document.getElementById('heroPostcode').value.trim();
  const resultEl = document.getElementById('heroResult');
  if (!postcode) {
    resultEl.hidden = true;
    return;
  }
  const result = routeOrder(postcode);
  resultEl.hidden = false;
  if (!result.success) {
    resultEl.className = 'hero-result warning';
    resultEl.textContent = result.message;
    return;
  }
  resultEl.className = 'hero-result';
  resultEl.textContent = `✓ We deliver to ${result.location.suburb} (${result.location.postcode})! Your order will be fulfilled by ${result.winner.name} (${result.winnerDistanceKm.toFixed(1)} km away). Estimated delivery fee: ${formatDeliveryFee(result.winnerDistanceKm)} ($${DELIVERY_RATE_PER_10_KM} per 10 km).`;
}

/* ── Init ── */

document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  renderFlorists();
  renderCart();
  renderOrderQueue();

  document.querySelectorAll('.nav-tab').forEach((tab) => {
    tab.addEventListener('click', () => switchView(tab.dataset.view));
  });

  document.getElementById('cartToggle').addEventListener('click', openCart);
  document.getElementById('cartClose').addEventListener('click', closeCart);
  document.getElementById('cartOverlay').addEventListener('click', closeCart);
  document.getElementById('placeOrderBtn').addEventListener('click', placeOrder);
  document.getElementById('routingSimulateBtn').addEventListener('click', simulateRouting);
  document.getElementById('heroCheckBtn').addEventListener('click', checkHeroPostcode);

  document.getElementById('checkoutPostcode').addEventListener('input', updateAssignedFloristPreview);
  document.getElementById('checkoutSuburb').addEventListener('input', updateAssignedFloristPreview);
  document.getElementById('routingPostcode').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') simulateRouting();
  });
  document.getElementById('heroPostcode').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') checkHeroPostcode();
  });

  document.getElementById('modalClose').addEventListener('click', () => {
    document.getElementById('orderModal').close();
  });
  document.getElementById('modalOk').addEventListener('click', () => {
    document.getElementById('orderModal').close();
  });
  document.getElementById('modalEmailFlorist').addEventListener('click', () => {
    if (!lastOrder) return;
    const url = buildFloristPickupEmail(lastOrder);
    if (url) window.open(url, '_blank', 'noopener');
  });
});
