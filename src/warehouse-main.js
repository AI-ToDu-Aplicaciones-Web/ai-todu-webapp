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
import './iam/presentation/iam.css';
import {iamRoutes,safeAuthRedirect} from './iam/presentation/iam-routes.js';
import {useIamStore} from './iam/application/iam_store.js';

const pinia=createPinia();
const router=createRouter({history:createWebHashHistory(),routes:[...iamRoutes,...warehouseRoutes]});
router.beforeEach(async to=>{
  const iam=useIamStore(pinia);await iam.restore();
  if(to.meta.requiresAuth&&!iam.isAuthenticated)return {name:'sign-in',query:{redirect:to.fullPath}};
  if(to.meta.ownerOnly&&!iam.isOwner)return {name:'warehouse-inventory'};
  if(to.meta.guestOnly&&iam.isAuthenticated)return safeAuthRedirect(to.query.redirect);
});

createApp(WarehouseApp)
  .use(pinia)
  .use(createI18n({ legacy:false,locale:'en_US',fallbackLocale:'en_US',messages:{en_US:en,es_419:es} }))
  .use(router)
  .use(PrimeVue,{theme:{preset:Aura,options:{darkModeSelector:'.warehouse-dark'}}})
  .mount('#warehouse-app');
