import './bootstrap';
import './assets/css/main.css';

import { createApp, h } from 'vue';
import App from './App.vue'; 

import { createInertiaApp } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import PrimeVue from "primevue/config";

createInertiaApp({
    title: (title) => `${title}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.vue`, import.meta.glob('./Pages/**/*.vue')),
    setup({ el, App, props, plugin }) {
        return createApp({ render: () => h(App, props) })
            .use(plugin)
            .use(PrimeVue, {
                theme: "none"
            })            
            // .use(store)
            // .use(PrimeVue, {
            //     unstyled: true,
            //     ripple: true,
            //     locale: ru,
            //     pt: Aura
            //     // theme: {
            //     //     preset: AuraTheme,
            //     //     options: {
            //     //         prefix: 'p',
            //     //         darkModeSelector: '.dark',
            //     //         cssLayer: false
            //     //     }
            //     // }
            // })
            // .use(ZiggyVue)
            // .use(VueResizeObserver)
            // .use(DialogService)
            // .use(ToastService)
            // .use(ConfirmationService)
            // .use(createYmaps({
            //   apikey: '1775cc0b-b875-4589-977c-d378cfe05814',
            // }))
            // .directive('tooltip', Tooltip)
            .mount(el);
    },
    progress: {
        color: '#4B5563',
    },
});
