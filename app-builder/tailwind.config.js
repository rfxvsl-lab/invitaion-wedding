
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: {
    relative: true,
    files: [
      "./app/**/*.{js,ts,jsx,tsx,mdx}",
      "./pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    extract: {
      html: (content) => {
        // This is a custom extractor that does nothing, to prevent Tailwind from
        // trying to process the template files.
        return [];
      }
    }
  },
  theme: {
    extend: {},
  },
  plugins: [],
}
