/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
        colors: {
            'darkpurple': '#6527BE',
            'lightpurple': '#9681EB',
            'green': '#7A9B76',
            'darkcyan': '#45CFDD',
            'lightcyan': '#A7EDE7',
            'white': '#fff',
            'red': '#B33951',
            'comment': '#EEE'
        },
        fontFamily: {
            'sans': ['Arial', 'Helvetica', 'serif'],
        },
        extend: {},
    },
    plugins: [],
}

