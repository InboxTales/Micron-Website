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
  region: "Telangana",
  postalCode: "501506",
  tagline: "Boundaries. Defined.",
  shortIntro:
    "Fencing materials, professional installation, and servicing for agricultural lands, open plots, housing projects, solar farms, and real estate ventures.",
  /** Display format, e.g. "+91 98765 43210" */
  phone: "+91 81219 09779" as string | null,
  /** International format, digits only, e.g. "919876543210" */
  whatsapp: "918121909779" as string | null,
  email: "info@micron.in" as string | null,
  address: null as string | null,
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

/** Full street address once supplied; until then the verified state and PIN code. */
export function addressText() {
  return business.address ?? `${business.region}, India – ${business.postalCode}`;
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
    id: "gi-fencing-poles",
    name: "GI Fencing Poles",
    image: "productGiPoles",
    summary:
      "Support poles for fencing installations, selected to suit your fencing system and site.",
    headline: "Support for Your Fencing System",
    body: [
      "GI fencing poles provide structural support for fencing installations. Pole selection should account for fence height, spacing, ground conditions, and the fencing material being used.",
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
      "Contact us for barbed wire, chain link fencing, GI wire, concertina coils, and GI fencing poles.",
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
    a: "We supply barbed wire, chain link fencing, GI wire, concertina coils, and GI fencing poles.",
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
