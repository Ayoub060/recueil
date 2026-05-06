// PLAYER : bouton retour au mouvement de souris ──
const btnRetour = document.getElementById("btnRetour");
const overlay = document.getElementById("overlay");

if (btnRetour && overlay) {
  let hideTimer;

  // Cacher le bouton immédiatement au chargement
  btnRetour.classList.remove("visible");

  // Attendre 2 secondes avant d'activer l'écouteur
  // pour éviter que le mouvement de la souris au chargement
  // déclenche l'affichage

  // Activer l'overlay dès le départ
  overlay.style.pointerEvents = "all";

  setTimeout(() => {
    function afficherBouton() {
      overlay.style.pointerEvents = "all";
      btnRetour.classList.add("visible");

      clearTimeout(hideTimer);
      hideTimer = setTimeout(() => {
        btnRetour.classList.remove("visible");
        overlay.style.pointerEvents = "none";
      }, 2000);
    }

    document.addEventListener("mousemove", afficherBouton);
    overlay.addEventListener("mousemove", afficherBouton);

    btnRetour.addEventListener("mouseenter", () => {
      clearTimeout(hideTimer);
      btnRetour.classList.add("visible");
    });

    btnRetour.addEventListener("mouseleave", () => {
      hideTimer = setTimeout(() => {
        btnRetour.classList.remove("visible");
        overlay.style.pointerEvents = "none";
      }, 2000);
    });
  }, 2000); // ← attend 2 secondes avant d'activer
}

if (btnRetour) {
  let hideTimer;

  document.addEventListener("mousemove", () => {
    btnRetour.classList.add("visible");
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => {
      btnRetour.classList.remove("visible");
    }, 2000);
  });
}

// PLAYER : bouton passer au mouvement de souris ──
const btnPasser = document.getElementById("btnPasser");

if (btnPasser) {
  let hideTimerPasser;

  // Caché au départ
  btnPasser.classList.remove("visible");

  setTimeout(() => {
    document.addEventListener("mousemove", () => {
      btnPasser.classList.add("visible");
      clearTimeout(hideTimerPasser);
      hideTimerPasser = setTimeout(() => {
        btnPasser.classList.remove("visible");
      }, 2000);
    });

    btnPasser.addEventListener("mouseenter", () => {
      clearTimeout(hideTimerPasser);
      btnPasser.classList.add("visible");
    });

    btnPasser.addEventListener("mouseleave", () => {
      hideTimerPasser = setTimeout(() => {
        btnPasser.classList.remove("visible");
      }, 2000);
    });
  }, 2000);
}