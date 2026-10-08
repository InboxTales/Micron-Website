import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { ArrowRight } from "@/components/Icons";
import { Photo } from "@/components/Photo";
import { PageHero } from "@/components/Sections";
import { applications, quotePath } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Fencing for Farms, Plots & Solar Sites | Micron Wires",
  description:
    "Fencing for agricultural lands, open plots, housing projects, solar farms and real estate ventures. Discuss your site requirements with Micron Wires.",
  path: "/applications/",
});

export default function ApplicationsPage() {
  return (
    <>
      <PageHero
        image="appSolar"
        path="/applications/"
        crumb="Applications"
        eyebrow="Applications"
        title="Fencing to Suit the Way You Use Your Property"
        intro="Different sites need different fencing arrangements. Explore the properties we serve and contact us to discuss your requirements."
      />

      <section className="section">
        <div className="container card-grid">
          {applications.map((a) => (
            <article key={a.id} id={a.id} className="a-card" data-reveal>
              <div className="a-card__media">
                <Photo name={a.image} sizes="(max-width: 640px) 100vw, (max-width: 900px) 50vw, 33vw" />
              </div>
              <div className="a-card__body">
                <h2 className="a-card__name">{a.name}</h2>
                <h3 className="a-card__headline">{a.headline}</h3>
                <p>{a.body}</p>
                <Link href={quotePath} className="link-arrow">
                  {a.cta}
                  <ArrowRight size={18} />
                </Link>
              </div>
            </article>
          ))}
          <div className="a-card a-card--cta" data-reveal>
            <img src="/brand/micron-icon-yellow.svg" alt="" width={72} height={72} style={{ marginBottom: "1.5rem" }} />
            <h2>Planning to Fence Your Property?</h2>
            <p>Tell us what you need, whether it is material supply, installation, or servicing.</p>
            <Link href={quotePath} className="btn btn--primary">
              Get a Quote
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
