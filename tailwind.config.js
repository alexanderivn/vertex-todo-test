/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'pastel-purple': '#FDCEDF',
                'pastel-blue': '#B8E8FC',
                'pastel-green': '#CCF6C8',
                'pastel-light-yellow': '#FFF89A',
                'pastel-yellow': '#FFD966',
                'pastel-bg': '#FFF3DA',
            },
            fontFamily: {
                'display': ['Amatic SC', 'sans-serif'],
                'body': ['Quicksand', 'sans-serif'],
            }
        },
    },
    plugins: [
        // eslint-disable-next-line no-undef
        require('@tailwindcss/typography'),
    ],
}
