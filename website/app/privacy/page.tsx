import type { Metadata } from "next";
import { CookieSettingsButton } from "@/components/CookieConsent";
import { PageHero } from "@/components/Sections";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy & Cookie Policy | Micron Wires",
  description:
    "How Micron Wires (Micron Fencing Company) uses the details you send and the cookies on this website.",
  path: "/privacy/",
  index: false,
});

// TODO: have the business review this and complete the full privacy policy before launch.
export default function PrivacyPage() {
  return (
    <>
      <PageHero image="hero" path="/privacy/" crumb="Privacy Policy" eyebrow="Legal" title="Privacy & Cookie Policy" />
      <section className="section">
        <div className="container text-page">
          <h2>Enquiries</h2>
          <p>
            When you send an enquiry, we receive the details you enter (name, phone number, site location, your
            requirement, any optional details and photographs). We&apos;ll use them to respond to your enquiry.
          </p>

          <h2 id="cookies">Cookies and analytics</h2>
          <p>
            This website only uses analytics cookies if you choose &ldquo;Accept analytics&rdquo;. In that case Google
            Analytics sets cookies (named <code>_ga</code> and <code>_ga_*</code>) to count visits and see which pages
            are used. Advertising features are switched off.
          </p>
          <p>
            If you choose &ldquo;Reject&rdquo;, no analytics cookies are set. Your choice is remembered in your
            browser&apos;s local storage so we don&apos;t ask again. You can change it at any time.
          </p>
          <p>
            <CookieSettingsButton className="btn btn--dark" />
          </p>

          <h2>More information</h2>
          <p>
            The full privacy policy for Micron Fencing Company (Micron Wires) is being prepared and will be published
            here.
          </p>
        </div>
      </section>
    </>
  );
}
