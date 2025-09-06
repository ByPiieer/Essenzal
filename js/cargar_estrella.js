function cargarEstrellas(jsonUrl, { showSection = true, respectItemVisibility = true } = {}) {
  const section = document.getElementById('destacados');
  const list = document.getElementById('destacados-list');

  if (!section || !list) {
    console.warn('[destacados] falta el contenedor');
    return;
  }

  // Mostrar/ocultar toda la sección
  section.classList.toggle('hidden', !showSection);
  if (!showSection) return;

  fetch(jsonUrl)
    .then(r => r.json())
    .then(data => {
      list.innerHTML = '';

      let items = Array.isArray(data) ? data : [];

      // Filtra por visible si corresponde
      if (respectItemVisibility) {
        items = items.filter(i => i.visible !== false);
      }

      if (!items.length) {
        const empty = document.createElement('div');
        empty.className = 'text-center text-brandDark/70 py-10';
        empty.textContent = 'No hay productos destacados por ahora.';
        list.appendChild(empty);
        return;
      }

      items.forEach((p, idx) => {
        const rev = idx % 2 === 1; // alterna layout
        const aos = rev ? 'fade-left' : 'fade-right';

        // arma CTA
        let href = '#';
        let target = '';
        if (p.whatsapp) {
          const msg = encodeURIComponent(p.mensajeWhatsapp || `Hola, me interesa ${p.titulo}`);
          href = `https://wa.me/${p.whatsapp}?text=${msg}`;
          target = '_blank';
        } else if (p.url) {
          href = p.url;
          target = p.url.startsWith('http') ? '_blank' : '';
        }

        const card = document.createElement('article');
        card.className = `
          flex flex-col ${rev ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8
          bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg
        `;
        card.setAttribute('data-aos', aos);

        card.innerHTML = `
          <img src="${p.imagen || 'img/placeholder.png'}" alt="${p.titulo || ''}"
               class="w-full md:w-1/2 h-72 object-cover rounded-lg shadow-lg">

          <div class="text-left md:w-1/2">
            <h3 class="text-2xl font-semibold mb-2 text-brandDark">
              ${p.titulo || ''}
            </h3>
            <p class="text-brandDark/75 mb-4">
              ${p.descripcion || ''}
            </p>

            ${
              p.cta
                ? `<a href="${href}" ${target ? `target="${target}"` : ''}
                     class="inline-block bg-brandAccent hover:bg-brandAccentHover
                            text-brandDark px-5 py-2 rounded transition">
                     ${p.cta}
                   </a>`
                : ''
            }
          </div>
        `;

        list.appendChild(card);
      });
    })
    .catch(err => console.error('[destacados] error:', err));
}
