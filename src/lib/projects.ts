import piscImg from "@/assets/project-pisc.jpg";
import mriscImg from "@/assets/project-mrisc.jpg";
import heroImg from "@/assets/hero-city.jpg";

export type ProjectStatus = "Pre-launch" | "Under Construction" | "Selling" | "Completed";

export type Amenity = {
  icon:
    | "shield" | "trees" | "cpu" | "dumbbell" | "book" | "home"
    | "users" | "mosque" | "car" | "wifi" | "sun" | "droplet"
    | "school" | "hospital" | "store";
  title: string;
  body: string;
};

export type Milestone = { date: string; title: string; body: string; done?: boolean };

export type Floorplan = {
  type: string;
  size: string;
  beds: number;
  baths: number;
  price: string;
  features: string[];
};

export type Project = {
  slug: string;
  code: string;        // PISC / MRISC
  name: string;
  tagline: string;
  location: string;
  area: string;
  status: ProjectStatus;
  handover: string;
  cover: string;
  gallery: string[];
  videoId: string;     // YouTube ID
  overview: string;
  highlights: string[];
  specs: { label: string; value: string }[];
  amenities: Amenity[];
  floorplans: Floorplan[];
  milestones: Milestone[];
  coords: { lat: number; lng: number; zoom?: number };
  mapQuery: string;
  brochureUrl?: string;
  startingPrice: string;
  totalUnits: number;
  totalBuildings: number;
};

export const PROJECTS: Record<string, Project> = {
  pisc: {
    slug: "pisc",
    code: "PISC",
    name: "PUSP Islamic Smart City",
    tagline: "A planned Islamic city of 22 towers, rooftop gardens, and serenity.",
    location: "Shologhor, Sreenagar, Munshiganj",
    area: "823 Katha",
    status: "Under Construction",
    handover: "Q4 2027",
    cover: piscImg,
    gallery: [piscImg, heroImg, mriscImg],
    videoId: "TVypbh3u6lQ",
    overview:
      "PUSP Islamic Smart City is a master-planned community on 823 katha of land — engineered to bring world-class infrastructure, Islamic culture, and modern smart-home living together. From the Mihrab-inspired façade to rooftop gardens and family gyms, every detail is shaped by faith, function, and aesthetic restraint.",
    highlights: [
      "823 katha master-planned land bank",
      "22 architectural towers in one connected city",
      "2,360 smart-ready flats across three sizes",
      "Walkable mosque, mokteb, and library at the core",
    ],
    specs: [
      { label: "Total Area", value: "823 Katha" },
      { label: "Buildings", value: "22 Towers" },
      { label: "Flats", value: "2,360 Units" },
      { label: "Configurations", value: "1,025 / 1,500 / 1,850 Sqft" },
      { label: "Floors", value: "2 Basement + Ground + 15" },
      { label: "Parking", value: "1.5 per unit avg." },
      { label: "Green Cover", value: "38% of total area" },
      { label: "Power Backup", value: "100% generator + solar" },
    ],
    amenities: [
      { icon: "mosque", title: "Central Jame Mosque", body: "Capacity for 1,200 worshippers with separate women's section." },
      { icon: "school", title: "Mokteb & Library", body: "On-site Quran academy and quiet reading halls." },
      { icon: "dumbbell", title: "Gyms — Men & Women", body: "Separate, fully equipped, climate-controlled." },
      { icon: "trees", title: "Rooftop Gardens", body: "Designed by landscape architects — every tower." },
      { icon: "shield", title: "24/7 Security", body: "Smart access, CCTV grid, trained guard force." },
      { icon: "cpu", title: "Smart Home Ready", body: "Pre-wired for IoT lighting, climate, and locks." },
      { icon: "car", title: "EV-Ready Parking", body: "Two basement levels with EV charging." },
      { icon: "hospital", title: "Medical Center", body: "On-site clinic with 24/7 emergency response." },
      { icon: "store", title: "Halal Marketplace", body: "Ground-floor souk for daily essentials." },
      { icon: "sun", title: "Solar Integrated", body: "Rooftop PV reduces grid dependency." },
      { icon: "droplet", title: "Water Treatment", body: "On-site filtration and rainwater harvesting." },
      { icon: "wifi", title: "Fibre Backbone", body: "Gigabit fibre to every flat." },
    ],
    floorplans: [
      {
        type: "Type A — Cozy",
        size: "1,025 sqft",
        beds: 2,
        baths: 2,
        price: "From ৳ 82 Lakh",
        features: ["Master suite", "Balcony", "Modular kitchen", "Smart locks"],
      },
      {
        type: "Type B — Family",
        size: "1,500 sqft",
        beds: 3,
        baths: 3,
        price: "From ৳ 1.18 Cr",
        features: ["Living + family room", "Servant quarter", "Two balconies", "Walk-in closet"],
      },
      {
        type: "Type C — Signature",
        size: "1,850 sqft",
        beds: 4,
        baths: 4,
        price: "From ৳ 1.52 Cr",
        features: ["Corner unit", "Private elevator lobby", "Three balconies", "Premium fittings"],
      },
    ],
    milestones: [
      { date: "2023 Q2", title: "Land Acquisition", body: "823 katha consolidated.", done: true },
      { date: "2024 Q1", title: "Master Plan Approval", body: "RAJUK-aligned approvals.", done: true },
      { date: "2024 Q4", title: "Groundbreaking", body: "First three towers begin.", done: true },
      { date: "2026 Q2", title: "Structure Topping", body: "Phase-1 superstructure complete." },
      { date: "2027 Q4", title: "First Handover", body: "Phase-1 owners receive keys." },
    ],
    coords: { lat: 23.4906, lng: 90.3567, zoom: 14 },
    mapQuery: "Shologhor, Sreenagar, Munshiganj, Bangladesh",
    startingPrice: "৳ 82 Lakh",
    totalUnits: 2360,
    totalBuildings: 22,
  },
  mrisc: {
    slug: "mrisc",
    code: "MRISC",
    name: "Mirpur Islamic Smart City",
    tagline: "Urban Islamic living in the heart of Dhaka — refined, secure, connected.",
    location: "Mirpur, Dhaka",
    area: "Premium Inner-City Plot",
    status: "Pre-launch",
    handover: "Q2 2028",
    cover: mriscImg,
    gallery: [mriscImg, heroImg, piscImg],
    videoId: "roiaGSMAEV8",
    overview:
      "Mirpur Islamic Smart City brings the PISC philosophy into the heart of Dhaka. A focused, vertical community with a private mosque, rooftop gardens, family-only gyms, and concierge-grade security — designed for families who want Islamic life without compromising urban convenience.",
    highlights: [
      "Premium Mirpur location with direct metro access",
      "Modern smart-home features across every flat",
      "Family-only common areas with Islamic etiquette",
      "Concierge-grade 24/7 security and access control",
    ],
    specs: [
      { label: "Location", value: "Mirpur, Dhaka" },
      { label: "Building Type", value: "Vertical Community" },
      { label: "Security", value: "24/7 + Smart Access" },
      { label: "Mosque", value: "On-site, separate women's hall" },
      { label: "Smart Home", value: "Standard across units" },
      { label: "Rooftop", value: "Garden + Family Lounge" },
      { label: "Community Center", value: "Library + Mokteb" },
      { label: "Parking", value: "Dedicated covered + visitor bays" },
    ],
    amenities: [
      { icon: "mosque", title: "On-site Mosque", body: "Dedicated prayer halls for men and women." },
      { icon: "shield", title: "24/7 Security", body: "Card access, biometrics, on-site response team." },
      { icon: "trees", title: "Rooftop Garden", body: "Green sanctuary above the city." },
      { icon: "users", title: "Community Center", body: "For events, study circles, and gatherings." },
      { icon: "book", title: "Mokteb", body: "Children's Quran learning on-site." },
      { icon: "cpu", title: "Smart Home", body: "IoT-ready lighting, climate, and locks." },
      { icon: "dumbbell", title: "Family Gym", body: "Family-only hours with privacy zoning." },
      { icon: "car", title: "Covered Parking", body: "Reserved bays plus visitor allocation." },
      { icon: "wifi", title: "High-speed Internet", body: "Building-wide gigabit fibre." },
    ],
    floorplans: [
      {
        type: "Urban 2-Bed",
        size: "1,100 sqft",
        beds: 2,
        baths: 2,
        price: "From ৳ 1.05 Cr",
        features: ["Open kitchen", "Balcony", "Smart locks", "Reserved parking"],
      },
      {
        type: "Family 3-Bed",
        size: "1,450 sqft",
        beds: 3,
        baths: 3,
        price: "From ৳ 1.42 Cr",
        features: ["Family lounge", "Servant area", "Two balconies", "Smart climate"],
      },
    ],
    milestones: [
      { date: "2025 Q1", title: "Site Acquisition", body: "Premium Mirpur plot secured.", done: true },
      { date: "2025 Q4", title: "Design Finalisation", body: "Master plan and elevations.", done: true },
      { date: "2026 Q2", title: "Pre-launch Booking", body: "Early-bird pricing opens." },
      { date: "2026 Q4", title: "Groundbreaking", body: "Construction begins on schedule." },
      { date: "2028 Q2", title: "Handover", body: "First owners receive keys." },
    ],
    coords: { lat: 23.8223, lng: 90.3654, zoom: 14 },
    mapQuery: "Mirpur, Dhaka, Bangladesh",
    startingPrice: "৳ 1.05 Cr",
    totalUnits: 320,
    totalBuildings: 1,
  },
};

export const projectList = Object.values(PROJECTS);
