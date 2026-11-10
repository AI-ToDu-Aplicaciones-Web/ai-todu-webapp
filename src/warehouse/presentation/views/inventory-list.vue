<script setup>
import {onMounted} from 'vue';
import {useI18n} from 'vue-i18n';
import {useRouter} from 'vue-router';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import {useWarehouseStore} from '../../application/warehouse.store.js';
const {t}=useI18n(),router=useRouter(),store=useWarehouseStore();
onMounted(()=>store.fetchItems());
function search(){store.page=1;store.fetchItems();}
function changePage(delta){store.page+=delta;store.fetchItems();}
</script>
<template>
  <div class="warehouse-title"><div><p class="warehouse-eyebrow">AI-ToDu / {{t('inventory')}}</p><h1>{{t('inventory')}}</h1><p>{{t('inventoryDescription')}}</p></div><Button v-if="store.canManage" :label="t('newItem')" icon="pi pi-plus" @click="router.push({name:'warehouse-inventory-new'})"/></div>
  <section class="warehouse-card">
    <form class="warehouse-search" @submit.prevent="search"><label for="inventory-search" class="sr-only">{{t('search')}}</label><InputText id="inventory-search" v-model="store.searchQuery" :placeholder="t('search')" maxlength="160"/><Button type="submit" :label="t('searchAction')" :loading="store.loading"/></form>
    <DataTable :value="store.items" :loading="store.loading" data-key="id" striped-rows scrollable>
      <template #empty>{{t('empty')}}</template>
      <Column field="sku" :header="t('sku')"/><Column field="name" :header="t('name')"/><Column field="category" :header="t('category')"/>
      <Column field="availableQuantity" :header="t('available')"/><Column field="totalQuantity" :header="t('physical')"/>
      <Column :header="t('status')"><template #body="{data}"><span class="warehouse-badge" :class="data.status.toLowerCase()">{{t(data.status)}}</span></template></Column>
      <Column><template #body="{data}"><Button :label="t('details')" text :aria-label="`${t('details')}: ${data.name}`" @click="router.push({name:'warehouse-inventory-detail',params:{id:data.id}})"/></template></Column>
    </DataTable>
    <div class="warehouse-pagination"><Button :label="t('previous')" severity="secondary" :disabled="store.page<=1 || store.loading" @click="changePage(-1)"/><span>{{store.page}} · {{store.total}}</span><Button :label="t('next')" severity="secondary" :disabled="store.page*store.pageSize>=store.total || store.loading" @click="changePage(1)"/></div>
  </section>
</template>
