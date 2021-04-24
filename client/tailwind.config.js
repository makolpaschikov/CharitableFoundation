module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#0891B2',
                    dark: '#164E63',
                    light: '#06B6D4',
                },
                background: '#F8FAFC',
                hover: 'rgba(255, 255, 255, 0.05)',
                active: 'rgba(0, 0, 0, 0.05)',
            },
            minWidth: (theme) => theme('maxWidth'),
            minHeight: (theme) => theme('maxWidth'),
            borderWidth: {
                1: '1px',
            },
        },
        container: {
            center: true,
        },
    },
    variants: {
        extend: {
            backgroundColor: ['hover', 'active'],
            borderColor: ['active'],
            textColor: ['hover', 'active'],
        },
    },
    plugins: [],
}
