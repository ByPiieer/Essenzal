const marcas = [
  { img: 'img/marcas/avon_banner.jpg', alt: 'Avon', url: 'productos-avon.html' },
  { img: 'img/marcas/natura_banner.jpg', alt: 'Natura', url: 'productos-natura.html' },
  { img: 'img/marcas/cyzone_banner.jpg', alt: 'Cyzone', url: 'productos-cyzone.html' },
  { img: 'img/marcas/esika_banner.jpg', alt: 'Ésika', url: 'productos-esika.html' },
  { img: 'img/marcas/lbel_banner.jpg', alt: 'L’Bel', url: 'productos-lbel.html' },
  { img: 'img/marcas/leonisa_banner.jpg', alt: 'Leonisa', url: 'productos-leonisa.html' }
];

let currentSlide = 0;

function renderMarcas() {
  const container = document.getElementById('marcas-carousel');
  if (!container) return;

  container.innerHTML = '';

  for (let i = 0; i < 3; i++) {
    const index = (currentSlide + i) % marcas.length;
    const marca = marcas[index];

    const card = document.createElement('div');
    card.className = 'group relative rounded overflow-hidden shadow-lg transition-opacity duration-700 ease-in-out opacity-0';

    card.innerHTML = `
      <a href="${marca.url}" class="block h-full w-full">
        <img src="${marca.img}" alt="${marca.alt}" class="w-full h-60 object-cover transition-transform duration-500 group-hover:scale-105" />
        <div class="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 p-4">
          <h3 class="text-xl font-bold">${marca.alt}</h3>
        </div>
      </a>
    `;

    container.appendChild(card);

    // Fade-in después de agregar
    setTimeout(() => {
      card.classList.remove('opacity-0');
      card.classList.add('opacity-100');
    }, 50);
  }
}

document.addEventListener('DOMContentLoaded', renderMarcas);

setInterval(() => {
  currentSlide = (currentSlide + 1) % marcas.length;
  renderMarcas();
}, 4000);
