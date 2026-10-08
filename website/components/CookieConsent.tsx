"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site";

/*
 * Cookie consent + Google Analytics. GA (siteConfig.gaMeasurementId) is only
 * loaded after the visitor accepts; rejecting later switches its consent off
 * and deletes its cookies. The choice is kept in localStorage.
 */

const STORAGE_KEY = "micron-cookie-consent-v1";
const OPEN_EVENT = "micron:cookie-settings";

type Choice = "granted" | "denied";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function readChoice(): Choice | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

function clearAnalyticsCookies() {
  const host = location.hostname;
  const domains = ["", host, `.${host}`, `.${host.replace(/^www\./, "")}`];
  for (const name of document.cookie.split(";").map((c) => c.split("=")[0].trim())) {
    if (name === "_ga" || name.startsWith("_ga_") || name === "_gid") {
      for (const d of domains) document.cookie = `${name}=; Max-Age=0; path=/${d ? `; domain=${d}` : ""}`;
    }
  }
}

export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button type="button" className={className} onClick={openCookieSettings}>
      Cookie settings
    </button>
  );
}

export function CookieConsent() {
  const [choice, setChoice] = useState<Choice | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const saved = readChoice();
    setChoice(saved);
    setOpen(saved === null);
    const onOpen = () => setOpen(true);
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, []);

  function decide(next: Choice) {
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Private mode: the choice still applies for this page view.
    }
    setChoice(next);
    setOpen(false);
    if (next === "denied") {
      window.gtag?.("consent", "update", { analytics_storage: "denied" });
      clearAnalyticsCookies();
    } else {
      window.gtag?.("consent", "update", { analytics_storage: "granted" });
    }
  }

  const gaId = siteConfig.gaMeasurementId;

  return (
    <>
      {gaId && choice === "granted" && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;
gtag('consent','default',{analytics_storage:'granted',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});
gtag('js',new Date());gtag('config','${gaId}');`}
          </Script>
        </>
      )}

      {open && (
        <div className="cookie-banner" role="dialog" aria-labelledby="cookie-title" aria-describedby="cookie-text">
          <h2 id="cookie-title" className="cookie-banner__title">
            Cookies on this site
          </h2>
          <p id="cookie-text" className="cookie-banner__text">
            We&apos;d like to use Google Analytics cookies to understand how visitors use this website. They&apos;re
            only set if you accept, and the site works the same either way.{" "}
            <Link href="/privacy/#cookies">Privacy &amp; cookie policy</Link>
          </p>
          <div className="cookie-banner__actions">
            <button type="button" className="btn btn--primary" onClick={() => decide("granted")}>
              Accept analytics
            </button>
            <button type="button" className="btn btn--outline-light" onClick={() => decide("denied")}>
              Reject
            </button>
          </div>
        </div>
      )}
    </>
  );
}
