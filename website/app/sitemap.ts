import type { MetadataRoute } from "next";
import { images, type ImageKey } from "@/lib/images";
import { applications, products, projectPhotos, siteConfig } from "@/lib/site";

export const dynamic = "force-static";

const abs = (path: string) => `${siteConfig.url}${path}`;
const imgs = (...keys: ImageKey[]) =>
  keys.map((k) => images[k].src).filter((src): src is string => Boolean(src)).map(abs);

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: abs("/"), lastModified, changeFrequency: "monthly", priority: 1, images: imgs("hero", "installTeam") },
    {
      url: abs("/products/"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
      images: imgs(...products.map((p) => p.image)),
    },
    {
      url: abs("/services/"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
      images: imgs("serviceInstallation", "serviceServicing", "serviceSupply"),
    },
    {
      url: abs("/applications/"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
      images: imgs(...applications.map((a) => a.image)),
    },
    {
      url: abs("/clients/"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
      images: projectPhotos.map((p) => abs(p.src)),
    },
    { url: abs("/about/"), lastModified, changeFrequency: "yearly", priority: 0.6, images: imgs("about") },
    { url: abs("/contact/"), lastModified, changeFrequency: "yearly", priority: 0.7 },
  ];
}
