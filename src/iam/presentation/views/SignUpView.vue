<script setup>
import {useI18n} from 'vue-i18n';
import RegisterForm from '../components/RegisterForm.vue';
const {t}=useI18n();
</script>
<template>
  <section class="warehouse-card iam-card">
    <p class="warehouse-eyebrow">AI-ToDu</p><h1>{{t('iam.createAccount')}}</h1><p>{{t('iam.signUpIntro')}}</p>
    <RegisterForm/>
    <p>{{t('iam.haveAccount')}} <router-link to="/sign-in">{{t('iam.signIn')}}</router-link></p>
    <a href="./index.html">{{t('iam.backToWebsite')}}</a>
  </section>
</template>
