import Lenis from "lenis";
import AOS from "aos";

const toggleBtn = document.getElementById("menu-toggle");
const menu = document.getElementById("mobile-menu");

let isOpen = false;
menu.style.maxHeight = menu.scrollHeight + "px";

toggleBtn.addEventListener("click", () => {
  if (isOpen) {
    // close
    menu.style.height = "100%";
  } else {
    // open - calculate scroll height
    menu.style.height = "0";
  }
  isOpen = !isOpen;
});

// Optional: auto-collapse on window resize to desktop
window.addEventListener("resize", () => {
  if (window.innerWidth >= 768) {
    menu.style.height = "0%";
    isOpen = false;
  }
});

document.querySelector("header").style.marginTop =
  document.querySelector("nav").clientHeight + "px";

AOS.init({ once: true });

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth easing
  smooth: true,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

document.addEventListener("DOMContentLoaded", function () {
  const tabButtons = document.querySelectorAll("[data-tab-button]");
  const tabContents = document.querySelectorAll("[data-tab-content]");

  // console.log();
  tabButtons[0].classList.add("bg-gray-100");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.getAttribute("data-tab-button");

      // Remove active styles
      tabButtons.forEach((btn) => btn.classList.remove("bg-gray-100"));
      tabContents.forEach((content) => content.classList.add("hidden"));

      // Add active styles
      button.classList.add("bg-gray-100");
      document
        .querySelector(`[data-tab-content="${target}"]`)
        .classList.remove("hidden");
    });
  });
});

document.getElementById("year").innerText = new Date().getFullYear();
