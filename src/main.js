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

function createScrollDirectionTracker() {
  let scrollDirection = "up";
  let lastScrollY = 0;

  function handleScroll() {
    const currentScrollY = window.pageYOffset;

    console.log(currentScrollY > lastScrollY);

    if (currentScrollY > lastScrollY) {
      scrollDirection = "down";
    } else {
      scrollDirection = "up";
    }

    lastScrollY = currentScrollY;

    if (scrollDirection === "down") {
      document.getElementById("navbar").style.top = "-10rem";

      document.getElementById("navbar").style.transition = "all 0.5s ease";

      //   document
      //     .getElementById("navbar")
      //     .classList.add("shadow-[0_0_80px_0_#2B245D21]");
    } else {
      if (currentScrollY > 0) {
        // console.log(true);
        document.getElementById("navbar").style.top = 0;
      } else {
        document.getElementById("navbar").style.top = 0 + "px";
        document.getElementById("navbar").style.transition = "all 0.5s ease";
      }
    }

    if (currentScrollY > 0) {
      document.getElementById("navbar").style.boxShadow =
        "0 0 20px 0 #2B245D21";
      document.getElementById("navbar").style.position = "fixed";
      document.getElementById("navbar").style.backgroundColor = "#FFF";
    } else {
      document.getElementById("navbar").style.boxShadow = "none";
      document.getElementById("navbar").classList.add("border-b");
      // document.getElementById("navbar").style.position = "absolute";
      document.getElementById("navbar").style.top = 0 + "px";
      document.getElementById("navbar").style.backgroundColor = "#FFF0";
    }
  }
  // console.log(scrollDirection);

  window.addEventListener("scroll", handleScroll);

  return {
    getScrollDirection: () => scrollDirection,
    cleanup: () => {
      window.removeEventListener("scroll", handleScroll);
    },
  };
}

createScrollDirectionTracker();
