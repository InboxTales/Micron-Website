"use client";

import Link from "next/link";
import { Eyebrow } from "@/components/Sections";

/** Shown if a page fails while running in the browser. */
export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <section className="page-hero not-found">
      <div className="page-hero__overlay" />
      <div className="container page-hero__content">
        <Eyebrow light>Something went wrong</Eyebrow>
        <h1 className="page-hero__title">This page didn&apos;t load properly.</h1>
        <p className="page-hero__intro">Please try again. If it keeps happening, contact us by phone or WhatsApp.</p>
        <div className="hero__actions">
          <button type="button" className="btn btn--primary" onClick={reset}>
            Try Again
          </button>
          <Link href="/" className="btn btn--outline-light">
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}
