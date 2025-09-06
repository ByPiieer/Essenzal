document.addEventListener('DOMContentLoaded', async () => {
  // Inyectar header
  const header = document.getElementById('header');
  if (header) {
    const html = await (await fetch('header.html')).text();
    header.innerHTML = html;

    // Activar menú móvil
    const btn = header.querySelector('#mobile-menu-button');
    const menu = header.querySelector('#mobile-menu');
    if (btn && menu) {
      btn.addEventListener('click', () => {
        const isHidden = menu.classList.toggle('hidden');
        btn.setAttribute('aria-expanded', String(!isHidden));
      });
    }

    // Marcar enlace activo (opcional)
    const current = location.pathname.split('/').pop() || 'index.html';
    header.querySelectorAll('a[href]').forEach(a => {
      if (a.getAttribute('href') === current) {
        a.classList.add('text-brandAccent');
      }
    });
  }

  // Inyectar footer (si lo usas)
  const footer = document.getElementById('footer');
  if (footer) {
    const html = await (await fetch('footer.html')).text();
    footer.innerHTML = html;
  }
});
