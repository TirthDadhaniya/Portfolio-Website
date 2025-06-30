document.querySelectorAll(".menu-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
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

document.querySelectorAll(".menu-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    // Remove 'menu-btn-selected' from all buttons
    document.querySelectorAll(".menu-btn").forEach((b) => b.classList.remove(".menu-butten-solo-selected"));
    // Add 'menu-btn-selected' to the clicked button
    this.classList.add(".menu-butten-solo-selected");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const lightSummary = document.getElementById("light-summary");
  const linksText = document.querySelector(".links-text");
  const backgroundBlurOverlay = document.querySelector(".background-blur-overlay");

  if (!lightSummary || !linksText || !backgroundBlurOverlay) {
    console.warn("One or more elements for blur effect not found. Ensure IDs/classes are correct.");
    return;
  }

  const handleScrollBlur = () => {
    console.log("Scroll event fired"); // You can keep this or remove it if you already verified it's firing

    const lightSummaryRect = lightSummary.getBoundingClientRect();
    const linksTextRect = linksText.getBoundingClientRect();

    const activateBlur = lightSummaryRect.top <= window.innerHeight;
    const deactivateBlur = linksTextRect.bottom <= 0; // This is the key condition for deactivation

    // --- ADD THESE CONSOLE.LOGS ---
    console.log("--- Scroll State ---");
    console.log("lightSummaryRect.top:", lightSummaryRect.top, " (window.innerHeight:", window.innerHeight, ")");
    console.log("linksTextRect.bottom:", linksTextRect.bottom);
    console.log("activateBlur condition (lightSummary in view?):", activateBlur);
    console.log("deactivateBlur condition (linksText fully off-screen upwards?):", deactivateBlur);
    console.log("--------------------");
    // --- END CONSOLE.LOGS ---

    if (activateBlur && !deactivateBlur) {
      backgroundBlurOverlay.classList.add("active-background-blur");
      // console.log('Blur Activated'); // Optional: Add this to confirm activation
    } else {
      backgroundBlurOverlay.classList.remove("active-background-blur");
      // console.log('Blur Deactivated'); // Optional: Add this to confirm deactivation
    }
  };

  window.addEventListener("scroll", handleScrollBlur);
  handleScrollBlur(); // Initial call
});
