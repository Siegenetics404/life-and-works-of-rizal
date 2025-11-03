// --- Fade-in scroll effect ---
const faders = document.querySelectorAll(".fade-target");
const appearOptions = { threshold: 0.2, rootMargin: "0px 0px -50px 0px" };

const appearOnScroll = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.remove("opacity-0", "translate-y-10");
      entry.target.classList.add("opacity-100", "translate-y-0");
    } else {
      entry.target.classList.add("opacity-0", "translate-y-10");
      entry.target.classList.remove("opacity-100", "translate-y-0");
    }
  });
}, appearOptions);

faders.forEach((fader) => appearOnScroll.observe(fader));

// --- Shared Work Modal (Noli, Fili, Makamisa, Mi Último Adiós) ---
const modal = document.getElementById("workModal");
const modalContent = document.getElementById("modalContent");
const closeModalBtn = document.getElementById("closeModal");
const modalTitle = document.getElementById("modalTitle");
const modalSubtitle = document.getElementById("modalSubtitle");
const modalDescription = document.getElementById("modalBody");
const modalImage = document.getElementById("modalImage");

// --- Modal Content Database ---
const WORK_CONTENT = {
  noli: {
    title: "Noli Me Tángere",
    subtitle: "The Social Cancer — 1887",
    description: `
      <h4 class="font-semibold text-[#1B4332] text-base mt-3 mb-1">Inspiration</h4>
      <p>Rizal began writing <em>Noli Me Tángere</em> in 1884 while studying medicine in Madrid, inspired by Harriet Beecher Stowe’s <em>Uncle Tom’s Cabin</em>. Like it, he sought to expose injustices and corruption under Spanish rule.</p>

      <h4 class="font-semibold text-[#1B4332] text-base mt-3 mb-1">Writing Process</h4>
      <p>Written across Europe—Madrid, Paris, and finished in Berlin (1886)—Rizal endured hunger and cold while refining his manuscript.</p>

      <h4 class="font-semibold text-[#1B4332] text-base mt-3 mb-1">Publication</h4>
      <p>Nearly unpublished due to lack of funds until Dr. Maximo Viola lent ₱5,300 for 2,000 copies in 1887.</p>

      <h4 class="font-semibold text-[#1B4332] text-base mt-3 mb-1">First Recipients</h4>
      <p>Sent to friends like Ferdinand Blumentritt and reformists—sparking nationalist discussions that fueled reform movements.</p>
    `,
    image: "assets/imgs/works_writings/placeholder-image.jpg",
  },
  fili: {
    title: "El Filibusterismo",
    subtitle: "The Reign of Greed — 1891",
    description: `
      <h4 class="font-semibold text-[#1B4332] text-base mt-3 mb-1">Inspiration</h4>
      <p>Written as a darker sequel to <em>Noli</em>, inspired by Rizal’s disillusionment with failed reforms and continued oppression.</p>

      <h4 class="font-semibold text-[#1B4332] text-base mt-3 mb-1">Writing Process</h4>
      <p>Begun in London (1888), continued in Brussels and Ghent. The story follows Simoun— Ibarra reborn—planning a revolution to expose the danger of vengeance.</p>

      <h4 class="font-semibold text-[#1B4332] text-base mt-3 mb-1">Publication</h4>
      <p>Printed in Ghent, Belgium (1891) with help from Valentin Ventura, who funded the last printing stage.</p>

      <h4 class="font-semibold text-[#1B4332] text-base mt-3 mb-1">Dedication & Recipients</h4>
      <p>Dedicated to GOMBURZA—Fathers Gómez, Burgos & Zamora—and sent to friends like Blumentritt and Ventura who praised its emotional depth.</p>
    `,
    image: "assets/imgs/works_writings/placeholder-image.jpg",
  },
  makamisa: {
    title: "Makamisa",
    subtitle: "Rizal’s Unfinished Novel",
    image: "assets/imgs/works_writings/placeholder-image.jpg",
    description: `
      <h4 class="font-semibold text-[#1B4332]">Background</h4>
      <p><em>Makamisa</em> was intended to be a follow-up to <em>El Filibusterismo</em>. Written in Tagalog, it offered a lighter, more humorous depiction of Filipino society compared to Rizal’s earlier works.</p>
      
      <h4 class="font-semibold text-[#1B4332]">Plot Overview</h4>
      <p>The novel begins with a church scene where the priest delays Mass, irritating the townspeople. Through satire, Rizal exposed the hypocrisy and superstition of both clergy and townsfolk.</p>
      
      <h4 class="font-semibold text-[#1B4332]">Themes</h4>
      <p><em>Makamisa</em> continues Rizal’s critique of colonial mentality, ignorance, and blind obedience to authority, this time with humor and local color.</p>
      
      <h4 class="font-semibold text-[#1B4332]">Unfinished Work</h4>
      <p>Rizal left the manuscript incomplete. Only the first few chapters survive today, showcasing his mastery of the Tagalog language and his evolving literary style.</p>
      
      <h4 class="font-semibold text-[#1B4332]">Significance</h4>
      <p>Though unfinished, <em>Makamisa</em> reflects Rizal’s continued desire to connect with the common Filipino reader and to portray society in its own language.</p>
    `,
  },
};

// --- Shared Work Modal (Noli, Fili, etc.) ---
document.querySelectorAll(".card-btn[data-id]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const id = btn.dataset.id;
    const content = WORK_CONTENT[id];
    if (!content) return;

    modalTitle.textContent = content.title;
    modalSubtitle.textContent = content.subtitle;
    modalBody.innerHTML = content.description; // supports multi-paragraph HTML
    modalImage.style.backgroundImage = `url('${content.image}')`;

    // fade in the backdrop
    modal.classList.remove("pointer-events-none", "opacity-0");
    modal.classList.add("opacity-100");

    // restart modal animation cleanly
    modalContent.classList.remove("animate-work-modal");
    void modalContent.offsetWidth; // force reflow
    setTimeout(() => {
      modalContent.classList.add("animate-work-modal");
    }, 50);

    // retrigger text fade-ups inside modal
    setTimeout(() => {
      const texts = modalContent.querySelectorAll(".text-fade-up");
      texts.forEach((el) => {
        el.style.animation = "none";
        el.offsetHeight;
        el.style.animation = "";
      });
    }, 150);

    document.body.classList.add("overflow-hidden"); // lock background scroll
    history.pushState({ modalOpen: true }, "");
  });
});

// --- Close Modal ---
function closeModal() {
  modal.classList.replace("opacity-100", "opacity-0");
  modal.classList.add("pointer-events-none");
  modalContent.classList.remove("animate-work-modal");
  document.body.classList.remove("overflow-hidden");

  if (history.state && history.state.modalOpen) history.back();
}

closeModalBtn.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !modal.classList.contains("pointer-events-none"))
    closeModal();
});
window.addEventListener("popstate", () => {
  if (!modal.classList.contains("pointer-events-none")) closeModal();
});

// --- QUOTE Section animations (staggered) ---
document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector("#quote-section");
  if (!section) return;

  const lines = section.querySelectorAll(".quote-line");
  const quoteMark = section.querySelector("span");
  const subtext = section.querySelector(".quote-subtext");
  const goldLine = section.querySelector(".gold-line");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          quoteMark.classList.add("fade-up");
          quoteMark.style.animationDelay = "0.2s";

          lines.forEach((line, index) => {
            line.classList.add("fade-up");
            line.style.animationDelay = `${0.4 + index * 0.4}s`;
          });

          goldLine.classList.add("line-animate");
          goldLine.style.animationDelay = "1.8s";

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

// -------------------------------------------------
// Poems & Letters Modal with Auto-Sliding Carousel
// -------------------------------------------------
const poemsModal = document.getElementById("poemsModal");
const poemsModalContent = document.getElementById("poemsModalContent");
const openPoemsBtn = document.getElementById("openPoemsBtn");
const closePoemsBtn = document.getElementById("closePoemsBtn");
const slidesContainer = document.getElementById("slides");
const dotsContainer = document.getElementById("carouselDots");
const prevBtn = document.getElementById("prevSlide");
const nextBtn = document.getElementById("nextSlide");
const slideDescription = document.getElementById("slideDescription");

const CAROUSEL_SLIDES = [
  {
    title: "Mi Último Adiós",
    subtitle: "My Last Farewell",
    content:
      "Written the night before his execution (Dec 29, 1896). Expresses Rizal's love for his country and his peaceful acceptance of death. Became the symbol of Filipino patriotism and sacrifice.",
  },
  {
    title: "Sa Aking Mga Kabata",
    subtitle: "To My Fellow Youth",
    content:
      "Encourages Filipinos to love their own language. Highlights early signs of nationalism and pride in Filipino identity.",
  },
  {
    title: "A La Juventud Filipina",
    subtitle: "To the Filipino Youth",
    content:
      "Urges the youth to use their talents for the country's progress. Declares youth as the 'hope of the fatherland.'",
  },
  {
    title: "To the Flowers of Heidelberg",
    subtitle: "Reflection of Homesickness",
    content:
      "Expresses homesickness and love for the Philippines while abroad in Germany, comparing flowers to the beauty of his homeland.",
  },
  {
    title: "My Retreat (Mi Retiro)",
    subtitle: "Peace in Exile",
    content:
      "Written during exile in Dapitan. Shows contentment and love for simple life, nature, and quiet service to country.",
  },
  {
    title: "Letter to the Young Women of Malolos",
    subtitle: "Advocating Women’s Rights",
    content:
      "Praises women seeking education and urges them to be strong and morally upright — a foundation for Filipino feminism.",
  },
  {
    title: "Letters to Ferdinand Blumentritt",
    subtitle: "Intellectual Exchange",
    content:
      "A series of letters with his Austrian friend discussing reforms, culture, and the Philippines’ future.",
  },
  {
    title: "Letter to His Family",
    subtitle: "A Son’s Love",
    content:
      "Warm letters sharing hopes and struggles, showing his devotion as a son and brother.",
  },
  {
    title: "Letters to Fr. Pablo Pastells",
    subtitle: "Faith and Reason",
    content:
      "Philosophical exchanges debating faith, reason, and morality during Rizal’s exile in Dapitan.",
  },
  {
    title: "Farewell Letter to His Family",
    subtitle: "Before Execution",
    content:
      "Written in Fort Santiago, full of love and courage, asking for forgiveness and blessings before his death.",
  },
];

let currentSlide = 0;
let autoPlayTimer = null;
const SLIDE_INTERVAL = 5000;

// Build carousel
function buildCarousel() {
  slidesContainer.innerHTML = "";
  dotsContainer.innerHTML = "";

  CAROUSEL_SLIDES.forEach((slide, index) => {
    const slideEl = document.createElement("div");
    slideEl.className =
      "min-w-full shrink-0 flex flex-col items-center justify-center text-center px-6 md:px-10 opacity-0 scale-95 transition-all duration-700 ease-[cubic-bezier(0.25,0.8,0.25,1)]";
    slideEl.setAttribute("data-index", index);
    slideEl.innerHTML = `
  <h4 class="text-2xl md:text-3xl font-[Playfair_Display] font-bold text-[#1B4332] mb-2 text-fade-up delay-1">${slide.title}</h4>
  <p class="italic text-[#2E5339]/80 mb-4 text-fade-up delay-2">${slide.subtitle}</p>
  <p class="text-gray-700 text-sm leading-relaxed max-w-xl text-fade-up delay-3">${slide.content}</p>
`;
    slidesContainer.appendChild(slideEl);

    const dot = document.createElement("button");
    dot.className =
      "w-3 h-3 rounded-full bg-gray-300 hover:bg-[#1B4332]/60 transition-all duration-300";
    dot.dataset.index = index;
    dot.addEventListener("click", () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });

  showSlide(0, false);
}

// Show slide
function showSlide(index, animate = true) {
  const slides = slidesContainer.querySelectorAll("[data-index]");
  const dots = dotsContainer.querySelectorAll("[data-index]");
  const total = slides.length;

  currentSlide = (index + total) % total;

  slides.forEach((slide, i) => {
    if (i === currentSlide) {
      slide.classList.remove("opacity-0", "scale-95");
      slide.classList.add("opacity-100", "scale-100", "slide-fade");

      // Add a short delay before retriggering text animation
      setTimeout(() => {
        const texts = slide.querySelectorAll(".text-fade-up");
        texts.forEach((el) => {
          el.style.animation = "none";
          el.offsetHeight; // reflow to reset animation
          el.style.animation = "";
        });
      }, 100);
    } else {
      slide.classList.remove("opacity-100", "scale-100", "slide-fade");
      slide.classList.add("opacity-0", "scale-95");
    }
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle("bg-[#1B4332]", i === currentSlide);
    dot.classList.toggle("bg-gray-300", i !== currentSlide);
  });

  if (animate) {
    slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
  }
}

// Slide navigation
function nextSlide() {
  showSlide(currentSlide + 1);
}
function prevSlideFn() {
  showSlide(currentSlide - 1);
}
function goToSlide(i) {
  showSlide(i);
  resetTimer();
}

// Auto-play
function startAutoPlay() {
  stopAutoPlay();
  autoPlayTimer = setInterval(nextSlide, SLIDE_INTERVAL);
}
function stopAutoPlay() {
  if (autoPlayTimer) clearInterval(autoPlayTimer);
}
function resetTimer() {
  stopAutoPlay();
  startAutoPlay();
}

// Open modal
openPoemsBtn.addEventListener("click", () => {
  buildCarousel();
  showSlide(0);
  startAutoPlay();

  poemsModal.classList.remove("pointer-events-none", "opacity-0");
  poemsModal.classList.add("opacity-100");
  poemsModalContent.classList.add("animate-modal");

  history.pushState({ poemsOpen: true }, "");
});

// Close modal
function closePoems() {
  poemsModal.classList.replace("opacity-100", "opacity-0");
  poemsModal.classList.add("pointer-events-none");
  poemsModalContent.classList.remove("animate-modal");

  stopAutoPlay();
  if (history.state && history.state.poemsOpen) history.back();
}

// Event listeners
closePoemsBtn.addEventListener("click", closePoems);
poemsModal.addEventListener("click", (e) => {
  if (e.target === poemsModal) closePoems();
});
document.addEventListener("keydown", (e) => {
  if (
    e.key === "Escape" &&
    !poemsModal.classList.contains("pointer-events-none")
  )
    closePoems();
});
window.addEventListener("popstate", () => {
  if (!poemsModal.classList.contains("pointer-events-none")) closePoems();
});
nextBtn.addEventListener("click", () => {
  nextSlide();
  resetTimer();
});
prevBtn.addEventListener("click", () => {
  prevSlideFn();
  resetTimer();
});
poemsModalContent.addEventListener("mouseenter", stopAutoPlay);
poemsModalContent.addEventListener("mouseleave", startAutoPlay);
