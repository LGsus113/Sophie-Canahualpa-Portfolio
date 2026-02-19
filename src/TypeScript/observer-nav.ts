import { $ } from "@src/TypeScript/dom-selector";

function ObserverNav() {
  const hero = $("#hero");
  const nav = $(".nav-container");

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: Array.from({ length: 101 }, (_, i) => i / 100),
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const ratio = entry.intersectionRatio;

      const starPoint = 0.5;
      let adjustedProgress = (starPoint - ratio) / starPoint;

      adjustedProgress = Math.min(Math.max(adjustedProgress, 0), 1);

      const maxOpacity = 0.1;
      const maxBlur = 4;

      const opacity = adjustedProgress * maxOpacity;
      const blur = adjustedProgress * maxBlur;

      const initialShadow = 0.9;
      const minShadow = 0.35;

      const shadowStrength =
        initialShadow - adjustedProgress * (initialShadow - minShadow);

      nav.style.setProperty("--nav-opacity", `${opacity}`);
      nav.style.setProperty("--nav-blur", `${blur}px`);
      nav.style.setProperty("--shadow-strength", `${shadowStrength}`);

      if (!entry.isIntersecting) {
        nav.classList.add("nav-scrolled");
      } else {
        nav.classList.remove("nav-scrolled");
      }
    });
  }, observerOptions);

  if (hero) observer.observe(hero);
}

export function initObserver() {
  document.addEventListener("DOMContentLoaded", () => ObserverNav());
  document.addEventListener("astro:page-load", () => ObserverNav());
}
