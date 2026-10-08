import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "@/components/Icons";
import { Photo } from "@/components/Photo";
import { Eyebrow } from "@/components/Sections";
import { products } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Page Not Found | Micron Wires" },
  robots: { index: false, follow: true },
};

const popular = [
  { label: "Products", href: "/products/", note: products.map((p) => p.name).slice(0, 3).join(", ") + "…" },
  { label: "Services", href: "/services/", note: "Installation, servicing and material supply" },
  { label: "Applications", href: "/applications/", note: "Farms, plots, housing projects and solar sites" },
  { label: "Contact", href: "/contact/", note: "Request a fencing quote" },
];

export default function NotFound() {
  return (
    <section className="page-hero not-found">
      <Photo name="hero" className="page-hero__media" />
      <div className="page-hero__overlay" />
      <div className="container page-hero__content">
        <Eyebrow light>404 · Page not found</Eyebrow>
        <h1 className="page-hero__title">This page is outside the boundary.</h1>
        <p className="page-hero__intro">
          We couldn&apos;t find the page you were looking for. Explore our products or return to the homepage.
        </p>
        <div className="hero__actions">
          <Link href="/" className="btn btn--primary">
            Back to Home
          </Link>
          <Link href="/products/" className="btn btn--outline-light">
            Explore Products
            <ArrowRight size={16} />
          </Link>
        </div>
        <ul className="not-found__links">
          {popular.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>
                <strong>
                  {item.label}
                  <ArrowRight size={16} />
                </strong>
                <span>{item.note}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
