import { phoneLink, whatsappLink } from "@/lib/site";
import { Phone, WhatsApp } from "./Icons";

/** Fixed quick-action bar shown on small screens. */
export function MobileActions() {
  return (
    <div className="mobile-actions" role="navigation" aria-label="Quick actions">
      <a href={phoneLink().href} className="mobile-actions__btn">
        <Phone size={18} />
        Call Now
      </a>
      <a href={whatsappLink().href} className="mobile-actions__btn mobile-actions__btn--accent">
        <WhatsApp size={18} />
        WhatsApp Us
      </a>
    </div>
  );
}
