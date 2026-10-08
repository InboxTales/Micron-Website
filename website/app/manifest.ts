import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Micron Wires – Micron Fencing Company",
    short_name: "Micron Wires",
    description: "Fencing materials, professional installation and servicing.",
    start_url: "/",
    display: "standalone",
    background_color: "#171b1c",
    theme_color: "#171b1c",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icons/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
