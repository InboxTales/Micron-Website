import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { ArrowRight, Check } from "@/components/Icons";
import { Photo } from "@/components/Photo";
import { Eyebrow, PageHero, ProcessSteps } from "@/components/Sections";
import { applications, products, quotePath } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "About Micron Wires | Micron Fencing Company",
  description:
    "Micron Wires (Micron Fencing Company) supplies fencing materials and provides professional installation and servicing for farms, open plots, housing projects, solar farms and real estate ventures.",
  path: "/about/",
});

const factors = ["Property layout", "Intended use", "Material specifications", "Installation requirements"];
const commitments = [
  { title: "Durable fencing materials", body: "Wire, mesh, coils and support poles for your fencing system." },
  { title: "Reliable installation", body: "Professional fencing installation suited to the agreed scope." },
  { title: "Complete fencing solutions", body: "From an initial enquiry to servicing an existing fence." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        image="about"
        path="/about/"
        crumb="About Us"
        eyebrow="About Us"
        title="Fencing Solutions Built Around Your Requirements"
        intro="Micron Fencing Company, also known as Micron Wires, supplies fencing materials and provides professional installation and servicing for a range of properties."
      />

      <section className="section">
        <div className="container split">
          <div className="split__media" data-reveal>
            <Photo name="about" sizes="(max-width: 900px) 100vw, 50vw" />
            <div className="split__badge">
              <img src="/brand/micron-icon-yellow.svg" alt="" width={44} height={44} />
              Boundaries. Defined.
            </div>
          </div>
          <div data-reveal>
            <Eyebrow>Who We Are</Eyebrow>
            <h2 className="h2">Fencing Materials, Installation and Servicing</h2>
            <div className="prose" style={{ marginTop: "1.5rem" }}>
              <p>
                Established in 2008 and based near Bongulur X Road in Ibrahimpatnam, Ranga Reddy District, Telangana,
                Micron Fencing Company (Micron Wires) supplies fencing materials and provides installation and
                servicing. Our product range includes barbed wire, chain link fencing, GI wire, concertina coils, and
                angular poles. We work with customers seeking fencing solutions for agricultural lands, open plots, housing
                projects, solar farms, and real estate ventures.
              </p>
            </div>
            <ul className="checklist">
              <li>
                <span className="checklist__icon">
                  <Check size={15} />
                </span>
                <span>
                  <strong>Products</strong>
                  <span>{products.map((p) => p.name).join(", ")}</span>
                </span>
              </li>
              <li>
                <span className="checklist__icon">
                  <Check size={15} />
                </span>
                <span>
                  <strong>Properties</strong>
                  <span>{applications.map((a) => a.name).join(", ")}</span>
                </span>
              </li>
            </ul>
            <div className="actions">
              <Link href="/products" className="btn btn--dark">
                Explore Products
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--warm">
        <div className="container split">
          <div data-reveal>
            <Eyebrow>Our Approach</Eyebrow>
            <h2 className="h2">Start with the Site. Choose the Right Solution.</h2>
            <div className="prose" style={{ marginTop: "1.5rem" }}>
              <p>
                A fencing project involves more than selecting a product. The property layout, intended use, material
                specifications, and installation requirements all influence the final solution.
              </p>
              <p>We focus on understanding these requirements and helping customers make informed choices.</p>
            </div>
          </div>
          <div className="factor-grid">
            {factors.map((f, i) => (
              <div key={f} className="factor" data-reveal>
                <span className="factor__num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{f}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--dark">
        <div className="container">
          <div className="why__grid">
            <div className="why__media" data-reveal>
              <Photo name="installTeam" sizes="(max-width: 900px) 100vw, 50vw" />
            </div>
            <div className="why__content" data-reveal>
              <Eyebrow light>Our Commitment</Eyebrow>
              <h2 className="h2">Durable Materials. Reliable Installation. Practical Support.</h2>
              <div className="prose">
                <p>
                  We are committed to providing durable fencing materials, reliable installation, and complete fencing
                  solutions tailored to our customers&apos; requirements.
                </p>
                <p>
                  From an initial enquiry to servicing an existing fence, our focus is on clear communication and work
                  suited to the agreed scope.
                </p>
              </div>
              <Link href={quotePath} className="btn btn--primary">
                Speak to Our Team
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
          <div className="why__box why__box--three" data-reveal>
            {commitments.map((c) => (
              <div key={c.title}>
                <h3>{c.title}</h3>
                <p>{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ProcessSteps />
    </>
  );
}
