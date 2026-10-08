import type { Metadata } from "next";
import { business, faqs, openingHours, products, services, siteConfig } from "./site";

export const ogImage = {
  url: "/og-image.jpg",
  width: 1200,
  height: 630,
  alt: "Micron Wires (Micron Fencing Company): fencing materials, installation and servicing",
};

/* Next.js replaces (doesn't merge) openGraph/twitter objects per page, so every
   page builds from these to keep the share image, site name and card type. */
export const baseOpenGraph = {
  type: "website" as const,
  siteName: siteConfig.name,
  locale: "en_IN",
  images: [ogImage],
};
export const baseTwitter = { card: "summary_large_image" as const, images: [ogImage.url] };

/** Per-page metadata with canonical URL and matching Open Graph fields. */
export function pageMetadata({
  title,
  description,
  path,
  index = true,
}: {
  title: string;
  description: string;
  /** With trailing slash, e.g. "/about/" */
  path: string;
  index?: boolean;
}): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: { ...baseOpenGraph, title, description, url: path },
    twitter: { ...baseTwitter, title, description },
    ...(index ? {} : { robots: { index: false, follow: true } }),
  };
}

const orgId = `${siteConfig.url}/#organization`;

/** Organization + WebSite, rendered once in the root layout. Only verified details. */
export function siteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": orgId,
        name: business.name,
        alternateName: business.altName,
        legalName: business.legalName,
        foundingDate: String(business.yearEstablished),
        taxID: business.gstin,
        address: {
          "@type": "PostalAddress",
          ...(business.address ? { streetAddress: business.address } : {}),
          addressRegion: business.region,
          postalCode: business.postalCode,
          addressCountry: "IN",
        },
        url: siteConfig.url,
        logo: `${siteConfig.url}/icons/icon-512.png`,
        slogan: business.tagline,
        description: business.shortIntro,
        knowsAbout: products.map((p) => p.name),
        makesOffer: services.map((s) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: s.name, description: s.headline },
        })),
        ...(business.phone ? { telephone: business.phone } : {}),
        ...(business.email ? { email: business.email } : {}),
        ...(business.phone
          ? {
              contactPoint: {
                "@type": "ContactPoint",
                telephone: business.phone,
                ...(business.email ? { email: business.email } : {}),
                contactType: "sales",
                areaServed: "IN",
                hoursAvailable: {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: openingHours.days,
                  opens: openingHours.opens,
                  closes: openingHours.closes,
                },
              },
            }
          : {}),
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        name: siteConfig.name,
        alternateName: [business.name, "micronwires.in"],
        url: siteConfig.url,
        inLanguage: "en-IN",
        publisher: { "@id": orgId },
      },
    ],
  };
}

export function breadcrumbJsonLd(name: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteConfig.url}/` },
      { "@type": "ListItem", position: 2, name, item: `${siteConfig.url}${path}` },
    ],
  };
}

export function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}
