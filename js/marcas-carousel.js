const marcas = [
  { img: 'img/marcas/avon_banner.jpg',   alt: 'Avon',    url: '#avon',   visible: true },
  { img: 'img/marcas/natura_banner.jpg', alt: 'Natura',  url: '#natura',               visible: true  },
  { img: 'img/marcas/cyzone_banner.jpg', alt: 'Cyzone',  url: '#cyzone', visible: true },
  { img: 'img/marcas/esika_banner.jpg',  alt: 'Ésika',   url: '#esika',                visible: true  },
  { img: 'img/marcas/lbel_banner.jpg',   alt: 'L’Bel',   url: '#lbel',   visible: true },
  { img: 'img/marcas/leonisa_banner.jpg',alt: 'Leonisa', url: 'productos-leonisa.html',visible: false }
];
let currentSlide = 0;

// Filtra solo las visibles
function getVisibleMarcas() {
  return marcas.filter(m => m.visible);
}

function renderMarcas() {
  const container = document.getElementById('marcas-carousel');
  if (!container) return;

  const visibleMarcas = getVisibleMarcas();
  if (!visibleMarcas.length) return;

  container.innerHTML = '';

  for (let i = 0; i < 3; i++) {
    const index = (currentSlide + i) % visibleMarcas.length;
    const marca = visibleMarcas[index];

    const card = document.createElement('div');
    card.className = 'group relative rounded overflow-hidden shadow-lg transition-opacity duration-700 ease-in-out opacity-0';

    card.innerHTML = `
  <a href="${marca.url}" class="block h-full w-full">
    <img src="${marca.img}" alt="${marca.alt}" class="w-full h-60 object-cover transition-transform duration-500 group-hover:scale-105" />
    <div class="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 p-4">
      <h3 class="text-xl font-bold text-white">${marca.alt}</h3>
    </div>
  </a>
`;


    container.appendChild(card);

    // Fade-in
    setTimeout(() => {
      card.classList.remove('opacity-0');
      card.classList.add('opacity-100');
    }, 50);
  }
}

document.addEventListener('DOMContentLoaded', renderMarcas);

setInterval(() => {
  const visibleMarcas = getVisibleMarcas();
  if (!visibleMarcas.length) return;

  currentSlide = (currentSlide + 1) % visibleMarcas.length;
  renderMarcas();
}, 4000);
