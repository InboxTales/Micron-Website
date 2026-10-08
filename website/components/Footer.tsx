import Link from "next/link";
import { addressText, business, emailLink, nav, phoneLink, products, quotePath, whatsappLink } from "@/lib/site";
import { CookieSettingsButton } from "./CookieConsent";
import { ArrowRight, Mail, MapPin, Phone, WhatsApp } from "./Icons";

export function Footer() {
  const phone = phoneLink();
  const email = emailLink();
  const whatsapp = whatsappLink();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-cta">
          <div>
            <h2 className="footer-cta__title">Planning to Fence Your Property?</h2>
            <p className="footer-cta__text">
              Tell us what you need, whether it is material supply, installation, or servicing.
            </p>
          </div>
          <div className="footer-cta__actions">
            <Link href={quotePath} className="call-pill">
              <span className="call-pill__icon">
                <ArrowRight size={22} />
              </span>
              <span className="call-pill__text">
                <strong>Request a Quote</strong>
                <small>Materials · Installation · Servicing</small>
              </span>
            </Link>
            <a href={whatsapp.href} className="btn btn--outline-light">
              <WhatsApp size={18} />
              WhatsApp Your Requirements
            </a>
          </div>
        </div>

        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" aria-label="Micron Fencing Company home">
              <img src="/brand/micron-horizontal-brand.svg" alt="Micron Wires – Micron Fencing Company" width={200} height={56} />
            </Link>
            <p>
              <strong>Micron Wires</strong> (Micron Fencing Company). {business.shortIntro}
            </p>
            <p className="footer-brand__tagline">
              {business.tagline} Since {business.yearEstablished}.
            </p>
          </div>

          <div>
            <h3 className="footer-heading">Quick Links</h3>
            <ul className="footer-links">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="footer-heading">Products</h3>
            <ul className="footer-links">
              {products.map((p) => (
                <li key={p.id}>
                  <Link href={`/products/#${p.id}`}>{p.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="footer-heading">Contact</h3>
            <ul className="footer-contact">
              <li>
                <Phone size={18} />
                <a href={phone.href}>{phone.label}</a>
              </li>
              <li>
                <Mail size={18} />
                <a href={email.href}>{email.label}</a>
              </li>
              <li>
                <MapPin size={18} />
                <span>{addressText()}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Micron Fencing Company (Micron Wires). All rights reserved.</p>
          <p>GSTIN {business.gstin} · Photographs are illustrative.</p>
          <div className="footer-bottom__links">
            <Link href="/privacy/">Privacy Policy</Link>
            <CookieSettingsButton className="footer-bottom__btn" />
          </div>
        </div>
      </div>
    </footer>
  );
}
