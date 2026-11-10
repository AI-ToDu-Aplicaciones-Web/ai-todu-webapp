<script setup>
import {reactive,ref,onBeforeUnmount} from 'vue';
import {useRouter} from 'vue-router';
import {useI18n} from 'vue-i18n';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import {useIamStore} from '../../application/iam_store.js';
const iam=useIamStore(),router=useRouter(),{t}=useI18n();
const form=reactive({organizationName:'',fullName:'',email:'',password:''});
const confirmation=ref(''),mismatch=ref(false);
onBeforeUnmount(()=>{form.password='';confirmation.value='';});
async function submit(){
  mismatch.value=form.password!==confirmation.value;if(mismatch.value)return;
  if(await iam.signUp({...form})){
    form.password='';confirmation.value='';await router.replace({name:'sign-in',query:{registered:'1'}});
  }
}
</script>
<template>
  <form class="iam-form" @submit.prevent="submit">
    <label for="sign-up-organization">{{t('iam.organization')}}</label>
    <InputText id="sign-up-organization" v-model="form.organizationName" autocomplete="organization" required maxlength="160"/>
    <label for="sign-up-name">{{t('iam.fullName')}}</label>
    <InputText id="sign-up-name" v-model="form.fullName" autocomplete="name" required maxlength="160"/>
    <label for="sign-up-email">{{t('iam.email')}}</label>
    <InputText id="sign-up-email" v-model="form.email" type="email" autocomplete="username" required maxlength="254"/>
    <label for="sign-up-password">{{t('iam.password')}}</label>
    <InputText id="sign-up-password" v-model="form.password" type="password" autocomplete="new-password" required minlength="12" maxlength="72" aria-describedby="password-hint"/>
    <small id="password-hint">{{t('iam.passwordHint')}}</small>
    <label for="sign-up-confirm">{{t('iam.confirmPassword')}}</label>
    <InputText id="sign-up-confirm" v-model="confirmation" type="password" autocomplete="new-password" required minlength="12" maxlength="72"/>
    <p v-if="mismatch" class="warehouse-error" role="alert">{{t('iam.passwordMismatch')}}</p>
    <p v-if="iam.error" class="warehouse-error" role="alert">{{t(`iam.errors.${iam.error.code}`)}}</p>
    <Button type="submit" :label="t('iam.createAccount')" :loading="iam.busy"/>
  </form>
</template>
