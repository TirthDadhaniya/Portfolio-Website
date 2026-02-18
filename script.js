document.addEventListener("DOMContentLoaded", () => {
  const lightSummary = document.getElementById("light-summary");
  const backgroundBlurOverlay = document.querySelector(".background-blur-overlay");

  if (!lightSummary || !backgroundBlurOverlay) {
    console.warn("Blur effect elements not found. Ensure IDs/classes are correct.");
    return;
  }

  const handleScrollBlur = () => {
    const lightSummaryRect = lightSummary.getBoundingClientRect();

    if (lightSummaryRect.top <= window.innerHeight) {
      backgroundBlurOverlay.classList.add("active-background-blur");
    } else {
      backgroundBlurOverlay.classList.remove("active-background-blur");
    }
  };

  window.addEventListener("scroll", handleScrollBlur, { passive: true });

  handleScrollBlur();

  // Fix iOS dynamic viewport height (accounts for Safari toolbar)
  function setVhProperty() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", vh + "px");
  }
  setVhProperty();
  window.addEventListener("resize", setVhProperty);
  if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", setVhProperty);
  }

  // Dynamic footer year
  const footerYear = document.getElementById("footer-year");
  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }

  // Register service worker for offline caching
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    });
  }
});

// Set default active button (Home) and scroll to top when page loads
document.addEventListener("DOMContentLoaded", function () {
  // Set home button active for both desktop and mobile
  const homeButtons = document.querySelectorAll("#home-btn");
  homeButtons.forEach((homeButton) => {
    if (homeButton.classList.contains("menu-button-solo")) {
      homeButton.classList.add("menu-button-solo-selected");
    } else if (homeButton.classList.contains("menu-mobile-btn")) {
      homeButton.classList.add("menu-mobile-btn-selected");
    }

    const homeImg = homeButton.querySelector("img");
    if (homeImg && homeImg.src.includes("-w.svg")) {
      homeImg.src = homeImg.src.replace("-w.svg", "-b.svg");
    }
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
  initScrollNavigation();
});

// Function to set active menu item for both desktop and mobile
function setActiveMenuItem(targetId) {
  // Handle desktop navigation
  document.querySelectorAll(".menu-button-solo").forEach((button) => {
    button.classList.remove("menu-button-solo-selected");
    const img = button.querySelector("img");
    if (img && img.src.includes("-b.svg")) {
      img.src = img.src.replace("-b.svg", "-w.svg");
    }
  });

  // Handle mobile navigation
  document.querySelectorAll(".menu-mobile-btn").forEach((button) => {
    button.classList.remove("menu-mobile-btn-selected");
    const img = button.querySelector("img");
    if (img && img.src.includes("-b.svg")) {
      img.src = img.src.replace("-b.svg", "-w.svg");
    }
  });

  // Set active state for both desktop and mobile buttons with matching data-target
  const activeButtons = document.querySelectorAll(`[data-target="${targetId}"]`);
  activeButtons.forEach((activeButton) => {
    if (activeButton.classList.contains("menu-button-solo")) {
      activeButton.classList.add("menu-button-solo-selected");
    } else if (activeButton.classList.contains("menu-mobile-btn")) {
      activeButton.classList.add("menu-mobile-btn-selected");
    }

    const activeImg = activeButton.querySelector("img");
    if (activeImg && activeImg.src.includes("-w.svg")) {
      activeImg.src = activeImg.src.replace("-w.svg", "-b.svg");
    }
  });
}

// Scroll-based navigation with pixel threshold
let isScrollingProgrammatically = false;

function initScrollNavigation() {
  const sections = document.querySelectorAll(".home, .summary, .projects, .skills, .links");
  const pixelThreshold = 250; // 250px visible = activate

  function checkSectionVisibility() {
    // Skip if we're in the middle of a programmatic scroll
    if (isScrollingProgrammatically) return;

    const windowHeight = window.innerHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top + scrollTop;
      const sectionBottom = sectionTop + rect.height;

      // Check if at least 250px of the section is visible
      const visibleTop = Math.max(sectionTop, scrollTop);
      const visibleBottom = Math.min(sectionBottom, scrollTop + windowHeight);
      const visibleHeight = Math.max(0, visibleBottom - visibleTop);

      if (visibleHeight >= pixelThreshold) {
        const sectionClass = section.classList.value
          .split(" ")
          .find((cls) => ["home", "summary", "projects", "skills", "links"].includes(cls));

        if (sectionClass) {
          setActiveMenuItem(sectionClass);
          return; // Exit after finding the first qualifying section
        }
      }
    });
  }

  // Check on scroll with throttling for better performance
  let ticking = false;
  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        checkSectionVisibility();
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });

  // Initial check
  checkSectionVisibility();
}

// iOS-safe smooth scroll helper
function smoothScrollTo(element) {
  if (element) {
    try {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch (e) {
      // Fallback for older iOS Safari versions
      var top = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo(0, top);
    }
  }
}

// Click event listener for manual navigation - Desktop buttons
document.querySelectorAll(".menu-button-solo").forEach((btn) => {
  function handleNav() {
    const targetId = btn.getAttribute("data-target");

    // Disable scroll-based navigation during programmatic scroll
    isScrollingProgrammatically = true;
    setActiveMenuItem(targetId);

    if (targetId === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const section = document.querySelector(`.${targetId}`);
      smoothScrollTo(section);
    }

    // Re-enable scroll-based navigation after smooth scroll completes
    setTimeout(() => {
      isScrollingProgrammatically = false;
    }, 1500);
  }

  btn.addEventListener("click", handleNav);

  // Keyboard accessibility: Enter and Space trigger navigation
  btn.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleNav();
    }
  });
});

// Click event listener for manual navigation - Mobile buttons
document.querySelectorAll(".menu-mobile-btn").forEach((btn) => {
  function handleNav() {
    const targetId = btn.getAttribute("data-target");

    // Disable scroll-based navigation during programmatic scroll
    isScrollingProgrammatically = true;
    setActiveMenuItem(targetId);

    if (targetId === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const section = document.querySelector(`.${targetId}`);
      smoothScrollTo(section);
    }

    // Re-enable scroll-based navigation after smooth scroll completes
    setTimeout(() => {
      isScrollingProgrammatically = false;
    }, 1500);
  }

  btn.addEventListener("click", handleNav);

  // Keyboard accessibility: Enter and Space trigger navigation
  btn.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleNav();
    }
  });
});
