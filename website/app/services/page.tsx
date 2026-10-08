import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { ArrowRight } from "@/components/Icons";
import { Photo } from "@/components/Photo";
import { Eyebrow, PageHero, ProcessSteps } from "@/components/Sections";
import { services } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Fencing Installation & Servicing | Micron Wires",
  description:
    "Professional fencing installation, servicing and material supply from Micron Wires (Micron Fencing Company). Share your site details to request a quotation.",
  path: "/services/",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        image="serviceInstallation"
        path="/services/"
        crumb="Services"
        eyebrow="Services"
        title="Professional Fencing Installation and Servicing"
        intro="Get support with new fencing installations and existing fences, based on your property's requirements."
      />

      <section className="section">
        <div className="container">
          <div className="section-head" data-reveal>
            <div>
              <Eyebrow>What We Do</Eyebrow>
              <h2 className="h2">Installation, Servicing and Supply</h2>
            </div>
            <p className="section-head__aside">
              Whether you need materials for a new project or support with existing fencing, we bring supply,
              installation, and servicing together.
            </p>
          </div>
          <div className="card-grid">
            {services.map((s, i) => (
              <a key={s.id} href={`#${s.id}`} className="p-card" data-reveal>
                <div className="p-card__media">
                  <Photo name={s.image} sizes="(max-width: 640px) 100vw, (max-width: 900px) 50vw, 33vw" />
                  <div className="p-card__label">
                    <span className="p-card__num">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="p-card__name">{s.name}</h3>
                    <ArrowRight size={20} />
                  </div>
                </div>
                <div className="p-card__body">
                  <p>{s.headline}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--warm">
        <div className="container detail-list">
          {services.map((s, i) => (
            <article key={s.id} id={s.id} className={`split detail${i % 2 ? " split--reverse" : ""}`}>
              <div className="split__media" data-reveal>
                <Photo name={s.image} sizes="(max-width: 900px) 100vw, 50vw" />
              </div>
              <div data-reveal>
                <p className="detail__num">{String(i + 1).padStart(2, "0")} / 03</p>
                <h2 className="detail__name">{s.name}</h2>
                <h3 className="detail__headline">{s.headline}</h3>
                <div className="prose">
                  {s.body.map((para) => (
                    <p key={para}>{para}</p>
                  ))}
                </div>
                <Link href={s.href} className="btn btn--primary">
                  {s.cta}
                  <ArrowRight size={16} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <ProcessSteps />
    </>
  );
}
