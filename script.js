document.addEventListener("DOMContentLoaded", () => {
  const lightSummary = document.getElementById("light-summary");
  const linksText = document.querySelector(".links-text");
  const backgroundBlurOverlay = document.querySelector(".background-blur-overlay");

  if (!lightSummary || !linksText || !backgroundBlurOverlay) {
    console.warn("One or more elements for blur effect not found. Ensure IDs/classes are correct.");
    return;
  }

  const handleScrollBlur = () => {
    const lightSummaryRect = lightSummary.getBoundingClientRect();
    const linksTextRect = linksText.getBoundingClientRect();

    const activateBlur = lightSummaryRect.top <= window.innerHeight;

    const deactivateBlur = linksTextRect.bottom <= 0;

    if (activateBlur && !deactivateBlur) {
      backgroundBlurOverlay.classList.add("active-background-blur");
    } else {
      backgroundBlurOverlay.classList.remove("active-background-blur");
    }
  };

  window.addEventListener("scroll", handleScrollBlur);

  handleScrollBlur();
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
function initScrollNavigation() {
  const sections = document.querySelectorAll(".home, .summary, .projects, .skills, .links");
  const pixelThreshold = 250; // 250px visible = activate

  function checkSectionVisibility() {
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

  window.addEventListener("scroll", onScroll);

  // Initial check
  checkSectionVisibility();
}

// Click event listener for manual navigation - Desktop buttons
document.querySelectorAll(".menu-button-solo").forEach((btn) => {
  btn.addEventListener("click", function () {
    const targetId = this.getAttribute("data-target");
    setActiveMenuItem(targetId);

    if (targetId === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const section = document.querySelector(`.${targetId}`);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  });
});

// Click event listener for manual navigation - Mobile buttons
document.querySelectorAll(".menu-mobile-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    const targetId = this.getAttribute("data-target");
    setActiveMenuItem(targetId);

    if (targetId === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const section = document.querySelector(`.${targetId}`);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  });
});
