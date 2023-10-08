/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    darkMode: "class",
    theme: {
        extend: {
            fontFamily: {
                featured: ["Josefin Sans", "Inter", "Arial", "sans-serif"],
            },
            boxShadow: {
                input: "inset 0 -2px 0 #0ea5e9",
            },
        },
    },
    plugins: [],
};
