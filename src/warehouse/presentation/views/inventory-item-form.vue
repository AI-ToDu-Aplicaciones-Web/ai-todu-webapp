<script setup>
import {reactive} from 'vue';
import {useI18n} from 'vue-i18n';
import {useRouter} from 'vue-router';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import {useWarehouseStore} from '../../application/warehouse.store.js';
const {t}=useI18n(),router=useRouter(),store=useWarehouseStore();
const form=reactive({sku:'',name:'',category:'',minimumStock:0,unitPrice:0});
async function save(){const item=await store.registerItem(form);if(item)await router.push({name:'warehouse-inventory-detail',params:{id:item.id}});}
</script>
<template>
  <router-link to="/inventory">← {{t('back')}}</router-link><h1>{{t('newItem')}}</h1><p>{{t('createIntro')}}</p>
  <form class="warehouse-card warehouse-form" @submit.prevent="save">
    <div class="warehouse-fields">
      <label>{{t('sku')}}<InputText id="item-sku" v-model="form.sku" required maxlength="64"/></label>
      <label>{{t('name')}}<InputText id="item-name" v-model="form.name" required maxlength="160"/></label>
      <label>{{t('category')}}<InputText id="item-category" v-model="form.category" required maxlength="100"/></label>
      <label>{{t('minimumStock')}}<InputNumber input-id="item-minimum" v-model="form.minimumStock" :min="0" :max-fraction-digits="3" required/></label>
      <label>{{t('unitPrice')}}<InputNumber input-id="item-price" v-model="form.unitPrice" :min="0" :max-fraction-digits="2" required/></label>
    </div>
    <div class="warehouse-actions"><Button type="submit" :label="t('save')" :loading="store.saving" :disabled="!store.canManage"/><Button type="button" :label="t('cancel')" severity="secondary" @click="router.push('/inventory')"/></div>
  </form>
</template>
