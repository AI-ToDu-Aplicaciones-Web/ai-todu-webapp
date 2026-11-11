<script setup>
import {onMounted,ref} from 'vue';
import {useRoute} from 'vue-router';
import {useI18n} from 'vue-i18n';
import {useIamStore} from '../../iam/application/iam_store.js';
import {useOrganizationStore} from '../application/organization.store.js';
const route=useRoute();
const {t}=useI18n(), iam=useIamStore(), store=useOrganizationStore();
const reason=ref('');
const plan=ref('starter'),busy=ref(false),error=ref('');
async function run(fn){busy.value=true;error.value='';try{await fn();}catch(e){error.value=e.response?.data?.detail||t('RequestFailed');}finally{busy.value=false;}}
onMounted(()=>run(async()=>{await Promise.all([store.load(iam.isOwner),store.loadReasons()]);plan.value=['starter','growth','enterprise'].includes(route.query.plan)?route.query.plan:(store.subscription?.plan||'starter');}));
</script>
<template>
  <h1>{{t('ops.organization')}}</h1><p v-if="error" role="alert">{{error}}</p>
  <section v-if="iam.isOwner && store.subscription" class="warehouse-card"><h2>{{t('ops.subscription')}}</h2>
    <p>{{store.subscription.plan}} · {{t('ops.seats')}} {{store.subscription.userLimit??'∞'}} · SKU {{store.subscription.skuLimit??'∞'}}</p>
    <select v-model="plan" :aria-label="t('ops.subscription')"><option value="starter">MYPE Starter</option><option value="growth">Business Growth</option><option value="enterprise">Enterprise AI &amp; IoT</option></select>
    <button :disabled="busy" @click="run(()=>store.choose(plan))">{{t('save')}}</button></section>
  <section class="warehouse-card"><h2>{{t('ops.notifications')}}</h2><p v-if="!store.alerts.length">{{t('ops.noAlerts')}}</p>
    <ul><li v-for="n in store.alerts" :key="n.key"><router-link :to="'/inventory/'+n.itemId">{{n.sku}}</router-link> · {{t('ops.'+n.kind)}} · {{n.expiresOn||n.quantity}}
    <button v-if="!n.isRead" :disabled="busy" @click="run(()=>store.read(n.key))">{{t('ops.markRead')}}</button><span v-else>{{t('ops.read')}}</span></li></ul></section>
  <form v-if="iam.isOwner" class="warehouse-card warehouse-form" @submit.prevent="run(async()=>{await store.addReason(reason);reason=''})"><label>{{t('ops.reasons')}} <input v-model.trim="reason" maxlength="120" required></label><button :disabled="busy">{{t('save')}}</button><ul><li v-for="row in store.reasons" :key="row.id">{{row.name}}</li></ul></form>
  <section v-if="iam.isOwner" class="warehouse-card"><h2>{{t('ops.audit')}}</h2><ul>
    <li v-for="entry in store.activity" :key="entry.id">{{new Date(entry.occurredAt).toLocaleString()}} · {{entry.actorId}} · {{entry.method}} {{entry.path}}</li></ul></section>
</template>
