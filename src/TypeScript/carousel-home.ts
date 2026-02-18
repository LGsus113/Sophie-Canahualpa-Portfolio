function setupCarousel(container: HTMLElement) {
  const slides = container.querySelectorAll<HTMLElement>(".carousel-slide");

  const interval = Number(container.getAttribute("data-interval")) || 4000;
  const pauseOnHover = container.getAttribute("data-pause-hover") === "true";

  if (!slides.length) return;

  let current = 0;
  let timer: number | null = null;
  let isVisible = true;
  let isHovered = false;

  const start = () => {
    if (timer || !isVisible || (pauseOnHover && isHovered)) return;

    timer = window.setInterval(() => {
      slides[current].classList.remove("is-active");
      current = (current + 1) % slides.length;
      slides[current].classList.add("is-active");
    }, interval);
  };

  const stop = () => {
    if (timer !== null) {
      clearInterval(timer);
      timer = null;
    }
  };

  if (pauseOnHover) {
    container.addEventListener("mouseenter", () => {
      isHovered = true;
      stop();
    });

    container.addEventListener("mouseleave", () => {
      isHovered = false;
      start();
    });
  }

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      stop();
    } else {
      start();
    }
  });

  const observer = new IntersectionObserver(
    ([entry]) => {
      isVisible = entry.isIntersecting;

      if (isVisible) {
        start();
      } else {
        stop();
      }
    },
    { threshold: 0.1 },
  );

  observer.observe(container);

  start();
}

function initAllCarousels() {
  const containers = document.querySelectorAll<HTMLElement>("[data-carousel]");

  containers.forEach(setupCarousel);
}

export function initCarousel() {
  document.addEventListener("DOMContentLoaded", initAllCarousels);
  document.addEventListener("astro:page-load", initAllCarousels);
}
