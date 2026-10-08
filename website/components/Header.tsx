"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, quotePath } from "@/lib/site";
import { ArrowRight, Close, Menu } from "./Icons";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className={`site-header${scrolled || open ? " is-solid" : ""}`}>
      <div className="container site-header__inner">
        <Link href="/" className="site-header__logo" aria-label="Micron Wires – Micron Fencing Company home">
          <img src="/brand/micron-horizontal-brand.svg" alt="Micron Wires – Micron Fencing Company" width={176} height={50} />
        </Link>

        <nav className="site-nav" aria-label="Main">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`site-nav__link${isActive(item.href) ? " is-active" : ""}`}
              aria-current={isActive(item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link href={quotePath} className="btn btn--primary site-header__cta">
          Get a Quote
          <ArrowRight size={16} />
        </Link>

        <button
          type="button"
          className="site-header__toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <Close size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div id="mobile-menu" className={`mobile-menu${open ? " is-open" : ""}`} hidden={!open}>
        <nav className="container mobile-menu__nav" aria-label="Mobile">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`mobile-menu__link${isActive(item.href) ? " is-active" : ""}`}
              aria-current={isActive(item.href) ? "page" : undefined}
            >
              {item.label}
              <ArrowRight size={18} />
            </Link>
          ))}
          <Link href={quotePath} className="btn btn--primary btn--block">
            Get a Quote
          </Link>
        </nav>
      </div>
    </header>
  );
}
