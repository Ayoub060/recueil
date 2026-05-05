let traductions = {};

// Détecte automatiquement la page depuis le nom du fichier HTML
const fichier = window.location.pathname.split('/').pop().replace('.html', '').replace('#', '');
const PAGE = fichier === '' ? 'index' : fichier;

fetch('traductions.json')
  .then(res => res.json())
  .then(data => {
    traductions = data[PAGE];
  });

function changerLangue(langue, el) {
  const t = traductions[langue];
  if (!t) return;

  // Changer le title de l'onglet
  if (t.title) document.title = t.title;

  // Changer les textes visibles
  document.querySelectorAll('[data-traduction]').forEach(elem => {
    const cle = elem.getAttribute('data-traduction');
    if (t[cle]) elem.textContent = t[cle];
  });

  document.querySelectorAll('.langues a').forEach(a => a.classList.remove('actif'));
  el.classList.add('actif');
}

function changerLangue(langue, el) {
  const t = traductions[langue];
  if (!t) return;

  if (t.title) document.title = t.title;

  document.querySelectorAll('[data-traduction]').forEach(elem => {
    const cle = elem.getAttribute('data-traduction');
    if (t[cle]) elem.textContent = t[cle];
  });

  // Changer la police du h1 selon la langue
  const h1 = document.querySelector('h1');
  if (langue === 'kr') {
    h1.classList.add('coreen');
  } else {
    h1.classList.remove('coreen');
  }

  document.querySelectorAll('.langues a').forEach(a => a.classList.remove('actif'));
  el.classList.add('actif');
}

// ── SON / SYNTHÈSE VOCALE ──
let sonActif = false;
 
document.getElementById('btnSon').addEventListener('click', () => {
  sonActif = !sonActif;
 
  if (sonActif) {
    // Lire tous les éléments avec data-traduction
    const textes = [];
    document.querySelectorAll('[data-traduction]').forEach(elem => {
      textes.push(elem.textContent.trim());
    });
 
    const texteComplet = textes.join('. ');
    const utterance = new SpeechSynthesisUtterance(texteComplet);
 
    // Détecter la langue active
    const langueActive = document.querySelector('.langues a.actif').textContent.trim();
    if (langueActive === 'EN') utterance.lang = 'en-US';
    else if (langueActive === '한국어') utterance.lang = 'ko-KR';
    else utterance.lang = 'fr-FR';
 
    window.speechSynthesis.speak(utterance);
  } else {
    // Arrêter la lecture
    window.speechSynthesis.cancel();
  }
});