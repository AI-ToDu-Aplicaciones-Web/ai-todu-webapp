<script setup>
import {ref,onBeforeUnmount} from 'vue';
import {useRoute,useRouter} from 'vue-router';
import {useI18n} from 'vue-i18n';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import {useIamStore} from '../../application/iam_store.js';
import {safeAuthRedirect} from '../iam-routes.js';
const iam=useIamStore(),route=useRoute(),router=useRouter(),{t}=useI18n();
const email=ref(''),password=ref('');
onBeforeUnmount(()=>{password.value='';});
async function submit(){
  if(await iam.signIn(email.value,password.value)){
    password.value='';await router.replace(safeAuthRedirect(route.query.redirect));
  }
}
</script>
<template>
  <form class="iam-form" @submit.prevent="submit">
    <label for="sign-in-email">{{t('iam.email')}}</label>
    <InputText id="sign-in-email" v-model="email" type="email" autocomplete="username" required maxlength="254"/>
    <label for="sign-in-password">{{t('iam.password')}}</label>
    <InputText id="sign-in-password" v-model="password" type="password" autocomplete="current-password" required maxlength="72"/>
    <p v-if="iam.error" class="warehouse-error" role="alert">{{t(`iam.errors.${iam.error.code}`)}}</p>
    <Button type="submit" :label="t('iam.signIn')" :loading="iam.busy"/>
  </form>
</template>
