import type { Metadata, Viewport } from "next";
import { Inter, Outfit } from "next/font/google";
import { CookieConsent } from "@/components/CookieConsent";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { MobileActions } from "@/components/MobileActions";
import { RevealObserver } from "@/components/RevealObserver";
import { baseOpenGraph, baseTwitter, siteJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-outfit" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const description =
  "Micron Wires (Micron Fencing Company) supplies barbed wire, chain link fencing, GI wire, concertina coils and GI fencing poles, with professional fencing installation and servicing.";

// Icons and the manifest come from file conventions in app/ (favicon.ico,
// icon.svg, apple-icon.png, manifest.ts); the share image is public/og-image.jpg.
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Micron Wires | Barbed Wire, Chain Link & Fencing Installation",
    template: "%s | Micron Wires",
  },
  description,
  applicationName: siteConfig.name,
  keywords: [
    "Micron Wires",
    "Micron Fencing Company",
    "barbed wire",
    "chain link fencing",
    "GI wire",
    "concertina coil",
    "GI fencing poles",
    "fencing installation",
    "fencing contractor",
    "farm fencing",
    "solar farm fencing",
  ],
  authors: [{ name: "Micron Fencing Company", url: siteConfig.url }],
  creator: "Micron Fencing Company",
  publisher: "Micron Fencing Company",
  openGraph: {
    ...baseOpenGraph,
    url: "/",
    title: "Micron Wires | Fencing Materials, Installation & Servicing",
    description,
  },
  twitter: {
    ...baseTwitter,
    title: "Micron Wires | Fencing Materials, Installation & Servicing",
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  formatDetection: { telephone: true, email: true, address: false },
  category: "construction",
};

export const viewport: Viewport = {
  themeColor: "#171b1c",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${outfit.variable} ${inter.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileActions />
        <CookieConsent />
        <RevealObserver />
        <JsonLd data={siteJsonLd()} />
      </body>
    </html>
  );
}
