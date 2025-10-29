import { cards, familyCards, siblingsCards, extendedFamilyCard, loversCard, foreignCard, mentorCard, alliesCard, oppressorsCard } from "./cards-data.js";

document.addEventListener("DOMContentLoaded", async () => {
  // Load modal and card template
  const modalRes = await fetch("components/modal.html");
  document.getElementById("modal-container").innerHTML = await modalRes.text();
  const cardTemplate = await (await fetch("components/card.html")).text();

  // (Historical Moments)
  const gallery = document.getElementById("gallery-container");
  cards.forEach((card) => {
    const cardHTML = cardTemplate
      .replaceAll("{title}", card.title)
      .replaceAll("{desc}", card.desc)
      .replaceAll("{short}", card.short)
      .replaceAll("{src}", card.src)
      .replaceAll("{video}", card.video || "");
    gallery.insertAdjacentHTML("beforeend", cardHTML);
  });

  // (Family of Rizal)
  const familyGallery = document.getElementById("family-gallery-container");
  familyCards.forEach((card) => {
    const cardHTML = cardTemplate
      .replaceAll("{title}", card.title)
      .replaceAll("{desc}", card.desc)
      .replaceAll("{short}", card.short)
      .replaceAll("{src}", card.src)
      .replaceAll("{video}", card.video || "");
    familyGallery.insertAdjacentHTML("beforeend", cardHTML);
  });

  // (siblings of rizal)
  const siblingsGallery = document.getElementById("siblings-gallery-container");
  siblingsCards.forEach((card) => {
    const cardHTML = cardTemplate
      .replaceAll("{title}", card.title)
      .replaceAll("{desc}", card.desc)
      .replaceAll("{short}", card.short)
      .replaceAll("{src}", card.src)
      .replaceAll("{video}", card.video || "");
    siblingsGallery.insertAdjacentHTML("beforeend", cardHTML);
  });

  const extendedFamilyGallery = document.getElementById("extended-family");
  extendedFamilyCard.forEach((card) => {
    const cardHTML = cardTemplate
      .replaceAll("{title}", card.title)
      .replaceAll("{desc}", card.desc)
      .replaceAll("{short}", card.short)
      .replaceAll("{src}", card.src)
      .replaceAll("{video}", card.video || "");
    extendedFamilyGallery.insertAdjacentHTML("beforeend", cardHTML);
  });

  const lovers = document.getElementById("romantic-relationship");
  loversCard.forEach((card) => {
    const cardHTML = cardTemplate
      .replaceAll("{title}", card.title)
      .replaceAll("{desc}", card.desc)
      .replaceAll("{short}", card.short)
      .replaceAll("{src}", card.src)
      .replaceAll("{video}", card.video || "");
    lovers.insertAdjacentHTML("beforeend", cardHTML);
  });

  const Encounters = document.getElementById("Encounters");
  foreignCard.forEach((card) => {
    const cardHTML = cardTemplate
      .replaceAll("{title}", card.title)
      .replaceAll("{desc}", card.desc)
      .replaceAll("{short}", card.short)
      .replaceAll("{src}", card.src)
      .replaceAll("{video}", card.video || "");
    Encounters.insertAdjacentHTML("beforeend", cardHTML);
  });

  const mentor = document.getElementById("teacher-mentor");
  mentorCard.forEach((card) => {
    const cardHTML = cardTemplate
      .replaceAll("{title}", card.title)
      .replaceAll("{desc}", card.desc)
      .replaceAll("{short}", card.short)
      .replaceAll("{src}", card.src)
      .replaceAll("{video}", card.video || "");
    mentor.insertAdjacentHTML("beforeend", cardHTML);
  });

  const allies = document.getElementById("Allies");
  alliesCard.forEach((card) => {
    const cardHTML = cardTemplate
      .replaceAll("{title}", card.title)
      .replaceAll("{desc}", card.desc)
      .replaceAll("{short}", card.short)
      .replaceAll("{src}", card.src)
      .replaceAll("{video}", card.video || "");
    allies.insertAdjacentHTML("beforeend", cardHTML);
  });

  const enemies = document.getElementById("Enemies");
  oppressorsCard.forEach((card) => {
    const cardHTML = cardTemplate
      .replaceAll("{title}", card.title)
      .replaceAll("{desc}", card.desc)
      .replaceAll("{short}", card.short)
      .replaceAll("{src}", card.src)
      .replaceAll("{video}", card.video || "");
    enemies.insertAdjacentHTML("beforeend", cardHTML);
  });

  // Initialize modal for all cards
  initializeModal();
});

function initializeModal() {
  const nav = document.getElementById("timeline-nav");

  // Save original nav styles
  const originalNav = {
    background: nav.style.backgroundColor,
    border: nav.style.borderColor,
    links: Array.from(nav.querySelectorAll("a")).map(link => ({
      color: link.style.color,
    })),
  };

  document.querySelectorAll("[data-src]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const src = btn.getAttribute("data-src");
      const title = btn.getAttribute("data-title");
      const desc = btn.getAttribute("data-desc");
      const video = btn.getAttribute("data-video");

      // Set modal content
      document.getElementById("modal-title").textContent = title;
      document.getElementById("modal-desc").textContent = desc;
      const storyPanel = document.getElementById("story-text");
      if (storyPanel) storyPanel.textContent = desc;

      const imgWrapper = document.getElementById("modal-img-wrapper");
      const vidWrapper = document.getElementById("modal-video-wrapper");
      const modalImg = document.getElementById("modal-img");
      const modalVid = document.getElementById("modal-video");

      // Handle video or image
      if (video && video.trim() !== "") {
        imgWrapper.classList.add("hidden");
        vidWrapper.classList.remove("hidden");
        const loadingMsg = document.getElementById("video-loading");
        loadingMsg.classList.remove("hidden");

        const embedLink = video.includes("youtube.com/watch")
          ? video.replace("watch?v=", "embed/")
          : video;

        modalVid.src = `${embedLink}?autoplay=1&mute=0&enablejsapi=1`;
        modalVid.onload = () => loadingMsg.classList.add("hidden");
      } else {
        vidWrapper.classList.add("hidden");
        imgWrapper.classList.remove("hidden");
        modalImg.src = src;
        modalImg.alt = title;
        modalVid.src = "";
      }

      // Show modal
      const modal = document.getElementById("modal");
      modal.classList.remove("hidden");
      modal.classList.add("flex");

      // Make nav fully transparent against backdrop
      if (nav) {
        nav.style.backgroundColor = "transparent";
        nav.style.borderColor = "transparent";
        nav.querySelectorAll("a").forEach(link => {
          link.style.color = "transparent"; // text becomes invisible
        });
      }
    });
  });

  // Close modal
  document.getElementById("modal-close").addEventListener("click", () => {
    const modal = document.getElementById("modal");
    modal.classList.remove("flex");
    modal.classList.add("hidden");
    document.getElementById("modal-video").src = "";

    // Restore original nav styles
    if (nav) {
      nav.style.backgroundColor = originalNav.background;
      nav.style.borderColor = originalNav.border;
      nav.querySelectorAll("a").forEach((link, i) => {
        link.style.color = originalNav.links[i].color;
      });
    }
  });

  // Click backdrop to close
  document.getElementById("backdrop").addEventListener("click", () => {
    document.getElementById("modal-close").click();
  });

  // Escape key closes modal
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") document.getElementById("modal-close").click();
  });
}

