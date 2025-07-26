function hyphenToCamelCase(text) {
  return text.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}

// Dynamically load Animate.css
function loadAnimateCSS() {
  return new Promise((resolve, reject) => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css";
    link.onload = () => resolve();
    link.onerror = () => reject(new Error("Failed to load Animate.css"));
    document.head.appendChild(link);
  });
}

// Main Scroll Animation Script
function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const el = entry.target;
        const animation = el.dataset.animate;

        // Only trigger animation once when the element is in the viewport
        if (entry.isIntersecting && !el.classList.contains("animated")) {
          if (!animation) {
            console.warn("Missing data-animate value on:", el);
            return;
          }

          const delay = parseTiming(el.dataset.delay, "0");
          const duration = parseTiming(el.dataset.duration, "800");

          // Apply visibility and animation
          el.style.opacity = "1"; // Ensure element becomes visible when in viewport
          // el.style.setProperty("--animate-delay", delay);
          // el.style.setProperty("--animate-duration", duration);
          el.style.animationDelay = delay;
          el.style.animationDuration = duration;
          el.classList.add(
            "animate__animated",
            `animate__${hyphenToCamelCase(animation)}`
          );

          // Mark element as animated so it doesn't trigger again
          el.classList.add("animated");

          el.addEventListener(
            "animationend",
            () => {
              // Remove the animation class after it ends, but keep the "animated" class
              el.classList.remove(
                "animate__animated",
                `animate__${hyphenToCamelCase(animation)}`
              );
            },
            { once: true }
          );
        }
      });
    },
    {
      threshold: 0.2,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  // Function to handle timing values (delay and duration)
  function parseTiming(value, defaultValue) {
    if (!value) return `${defaultValue}ms`;
    return isNaN(value)
      ? value.endsWith("ms") || value.endsWith("s")
        ? value
        : `${value}ms`
      : `${value}ms`;
  }

  // Fetch all elements that have the 'data-animate' attribute
  const elements = document.querySelectorAll("[data-animate]");

  // Hide all elements initially
  elements.forEach((el) => (el.style.opacity = "0"));

  if (elements.length === 0) {
    console.warn("No elements with [data-animate] found");
    return;
  }

  // Observe each element for scroll animations
  elements.forEach((el) => {
    observer.observe(el);
  });
}

// Execute after DOM and Animate.css is ready
document.addEventListener("DOMContentLoaded", () => {
  loadAnimateCSS()
    .then(() => {
      console.log("Animate.css loaded successfully.");
      initScrollAnimations(); // Initialize scroll animations once CSS is loaded
    })
    .catch((error) => {
      console.error(error);
    });
});
