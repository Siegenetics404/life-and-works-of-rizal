document.addEventListener("DOMContentLoaded", async () => {
  const modalRes = await fetch("components/modal.html");
  document.getElementById("modal-container").innerHTML = await modalRes.text();
  const cardTemplate = await (await fetch("components/card.html")).text();

  const cards = [
    {
        title: "Childhood",
        desc: "Gusto ko na sanang mag subong kasu hindi ko kaya baka sabihin mong hangang friends lng tayu ehh hahaha",
        short: "Born in 1861, young José loved books and learning.",
        src: "assets/gallery/1.jpg",
        video: "https://www.youtube.com/watch?v=vzqiU8HoxFc",
    },
    {
      title: "Hiel Hitler",
      desc: "HIEEELLL SSSIIIIEEEGGEEEEEEEE",
      short: "He studied to become a doctor and learn about the world.",
      src: "assets/gallery/2.jpg",
      video: "https://www.youtube.com/watch?v=1t7SYmGC_Lo",
    },
    {
      title: "Noli Me Tangere",
      desc: "Rizal wrote 'Noli Me Tangere', a book that showed problems in society. Many people read it and it inspired change.",
      short: "A book he wrote to tell the truth about society back then.",
      src: "assets/gallery/3.jpg",
      video: "",
    },
    {
      title: "Writing Years",
      desc: "During his time in Europe, Rizal wrote essays, letters, and poems reflecting his love for his homeland.",
      short: "His pen was his greatest weapon.",
      src: "assets/gallery/jose-rizal-writing.jpg",
      video: "",
    },
    {
      title: "Patrick years",
      desc: "During his time in Europe, Rizal wrote essays, letters, and poems reflecting his love for his homeland.",
      short: "His pen was his greatest weapon.",
      src: "assets/gallery/4.jpg",
      video: "",
    },
    {
      title: "Noli Me Tangere",
      desc: "Rizal wrote 'Noli Me Tangere', a book that showed problems in society. Many people read it and it inspired change.",
      short: "A book he wrote to tell the truth about society back then.",
      src: "assets/gallery/3.jpg",
      video: "",
    },
    {
      title: "Writing Years",
      desc: "During his time in Europe, Rizal wrote essays, letters, and poems reflecting his love for his homeland.",
      short: "His pen was his greatest weapon.",
      src: "assets/gallery/jose-rizal-writing.jpg",
      video: "",
    },
  ];

  // Generate cards dynamically
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

  // Activate modal logic
  initializeModal();
});

function initializeModal() {
  document.querySelectorAll("[data-src]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const src = btn.getAttribute("data-src");
      const title = btn.getAttribute("data-title");
      const desc = btn.getAttribute("data-desc");
      const video = btn.getAttribute("data-video");

      // Update title & description
      document.getElementById("modal-title").textContent = title;
      document.getElementById("modal-desc").textContent = desc;

        // 🟢 Update the "Quick Recap" story panel
        const storyPanel = document.getElementById("story-text");
        if (storyPanel) {
            storyPanel.textContent = desc;
        } 


      const imgWrapper = document.getElementById("modal-img-wrapper");
      const vidWrapper = document.getElementById("modal-video-wrapper");
      const modalImg = document.getElementById("modal-img");
      const modalVid = document.getElementById("modal-video");

      if (video && video.trim() !== "") {
        // Show video
        imgWrapper.classList.add("hidden");
        vidWrapper.classList.remove("hidden");

        // Show loading message
        const loadingMsg = document.getElementById("video-loading");
        loadingMsg.classList.remove("hidden");

        // Convert normal YouTube link to embed format
        const embedLink = video.includes("youtube.com/watch")
            ? video.replace("watch?v=", "embed/")
            : video;

        // Set video source with autoplay
        modalVid.src = `${embedLink}?autoplay=1&mute=0&enablejsapi=1`;

        // When the video finishes loading (iframe onload)
        modalVid.onload = () => {
            loadingMsg.classList.add("hidden");
        };
      } else {
        // Show image
        vidWrapper.classList.add("hidden");
        imgWrapper.classList.remove("hidden");

        modalImg.src = src;
        modalImg.alt = title;
        modalVid.src = ""; // stop any previous video
      }

      document.getElementById("modal").classList.remove("hidden");
      document.getElementById("modal").classList.add("flex");
    });
  });

  document.getElementById("modal-close").addEventListener("click", () => {
    document.getElementById("modal").classList.remove("flex");
    document.getElementById("modal").classList.add("hidden");
    document.getElementById("modal-video").src = ""; // stop video
  });

  document.getElementById("backdrop").addEventListener("click", () => {
    document.getElementById("modal-close").click();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") document.getElementById("modal-close").click();
  });
}

