let traductions = {};

fetch('traductions.json')
  .then(res => res.json())
  .then(data => {
    traductions = data;
  });

function changerLangue(langue, el) {
  const t = traductions[langue];
  if (!t) return;

  document.querySelectorAll('[data-traduction]').forEach(elem => {
    const cle = elem.getAttribute('data-traduction');
    if (t[cle]) elem.textContent = t[cle];
  });

  document.querySelectorAll('.langues a').forEach(a => a.classList.remove('actif'));
  el.classList.add('actif');
}