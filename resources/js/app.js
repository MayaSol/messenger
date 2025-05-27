import './bootstrap';
import './assets/css/main.css';

import { createApp, h } from 'vue';
import App from './App.vue'; 

import { createInertiaApp } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import PrimeVue from "primevue/config";
import "primeicons/primeicons.css";
import DialogService from 'primevue/dialogservice';

import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

createInertiaApp({
    title: (title) => `${title}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.vue`, import.meta.glob('./Pages/**/*.vue')),
    setup({ el, App, props, plugin }) {
        const app = createApp({ render: () => h(App, props) })
            app
                .use(plugin)
                .use(PrimeVue, {
                    theme: "none"
                })     
                .use(pinia)    
                .use(DialogService)   

            // .use(ZiggyVue)
            // .use(VueResizeObserver)
            // .use(DialogService)
            // .use(ToastService)
            // .use(ConfirmationService)
            // .use(createYmaps({
            //   apikey: '1775cc0b-b875-4589-977c-d378cfe05814',
            // }))
            // .directive('tooltip', Tooltip)
            app.mount(el);
            return app;
    },
    progress: {
        color: '#4B5563',
    },
});
// Для DevTools (если они не видят Pinia)
