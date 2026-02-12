import { $, $$ } from "@src/TypeScript/dom-selector";

function activeCarousel(selector = ".slide", interval = 4000) {
  const slides = Array.from($$<HTMLImageElement>(selector));

  if (!slides.length) return;

  let current = 0;
  let timer: number | undefined;

  const show = (index: number) => {
    slides.forEach((slide, i) => {
      slide.classList.toggle("is-active", i === index);
      slide.classList.toggle("opacity-100", i === index);
    });
  };

  const start = () => {
    stop();
    timer = window.setInterval(() => {
      current = (current + 1) % slides.length;
      show(current);
    }, interval);
  };

  const stop = () => {
    if (timer) {
      clearInterval(timer);
      timer = undefined;
    }
  };

  show(current);
  start();
}

export function initCarousel(selector = ".slide", interval = 4000) {
  document.addEventListener("DOMContentLoaded", () =>
    activeCarousel(selector, interval),
  );

  document.addEventListener("astro:page-load", () =>
    activeCarousel(selector, interval),
  );
}
