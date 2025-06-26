import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { PrimeVueResolver } from '@primevue/auto-import-resolver';
import { cpSync } from 'fs';

export default defineConfig({
    define: {
        __VUE_PROD_DEVTOOLS__: true,
    },
    build: {
        minify: false,
        terserOptions: { mangle: false },
        rollupOptions: { output: { manualChunks: undefined } },        
    },        
    plugins: [
        laravel({
            // input: ['resources/css/app.css', 'resources/js/app.js'],
            input: 'resources/js/app.js',
            refresh: true,
        }),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),     
        {
            name: 'copy-fonts',
                closeBundle() {
                    cpSync('public/fonts', 'public/build/fonts', { recursive: true });
                }
        },           
        {
            name: 'copy-videos',
                closeBundle() {
                    cpSync('public/videos', 'public/build/videos', { recursive: true });
                }
        },           
        {
            name: 'copy-audios',
                closeBundle() {
                    cpSync('public/audios', 'public/build/audios', { recursive: true });
                }
        },           
        tailwindcss(),
        Components({
            resolvers: [
                PrimeVueResolver()
            ]
        })        
    ],
});
