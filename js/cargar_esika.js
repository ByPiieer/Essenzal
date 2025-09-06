function cargarEsika(jsonUrl, { showSection = true, respectItemVisibility = true } = {}) {
  const section = document.getElementById('esika');
  const grid    = document.getElementById('esika-grid');

  if (!section || !grid) {
    console.warn('Falta la sección/grid de Esika');
    return;
  }

  section.classList.toggle('hidden', !showSection);
  if (!showSection) return;

  fetch(jsonUrl)
    .then(r => r.json())
    .then(data => {
      grid.innerHTML = '';

      let items = Array.isArray(data) ? data : [];
      if (respectItemVisibility) items = items.filter(p => p.visible !== false);

      if (!items.length) {
        grid.innerHTML = `
          <div class="col-span-full text-center text-brandDark/70 py-10">
            No hay productos de Esika disponibles.
          </div>`;
        return;
      }

      items.forEach(p => {
        const precio = String(p.precio ?? '')
          .replace(/\D/g, '')
          .replace(/\B(?=(\d{3})+(?!\d))/g, '.');

        // Ruta de imagen + validación y logs
        let srcImagen = (p.imagen && p.imagen.trim()) ? p.imagen.trim() : 'img/placeholder.png';
        try {
          console.log('[ESIKA] imagen declarada:', srcImagen, '-> abs:', new URL(srcImagen, location.href).href);
        } catch (_) {}

        const card = document.createElement('article');
        card.className = `
          group bg-gray-900 rounded-xl overflow-hidden shadow-md
          transition-transform duration-300 hover:scale-[1.01] hover:shadow-lg
          flex flex-col
        `;

        card.innerHTML = `
          <!-- Ajusta el alto: h-36(144px) / h-40(160px) / h-48(192px) -->
          <div class="relative w-full overflow-hidden h-40 sm:h-48">
            <img src="${srcImagen}" alt="${p.nombre}"
                 class="absolute inset-0 w-full h-full object-cover
                        transition-transform duration-500 group-hover:scale-110"
                 onerror="console.warn('[ESIKA] imagen falló:', this.src); this.onerror=null; this.src='img/placeholder.png';" />
          </div>

          <div class="p-4 flex flex-col gap-3 flex-1">
            <header>
              <h3 class="text-white font-semibold text-base sm:text-lg text-center uppercase">
                ${p.nombre}
              </h3>
              <p class="text-xs text-gray-400 text-center">
                ${p.descripcion ?? ''}
              </p>
            </header>

            <div class="mt-auto">
              <p class="text-white text-center font-semibold text-lg sm:text-xl mb-3">$${precio}</p>
              <a href="https://wa.me/${p.whatsapp}?text=${encodeURIComponent(p.mensajeWhatsapp || `Hola, me interesa ${p.nombre}`)}"
                 target="_blank"
                 class="w-full inline-flex items-center justify-center gap-2
                        bg-[#FFEDF3] hover:bg-[#f8dede] text-black
                        py-2 px-5 rounded-md font-semibold text-sm transition"
                 aria-label="Comprar por WhatsApp">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 7.89a4.5 4.5 0 006.36 0l1.61-1.61a4.5 4.5 0 000-6.36L14 6"/>
                </svg>
                Comprar por WhatsApp
              </a>
            </div>
          </div>
        `;

        grid.appendChild(card);
      });
    })
    .catch(err => console.error('Error ESIKA:', err));
}
