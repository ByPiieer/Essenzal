module.exports = {
  content: [
    "./**/*.html",    // escanea todos los HTML en cualquier carpeta
    "./js/**/*.js"    // escanea todos los JS dentro de la carpeta js
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        playfair: ['Playfair Display', 'serif'],
      },
      colors: {
        brandDark: '#000000',
        brandLight: '#F5F5F5',
        brandAccent: '#56DFCF',
        brandAccentHover: '#FFFBDE',
        brandPurple: '#ADEED9',
        brandGold: '#C5A880',
        brandPinkLight: '#FFEDF3',
        brandPinkHover: '#e6cdd7',
        brandRosse: '#f077a7ff',

      },
    },
  },
  plugins: [],
};

