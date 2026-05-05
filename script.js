// ── TRADUCTIONS ──
let traductions = {};

const fichier = window.location.pathname.split('/').pop().replace('.html', '').replace('#', '');
const PAGE = fichier === '' ? 'index' : fichier;

fetch('traductions.json')
  .then(res => res.json())
  .then(data => {
    traductions = data[PAGE];

    // Appliquer la langue sauvegardée automatiquement
    const langueSauvegardee = localStorage.getItem('langue') || 'fr';
    const t = traductions[langueSauvegardee];
    if (t) {
      if (t.title) document.title = t.title;
      document.querySelectorAll('[data-traduction]').forEach(elem => {
        const cle = elem.getAttribute('data-traduction');
        if (t[cle]) elem.textContent = t[cle];
      });

      // Mettre à jour la classe actif sur la bonne langue
      document.querySelectorAll('.langues a').forEach(a => {
        a.classList.remove('actif');
        if (
          a.textContent.trim() === langueSauvegardee.toUpperCase() ||
          (langueSauvegardee === 'kr' && a.textContent.trim() === '한국어')
        ) {
          a.classList.add('actif');
        }
      });

      // ← AJOUT 1 : appliquer la police coréenne au chargement si langue sauvegardée = kr
      const h1 = document.querySelector('h1');
      if (h1) {
        if (langueSauvegardee === 'kr') {
          h1.classList.add('coreen');
        } else {
          h1.classList.remove('coreen');
        }
      }
    }
  }); 
 
function changerLangue(langue, el) {
  const t = traductions[langue];
  if (!t) return;

  if (t.title) document.title = t.title;

  document.querySelectorAll('[data-traduction]').forEach(elem => {
    const cle = elem.getAttribute('data-traduction');
    if (t[cle]) elem.textContent = t[cle];
  });

// ← AJOUT 2 : changer la police du h1 quand on clique sur une langue
  const h1 = document.querySelector('h1');
  if (h1) {
    if (langue === 'kr') {
      h1.classList.add('coreen');
    } else {
      h1.classList.remove('coreen');
    }
  }

  document.querySelectorAll('.langues a').forEach(a => a.classList.remove('actif'));
  el.classList.add('actif');

  // Sauvegarder la langue choisie
  localStorage.setItem('langue', langue);
}

// ── SON ──
let sonActif = false;
const btnSon = document.getElementById('btnSon');
if (btnSon) {
  btnSon.addEventListener('click', () => {
    sonActif = !sonActif;
    if (sonActif) {
      const textes = [];
      document.querySelectorAll('[data-traduction]').forEach(elem => {
        textes.push(elem.textContent.trim());
      });
      const utterance = new SpeechSynthesisUtterance(textes.join('. '));
      const langueActive = document.querySelector('.langues a.actif').textContent.trim();
      if (langueActive === 'EN') utterance.lang = 'en-US';
      else if (langueActive === '한국어') utterance.lang = 'ko-KR';
      else utterance.lang = 'fr-FR';
      window.speechSynthesis.speak(utterance);
    } else {
      window.speechSynthesis.cancel();
    }
  });
}

// ── DOCUMENTAIRE : bouton retour au mouvement de souris ──
const btnRetour = document.getElementById('btnRetour');
const overlay = document.getElementById('overlay');
 
if (btnRetour && overlay) {
  let hideTimer;
 
  // Cacher le bouton immédiatement au chargement
  btnRetour.classList.remove('visible');
 
  // Attendre 2 secondes avant d'activer l'écouteur
  // pour éviter que le mouvement de la souris au chargement
  // déclenche l'affichage
  
  // Activer l'overlay dès le départ
  overlay.style.pointerEvents = 'all';
  
  setTimeout(() => {
 
    function afficherBouton() {
      overlay.style.pointerEvents = 'all';
      btnRetour.classList.add('visible');
 
      clearTimeout(hideTimer);
      hideTimer = setTimeout(() => {
        btnRetour.classList.remove('visible');
        overlay.style.pointerEvents = 'none';
      }, 2000);
    }
 
    document.addEventListener('mousemove', afficherBouton);
    overlay.addEventListener('mousemove', afficherBouton);
 
    btnRetour.addEventListener('mouseenter', () => {
      clearTimeout(hideTimer);
      btnRetour.classList.add('visible');
    });
 
    btnRetour.addEventListener('mouseleave', () => {
      hideTimer = setTimeout(() => {
        btnRetour.classList.remove('visible');
        overlay.style.pointerEvents = 'none';
      }, 2000);
    });
 
  }, 2000); // ← attend 2 secondes avant d'activer
}

if (btnRetour) {
  let hideTimer;

  document.addEventListener('mousemove', () => {
    btnRetour.classList.add('visible');
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => {
      btnRetour.classList.remove('visible');
    }, 2000);
  });
}