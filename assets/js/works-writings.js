// --- Fade-in scroll effect ---
// find elements
const faders = document.querySelectorAll(".fade-target");
const appearOptions = { threshold: 0.2, rootMargin: "0px 0px -50px 0px" };

const appearOnScroll = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // add Tailwind utility classes to animate into view
      entry.target.classList.remove("opacity-0", "translate-y-10");
      entry.target.classList.add("opacity-100", "translate-y-0");
    } else {
      entry.target.classList.add("opacity-0", "translate-y-10");
      entry.target.classList.remove("opacity-100", "translate-y-0");
    }
  });
}, appearOptions);

faders.forEach((fader) => appearOnScroll.observe(fader));

// --- Modal Functionality ---
const modal = document.getElementById("workModal");
const modalContent = document.getElementById("modalContent");
const closeModalBtn = document.getElementById("closeModal");

// Listen to all Read More buttons
document.querySelectorAll(".card-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    // Populate modal content
    document.getElementById("modalTitle").textContent = btn.dataset.title || "";
    document.getElementById("modalSubtitle").textContent =
      btn.dataset.subtitle || "";
    document.getElementById("modalDescription").textContent =
      btn.dataset.description || "";

    // Add modal image (only if provided)
    const modalImage = document.getElementById("modalImage");
    if (btn.dataset.image) {
      modalImage.style.backgroundImage = `url('${btn.dataset.image}')`;
    } else {
      modalImage.style.backgroundImage =
        "url('assets/imgs/works_writings/placeholder-image.jpg')";
    }

    // Show modal (toggle Tailwind utility classes)
    modal.classList.remove("pointer-events-none", "opacity-0");
    modal.classList.add("opacity-100");
    modalContent.classList.remove("scale-95", "translate-y-5", "opacity-0");
    modalContent.classList.add("scale-100", "translate-y-0", "opacity-100");

    // Add a fake history state (for Android back button)
    history.pushState({ modalOpen: true }, "");
  });
});

// Close Modal function
function closeModal() {
  modal.classList.replace("opacity-100", "opacity-0");
  // hide interactions
  modal.classList.add("pointer-events-none");

  modalContent.classList.replace("scale-100", "scale-95");
  modalContent.classList.replace("translate-y-0", "translate-y-5");
  modalContent.classList.replace("opacity-100", "opacity-0");

  // remove the fake history state if any
  if (history.state && history.state.modalOpen) {
    history.back();
  }
}

// --- Close Modal Events ---
closeModalBtn.addEventListener("click", closeModal);

// Click outside modal to close
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

// ESC key close
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modal.classList.contains("pointer-events-none")) {
    closeModal();
  }
});

// Android “Back” button close (popstate)
window.addEventListener("popstate", () => {
  if (!modal.classList.contains("pointer-events-none")) {
    closeModal();
  }
});

// QUOTE Section animations (staggered)
document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector("#quote-section");
  const lines = section.querySelectorAll(".quote-line");
  const quoteMark = section.querySelector("span");
  const subtext = section.querySelector(".quote-subtext");
  const goldLine = section.querySelector(".gold-line");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Animate quote mark
          quoteMark.classList.add("fade-up");
          quoteMark.style.animationDelay = "0.2s";

          // Animate each line with staggered delay
          lines.forEach((line, index) => {
            line.classList.add("fade-up");
            line.style.animationDelay = `${0.4 + index * 0.4}s`;
          });

          // Golden line after text
          goldLine.classList.add("line-animate");
          goldLine.style.animationDelay = "1.8s";

          // Subtext fade after line
          subtext.classList.add("fade-up");
          subtext.style.animationDelay = "2.2s";

          observer.unobserve(section);
        }
      });
    },
    { threshold: 0.3 }
  );

  observer.observe(section);
});
