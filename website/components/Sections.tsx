import Link from "next/link";
import type { ImageKey } from "@/lib/images";
import { breadcrumbJsonLd } from "@/lib/seo";
import { addressText, business, emailLink, faqs, phoneLinks, steps, whatsappLink } from "@/lib/site";
import { Clock, Mail, MapPin, Phone, WhatsApp } from "./Icons";
import { JsonLd } from "./JsonLd";
import { Photo } from "./Photo";

export function Eyebrow({ children, light }: { children: React.ReactNode; light?: boolean }) {
  return <p className={`eyebrow${light ? " eyebrow--light" : ""}`}>{children}</p>;
}

export function PageHero({
  image,
  eyebrow,
  title,
  intro,
  crumb,
  path,
}: {
  image: ImageKey;
  eyebrow: string;
  title: string;
  intro?: string;
  crumb: string;
  /** Page URL path with trailing slash, for breadcrumb structured data */
  path: string;
}) {
  return (
    <section className="page-hero">
      <JsonLd data={breadcrumbJsonLd(crumb, path)} />
      <Photo name={image} className="page-hero__media" priority />
      <div className="page-hero__overlay" />
      <div className="container page-hero__content">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{crumb}</span>
        </nav>
        <Eyebrow light>{eyebrow}</Eyebrow>
        <h1 className="page-hero__title">{title}</h1>
        {intro && <p className="page-hero__intro">{intro}</p>}
      </div>
    </section>
  );
}

export function ProcessSteps({ heading = "Tell Us About Your Site. We'll Help with the Next Steps." }) {
  return (
    <section className="section">
      <div className="container">
        <div className="section-head section-head--center" data-reveal>
          <Eyebrow>How It Works</Eyebrow>
          <h2 className="h2">{heading}</h2>
        </div>
        <ol className="steps">
          {steps.map((step, i) => (
            <li key={step.title} className="step" data-reveal>
              <span className="step__num">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="step__title">{step.title}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** Charcoal panel with phone, WhatsApp, email, address and hours. */
export function ContactDetails() {
  const whatsapp = whatsappLink();
  const email = emailLink();

  return (
    <div className="contact-panel">
      <div className="contact-panel__group">
        <h3 className="contact-panel__title">Talk to Our Team</h3>
        <ul className="contact-list">
          {phoneLinks().map((p) => (
            <li key={p.href}>
              <Phone size={18} />
              <a href={p.href}>{p.label}</a>
            </li>
          ))}
          <li>
            <WhatsApp size={18} />
            <a href={whatsapp.href}>{whatsapp.label}</a>
          </li>
          <li>
            <Mail size={18} />
            <a href={email.href}>{email.label}</a>
          </li>
        </ul>
      </div>
      <div className="contact-panel__group">
        <h3 className="contact-panel__title">
          {business.serviceAreas.length ? <>Address &amp; Service Areas</> : "Our Address"}
        </h3>
        <ul className="contact-list">
          <li>
            <MapPin size={18} />
            <span>{addressText()}</span>
          </li>
        </ul>
        {business.serviceAreas.length > 0 && (
          <p className="contact-panel__note">Serving: {business.serviceAreas.join(", ")}</p>
        )}
      </div>
      <div className="contact-panel__group contact-panel__group--hours">
        <span className="contact-panel__icon">
          <Clock size={30} />
        </span>
        <div>
          <h3 className="contact-panel__title">Business Hours</h3>
          <p>{business.hours ?? "[Days and timings]"}</p>
        </div>
      </div>
    </div>
  );
}

export function FaqList() {
  return (
    <div className="faq">
      {faqs.map((item) => (
        <details key={item.q} className="faq__item">
          <summary className="faq__q">
            {item.q}
            <span className="faq__icon" aria-hidden="true" />
          </summary>
          <p className="faq__a">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
