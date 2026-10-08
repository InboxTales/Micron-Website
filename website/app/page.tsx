import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Phone } from "@/components/Icons";
import { Photo } from "@/components/Photo";
import { ContactDetails, Eyebrow, ProcessSteps } from "@/components/Sections";
import { applications, benefits, phoneLink, products, quotePath } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const phone = phoneLink();

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <Photo name="hero" className="hero__media" priority />
        <div className="hero__overlay" />
        <div className="container hero__content">
          <Eyebrow light>Micron Wires · Since 2008</Eyebrow>
          <h1 className="hero__title">
            Fencing Materials. Professional Installation. <span>Complete Boundary Solutions.</span>
          </h1>
          <p className="hero__text">
            From agricultural lands and open plots to housing projects and solar farms, Micron Fencing Company
            supplies fencing materials and provides installation and servicing tailored to your property.
          </p>
          <div className="hero__actions">
            <Link href={quotePath} className="call-pill">
              <span className="call-pill__icon">
                <ArrowRight size={22} />
              </span>
              <span className="call-pill__text">
                <strong>Get a Quote</strong>
                <small>Tell us about your site</small>
              </span>
            </Link>
            <Link href="/products" className="link-arrow">
              Explore Products
              <ArrowRight size={18} />
            </Link>
          </div>
          <ul className="hero__highlights">
            {["Material Supply", "Fencing Installation", "Fencing Servicing"].map((h) => (
              <li key={h}>
                <Check size={18} />
                {h}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Intro band */}
      <section className="band">
        <div className="container band__grid">
          <div>
            <Eyebrow>Why it matters</Eyebrow>
            <h2 className="band__title">The Right Fencing Starts with the Right Materials</h2>
          </div>
          <div className="band__divider" aria-hidden="true" />
          <div className="band__text">
            <p>
              Every property has different boundary requirements. At Micron Wires, we help you choose
              fencing materials and installation options that suit your site, purpose, and budget.
            </p>
            <Link href="/about" className="link-arrow">
              About Micron
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="section">
        <div className="container">
          <div className="section-head" data-reveal>
            <div>
              <Eyebrow>Products</Eyebrow>
              <h2 className="h2">Find the Materials Your Project Needs</h2>
            </div>
            <p className="section-head__aside">
              Share your site requirements with us to discuss specifications, quantities, and current availability.
            </p>
          </div>

          <div className="card-grid">
            {products.map((p, i) => (
              <Link key={p.id} href={`/products/#${p.id}`} className="p-card" data-reveal>
                <div className="p-card__media">
                  <Photo name={p.image} sizes="(max-width: 640px) 100vw, (max-width: 900px) 50vw, 33vw" />
                  <div className="p-card__label">
                    <span className="p-card__num">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="p-card__name">{p.name}</h3>
                    <ArrowRight size={20} />
                  </div>
                </div>
                <div className="p-card__body">
                  <p>{p.summary}</p>
                  {(p.gsm.length > 0 || p.brands.length > 0) && (
                    <div className="chips">
                      {p.gsm.map((g) => (
                        <span key={g} className="chip">
                          {g} GSM
                        </span>
                      ))}
                      {p.brands.map((b) => (
                        <span key={b} className="chip chip--yellow">
                          {b}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            ))}
            <div className="p-card p-card--cta" data-reveal>
              <div>
                <img src="/brand/micron-icon-yellow.svg" alt="" width={72} height={72} />
                <h3>Not Sure Which Materials to Choose?</h3>
                <p>
                  Send us your property location, approximate boundary length, and site photographs. We&apos;ll
                  help you discuss the available options.
                </p>
              </div>
              <Link href="/products" className="btn btn--primary">
                View All Products
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Installation */}
      <section className="section section--warm">
        <div className="container split">
          <div data-reveal>
            <Eyebrow>Installation &amp; Servicing</Eyebrow>
            <h2 className="h2">From Material Selection to Installation</h2>
            <div className="prose" style={{ marginTop: "1.5rem" }}>
              <p>
                We provide professional fencing installation and servicing for agricultural lands, open plots,
                housing projects, solar farms, and real estate ventures.
              </p>
              <p>Our team helps you plan a fencing solution around your property&apos;s layout and intended use.</p>
            </div>
            <ul className="checklist">
              {["Material supply for your own team", "Professional fencing installation", "Servicing for existing fencing"].map(
                (item) => (
                  <li key={item}>
                    <span className="checklist__icon">
                      <Check size={15} />
                    </span>
                    {item}
                  </li>
                ),
              )}
            </ul>
            <div className="actions">
              <Link href={quotePath} className="btn btn--primary">
                Discuss Your Fencing Project
                <ArrowRight size={16} />
              </Link>
              <a href={phone.href} className="call-inline">
                <span className="call-inline__icon">
                  <Phone size={20} />
                </span>
                <span>
                  <small>Call us</small>
                  <strong>{phone.label}</strong>
                </span>
              </a>
            </div>
          </div>
          <div className="split__media" data-reveal>
            <Photo name="installTeam" sizes="(max-width: 900px) 100vw, 50vw" />
            <div className="split__badge">
              <img src="/brand/micron-icon-yellow.svg" alt="" width={44} height={44} />
              Supply · Install · Service
            </div>
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="section">
        <div className="container">
          <div className="section-head" data-reveal>
            <div>
              <Eyebrow>Applications</Eyebrow>
              <h2 className="h2">Fencing for Different Properties and Purposes</h2>
            </div>
            <Link href="/applications" className="link-arrow section-head__aside">
              Explore Applications
              <ArrowRight size={18} />
            </Link>
          </div>
          <div className="gallery">
            {applications.map((a) => (
              <Link key={a.id} href={`/applications/#${a.id}`} className="g-card" data-reveal>
                <Photo name={a.image} sizes="(max-width: 640px) 80vw, (max-width: 1180px) 50vw, 20vw" />
                <div className="g-card__body">
                  <h3 className="g-card__title">
                    {a.name}
                    <ArrowRight size={18} />
                  </h3>
                  <p>{a.short}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Micron */}
      <section className="section section--dark">
        <div className="container">
          <div className="why__grid">
            <div className="why__media" data-reveal>
              <Photo name="why" sizes="(max-width: 900px) 100vw, 50vw" />
            </div>
            <div className="why__content" data-reveal>
              <Eyebrow light>Why Micron</Eyebrow>
              <h2 className="h2">Materials and Installation, Planned Together</h2>
              <div className="prose">
                <p>
                  Whether you need materials for a new project or support with existing fencing, we bring supply,
                  installation, and servicing together.
                </p>
              </div>
              <Link href={quotePath} className="btn btn--outline-light">
                Get a Quote
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
          <div className="why__box" data-reveal>
            {benefits.map((b) => (
              <div key={b.title}>
                <h3>{b.title}</h3>
                <p>{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ProcessSteps />

      {/* Contact block */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="contact-block" data-reveal>
            <ContactDetails />
            <div className="contact-visual">
              <Photo name="contact" sizes="(max-width: 900px) 100vw, 50vw" />
              <div className="stats">
                <div>
                  <strong>2008</strong>
                  <span>Established</span>
                </div>
                <div>
                  <strong>5</strong>
                  <span>Fencing products</span>
                </div>
                <div>
                  <strong>5</strong>
                  <span>Property types served</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
