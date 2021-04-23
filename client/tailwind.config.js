module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#0891B2',
                    dark: '#164E63',
                },
                background: '#F8FAFC',
                hover: 'rgba(255, 255, 255, 0.05)',
                active: 'rgba(0, 0, 0, 0.05)',
            },
            minWidth: (theme) => theme('maxWidth'),
        },
        container: {
            center: true,
        },
    },
    variants: {
        extend: {
            backgroundColor: ['hover', 'active'],
            textColor: ['hover', 'active'],
        },
    },
    plugins: [],
}
