import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { SalesApi } from '../infrastructure/sales-api.service.js';
import { useIamStore } from '../../iam/application/iam_store.js';

export const useSalesStore = defineStore('sales', () => {
  const api = new SalesApi();
  const customers = ref([]), transactions = ref([]), cart = ref([]);
  const total = computed(() => cart.value.reduce((sum, row) => sum + Math.round(row.price * row.quantity * 100) / 100, 0));
  let generation = 0;
  function reset() { generation++; customers.value = []; transactions.value = []; cart.value = []; }
  async function findCustomers(search = '') {
    const session = generation;
    const { data } = await api.customers(search);
    if (session === generation) customers.value = data;
  }
  async function addCustomer(name) { return (await api.addCustomer(name.trim())).data; }
  async function fetchTransactions(range = {}) {
    const session = generation;
    const { data } = await api.history(range);
    if (session === generation) transactions.value = data;
  }
  function addItem(item) {
    if (!item?.canBeSold || cart.value.some(row => row.itemId === item.id)) return;
    cart.value.push({ itemId:item.id, name:item.name, price:item.unitPrice, stock:item.availableQuantity, quantity:Math.min(1,item.availableQuantity) });
  }
  // Keep the operation reference across uncertain responses and page reloads for this account.
  async function sendOnce(kind, payload, send) {
    const key = 'aitodu-operation:' + useIamStore().currentUser.id + ':' + kind;
    const previous = JSON.parse(sessionStorage.getItem(key) || 'null');
    const body = JSON.stringify(payload);
    const operationId = previous?.body === body ? previous.operationId : crypto.randomUUID();
    sessionStorage.setItem(key, JSON.stringify({body, operationId}));
    const response = await send({...payload, operationId});
    sessionStorage.removeItem(key);
    return response.data;
  }
  async function checkout(customerId, paymentAccepted, paymentReference) {
    const items = cart.value.map(({itemId,quantity}) => ({itemId,quantity}));
    const sale = await sendOnce('sale',{customerId,items,paymentAccepted,paymentReference}, body => api.checkout(body));
    cart.value = [];
    return sale;
  }
  function recordReturn(saleId, form) { return sendOnce('return:'+saleId,form, body => api.recordReturn(saleId,body)); }
  async function cancel(id){await api.cancel(id);}
  async function pay(id,reference) { return (await api.pay(id,reference)).data; }
  async function receipt(id) { return (await api.receipt(id)).data; }
  return {customers,transactions,cart,total,reset,findCustomers,addCustomer,fetchTransactions,addItem,checkout,recordReturn,receipt,pay,cancel};
});
