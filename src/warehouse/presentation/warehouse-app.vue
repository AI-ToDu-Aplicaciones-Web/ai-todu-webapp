<script setup>
import {watch} from 'vue';
import {useRoute,useRouter} from 'vue-router';
import {useI18n} from 'vue-i18n';
import {useWarehouseStore} from '../application/warehouse.store.js';
import {useIamStore} from '../../iam/application/iam_store.js';
const {t,locale}=useI18n(),store=useWarehouseStore(),iam=useIamStore(),route=useRoute(),router=useRouter();
function teKey(code){return ['AuthenticationRequired','Forbidden'].includes(code)?code:'RequestFailed';}
watch(locale,value=>{document.documentElement.lang=value==='es_419'?'es-419':'en-US';},{immediate:true});
watch(()=>iam.currentUser?.id,async id=>{
  store.reset();
  if(id)await store.fetchSession();
  else if(route.meta.requiresAuth)await router.replace({name:'sign-in',query:{redirect:route.fullPath}});
},{immediate:true});
function signOut(){iam.signOut();router.replace({name:'sign-in'});}
</script>
<template>
  <a href="#warehouse-main" class="skip-link">{{locale==='es_419'?'Saltar al contenido':'Skip to content'}}</a>
  <header class="warehouse-header">
    <router-link to="/inventory" class="warehouse-brand"><span aria-hidden="true">AI</span> ToDu</router-link>
    <nav v-if="iam.isAuthenticated" :aria-label="t('inventory')"><router-link to="/inventory">{{t('inventory')}}</router-link><router-link v-if="iam.isOwner" to="/users">{{t('iam.users')}}</router-link></nav>
    <div class="warehouse-languages" role="group" aria-label="Language / Idioma">
      <button type="button" :aria-pressed="locale==='en_US'" @click="locale='en_US'">EN</button>
      <button type="button" :aria-pressed="locale==='es_419'" @click="locale='es_419'">ES</button>
    </div>
    <div v-if="iam.isAuthenticated" class="iam-account"><span :title="iam.currentUser.email">{{iam.currentUser.fullName}}</span><button class="iam-sign-out" type="button" @click="signOut">{{t('iam.signOut')}}</button></div>
  </header>
  <main id="warehouse-main" class="warehouse-main" tabindex="-1">
    <div v-if="store.error&&iam.isAuthenticated" class="warehouse-error" role="alert"><strong>{{t('errorTitle')}}</strong><p>{{store.error.detail || t(teKey(store.error.code))}}</p></div>
    <p v-if="store.notice&&iam.isAuthenticated" class="warehouse-success" role="status">{{t(store.notice)}}</p>
    <router-view/>
  </main>
</template>
