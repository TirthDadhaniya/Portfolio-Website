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

// Set default active button (Home) when page loads
document.addEventListener("DOMContentLoaded", function () {
  const homeButton = document.querySelector("#home-btn");
  if (homeButton) {
    homeButton.classList.add("menu-button-solo-selected");
    const homeImg = homeButton.querySelector("img");
    if (homeImg && homeImg.src.includes("-w.svg")) {
      console.log("Setting home icon to black:", homeImg.src);
      homeImg.src = homeImg.src.replace("-w.svg", "-b.svg");
    }
  }
});

// Single event listener for all menu buttons
document.querySelectorAll(".menu-button-solo").forEach((btn) => {
  btn.addEventListener("click", function () {
    console.log("Clicked button:", this.id);

    // Reset all buttons to inactive state
    document.querySelectorAll(".menu-button-solo").forEach((button) => {
      button.classList.remove("menu-button-solo-selected");
      const img = button.querySelector("img");
      if (img && img.src.includes("-b.svg")) {
        console.log("Resetting icon to white:", img.src);
        img.src = img.src.replace("-b.svg", "-w.svg");
      }
    });

    // Set clicked button to active state
    this.classList.add("menu-button-solo-selected");
    const activeImg = this.querySelector("img");
    if (activeImg && activeImg.src.includes("-w.svg")) {
      console.log("Setting active icon to black:", activeImg.src);
      activeImg.src = activeImg.src.replace("-w.svg", "-b.svg");
    }

    // Scroll to section
    const targetId = this.getAttribute("data-target");
    if (targetId === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const section = document.getElementById(targetId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  });
});
