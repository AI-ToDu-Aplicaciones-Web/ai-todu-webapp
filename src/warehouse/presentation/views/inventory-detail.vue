<script setup>
import {computed,reactive,ref,watch} from 'vue';
import {useRoute} from 'vue-router';
import {useI18n} from 'vue-i18n';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Select from 'primevue/select';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import {useWarehouseStore} from '../../application/warehouse.store.js';
const route=useRoute(),{t,locale}=useI18n(),store=useWarehouseStore();
const item=computed(()=>store.selected),lotId=ref(null),selectedLot=computed(()=>item.value?.lots.find(x=>x.id===lotId.value));
const receipt=reactive({lotCode:'',location:'',expiresOn:'',quantity:null});
const move=reactive({type:'Issue',quantity:null,reason:''});
const count=reactive({expectedQuantity:0,countedQuantity:null,reason:''});
const returned=reactive({quantity:null,disposition:'Restock',reference:'',reason:''});
const state=reactive({reason:'',location:''});
const movementTypes=computed(()=>['Issue','Waste','Adjustment'].map(value=>({value,label:t(value)})));
const dispositions=computed(()=>['Restock','Quarantine','Rejected'].map(value=>({value,label:t(value)})));
const lots=computed(()=>item.value?.lots.map(l=>({value:l.id,label:`${l.code} · ${l.location} (${l.quantity})`}))||[]);
watch(()=>route.params.id,id=>{lotId.value=null;store.fetchItem(id);},{immediate:true});
watch(selectedLot,lot=>{count.expectedQuantity=lot?.quantity??0;count.countedQuantity=null;state.location=lot?.location??'';},{immediate:true});
function date(value){if(!value)return '—';const [year,month,day]=value.slice(0,10).split('-').map(Number);return new Intl.DateTimeFormat(locale.value==='es_419'?'es-PE':'en-US').format(new Date(year,month-1,day));}
async function receive(){if(await store.mutate('receiveLot',{...receipt,expiresOn:receipt.expiresOn||null})){receipt.quantity=null;receipt.lotCode='';}}
async function movement(){if(await store.mutate('recordMovement',{...move,lotId:lotId.value})){move.quantity=null;move.reason='';}}
async function physicalCount(){if(await store.mutate('registerCount',{...count,lotId:lotId.value})){count.countedQuantity=null;count.reason='';}}
async function classify(){if(await store.mutate('classifyReturn',{...returned,sourceLotId:lotId.value})){returned.quantity=null;returned.reference='';returned.reason='';}}
async function quarantine(){if(await store.mutate('changeQuarantine',{isQuarantined:!selectedLot.value.isQuarantined,reason:state.reason},lotId.value))state.reason='';}
async function relocate(){if(await store.mutate('relocateLot',{location:state.location,reason:state.reason},lotId.value))state.reason='';}
</script>
<template>
  <router-link to="/inventory">← {{t('back')}}</router-link>
  <p v-if="store.loading" role="status">{{t('loading')}}</p>
  <template v-else-if="item">
    <div class="warehouse-title"><div><p class="warehouse-eyebrow">{{item.sku}} · {{item.category}}</p><h1>{{item.name}}</h1></div><Button :label="t('refresh')" severity="secondary" icon="pi pi-refresh" @click="store.fetchItem(item.id)"/></div>
    <section class="warehouse-metrics" :aria-label="t('stockOverview')"><div class="warehouse-card"><span>{{t('available')}}</span><strong data-testid="available-stock">{{item.availableQuantity}}</strong></div><div class="warehouse-card"><span>{{t('physical')}}</span><strong data-testid="physical-stock">{{item.totalQuantity}}</strong></div><div class="warehouse-card"><span>{{t('status')}}</span><strong class="warehouse-badge" :class="item.status.toLowerCase()">{{t(item.status)}}</strong></div></section>
    <section class="warehouse-card"><h2>{{t('lots')}}</h2><DataTable :value="item.lots" data-key="id" scrollable><template #empty>{{t('noLots')}}</template><Column field="code" :header="t('lotCode')"/><Column field="location" :header="t('location')"/><Column field="quantity" :header="t('quantity')"/><Column :header="t('expiresOn')"><template #body="{data}">{{date(data.expiresOn)}}</template></Column><Column :header="t('quarantined')"><template #body="{data}">{{t(data.isQuarantined?'yes':'no')}}</template></Column><Column :header="t('expired')"><template #body="{data}">{{t(data.isExpired?'yes':'no')}}</template></Column></DataTable></section>
    <p v-if="!store.canManage" role="status">{{t('readOnly')}}</p>
    <template v-if="store.canManage">
      <form class="warehouse-card warehouse-form" @submit.prevent="receive"><h2>{{t('receive')}}</h2><div class="warehouse-fields">
        <label>{{t('lotCode')}}<InputText id="receipt-code" v-model="receipt.lotCode" required maxlength="64"/></label>
        <label>{{t('location')}}<InputText id="receipt-location" v-model="receipt.location" required maxlength="120"/></label>
        <label>{{t('expiresOn')}}<input id="receipt-expiry" type="date" v-model="receipt.expiresOn"/></label>
        <label>{{t('quantity')}}<InputNumber input-id="receipt-quantity" v-model="receipt.quantity" :min="0.001" :max-fraction-digits="3" required/></label>
      </div><Button type="submit" :label="t('receiveAction')" :loading="store.saving"/></form>
      <section class="warehouse-card"><h2>{{t('operations')}}</h2><label for="operation-lot">{{t('lot')}}</label><Select input-id="operation-lot" v-model="lotId" :options="lots" option-label="label" option-value="value" :placeholder="t('chooseLot')" class="warehouse-lot-select"/><p v-if="!selectedLot">{{t('selectOperation')}}</p>
        <div v-if="selectedLot" class="warehouse-operation-grid">
          <form class="warehouse-operation" @submit.prevent="movement"><h3>{{t('movement')}}</h3><label for="movement-type">{{t('movementType')}}</label><Select input-id="movement-type" v-model="move.type" :options="movementTypes" option-label="label" option-value="value"/>
            <label>{{t('quantity')}}<InputNumber input-id="movement-quantity" v-model="move.quantity" :max-fraction-digits="3" required/></label><small>{{t('quantityHint')}}</small><label>{{t('reason')}}<InputText id="movement-reason" v-model="move.reason" required maxlength="500"/></label><Button type="submit" :label="t('save')" :loading="store.saving"/></form>
          <form class="warehouse-operation" @submit.prevent="physicalCount"><h3>{{t('count')}}</h3><p>{{t('expected')}}: {{count.expectedQuantity}}</p><label>{{t('counted')}}<InputNumber input-id="count-quantity" v-model="count.countedQuantity" :min="0" :max-fraction-digits="3" required/></label><label>{{t('reason')}}<InputText id="count-reason" v-model="count.reason" required maxlength="500"/></label><Button type="submit" :label="t('countAction')" :loading="store.saving"/></form>
          <form class="warehouse-operation" @submit.prevent="classify"><h3>{{t('return')}}</h3><label>{{t('quantity')}}<InputNumber input-id="return-quantity" v-model="returned.quantity" :min="0.001" :max-fraction-digits="3" required/></label><label for="return-disposition">{{t('disposition')}}</label><Select input-id="return-disposition" v-model="returned.disposition" :options="dispositions" option-label="label" option-value="value"/><label>{{t('reference')}}<InputText id="return-reference" v-model="returned.reference" required maxlength="120"/></label><label>{{t('reason')}}<InputText id="return-reason" v-model="returned.reason" required maxlength="500"/></label><Button type="submit" :label="t('returnAction')" :loading="store.saving"/></form>
          <div class="warehouse-operation"><form @submit.prevent="quarantine"><h3>{{t('quarantineAction')}}</h3><label>{{t('reason')}}<InputText id="quarantine-reason" v-model="state.reason" required maxlength="500"/></label><Button type="submit" :label="t(selectedLot.isQuarantined?'release':'isolate')" :loading="store.saving"/></form><form @submit.prevent="relocate"><h3>{{t('relocate')}}</h3><label>{{t('newLocation')}}<InputText id="new-location" v-model="state.location" required maxlength="120"/></label><label>{{t('reason')}}<InputText id="relocation-reason" v-model="state.reason" required maxlength="500"/></label><Button type="submit" :label="t('relocate')" :loading="store.saving"/></form></div>
        </div>
      </section>
    </template>
    <section class="warehouse-card"><h2>{{t('history')}}</h2><DataTable :value="item.movements" data-key="id" paginator :rows="10" scrollable><template #empty>{{t('noMovements')}}</template><Column :header="t('date')"><template #body="{data}">{{date(data.occurredAt)}}</template></Column><Column :header="t('type')"><template #body="{data}">{{t(data.type)}}</template></Column><Column field="change" :header="t('change')"/><Column field="after" :header="t('balance')"/><Column field="reason" :header="t('reason')"/><Column field="actorId" :header="t('actor')"/></DataTable></section>
    <section class="warehouse-card"><h2>{{t('counts')}}</h2><DataTable :value="item.counts" scrollable><template #empty>{{t('noRecords')}}</template><Column field="expectedQuantity" :header="t('expected')"/><Column field="countedQuantity" :header="t('counted')"/><Column field="reason" :header="t('reason')"/></DataTable><h2>{{t('returns')}}</h2><DataTable :value="item.returns" scrollable><template #empty>{{t('noRecords')}}</template><Column field="quantity" :header="t('quantity')"/><Column :header="t('disposition')"><template #body="{data}">{{t(data.disposition)}}</template></Column><Column field="reference" :header="t('reference')"/><Column field="reason" :header="t('reason')"/></DataTable></section>
  </template>
  <p v-else>{{t('noProduct')}}</p>
</template>
