import { defineStore } from 'pinia';
import { computed, shallowRef } from 'vue';
import { PlatformApi } from '../../shared/infrastructure/platform-api.js';
import { BaseEndpoint } from '../../shared/infrastructure/base-endpoint.js';
import { CommercialTransaction } from '../domain/model/commercial-transaction.entity.js';

export const useSalesStore = defineStore('sales', () => {
  const endpoint = new BaseEndpoint(new PlatformApi(), '/transactions');
  const transactions = shallowRef([]);
  const totalSalesRevenue = computed(() => transactions.value.reduce((sum, row) => sum + row.total, 0));
  let generation = 0;

  function reset() {
    generation++;
    transactions.value = [];
  }

  async function fetchTransactions() {
    const current = generation;
    const { data } = await endpoint.getAll();
    if (!Array.isArray(data)) throw new Error('Invalid sales response');
    if (generation === current) transactions.value = data.map(row => new CommercialTransaction(row));
  }

  async function createSale({ customerName, item, quantity }) {
    if (!customerName.trim() || !Number.isFinite(quantity) || quantity <= 0 || quantity > item.availableQuantity) {
      throw new Error('Invalid sale');
    }
    const current = generation;
    const { data } = await endpoint.create({ customerName: customerName.trim(), itemId: item.id, sku: item.sku, quantity });
    if (!data?.id) throw new Error('Sale confirmation unavailable');
    if (generation === current) transactions.value = [new CommercialTransaction(data), ...transactions.value];
  }

  return { transactions, totalSalesRevenue, fetchTransactions, createSale, reset };
});
