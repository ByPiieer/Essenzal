function cargarProductos(jsonUrl) {
  fetch(jsonUrl)
    .then(res => res.json())
    .then(data => {
      const contenedor = document.getElementById('productos');
      if (!contenedor) return console.warn('No existe el contenedor de productos');
      contenedor.innerHTML = '';
      data.forEach(producto => {
        const col = document.createElement('div');
        col.className = 'col-12 col-sm-6 col-md-4 col-lg-3 mb-4';
        col.innerHTML = `
        <div class="card h-100 shadow-sm border-0">
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
        </div>
        `;
        contenedor.appendChild(col);
      });
    })
    .catch(error => {
      console.error('Error al cargar productos:', error);
    });
}