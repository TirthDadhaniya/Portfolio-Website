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
