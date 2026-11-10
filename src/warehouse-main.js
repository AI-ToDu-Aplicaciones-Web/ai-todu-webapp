import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createRouter, createWebHashHistory } from 'vue-router';
import { createI18n } from 'vue-i18n';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import 'primeicons/primeicons.css';
import WarehouseApp from './warehouse/presentation/warehouse-app.vue';
import warehouseRoutes from './warehouse/presentation/warehouse-routes.js';
import en from './warehouse/presentation/locales/en.json';
import es from './warehouse/presentation/locales/es.json';
import './warehouse/presentation/warehouse.css';

createApp(WarehouseApp)
  .use(createPinia())
  .use(createI18n({ legacy:false,locale:'en_US',fallbackLocale:'en_US',messages:{en_US:en,es_419:es} }))
  .use(createRouter({history:createWebHashHistory(),routes:warehouseRoutes}))
  .use(PrimeVue,{theme:{preset:Aura,options:{darkModeSelector:'.warehouse-dark'}}})
  .mount('#warehouse-app');
