import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { ArrowRight } from "@/components/Icons";
import { Photo } from "@/components/Photo";
import { PageHero } from "@/components/Sections";
import { products } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Barbed Wire, Chain Link Fencing & GI Wire | Micron Wires",
  description:
    "Barbed wire and chain link fencing in 120 and 270 GSM, GI wire, concertina coils and angular poles from Micron Wires. Ask for specifications and pricing.",
  path: "/products/",
});

export default function ProductsPage() {
  return (
    <>
      <PageHero
        image="productChainLink"
        path="/products/"
        crumb="Products"
        eyebrow="Products"
        title="Fencing Materials for Your Next Project"
        intro="Explore the Micron Wires range of fencing materials. Share your site requirements with us to discuss specifications, quantities, and current availability."
      />

      <nav className="jump-nav" aria-label="Products on this page">
        <div className="container jump-nav__inner">
          {products.map((p) => (
            <a key={p.id} href={`#${p.id}`}>
              {p.name}
            </a>
          ))}
        </div>
      </nav>

      <section className="section">
        <div className="container detail-list">
          {products.map((p, i) => (
            <article key={p.id} id={p.id} className={`split detail${i % 2 ? " split--reverse" : ""}`}>
              <div className="split__media" data-reveal>
                <Photo name={p.image} sizes="(max-width: 900px) 100vw, 50vw" />
              </div>
              <div data-reveal>
                <p className="detail__num">{String(i + 1).padStart(2, "0")} / 05</p>
                <h2 className="detail__name">{p.name}</h2>
                <h3 className="detail__headline">{p.headline}</h3>
                <div className="prose">
                  {p.body.map((para) => (
                    <p key={para}>{para}</p>
                  ))}
                </div>
                {(p.gsm.length > 0 || p.brands.length > 0) && (
                  <dl className="specs">
                    {p.gsm.length > 0 && (
                      <div>
                        <dt>Available options</dt>
                        <dd className="chips">
                          {p.gsm.map((g) => (
                            <span key={g} className="chip">
                              {g} GSM
                            </span>
                          ))}
                        </dd>
                      </div>
                    )}
                    {p.brands.length > 0 && (
                      <div>
                        <dt>Brand options</dt>
                        <dd className="chips">
                          {p.brands.map((b) => (
                            <span key={b} className="chip chip--yellow">
                              {b}
                            </span>
                          ))}
                        </dd>
                      </div>
                    )}
                  </dl>
                )}
                <Link href={`/contact/?product=${p.id}#enquiry`} className="btn btn--primary">
                  Enquire About {p.name}
                  <ArrowRight size={16} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section section--warm">
        <div className="container">
          <div className="callout" data-reveal>
            <img src="/brand/micron-icon-charcoal.svg" alt="" width={88} height={88} />
            <div>
              <h2>Not Sure Which Materials to Choose?</h2>
              <p>
                Send us your property location, approximate boundary length, and site photographs. We&apos;ll help you
                discuss the available options.
              </p>
            </div>
            <Link href="/contact/?requirement=materials#enquiry" className="btn btn--dark btn--lg">
              Get Product Assistance
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
