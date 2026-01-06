
"use client";
import React, { useEffect } from "react";

const GA_ID = process.env.NEXT_PUBLIC_MEASURED_ID ?? "";
function loadGtag(id: string) {
  if (typeof window === "undefined") return;


  if ((window as any).gtagLoaded && typeof (window as any).gtag === "function") {
    (window as any).gtag("config", id);
    return;
  }

  if (!document.querySelector(`script[src*="googletagmanager.com/gtag/js"]`)) {
    const s = document.createElement("script");
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
    document.head.appendChild(s);
  }


  (window as any).dataLayer = (window as any).dataLayer || [];

  (window as any).gtag =
    (window as any).gtag ||
    function () {
      (window as any).dataLayer.push(arguments);
    };


  (window as any).gtagLoaded = true;

  (window as any).gtag("js", new Date());
  (window as any).gtag("config", id);
}

function disableGtag() {
  try {
    document
      .querySelectorAll('script[src*="googletagmanager.com/gtag/js"]')
      .forEach((s) => s.remove());

    delete (window as any).gtag;
    delete (window as any).dataLayer;
    (window as any).gtagLoaded = false;
  } catch (e) {
    console.warn("Failed to disable gtag:", e);
  }
}


export default function CookieClientWrapper() {
  useEffect(() => {
    function onPrefs(e:any) {
      const prefs = e?.detail;
      if (prefs?.analytics) loadGtag(GA_ID); else disableGtag();
    }
    window.addEventListener("cookie-preferences-saved", onPrefs);
    try {
      const raw = localStorage.getItem("cookie_preferences");
      if (raw) { const p = JSON.parse(raw); if (p.analytics) loadGtag(GA_ID); }
    } catch{}

    return () => window.removeEventListener("cookie-preferences-saved", onPrefs);
  }, []);
  return null;
}
