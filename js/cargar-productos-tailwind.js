function cargarProductos(jsonUrl) {
  fetch(jsonUrl)
    .then(res => res.json())
    .then(data => {
      const contenedor = document.getElementById('productos');
      if (!contenedor) return console.warn('No existe el contenedor de productos');
      contenedor.innerHTML = '';

      data.forEach(producto => {
        const card = document.createElement('div');
        card.className = `
          bg-gray-800
          rounded-lg
          shadow-sm
          overflow-hidden
          flex
          flex-col
          w-full
          max-w-xs
          mx-auto
          transition-transform
          duration-200
          hover:scale-[1.02]
          hover:shadow-md
          cursor-pointer
        `;

        card.innerHTML = `
          <div class="relative overflow-hidden rounded-t-lg">
            <img src="${producto.imagen}" alt="${producto.nombre}" class="w-full h-48 object-cover transition-transform duration-400 ease-in-out hover:scale-105" />
          </div>
          <div class="p-4 flex flex-col flex-grow text-center">
            <h5 class="text-lg font-medium text-white uppercase mb-1 tracking-wide">${producto.nombre}</h5>
            <p class="text-gray-300 text-sm leading-relaxed flex-grow">${producto.descripcion}</p>
            <p class="mt-4 text-xl font-semibold text-white">$${producto.precio}</p>
            <a href="https://wa.me/${producto.whatsapp}?text=${encodeURIComponent(producto.mensajeWhatsapp)}"
               target="_blank"
               class="mt-4 inline-flex items-center justify-center gap-2 bg-[#FFEDF3] hover:bg-[#f8dede] text-black font-medium py-2 px-5 rounded shadow-sm transition-colors duration-200 max-w-full w-full sm:w-auto mx-auto"
               aria-label="Comprar por WhatsApp"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 7.89a4.5 4.5 0 006.36 0l1.61-1.61a4.5 4.5 0 000-6.36L14 6"/>
              </svg>
              Comprar por WhatsApp
            </a>
          </div>
        `;

        contenedor.appendChild(card);
      });
    })
    .catch(error => {
      console.error('Error al cargar productos:', error);
    });
}
