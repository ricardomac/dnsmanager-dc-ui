/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {
        fontFamily: {
          'Mooli': ["Mooli"],
        },
        fontSize: {
          'sm': '0.875rem',   // Tamanho de fonte pequeno
          'base': '1rem',     // Tamanho de fonte padrão
          'lg': '1.125rem',   // Tamanho de fonte grande
          'xl': '1.25rem',    // Tamanho de fonte extra grande
          // Adicione outros tamanhos de fonte personalizados, se necessário
        },
      },
    },
    plugins: [
      require("tailwind-scrollbar")
    ],
  };
  