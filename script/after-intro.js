document.addEventListener("DOMContentLoaded", () => {
  const delais = [200, 2200, 4800, 4800];
  const elements = document.querySelectorAll(".phrases p, .btn");

  elements.forEach((el, i) => {
    setTimeout(() => {
      el.classList.add("visible");
    }, delais[i]);
  });
});
