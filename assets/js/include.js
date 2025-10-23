function includeHTML() {
  const includes = document.querySelectorAll("[data-include]");
  includes.forEach((el) => {
    const file = el.getAttribute("data-include");
    fetch(file)
      .then((response) => response.text())
      .then((data) => {
        el.innerHTML = data;

        // After header is loaded
        if (file.includes("header.html")) {
          highlightActiveLink();
          initMobileMenu(); // initialize hamburger behavior here
        }
      });
  });
}

function highlightActiveLink() {
  const currentPage = window.location.pathname.split("/").pop(); // e.g., biography.html
  const links = document.querySelectorAll(".nav-link");

  links.forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPage) {
      link.classList.add("active");
    }
  });
}

// This runs after header is loaded
function initMobileMenu() {
  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const hamburgerIcon = document.getElementById("hamburger-icon");
  const closeIcon = document.getElementById("close-icon");

  if (!menuBtn || !mobileMenu) return; // Safety check

  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
    hamburgerIcon.classList.toggle("hidden");
    closeIcon.classList.toggle("hidden");
  });
}

document.addEventListener("DOMContentLoaded", includeHTML);
