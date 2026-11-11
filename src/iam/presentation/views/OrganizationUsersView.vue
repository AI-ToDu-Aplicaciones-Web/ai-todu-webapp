<script setup>
import {computed,onMounted,onBeforeUnmount,reactive,ref} from 'vue';
import {useI18n} from 'vue-i18n';
import {useIamStore} from '../../application/iam_store.js';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Select from 'primevue/select';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
const iam=useIamStore(),{t}=useI18n();
const form=reactive({fullName:'',email:'',password:'',role:'WAREHOUSE_OPERATOR'});
const saved=ref(false), editing=ref(null);
function edit(user){editing.value={id:user.id,role:user.role,inventory:user.canManageStock,sales:user.canSell};}
async function saveAccess(){const {id,...resource}=editing.value;if(await iam.setAccess(id,resource))editing.value=null;}
const roles=computed(()=>['WAREHOUSE_OPERATOR','SALES_CLERK'].map(value=>({value,label:t(`iam.roles.${value}`)})));
onMounted(()=>iam.loadUsers());onBeforeUnmount(()=>{form.password='';});
async function create(){
  saved.value=false;
  if(await iam.createUser({...form})){
    form.fullName='';form.email='';form.password='';saved.value=true;
  }
}
</script>
<template>
  <div class="warehouse-title"><div><p class="warehouse-eyebrow">{{iam.currentUser?.organizationName}}</p><h1>{{t('iam.users')}}</h1><p>{{t('iam.usersIntro')}}</p></div></div>
  <p v-if="iam.error" class="warehouse-error" role="alert">{{t(`iam.errors.${iam.error.code}`)}}</p>
  <p v-if="saved" class="warehouse-success" role="status">{{t('iam.userCreated')}}</p>
  <section class="warehouse-card"><h2>{{t('iam.newUser')}}</h2>
    <form class="warehouse-form" @submit.prevent="create"><div class="warehouse-fields">
      <label>{{t('iam.fullName')}}<InputText id="staff-name" v-model="form.fullName" required maxlength="160" autocomplete="off"/></label>
      <label>{{t('iam.email')}}<InputText id="staff-email" v-model="form.email" type="email" required maxlength="254" autocomplete="off"/></label>
      <label>{{t('iam.initialPassword')}}<InputText id="staff-password" v-model="form.password" type="password" required minlength="12" maxlength="72" autocomplete="new-password"/></label>
      <label for="staff-role">{{t('iam.role')}}<Select input-id="staff-role" v-model="form.role" :options="roles" option-label="label" option-value="value"/></label>
    </div><p>{{t('iam.passwordHint')}}</p><Button type="submit" :label="t('iam.newUser')" :loading="iam.busy"/></form>
  </section>
  <section class="warehouse-card"><h2>{{t('iam.users')}}</h2>
    <DataTable :value="iam.users" :loading="iam.loadingUsers" data-key="id" scrollable>
      <Column field="fullName" :header="t('iam.fullName')"/><Column field="email" :header="t('iam.email')"/>
      <Column :header="t('iam.role')"><template #body="{data}">{{t(`iam.roles.${data.role}`)}}</template></Column>
      <Column :header="t('status')"><template #body="{data}">{{t(data.isActive?'iam.active':'iam.disabled')}}</template></Column>
      <Column><template #body="{data}"><Button v-if="data.role!=='BUSINESS_OWNER'" :label="t('ops.permissions')" @click="edit(data)"/></template></Column>
      <Column><template #body="{data}"><Button :label="t(data.isActive?'iam.disable':'iam.enable')" :severity="data.isActive?'danger':'secondary'" :disabled="iam.busy||data.id===iam.currentUser?.id" @click="iam.setUserStatus(data.id,!data.isActive)"/></template></Column>
    </DataTable>
    <form v-if="editing" class="warehouse-form" @submit.prevent="saveAccess"><h3>{{t('ops.permissions')}}</h3>
      <label>{{t('iam.role')}} <select v-model="editing.role"><option v-for="r in roles" :key="r.value" :value="r.value">{{r.label}}</option></select></label>
      <label><input type="checkbox" v-model="editing.inventory"> {{t('ops.editInventory')}}</label>
      <label><input type="checkbox" v-model="editing.sales"> {{t('sales.title')}}</label><button :disabled="iam.busy">{{t('save')}}</button>
    </form>
  </section>
</template>
