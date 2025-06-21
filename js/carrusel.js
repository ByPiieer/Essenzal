document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('.marcas-carousel');
  let scrollAmount = 0;
  const speed = 2; // velocidad ajustada para que se note

  function autoScroll() {
    scrollAmount += speed;
    if (scrollAmount >= carousel.scrollWidth - carousel.clientWidth) {
      scrollAmount = 0;
    }
    // Scroll lineal sin smooth para que no dé efecto "saltos"
    carousel.scrollLeft = scrollAmount;

    requestAnimationFrame(autoScroll);
  }

  autoScroll();
});
