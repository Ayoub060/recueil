const header = document.querySelector("header");
const hero = document.querySelector(".hero");

if (header && hero) {
  window.addEventListener("scroll", () => {
    const heroBottom = hero.getBoundingClientRect().bottom;
    if (heroBottom > 0) {
      header.classList.add("sur-hero");
    } else {
      header.classList.remove("sur-hero");
    }
  });

  // Appliquer au chargement
  window.dispatchEvent(new Event("scroll"));
}
