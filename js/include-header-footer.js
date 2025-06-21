function loadHTML(id, url) {
  fetch(url)
    .then(response => response.text())
    .then(data => {
      document.getElementById(id).innerHTML = data;
    })
    .catch(err => console.error(`Error cargando ${url}:`, err));
}
document.addEventListener('DOMContentLoaded', () => {
  loadHTML('header', 'header.html');
  loadHTML('footer', 'footer.html');
});