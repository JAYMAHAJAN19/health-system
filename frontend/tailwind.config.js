/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                healthcare: {
                    primary: '#0ea5e9', // Sky 500
                    secondary: '#0284c7', // Sky 600
                    accent: '#10b981', // Emerald 500
                }
            }
        },
    },
    plugins: [],
}
