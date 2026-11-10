<script setup>
import {useRoute} from 'vue-router';
import {useI18n} from 'vue-i18n';
import LoginForm from '../components/LoginForm.vue';
const {t}=useI18n(),route=useRoute();
</script>
<template>
  <section class="warehouse-card iam-card">
    <p class="warehouse-eyebrow">AI-ToDu</p><h1>{{t('iam.welcome')}}</h1><p>{{t('iam.signInIntro')}}</p>
    <p v-if="route.query.registered==='1'" class="warehouse-success" role="status">{{t('iam.registered')}}</p>
    <LoginForm/>
    <p>{{t('iam.noAccount')}} <router-link to="/sign-up">{{t('iam.createAccount')}}</router-link></p>
    <a href="./index.html">{{t('iam.backToWebsite')}}</a>
  </section>
</template>
