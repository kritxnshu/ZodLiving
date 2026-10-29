/**
 * ZOD LIVING PROPERTY CONFIGURATION & SPECIFICATION DATA
 * Based on the official property brochure and verified documentation.
 */

export const PROPERTY_CONFIG = {
  name: "ZOD Living",
  category: "Hostel",
  tagline: "Check in with Ambition, Check out with Success",
  fullAddress:
    "Plot- 90, opposite to Dronacharya College, Namoli , Knowledge Park III, Greater Noida, Gujarpur, Uttar Pradesh 201310, India",
  shortAddress: "Plot-90, Knowledge Park III, Greater Noida (201310)",
  landmark: "Opposite to Dronacharya College, Namoli, Knowledge Park III",
  googleMapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Plot+90+opposite+to+Dronacharya+College+Knowledge+Park+III+Greater+Noida+Uttar+Pradesh+201310",
  visitingHours: "Open 24 hours (Admissions Desk: 9:00 AM – 8:00 PM)",
  openStatus: "Open 24 hours",

  // CONTACT CHANNELS (Official ZOD Living):
  phone: "+91 78380 18108",
  phoneRaw: "+917838018108",
  whatsapp: "+91 78380 18108",
  whatsappRaw: "917838018108",
  email: "zodliving@gmail.com",

  // SOCIAL CHANNELS:
  facebook: {
    name: "Zod Living Hostels",
    url: "https://www.facebook.com/people/Zod-Living-Hostels/61556942921868/",
  },
  instagram: {
    handle: "@zodliving.in",
    url: "https://www.instagram.com/zodliving.in/",
  },

  academicYear: "2026–2027",
};

/**
 * EXACT VERIFIED PRICING PER COLLEGE SESSION
 * Derived from the official ZOD Living brochure.
 * Note: These fees are strictly PER COLLEGE SESSION (not monthly rent).
 */
export interface RoomTier {
  id: string;
  name: string;
  occupancyLabel: string;
  occupancyCount: number;
  basePrice: string; // e.g. "₹1,50,000"
  acPrice: string; // "₹1,65,000"
  nonAcPrice: string; // "₹1,50,000"
  pricingUnit: string; // "per college session"
  description: string;
  image: string;
  gallery: string[];
  keyFeatures: string[];
  amenityChips: string[];
}

export const ROOM_TIERS: RoomTier[] = [
  {
    id: "2-seater",
    name: "2-Seater Room",
    occupancyLabel: "2-Student Occupancy",
    occupancyCount: 2,
    basePrice: "₹1,50,000",
    acPrice: "₹1,65,000",
    nonAcPrice: "₹1,50,000",
    pricingUnit: "per college session",
    description:
      "Balanced shared living with generous personal space, two individual wooden single beds, dual private study desks with task lighting, full-height wardrobes, and attached private washroom.",
    image: "/resourcezod/2-seater-primary.jpeg",
    gallery: [
      "/resourcezod/2-seater-primary.jpeg",
      "/resourcezod/2-seater-desk.jpeg",
      "/resourcezod/2-seater-lifestyle.jpeg",
      "/resourcezod/washroom.jpeg",
    ],
    keyFeatures: [
      "2 Individual single wooden beds with comfortable mattress",
      "Dedicated dual study desks with warm under-shelf LED lighting",
      "Full-height lockable wooden wardrobes with individual keys",
      "Attached ensuite western washroom with shower & ventilation",
      "Air-conditioned (AC) and Non-AC configurations available",
    ],
    amenityChips: [
      "AC / Non-AC Options",
      "4 Meals Included",
      "Attached Western Bath",
      "Dual Study Stations",
      "High-Speed Wi-Fi",
      "Biometric Security",
    ],
  },
  {
    id: "3-seater",
    name: "3-Seater Room",
    occupancyLabel: "3-Student Occupancy",
    occupancyCount: 3,
    basePrice: "₹1,35,000",
    acPrice: "₹1,50,000",
    nonAcPrice: "₹1,35,000",
    pricingUnit: "per college session",
    description:
      "Vibrant, budget-friendly student accommodation with triple focus study desks, ambient overhead task lighting, independent lockable wooden storage, and attached private washroom.",
    image: "/resourcezod/3-seater-primary.jpeg",
    gallery: [
      "/resourcezod/3-seater-primary.jpeg",
      "/resourcezod/washroom.jpeg",
      "/resourcezod/2-seater-lifestyle.jpeg",
      "/resourcezod/corridor-1.jpeg",
    ],
    keyFeatures: [
      "3 Individual single wooden beds with under-bed storage",
      "Triple dedicated study stations with ergonomic cantilever seating",
      "Independent lockable wooden wardrobes for each resident",
      "Attached ensuite western washroom with shower fittings",
      "Air-conditioned (AC) and Non-AC configurations available",
    ],
    amenityChips: [
      "AC / Non-AC Options",
      "4 Meals Included",
      "Attached Western Bath",
      "Triple Study Desks",
      "High-Speed Wi-Fi",
      "Power Backup",
    ],
  },
];

/**
 * 12 VERIFIED AMENITIES FROM BROCHURE
 */
export const VERIFIED_AMENITIES = [
  {
    id: "rooms",
    title: "Spacious AC & Non-AC Rooms",
    shortDesc: "Attached washroom in every room with choice of AC or Non-AC living.",
    fullDesc:
      "Every resident enjoys an individual wooden bed, personal study desk, private wardrobe, and an attached ensuite western washroom.",
    image: "/resourcezod/2-seater-primary.jpeg",
    category: "Living Spaces",
    badge: "Accommodation",
  },
  {
    id: "dining",
    title: "4 Fresh & Hygienic Meals Daily",
    shortDesc: "Nutritious breakfast, lunch, evening tea & snacks, and wholesome dinner.",
    fullDesc:
      "Prepared fresh every day in our clean kitchen and served in the air-conditioned dining mess to keep you energized.",
    image: "/resourcezod/dining-mess.jpeg",
    category: "Dining & Nutrition",
    badge: "Dining",
  },
  {
    id: "wifi",
    title: "High-Speed Wi-Fi",
    shortDesc: "Enterprise fiber mesh connectivity across all rooms and common study zones.",
    fullDesc:
      "Dual-band Wi-Fi engineered for uninterrupted online classes, research papers, submissions, and video calls with family.",
    image: "/images/amenities/wifi.jpg",
    category: "Connectivity",
    badge: "1 Gbps Fiber",
  },
  {
    id: "ac-mess",
    title: "Fully Air-Conditioned Mess",
    shortDesc: "Spacious, climate-controlled dining hall with comfortable group tables.",
    fullDesc:
      "A comfortable dining environment where students eat together, unwind between classes, and build lifelong friendships.",
    image: "/resourcezod/dining-mess-2.jpeg",
    category: "Dining & Nutrition",
    badge: "Climate Controlled",
  },
  {
    id: "pickup-drop",
    title: "Pickup & Drop Facility",
    shortDesc: "Convenient scheduled transit to nearby universities and key transit points.",
    fullDesc:
      "Reliable student mobility to nearby Knowledge Park colleges, university gates, and the Knowledge Park II metro station.",
    image: "/images/amenities/campus-shuttle.jpg",
    category: "Mobility",
    badge: "Campus Transit",
  },
  {
    id: "laundry",
    title: "Laundry Service (2 Times / Week)",
    shortDesc: "Bi-weekly washing and fabric care so you can dedicate time to your studies.",
    fullDesc:
      "Timely turnaround for regular student clothing, bedsheets, and towels handled by our housekeeping staff.",
    image: "/images/amenities/laundry-service.jpg",
    category: "Housekeeping",
    badge: "Twice Weekly",
  },
  {
    id: "washing-machines",
    title: "Automatic Washing Machines",
    shortDesc: "Heavy-duty in-house automatic laundry appliances available for resident use.",
    fullDesc:
      "Quick access to automated washing machines for personal garments and laundry needs on your own schedule.",
    image: "/images/amenities/washing-machines.jpg",
    category: "Housekeeping",
    badge: "Self-Service",
  },
  {
    id: "security",
    title: "24×7 Security & CCTV",
    shortDesc: "Continuous on-site security guards and CCTV coverage in all common corridors.",
    fullDesc:
      "Round-the-clock physical security personnel, monitored building access, and surveillance across reception, hallways, and perimeter.",
    image: "/resourcezod/corridor-1.jpeg",
    category: "Safety",
    badge: "24/7 Guarded",
  },
  {
    id: "tea-coffee",
    title: "Tea & Coffee Vending Machine",
    shortDesc: "Hot tea and coffee available whenever late-night study sessions call.",
    fullDesc:
      "Instant hot beverages available in common areas to keep students focused during exam weeks and project marathons.",
    image: "/images/amenities/tea-coffee.jpg",
    category: "Refreshments",
    badge: "Study Fuel",
  },
  {
    id: "ps5-gaming",
    title: "PS5 Gaming Room",
    shortDesc: "Dedicated console recreation zone for downtime and gaming with friends.",
    fullDesc:
      "A fun community space featuring a PlayStation 5 console for relaxing after a long week of college lectures.",
    image: "/images/amenities/ps5-gaming.jpg",
    category: "Recreation",
    badge: "Entertainment",
  },
  {
    id: "infrastructure",
    title: "Premium Modern Infrastructure",
    shortDesc: "Elevator access, slatted wood reception lobby, executive lounge, and balconies.",
    fullDesc:
      "Architectural residence with modern elevator, contemporary reception, fluted conference lounge, and balcony access.",
    image: "/resourcezod/lobby-reception.jpeg",
    category: "Building",
    badge: "Modern Facility",
  },
  {
    id: "power-backup",
    title: "24 Hours Electricity with Power Backup",
    shortDesc: "Industrial automatic generators ensuring lights, fans, Wi-Fi, and elevators never stop.",
    fullDesc:
      "Continuous power supply with automatic diesel generator switchover so power cuts never interrupt your study or comfort.",
    image: "/images/amenities/power-backup.jpg",
    category: "Reliability",
    badge: "100% Uptime",
  },
];
