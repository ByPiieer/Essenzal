function cargarEsika(jsonUrl, { showSection = true, respectItemVisibility = true } = {}) {
  const section = document.getElementById('esika');
  const grid    = document.getElementById('esika-grid');

  if (!section || !grid) {
    console.warn('Falta la sección/grid de Esika');
    return;
  }

  // Mostrar/ocultar sección completa
  section.classList.toggle('hidden', !showSection);
  if (!showSection) return;

  // Helpers
  const formatPrice = (val) => {
    const digits = String(val ?? '').replace(/\D/g, '');
    return digits ? digits.replace(/\B(?=(\d{3})+(?!\d))/g, '.') : '';
  };

  const buildWhatsappMessage = (item) => {
    const tpl =
      item.mensajeTemplate ||
      'Hola, me interesa el producto {codigo} - {nombre} ({marca}). ¿Valor y disponibilidad?';
    return tpl
      .replaceAll('{codigo}', item.codigo ?? '')
      .replaceAll('{nombre}', item.nombre ?? '')
      .replaceAll('{marca}',  item.marca  ?? 'Ésika');
  };

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
        // Imagen con fallback
        let srcImagen = (p.imagen && p.imagen.trim()) ? p.imagen.trim() : 'img/placeholder.png';

        // Texto de precio
        const precioTexto =
          (p.precioTipo === 'consultar' || p.precio == null)
            ? (p.precioMostrar || 'Consultar por WhatsApp')
            : `$${formatPrice(p.precio)}`;

        // Mensaje de WhatsApp desde plantilla
        const msg    = buildWhatsappMessage(p);
        const waHref = `https://wa.me/${p.whatsapp}?text=${encodeURIComponent(msg)}`;

        const card = document.createElement('article');
        card.className = `
          group bg-gray-900 rounded-xl overflow-hidden shadow-md
          transition-transform duration-300 hover:scale-[1.01] hover:shadow-lg
          flex flex-col
        `;

        card.innerHTML = `
          <!-- Imagen (alto ajustable: h-36/h-40/h-48) -->
          <div class="relative w-full overflow-hidden h-40 sm:h-48">
            <img src="${srcImagen}" alt="${p.nombre ?? ''}"
                 class="absolute inset-0 w-full h-full object-cover
                        transition-transform duration-500 group-hover:scale-110"
                 onerror="this.onerror=null; this.src='img/placeholder.png';" />
          </div>

          <div class="p-4 flex flex-col gap-3 flex-1">
            <header class="text-center">
              ${p.codigo ? `<p class="text-[11px] tracking-wide text-gray-300/70 mb-1 select-none">${p.codigo} · ${p.marca ?? 'Ésika'}</p>` : ''}
              <h3 class="text-white font-semibold text-base sm:text-lg uppercase">
                ${p.nombre ?? ''}
              </h3>
              <p class="text-xs text-gray-400">${p.descripcion ?? ''}</p>
            </header>

            <div class="mt-auto">
              <p class="text-white text-center font-semibold text-lg sm:text-xl mb-3">
                ${precioTexto}
              </p>
              <a href="${waHref}" target="_blank"
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
