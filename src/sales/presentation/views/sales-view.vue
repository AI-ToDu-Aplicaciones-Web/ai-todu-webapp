<script setup>
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';
import { useSalesStore } from '../../application/sales.store.js';
import { useWarehouseStore } from '../../../warehouse/application/warehouse.store.js';
const {t,locale}=useI18n(), sales=useSalesStore(), stock=useWarehouseStore(), route=useRoute();
const pendingPayments=ref({}), from=ref(''), to=ref('');
const customer=ref(''), search=ref(''), product=ref(null), payment=ref(true), reference=ref('');
const busy=ref(false), error=ref(''), receipt=ref(null), selected=ref(null), returnQty=ref(1), reason=ref(''), disposition=ref('Restock');
const money=n=>new Intl.NumberFormat(locale.value==='es_419'?'es-PE':'en-US',{style:'currency',currency:'PEN'}).format(n);
async function act(fn){
  if(busy.value)return;
  busy.value=true; error.value='';
  try{await fn();}catch(e){error.value=e.response?.data?.detail || t('sales.unavailable');}finally{busy.value=false;}
}
async function refresh(){await Promise.all([sales.fetchTransactions({from:from.value||undefined,to:to.value||undefined}),stock.fetchItems()]);}
onMounted(()=>act(async()=>{
  await Promise.all([refresh(),sales.findCustomers()]);
  if(route.query.item){const item=await stock.fetchItem(route.query.item);if(item)sales.addItem(item);}
}));
async function registerCustomer(){const row=await sales.addCustomer(search.value);await sales.findCustomers();customer.value=row.id;search.value='';}
async function confirm(){const sale=await sales.checkout(customer.value,payment.value,reference.value);reference.value='';receipt.value=sale.receipt?await sales.receipt(sale.id):null;await refresh();}
async function submitReturn(){const {sale,line}=selected.value;await sales.recordReturn(sale.id,{lineId:line.id,quantity:returnQty.value,reason:reason.value,disposition:disposition.value});selected.value=null;reason.value='';await refresh();}
</script>
<template>
  <h1>{{t('sales.title')}}</h1><p v-if="error" role="alert">{{error}}</p>
  <fieldset :disabled="busy" class="warehouse-card warehouse-form">
    <legend>{{t('sales.customer')}}</legend>
    <label>{{t('search')}} <input v-model.trim="search" maxlength="160"></label>
    <div><button @click="act(()=>sales.findCustomers(search))">{{t('searchAction')}}</button>
    <button :disabled="!search" @click="act(registerCustomer)">{{t('ops.addCustomer')}}</button></div>
    <select v-model="customer" :aria-label="t('sales.customer')"><option disabled value="">—</option><option v-for="c in sales.customers" :key="c.id" :value="c.id">{{c.name}}</option></select>
  </fieldset>
  <form class="warehouse-card warehouse-form" @submit.prevent="act(confirm)">
    <h2>{{t('ops.cart')}}</h2>
    <label>{{t('search')}} <input v-model="stock.searchQuery" maxlength="160"></label>
    <button type="button" @click="act(async()=>{stock.page=1;await stock.fetchItems()})">{{t('searchAction')}}</button>
    <select v-model="product" :aria-label="t('inventory')"><option v-for="item in stock.items.filter(i=>i.canBeSold)" :key="item.id" :value="item.id">{{item.sku}} · {{item.name}}</option></select>
    <button type="button" @click="sales.addItem(stock.items.find(i=>i.id===product))">{{t('ops.addItem')}}</button>
    <div v-for="(row,index) in sales.cart" :key="row.itemId"><label>{{row.name}} · {{money(row.price)}} <input v-model.number="row.quantity" type="number" step="0.001" min="0.001" :max="row.stock" required></label>
    <button type="button" @click="sales.cart.splice(index,1)">{{t('ops.remove')}}</button></div>
    <strong>Total · {{money(sales.total)}}</strong>
    <label>{{t('ops.payment')}} <select v-model="payment"><option :value="true">{{t('ops.accepted')}}</option><option :value="false">{{t('ops.rejected')}}</option></select></label>
    <label>{{t('reference')}} <input v-model.trim="reference" maxlength="160" required></label>
    <button :disabled="busy || !customer || !sales.cart.length">{{t('sales.confirm')}}</button>
  </form>
  <section v-if="receipt" class="warehouse-card"><h2>{{t('ops.receipt')}}</h2>
    <p>{{receipt.receipt}} · {{receipt.customerName}} · {{receipt.paymentReference}}</p>
    <ul><li v-for="line in receipt.lines" :key="line.id">{{line.name}} × {{line.quantity}} · {{money(line.amount)}}</li></ul>
    <strong>Total · {{money(receipt.total)}}</strong></section>
  <section class="warehouse-card"><h2>{{t('sales.history')}}</h2>
    <form @submit.prevent="act(refresh)"><label>{{t('ops.from')}} <input type="date" v-model="from" :max="to||undefined"></label><label>{{t('ops.to')}} <input type="date" v-model="to" :min="from||undefined"></label><button>{{t('searchAction')}}</button></form>
    <p v-if="!sales.transactions.length">{{t('sales.empty')}}</p>
    <article v-for="sale in sales.transactions" :key="sale.id"><h3>{{sale.customerName}} · {{money(sale.total)}}</h3>
    <p>{{t(sale.status==='Paid'?'ops.accepted':sale.status==='Cancelled'?'ops.cancelled':'ops.pending')}} · {{sale.paymentReference}}</p>
    <button v-if="sale.status==='Pending'" :disabled="busy" @click="act(async()=>{await sales.cancel(sale.id);await refresh()})">{{t('cancel')}}</button>
    <form v-if="sale.status==='Pending'" @submit.prevent="act(async()=>{await sales.pay(sale.id,pendingPayments[sale.id]);await refresh()})"><label>{{t('reference')}} <input v-model.trim="pendingPayments[sale.id]" required maxlength="160"></label><button :disabled="busy">{{t('ops.collect')}}</button></form>
    <button v-if="sale.receipt" @click="act(async()=>receipt=await sales.receipt(sale.id))">{{t('ops.receipt')}}</button>
    <ul><li v-for="line in sale.lines" :key="line.id">{{line.sku}} × {{line.quantity}} · {{money(line.amount)}}
    <button v-if="sale.receipt && line.quantity>line.returned" @click="selected={sale,line};returnQty=Math.min(1,line.quantity-line.returned)">{{t('return')}}</button></li></ul></article>
  </section>
  <form v-if="selected" class="warehouse-card warehouse-form" @submit.prevent="act(submitReturn)">
    <h2>{{t('return')}} · {{selected.line.sku}}</h2>
    <label>{{t('quantity')}} <input v-model.number="returnQty" type="number" step="0.001" min="0.001" :max="selected.line.quantity-selected.line.returned" required></label>
    <label>{{t('disposition')}} <select v-model="disposition"><option v-for="d in ['Restock','Quarantine','Rejected']" :key="d" :value="d">{{t(d)}}</option></select></label>
    <label>{{t('reason')}} <input v-model.trim="reason" maxlength="160" required></label><button :disabled="busy">{{t('returnAction')}}</button>
  </form>
</template>
