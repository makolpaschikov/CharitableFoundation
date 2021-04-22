module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                hover: 'rgba(255, 255, 255, 0.05)',
                active: 'rgba(0, 0, 0, 0.05)',
            },
        },
        container: {
            center: true,
        },
    },
    variants: {
        extend: {
            backgroundColor: ['hover', 'active'],
        },
    },
    plugins: [],
}
