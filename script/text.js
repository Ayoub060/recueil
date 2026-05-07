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

// Hero background (gif et img)
// const btnExperience = document.querySelector(".btn-experience");
// const gifBg = document.getElementById("heroBgGif");

// if (btnExperience && gifBg) {
//   btnExperience.addEventListener("mouseenter", () => {
//     gifBg.style.opacity = "1";
//   });

//   btnExperience.addEventListener("mouseleave", () => {
//     gifBg.style.opacity = "0";
//   });
// }
