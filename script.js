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
    document
      .querySelectorAll(".menu-btn")
      .forEach((b) => b.classList.remove("menu-btn-selected"));
    // Add 'menu-btn-selected' to the clicked button
    this.classList.add("menu-btn-selected");
  });
});
