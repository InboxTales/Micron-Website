/*
 * Business details and shared copy. Copy comes from the content pack in
 * ../content/. Fill in the null fields below before launch: every phone,
 * WhatsApp, email and address on the site reads from here.
 */

import type { ImageKey } from "./images";

export const siteConfig = {
  url: "https://www.micronwires.in",
  /** The name Google shows for the site; the business also trades as Micron Fencing Company */
  name: "Micron Wires",
  /** Google Analytics 4 measurement ID, e.g. "G-ABC123XYZ". Loads only after cookie consent. */
  gaMeasurementId: "",
};

export const business = {
  name: "Micron Fencing Company",
  altName: "Micron Wires",
  /** Registered (GST) business name: proprietorship */
  legalName: "Micron Wires",
  gstin: "36BBCPR5457C1ZN",
  yearEstablished: 2008,
  /** As printed on the tax invoice */
  address: {
    street: "Plot No. 10 & 11, Sy. No. 120, Managalapalle Village, Patelguda GP, Near Bongulur X Road",
    locality: "Ibrahimpatnam Mandal",
    district: "Ranga Reddy",
    region: "Telangana",
    postalCode: "501510",
  },
  tagline: "Boundaries. Defined.",
  shortIntro:
    "Fencing materials, professional installation, and servicing for agricultural lands, open plots, housing projects, solar farms, and real estate ventures.",
  /** Main number (Call Now, Google), display format */
  phone: "+91 81219 09779" as string | null,
  /** Further numbers shown alongside the main one */
  otherPhones: ["+91 63037 54805"],
  /** International format, digits only, e.g. "919876543210" */
  whatsapp: "918121909779" as string | null,
  email: "info@micron.in" as string | null,
  serviceAreas: [] as string[],
  hours: "Monday – Saturday, 9:00 AM – 6:00 PM (Sunday closed)" as string | null,
};

/** Same hours as `business.hours`, for Google's structured data. Keep the two in sync. */
export const openingHours = {
  days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  opens: "09:00",
  closes: "18:00",
};

export const whatsappStarter =
  "Hello Micron Fencing Company, I need help with fencing. My site location is [Location], the approximate boundary length is [Length and unit], and I need [Materials / Installation / Servicing].";

export const quotePath = "/contact/#enquiry";

export function phoneLink() {
  if (!business.phone) return { label: "[Phone number]", href: quotePath };
  return { label: business.phone, href: `tel:${business.phone.replace(/[^\d+]/g, "")}` };
}

/** "918121909779" -> "+91 81219 09779" */
function formatIndianNumber(digits: string) {
  return /^91\d{10}$/.test(digits) ? `+91 ${digits.slice(2, 7)} ${digits.slice(7)}` : `+${digits}`;
}

export function whatsappLink() {
  if (!business.whatsapp) return { label: "[WhatsApp number]", href: quotePath };
  return {
    label: formatIndianNumber(business.whatsapp),
    href: `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(whatsappStarter)}`,
  };
}

export function addressText() {
  const a = business.address;
  return `${a.street}, ${a.locality}, ${a.district} District, ${a.region} – ${a.postalCode}`;
}

/** Every phone number as a display label + tel: link, main number first. */
export function phoneLinks() {
  return [business.phone, ...business.otherPhones]
    .filter((p): p is string => Boolean(p))
    .map((p) => ({ label: p, href: `tel:${p.replace(/[^\d+]/g, "")}` }));
}

export function emailLink() {
  if (!business.email) return { label: "[Email address]", href: quotePath };
  return { label: business.email, href: `mailto:${business.email}` };
}

export const nav = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Services", href: "/services" },
  { label: "Applications", href: "/applications" },
  { label: "Clients", href: "/clients" },
  { label: "Contact", href: "/contact" },
];

export type Product = {
  id: string;
  name: string;
  image: ImageKey;
  summary: string;
  headline: string;
  body: string[];
  gsm: number[];
  brands: string[];
};

export const products: Product[] = [
  {
    id: "barbed-wire",
    name: "Barbed Wire",
    image: "productBarbedWire",
    summary:
      "A practical option for defining boundaries and restricting access across agricultural lands and open properties.",
    headline: "A Practical Choice for Boundary Fencing",
    body: [
      "Barbed wire can be used to define boundaries and restrict access around agricultural lands and open properties.",
      "Share your boundary length and intended application to discuss a suitable configuration.",
    ],
    gsm: [120, 270],
    brands: [],
  },
  {
    id: "chain-link-fencing",
    name: "Chain Link Fencing",
    image: "productChainLink",
    summary:
      "Mesh fencing for clearly defined boundaries while maintaining visibility across the site.",
    headline: "Defined Boundaries with Clear Visibility",
    body: [
      "Chain link fencing creates a mesh perimeter while maintaining visibility through the fence. It can be considered for agricultural properties, housing projects, solar farms, and other sites based on their requirements.",
      "Contact us for available mesh sizes, wire diameters, heights, and supply quantities.",
    ],
    gsm: [120, 270],
    brands: ["Tata", "Micron", "Sunvik"],
  },
  {
    id: "gi-wire",
    name: "GI Wire",
    image: "productGiWire",
    summary:
      "Galvanized iron wire for tying, supporting, and other fencing-related requirements.",
    headline: "Wire for Fencing Support and Tying Requirements",
    body: [
      "GI wire is used for tying, supporting, and related fencing applications. The appropriate specification depends on how and where it will be used.",
      "Contact our team for available wire sizes and quantities.",
    ],
    gsm: [],
    brands: [],
  },
  {
    id: "concertina-coils",
    name: "Concertina Coils",
    image: "productConcertina",
    summary:
      "A boundary security option for sites that require an additional physical deterrent.",
    headline: "An Additional Physical Barrier for Your Perimeter",
    body: [
      "Concertina coils can form part of a fencing system where additional boundary protection is required.",
      "Our team can discuss placement and installation requirements based on your site and its surroundings.",
    ],
    gsm: [],
    brands: [],
  },
  {
    id: "angular-poles",
    name: "Angular Poles",
    image: "productAngularPoles",
    summary:
      "L-section steel poles that support barbed wire and chain link fencing, selected to suit your site.",
    headline: "Strong Support for Your Fencing System",
    body: [
      "Angular poles are L-section steel posts that provide structural support for fencing installations. Pole selection should account for fence height, spacing, ground conditions, and the fencing material being used.",
      "Contact us for available sizes and specifications.",
    ],
    gsm: [],
    brands: [],
  },
];

export type Application = {
  id: string;
  name: string;
  image: ImageKey;
  short: string;
  headline: string;
  body: string;
  cta: string;
};

export const applications: Application[] = [
  {
    id: "agricultural-lands",
    name: "Agricultural Lands",
    image: "appAgricultural",
    short: "Define farm boundaries and manage access to your land.",
    headline: "Define and Manage Your Farm Boundaries",
    body: "Fencing helps establish a clear perimeter and manage access to agricultural land. Material selection depends on the size of the site and what the fencing needs to achieve.",
    cta: "Discuss Farm Fencing",
  },
  {
    id: "open-plots",
    name: "Open Plots",
    image: "appOpenPlot",
    short: "Establish a visible perimeter around vacant property.",
    headline: "Give Your Plot a Clearly Defined Perimeter",
    body: "Establish a visible boundary around an open plot with fencing selected for its layout and intended use.",
    cta: "Discuss Plot Fencing",
  },
  {
    id: "housing-projects",
    name: "Housing Projects",
    image: "appHousing",
    short: "Fence project boundaries and designated areas.",
    headline: "Boundary Fencing for Residential Developments",
    body: "Plan fencing for project perimeters and designated areas, with materials and installation suited to the development's requirements.",
    cta: "Discuss Project Fencing",
  },
  {
    id: "solar-farms",
    name: "Solar Farms",
    image: "appSolar",
    short: "Define site perimeters and support controlled access.",
    headline: "Perimeter Fencing for Solar Sites",
    body: "Define the site boundary and support controlled access with a fencing arrangement planned around the solar farm's layout.",
    cta: "Discuss Solar Farm Fencing",
  },
  {
    id: "real-estate-ventures",
    name: "Real Estate Ventures",
    image: "appRealEstate",
    short: "Mark development boundaries and manage site access.",
    headline: "Clear Boundaries for Developing Properties",
    body: "Plan fencing around real estate projects to establish visible perimeters and help manage access as the property develops.",
    cta: "Discuss Your Site Requirements",
  },
];

export const services = [
  {
    id: "installation",
    name: "Fencing Installation",
    image: "serviceInstallation" as ImageKey,
    headline: "Turn Your Boundary Plan into an Installed Fence",
    body: [
      "We provide fencing installation for agricultural lands, open plots, housing projects, solar farms, and real estate ventures.",
      "The installation scope is determined by the site layout, selected materials, boundary length, and ground conditions.",
      "Share your site details to discuss requirements and request a quotation.",
    ],
    cta: "Request an Installation Quote",
    href: "/contact/?requirement=installation#enquiry",
  },
  {
    id: "servicing",
    name: "Fencing Servicing",
    image: "serviceServicing" as ImageKey,
    headline: "Keep Your Existing Fencing in Working Condition",
    body: [
      "If your fence needs attention, share photographs and details of the affected sections with our team.",
      "We will discuss the condition of the fencing and confirm the servicing work that can be undertaken.",
    ],
    cta: "Enquire About Servicing",
    href: "/contact/?requirement=servicing#enquiry",
  },
  {
    id: "material-supply",
    name: "Material Supply",
    image: "serviceSupply" as ImageKey,
    headline: "Need Materials for Your Own Installation Team?",
    body: [
      "Contact us for barbed wire, chain link fencing, GI wire, concertina coils, and angular poles.",
      "Share the product specifications and quantities you require to check availability and pricing.",
    ],
    cta: "Request Material Pricing",
    href: "/contact/?requirement=materials#enquiry",
  },
];

export const steps = [
  {
    title: "Share your requirements",
    body: "Send your location, property type, approximate boundary length, and any available photographs.",
  },
  {
    title: "Discuss suitable options",
    body: "Review materials and installation requirements with our team.",
  },
  {
    title: "Request a quotation",
    body: "Get pricing based on the agreed specifications and scope.",
  },
  {
    title: "Confirm the work",
    body: "Coordinate supply and installation based on the confirmed requirements.",
  },
];

export const benefits = [
  {
    title: "A choice of fencing products",
    body: "Select from wire, mesh, coils, and support poles.",
  },
  {
    title: "Options for your requirements",
    body: "Discuss product specifications based on the intended application.",
  },
  {
    title: "Installation support",
    body: "Get professional assistance with setting up your fencing.",
  },
  {
    title: "Servicing support",
    body: "Contact us when your existing fencing needs attention.",
  },
];

export const faqs = [
  {
    q: "What fencing products do you supply?",
    a: "We supply barbed wire, chain link fencing, GI wire, concertina coils, and angular poles.",
  },
  {
    q: "What options are available for barbed wire and chain link fencing?",
    a: "Both are available in 120 GSM and 270 GSM options. Contact us to confirm the complete specifications for your requirement.",
  },
  {
    q: "Which chain link fencing brands are available?",
    a: "We offer chain link fencing options from Tata, Micron, and Sunvik. Contact us for current availability.",
  },
  {
    q: "Do you provide fencing installation?",
    a: "Yes. We provide professional fencing installation for agricultural lands, open plots, housing projects, solar farms, and real estate ventures.",
  },
  {
    q: "Do you service existing fencing?",
    a: "Yes. Share your location, photographs, and a description of the work required so we can discuss the servicing scope.",
  },
  {
    q: "Can I purchase materials without installation?",
    a: "Yes. Contact us with the products, specifications, and quantities you require.",
  },
  {
    q: "How is fencing pricing calculated?",
    a: "Pricing depends on the selected products, specifications, quantities, and installation requirements. Share your site details to request a quotation.",
  },
  {
    q: "What information should I provide for a quote?",
    a: "Your site location, property type, approximate boundary length, required service, and available photographs will help us understand the project.",
  },
];

/* Clients and previous projects, as supplied by the business. Logos are cropped
   from screenshots the business supplied; the Andhra Pradesh emblem is the clean
   Wikimedia Commons copy (GODL-India) because the screenshot was mid-load. The
   state emblems and MNRE logo include India's national emblem: shown at the business's request
   to identify past government projects (see the note on the Clients page). */
export type Client = {
  name: string;
  detail?: string;
  /** Initials badge when there is no logo */
  mark?: string;
  logo?: { src: string; width: number; height: number };
};

export const clients: { private: Client[]; government: Client[] } = {
  private: [
    { name: "Raghava Constructions", mark: "RC" },
    { name: "S R Group", logo: { src: "/images/clients/sr-group.png", width: 163, height: 153 } },
    { name: "One Developers Pvt. Ltd.", mark: "OD" },
    { name: "SGD Developers", logo: { src: "/images/clients/sgd-developers.png", width: 93, height: 100 } },
  ],
  government: [
    {
      name: "Government of Telangana",
      detail: "Municipality works",
      logo: { src: "/images/clients/government-of-telangana.png", width: 240, height: 240 },
    },
    { name: "HMDA", detail: "Hyderabad Metropolitan Development Authority · Outer Ring Road", logo: { src: "/images/clients/hmda.png", width: 237, height: 138 } },
    { name: "TGSPDCL", detail: "Southern Power Distribution Company of Telangana", logo: { src: "/images/clients/tgspdcl.png", width: 640, height: 147 } },
    { name: "HMWSSB", detail: "Hyderabad Metropolitan Water Supply & Sewerage Board", logo: { src: "/images/clients/hmwssb.png", width: 456, height: 240 } },
    {
      name: "Government of Andhra Pradesh",
      detail: "Government projects",
      logo: { src: "/images/clients/government-of-andhra-pradesh.png", width: 240, height: 260 },
    },
    { name: "SECI", detail: "Solar Energy Corporation of India", logo: { src: "/images/clients/seci.png", width: 372, height: 236 } },
    {
      name: "MNRE",
      detail: "Ministry of New and Renewable Energy",
      logo: { src: "/images/clients/mnre.png", width: 487, height: 240 },
    },
  ],
};

/** Real photos from Micron Wires sites and yard (public/images/projects). */
export const projectPhotos = [
  { src: "/images/projects/solar-farm.webp", width: 1280, height: 960, caption: "Perimeter chain link fencing at a solar farm" },
  { src: "/images/projects/farm-chain-link.webp", width: 1280, height: 960, caption: "Chain link fencing with concrete posts along paddy fields" },
  { src: "/images/projects/chain-link-install.webp", width: 960, height: 1280, caption: "Chain link mesh laid out for installation on a new site" },
  { src: "/images/projects/roadside-barbed-wire.webp", width: 1096, height: 941, caption: "Barbed wire fencing on concrete posts beside a road" },
  { src: "/images/projects/site-delivery.webp", width: 960, height: 1280, caption: "Delivering chain link rolls to site" },
  { src: "/images/projects/barbed-wire-concrete-posts.webp", width: 1280, height: 719, caption: "Barbed wire fencing on concrete posts with angled tops" },
  { src: "/images/projects/field-boundary-install.webp", width: 960, height: 1280, caption: "Chain link fencing going up along a field boundary" },
  { src: "/images/projects/micron-yard.webp", width: 1280, height: 960, caption: "Micron Wires yard and delivery vehicles" },
  { src: "/images/projects/open-plot-posts.webp", width: 1280, height: 960, caption: "Fence posts set out around an open plot" },
  { src: "/images/projects/chain-link-bent-posts.webp", width: 960, height: 1280, caption: "Chain link fencing on concrete posts with angled tops" },
  { src: "/images/projects/gi-wire-coils.webp", width: 1219, height: 645, caption: "GI wire coils ready for supply" },
  { src: "/images/projects/farm-compound.webp", width: 1280, height: 960, caption: "Chain link fencing around a farm compound" },
  { src: "/images/projects/coated-chain-link.webp", width: 958, height: 1280, caption: "Coated chain link mesh rolls" },
];
