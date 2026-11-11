<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useSalesStore } from '../../application/sales.store.js';
import { useWarehouseStore } from '../../../warehouse/application/warehouse.store.js';

const { t } = useI18n();
const route = useRoute();
const sales = useSalesStore();
const warehouse = useWarehouseStore();
const state = ref('loading');
const customer = ref('');
const quantity = ref(1);
const item = computed(() => String(warehouse.selected?.id) === route.query.item ? warehouse.selected : null);

async function load() {
  state.value = 'loading';
  try {
    await sales.fetchTransactions();
    if (route.query.item) await warehouse.fetchItem(route.query.item);
    state.value = 'ready';
  } catch {
    state.value = 'unavailable';
  }
}

async function submit() {
  if (state.value !== 'ready' || !item.value) return;
  state.value = 'sending';
  try {
    await sales.createSale({ customerName: customer.value, item: item.value, quantity: quantity.value });
    await warehouse.fetchItem(route.query.item);
    state.value = 'saved';
  } catch {
    state.value = 'uncertain';
  }
}

onMounted(load);
</script>
<template>
  <h1>{{ t('sales.title') }}</h1>
  <p v-if="state !== 'ready'" role="status">{{ t('sales.' + state) }}</p>
  <button v-if="['unavailable','uncertain','saved'].includes(state)" @click="load">{{ t('refresh') }}</button>
  <section v-if="['ready','sending','saved'].includes(state)" class="warehouse-card">
    <form v-if="item && state !== 'saved'" class="warehouse-form" @submit.prevent="submit">
      <h2>{{ item.name }} · {{ item.sku }}</h2>
      <label>{{ t('sales.customer') }} <input v-model.trim="customer" required maxlength="160"></label>
      <label>{{ t('sales.quantity') }} <input v-model.number="quantity" type="number" required min="0.001" step="0.001" :max="item.availableQuantity"></label>
      <button :disabled="state !== 'ready' || !item.canBeSold">{{ t('sales.confirm') }}</button>
    </form>
    <router-link to="/inventory">{{ t('back') }}</router-link>
    <h2>{{ t('sales.history') }}</h2>
    <p v-if="!sales.transactions.length">{{ t('sales.empty') }}</p>
    <ul v-else><li v-for="row in sales.transactions" :key="row.id">{{ row.customerName }} · {{ row.itemName }} × {{ row.quantity }}</li></ul>
  </section>
</template>
