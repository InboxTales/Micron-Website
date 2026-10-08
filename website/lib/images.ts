/*
 * Every photo slot on the site. While `src` is null the slot renders a branded
 * placeholder labelled with the shot it needs. Drop a file into
 * public/images/ and set `src` (e.g. "/images/hero-fencing.webp") to use it.
 *
 * The current photos are AI-generated with Higgsfield and are illustrative,
 * not Micron projects. Replace them with real product and site photos
 * (see handoff/image-requirements.md) when available.
 */

export type SiteImage = {
  src: string | null;
  alt: string;
  /** Shown on the placeholder until a real photo is supplied */
  label: string;
};

export const images = {
  hero: {
    src: "/images/hero-fencing.webp",
    alt: "Galvanized chain link fence with barbed wire along green farmland at sunrise",
    label: "Completed fence line",
  },
  about: {
    src: "/images/about-yard.webp",
    alt: "Rolls of chain link mesh, barbed wire coils and fencing poles stacked under a steel shed",
    label: "Team, premises or materials",
  },
  installTeam: {
    src: "/images/install-team.webp",
    alt: "Two workers in hard hats fixing chain link mesh to a galvanized fence post",
    label: "Fence installation on site",
  },
  why: {
    src: "/images/fence-detail.webp",
    alt: "Chain link fence topped with barbed wire on angled post arms",
    label: "Fence line detail",
  },
  contact: {
    src: "/images/materials-warehouse.webp",
    alt: "Rolls of chain link mesh, fencing poles and wire coils in a warehouse",
    label: "Fencing materials",
  },
  productBarbedWire: {
    src: "/images/product-barbed-wire.webp",
    alt: "Close-up of twisted barbed wire with four-point barbs",
    label: "Barbed wire detail",
  },
  productChainLink: {
    src: "/images/product-chain-link.webp",
    alt: "Galvanized chain link mesh with a diamond pattern",
    label: "Chain link mesh",
  },
  productGiWire: {
    src: "/images/product-gi-wire.webp",
    alt: "Coils of galvanized iron wire",
    label: "GI wire coil",
  },
  productConcertina: {
    src: "/images/product-concertina.webp",
    alt: "Concertina coil mounted along the top of a perimeter wall and fence",
    label: "Concertina coil",
  },
  productAngularPoles: {
    src: "/images/product-angular-poles.webp",
    alt: "L-section steel angular fence poles with pre-drilled holes, stacked in a materials yard",
    label: "Angular poles",
  },
  serviceInstallation: {
    src: "/images/service-installation.webp",
    alt: "Workers digging a post hole and levelling a fence post along a farm boundary",
    label: "Fence installation",
  },
  serviceServicing: {
    src: "/images/service-servicing.webp",
    alt: "Gloved hands tying wire to reattach chain link mesh to a fence post",
    label: "Fence servicing",
  },
  serviceSupply: {
    src: "/images/service-supply.webp",
    alt: "Truck loaded with chain link rolls, barbed wire coils and fencing poles",
    label: "Material supply",
  },
  appAgricultural: {
    src: "/images/application-agricultural.webp",
    alt: "Barbed wire fence along a green rice field beside a farm track",
    label: "Farm boundary",
  },
  appOpenPlot: {
    src: "/images/application-open-plot.webp",
    alt: "Open plot of red soil enclosed by chain link fencing",
    label: "Open plot perimeter",
  },
  appHousing: {
    src: "/images/application-housing.webp",
    alt: "Chain link boundary fence around apartment blocks under construction",
    label: "Housing project boundary",
  },
  appSolar: {
    src: "/images/application-solar.webp",
    alt: "Chain link fence with a concertina coil around rows of solar panels",
    label: "Solar farm perimeter",
  },
  appRealEstate: {
    src: "/images/application-real-estate.webp",
    alt: "Fenced real estate layout with internal roads and marked plots",
    label: "Real estate venture",
  },
  projectSolar: {
    src: "/images/projects/solar-farm.webp",
    alt: "Chain link perimeter fencing installed by Micron Wires at a solar farm",
    label: "Solar farm project",
  },
} satisfies Record<string, SiteImage>;

export type ImageKey = keyof typeof images;
