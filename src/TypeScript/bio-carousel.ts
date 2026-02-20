import { $, $$ } from "@src/TypeScript/dom-selector";

function initBioCarousel() {
  const track = $(".bio-track") as HTMLElement;
  if (!track) return;

  const slides = Array.from(track.children);
  const nextBtn = $(".bio-next") as HTMLButtonElement;
  const prevBtn = $(".bio-prev") as HTMLButtonElement;
  const dotsContainer = $(".bio-dots") as HTMLElement;

  let current = 0;

  dotsContainer.innerHTML = "";

  slides.forEach((_, i) => {
    const dot = document.createElement("button");

    dot.className =
      "dot w-3 h-3 rounded-full bg-black/50 transition-all duration-100 hover:cursor-pointer hover:scale-115 border";

    dot.addEventListener("click", () => updateCarousel(i));

    dotsContainer.appendChild(dot);
  });

  const dots = $$(".dot");

  function updateButtons() {
    if (!prevBtn || !nextBtn) return;

    const isFirst = current === 0;
    const isLast = current === slides.length - 1;

    prevBtn.disabled = isFirst;
    nextBtn.disabled = isLast;

    prevBtn.classList.toggle("opacity-40", isFirst);
    prevBtn.classList.toggle("cursor-not-allowed", isFirst);
    prevBtn.classList.toggle("pointer-events-none", isFirst);

    nextBtn.classList.toggle("opacity-40", isLast);
    nextBtn.classList.toggle("cursor-not-allowed", isLast);
    nextBtn.classList.toggle("pointer-events-none", isLast);
  }

  function updateCarousel(index: number) {
    current = index;

    track.style.transform = `translateX(-${current * 100}%)`;

    dots.forEach((dot, i) => {
      const isActive = i === current;

      dot.classList.toggle("bg-white", isActive);
      dot.classList.toggle("border-black", isActive);
      dot.classList.toggle("bg-black/50", !isActive);
      dot.classList.toggle("border-white", !isActive);
    });

    updateButtons();
  }

  nextBtn?.addEventListener("click", () => {
    if (current >= slides.length - 1) return;
    updateCarousel(current + 1);
  });

  prevBtn?.addEventListener("click", () => {
    if (current <= 0) return;
    updateCarousel(current - 1);
  });

  updateCarousel(0);
}

export function initBio() {
  document.addEventListener("DOMContentLoaded", initBioCarousel);
  document.addEventListener("astro:page-load", initBioCarousel);
}
