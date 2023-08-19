/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
        colors: {
            'darkpurple': '#6527BE',
            'lightpurple': '#9681EB',
            'darkcyan': '#45CFDD',
            'lightcyan': '#A7EDE7',
            'white': '#fff',
            'targetElement': '#B33951',
            'green': '#7A9B76',
            'comment': '#EEE',
            'file': '#9FB798',
            'segment': '#c1c1f8',
            'environment': '#e1b4a0',
            'document': '#cc8ea2',
            'editor': '#3d3d3d',
            'label': '#C8AE7D',
            'caption': '#b0b275',
        },
        fontFamily: {
            'sans': ['Arial', 'Helvetica', 'serif'],
        },
        extend: {},
    },
    plugins: [],
}

