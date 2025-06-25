import defaultTheme from 'tailwindcss/defaultTheme';

export default {
    // blocklist: [
    //     'rounded-md',
    // ],
    // content: [
    //     './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
    //     './storage/framework/views/*.php',
    //     './resources/views/**/*.blade.php',
    //     './resources/js/**/*.vue',
    //     './resources/js/**/*.js',
    // ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
                serif: ['Montserrat', ...defaultTheme.fontFamily.serif]
            },
            colors: {
                'accent-bg': 'var(--accent-bg)',
                'text-white': 'var(--text-white)',
                'white': 'var(--white)',
                'msg-text-fade': 'var(--msg-text-fade)',
                'msg-blue': 'var(--msg-blue)',
            },
            // colors: {
            //     'primary-inverse': 'var(--p-primary-contrast-color)' ,
            //     'primary-hover': 'var(--p-primary-hover-color)' ,
            //     'primary-highlight': 'var(--p-highlight-focus-background)',
            //     'primary-highlight-text': 'var(--p-highlight-color)',
            // },
            // height: {
            //     screen: 'calc(var(--vh) * 100)',
            //     content: 'calc(var(--vh) * 100 - 44px)',
            //     'section-content': 'calc(var(--vh) * 100 - 64px)',
            //     tab: 'calc(var(--vh) * 100 - 140px)',
            // },
            // width: {
            //     content: 'calc(100vw - 17rem)',
            // },
        },
        container: {
            center: true,
        },
    },
    darkMode: 'class',
    plugins: [require('tailwindcss-primeui')],
};
