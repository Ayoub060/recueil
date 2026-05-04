let traductions = {};

// Détecte automatiquement la page depuis le nom du fichier HTML
const fichier = window.location.pathname.split('/').pop().replace('.html', '');
const PAGE = fichier === '' ? 'home' : fichier;

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