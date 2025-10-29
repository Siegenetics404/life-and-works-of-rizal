document.addEventListener("DOMContentLoaded", () => {
  const nav = document.getElementById("timeline-nav");
  const links = document.querySelectorAll(".timeline-link");
  const sections = Array.from(links).map(link =>
    document.querySelector(link.getAttribute("href"))
  );
  const banner = document.querySelector("section.relative");
  const footer = document.querySelector('[data-include="components/footer.html"]');
  const modal = document.getElementById("modal"); // your modal element

  const activateLink = (index) => {
    links.forEach(link => {
      link.classList.remove("text-[#2E5339]", "translate-x-2", "font-semibold", "bg-white/20");
      link.classList.add("text-gray-400");
    });
    const active = links[index];
    active.classList.add("text-[#327154]", "translate-x-2", "font-semibold", "rounded-lg", "px-2", "py-1");
    active.classList.remove("text-gray-400");
  };

  const isInView = (element) => {
    if (!element) return false;
    const rect = element.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0;
  };

  const updateNavVisibility = () => {
    // If modal is open, do not hide nav
    const modalOpen = modal && !modal.classList.contains("hidden");
    if (modalOpen) {
      nav.classList.add("opacity-100", "translate-x-0");
      nav.classList.remove("-translate-x-24", "opacity-0");
      return; // skip banner/footer hiding while modal is open
    }

    // Normal scroll-based hiding
    if (isInView(banner) || isInView(footer)) {
      nav.classList.add("-translate-x-24", "opacity-0");
      nav.classList.remove("opacity-100", "translate-x-0");
    } else {
      nav.classList.remove("-translate-x-24", "opacity-0");
      nav.classList.add("opacity-100", "translate-x-0");
    }
  };

  window.addEventListener("scroll", () => {
    const scrollPos = window.scrollY + window.innerHeight / 3;

    // Highlight current section
    sections.forEach((section, i) => {
      if (section.offsetTop <= scrollPos && section.offsetTop + section.offsetHeight > scrollPos) {
        activateLink(i);
      }
    });

    updateNavVisibility();
  });

  // Update nav visibility on page load
  updateNavVisibility();
});
