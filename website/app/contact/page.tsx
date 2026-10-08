import type { Metadata } from "next";
import { faqJsonLd, pageMetadata } from "@/lib/seo";
import { Suspense } from "react";
import { EnquiryForm } from "@/components/EnquiryForm";
import { JsonLd } from "@/components/JsonLd";
import { ContactDetails, Eyebrow, FaqList, PageHero } from "@/components/Sections";

export const metadata: Metadata = pageMetadata({
  title: "Contact Micron Wires | Request a Fencing Quote",
  description:
    "Request a quote from Micron Wires for fencing materials, installation or servicing. Share your location, approximate boundary length and site requirements.",
  path: "/contact/",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        image="why"
        path="/contact/"
        crumb="Contact"
        eyebrow="Contact"
        title="Tell Us About Your Fencing Requirement"
        intro="Looking for materials, installation, or servicing? Share a few details, and our team will contact you to discuss the next steps."
      />

      <section className="section">
        <div className="container contact-layout">
          <ContactDetails />
          <div id="enquiry" className="form-card">
            <h2 className="form-card__title">Request a Fencing Quote</h2>
            <p className="form-card__intro">Fields marked * are required.</p>
            <Suspense>
              <EnquiryForm />
            </Suspense>
          </div>
        </div>
      </section>

      <section className="section section--warm">
        <div className="container faq-layout">
          <div data-reveal>
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="h2">Frequently Asked Questions</h2>
            <div className="prose">
              <p>
                Can&apos;t find what you&apos;re looking for? Send us your site details and our team will help with
                the next steps.
              </p>
            </div>
          </div>
          <FaqList />
        </div>
        <JsonLd data={faqJsonLd()} />
      </section>
    </>
  );
}
