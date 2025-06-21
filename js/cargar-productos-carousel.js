function cargarProductos(jsonUrl) {
  fetch(jsonUrl)
    .then(res => res.json())
    .then(data => {
      const carrusel = document.getElementById('productos-carousel');
      if (!carrusel) return console.warn('No existe el carrusel de productos');
      carrusel.innerHTML = '';

      data.forEach(producto => {
        const div = document.createElement('div');
        div.className = 'producto-item';

        div.innerHTML = `
          <div class="card h-100 shadow-sm">
             <img src="${producto.imagen}" class="card-img-top rounded-top" alt="${producto.nombre}">
              <div class="card-body d-flex flex-column justify-content-between p-3">
               <div>
                   <h5 class="card-title text-uppercase fw-semibold mb-2">${producto.nombre}</h5>
                   <p class="card-text small mb-3">${producto.descripcion}</p>
               </div>
                <div>
                  <p class="card-text fw-bold fs-5 mb-3 text-accent">$${producto.precio}</p>
                  <a href="https://wa.me/${producto.whatsapp}?text=${encodeURIComponent(producto.mensajeWhatsapp)}" target="_blank" class="btn btn-success d-flex align-items-center justify-content-center gap-2">
                    <i class="bi bi-whatsapp fs-5"></i> Comprar por WhatsApp
                  </a>
                </div>
              </div>
          </div>`;
        carrusel.appendChild(div);
      });

      // Botones
      const prev = document.getElementById('prev-btn');
      const next = document.getElementById('next-btn');

      prev.onclick = () => carrusel.scrollBy({ left: -250, behavior: 'smooth' });
      next.onclick = () => carrusel.scrollBy({ left: 250, behavior: 'smooth' });

      // ✅ Movimiento automático cada 4 segundos
      setInterval(() => {
        carrusel.scrollBy({ left: 250, behavior: 'smooth' });
      }, 4000);
    })
    .catch(error => {
      console.error('Error al cargar productos:', error);
    });
}
