<script setup>
import {onMounted,watch} from 'vue';
import {useI18n} from 'vue-i18n';
import {useWarehouseStore} from '../application/warehouse.store.js';
const {t,locale}=useI18n();
const store=useWarehouseStore();
function teKey(code){return ['AuthenticationRequired','Forbidden'].includes(code)?code:'RequestFailed';}
watch(locale,value=>{document.documentElement.lang=value==='es_419'?'es-419':'en-US';},{immediate:true});
onMounted(()=>store.fetchSession());
</script>
<template>
  <a href="#warehouse-main" class="skip-link">{{locale==='es_419'?'Saltar al contenido':'Skip to content'}}</a>
  <header class="warehouse-header">
    <router-link to="/inventory" class="warehouse-brand"><span aria-hidden="true">AI</span> ToDu</router-link>
    <nav :aria-label="t('inventory')"><router-link to="/inventory">{{t('inventory')}}</router-link></nav>
    <div class="warehouse-languages" role="group" aria-label="Language / Idioma">
      <button type="button" :aria-pressed="locale==='en_US'" @click="locale='en_US'">EN</button>
      <button type="button" :aria-pressed="locale==='es_419'" @click="locale='es_419'">ES</button>
    </div>
  </header>
  <main id="warehouse-main" class="warehouse-main" tabindex="-1">
    <p v-if="store.session?.developmentIdentity" class="warehouse-demo" role="status">{{t('development')}}</p>
    <div v-if="store.error" class="warehouse-error" role="alert"><strong>{{t('errorTitle')}}</strong><p>{{store.error.detail || t(teKey(store.error.code))}}</p></div>
    <p v-if="store.notice" class="warehouse-success" role="status">{{t(store.notice)}}</p>
    <router-view/>
  </main>
</template>
