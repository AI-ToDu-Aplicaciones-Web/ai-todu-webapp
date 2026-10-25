<script setup>
import { useI18n } from 'vue-i18n';
import LanguageSwitcher from './shared/presentation/components/LanguageSwitcher.vue'; // Ajusta la ruta a tu componente

const { t } = useI18n();

const goToApp = (route) => {
  // Redirige a la URL real de tu Web App desplegada
  window.location.href = `https://tu-url-de-la-webapp.com/${route}`;
};
</script>

<template>
  <div class="landing-wrapper">
    <!-- NAVEGACIÓN -->
    <header class="flex justify-content-between align-items-center py-3 px-5 shadow-1 fixed top-0 w-full bg-white z-5" role="banner">
      <div class="text-2xl font-bold text-primary flex align-items-center" aria-label="Logo AI-ToDu">
        <i class="pi pi-box mr-2" aria-hidden="true"></i>AI-ToDu
      </div>
      <nav class="hidden md:flex gap-4 align-items-center" aria-label="Navegación principal">
        <a href="#hero" class="text-gray-700 no-underline hover:text-primary font-medium">{{ t('nav.home') }}</a>
        <a href="#purpose" class="text-gray-700 no-underline hover:text-primary font-medium">{{ t('nav.purpose') }}</a>
        <a href="#segments" class="text-gray-700 no-underline hover:text-primary font-medium">{{ t('nav.segments') }}</a>
        <a href="#pricing" class="text-gray-700 no-underline hover:text-primary font-medium">{{ t('nav.pricing') }}</a>
        <a href="#team" class="text-gray-700 no-underline hover:text-primary font-medium">{{ t('nav.team') }}</a>
      </nav>
      <div class="flex align-items-center gap-3">
        <LanguageSwitcher />
        <button class="p-button p-component p-button-primary font-bold border-round-lg" @click="goToApp('login')">
          {{ t('nav.login') }}
        </button>
      </div>
    </header>

    <!-- 1. HERO SECTION (Pitch Message + CTA Principal) -->
    <section id="hero" class="grid grid-nogutter align-items-center px-4 pt-8 pb-6 mt-6 bg-blue-50" aria-labelledby="hero-title">
      <div class="col-12 md:col-6 text-center md:text-left p-4">
        <h1 id="hero-title" class="text-5xl md:text-6xl font-extrabold text-gray-900 mb-3">
          {{ t('hero.title') }} <span class="text-primary">{{ t('hero.titleHighlight') }}</span>
        </h1>
        <p class="text-xl text-gray-600 mb-5 line-height-3">
          {{ t('hero.subtitle') }}
        </p>
        <button class="p-button p-component p-button-lg font-bold border-round-lg shadow-2" @click="goToApp('register')">
          {{ t('hero.cta') }} <i class="pi pi-arrow-right ml-2"></i>
        </button>
      </div>
      <div class="col-12 md:col-6 flex justify-content-center p-4">
        <!-- Requisito: Screenshot de la Web App -->
        <img src="/assets/app-mockup.png" alt="AI-ToDu Dashboard Preview" class="w-full max-w-30rem border-round-xl shadow-4" />
      </div>
    </section>

    <!-- 2. PROPÓSITO DE LA PLATAFORMA -->
    <section id="purpose" class="py-8 px-4 max-w-7xl mx-auto" aria-labelledby="purpose-title">
      <div class="text-center mb-6">
        <h2 id="purpose-title" class="text-3xl font-bold text-gray-900 mb-2">{{ t('purpose.title') }}</h2>
      </div>
      <div class="grid justify-content-center gap-4 mt-5">
        <div class="col-12 md:col-4 p-4 text-center bg-white shadow-2 border-round-xl">
          <i class="pi pi-box text-5xl text-primary mb-4" aria-hidden="true"></i>
          <h3 class="text-xl font-bold mb-3">{{ t('purpose.inv') }}</h3>
          <p class="text-gray-600 line-height-3">{{ t('purpose.invDesc') }}</p>
        </div>
        <div class="col-12 md:col-4 p-4 text-center bg-white shadow-2 border-round-xl">
          <i class="pi pi-chart-line text-5xl text-primary mb-4" aria-hidden="true"></i>
          <h3 class="text-xl font-bold mb-3">{{ t('purpose.sales') }}</h3>
          <p class="text-gray-600 line-height-3">{{ t('purpose.salesDesc') }}</p>
        </div>
        <div class="col-12 md:col-4 p-4 text-center bg-white shadow-2 border-round-xl">
          <i class="pi pi-truck text-5xl text-primary mb-4" aria-hidden="true"></i>
          <h3 class="text-xl font-bold mb-3">{{ t('purpose.dispatch') }}</h3>
          <p class="text-gray-600 line-height-3">{{ t('purpose.dispatchDesc') }}</p>
        </div>
      </div>
    </section>

    <!-- 3. SEGMENTOS OBJETIVO CON CTAs -->
    <section id="segments" class="py-8 px-4 bg-gray-900 text-white text-center">
      <h2 class="text-3xl font-bold mb-6">{{ t('segments.title') }}</h2>
      <div class="grid max-w-7xl mx-auto">
        <div class="col-12 md:col-6 p-4">
          <div class="p-5 border-1 border-gray-700 border-round-xl bg-gray-800">
            <i class="pi pi-briefcase text-4xl text-blue-400 mb-3"></i>
            <h3 class="text-2xl font-bold mb-3">{{ t('segments.owner') }}</h3>
            <p class="text-gray-400 mb-4">{{ t('segments.ownerDesc') }}</p>
            <button class="p-button p-component p-button-outlined text-white" @click="goToApp('dashboard')">{{ t('segments.ownerCta') }}</button>
          </div>
        </div>
        <div class="col-12 md:col-6 p-4">
          <div class="p-5 border-1 border-gray-700 border-round-xl bg-gray-800">
            <i class="pi pi-users text-4xl text-green-400 mb-3"></i>
            <h3 class="text-2xl font-bold mb-3">{{ t('segments.worker') }}</h3>
            <p class="text-gray-400 mb-4">{{ t('segments.workerDesc') }}</p>
            <button class="p-button p-component p-button-outlined text-white" @click="goToApp('inventory')">{{ t('segments.workerCta') }}</button>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. ACERCA DEL EQUIPO Y PRODUCTO (VIDEOS) -->
    <section id="team" class="py-8 px-4 max-w-7xl mx-auto text-center">
      <h2 class="text-3xl font-bold mb-5">Conoce más sobre AI-ToDu</h2>
      <div class="grid">
        <div class="col-12 md:col-6 p-3">
          <h3 class="mb-3">About the Product</h3>
          <!-- Reemplazar con el iframe de Microsoft Stream / Youtube -->
          <div class="bg-gray-200 border-round-xl flex align-items-center justify-content-center" style="height: 300px;">
            <p class="text-gray-500">[ Video Placeholder: Producto ]</p>
          </div>
        </div>
        <div class="col-12 md:col-6 p-3">
          <h3 class="mb-3">About the Team (IA-INNOVATION)</h3>
          <!-- Reemplazar con el iframe de Microsoft Stream / Youtube -->
          <div class="bg-gray-200 border-round-xl flex align-items-center justify-content-center" style="height: 300px;">
            <p class="text-gray-500">[ Video Placeholder: Equipo ]</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 5. PRECIOS (US01) -->
    <section id="pricing" class="py-8 px-4 bg-gray-50">
      <div class="text-center mb-6">
        <h2 class="text-3xl font-bold">{{ t('pricing.title') }}</h2>
      </div>
      <!-- Aquí puedes mantener tu grid de precios actual de los planes -->
      <p class="text-center text-gray-500">[ Planes: Básico | Pro | Equipos ]</p>
    </section>

    <!-- 6. FOOTER CON SOCIAL MEDIA, CONTACTO Y ÉTICA -->
    <footer class="bg-gray-900 text-white py-6" role="contentinfo">
      <div class="max-w-7xl mx-auto px-4 grid">
        <!-- Contacto -->
        <div class="col-12 md:col-4 mb-4 md:mb-0">
          <h3 class="text-xl font-bold mb-3">AI-ToDu</h3>
          <p class="text-gray-400 mb-2"><i class="pi pi-envelope mr-2"></i> contacto@ia-innovation.com</p>
          <p class="text-gray-400"><i class="pi pi-phone mr-2"></i> +51 987 654 321</p>
        </div>
        <!-- Social Media -->
        <div class="col-12 md:col-4 mb-4 md:mb-0 text-center">
          <h3 class="text-xl font-bold mb-3">Síguenos</h3>
          <div class="flex justify-content-center gap-4">
            <a href="https://facebook.com" target="_blank" aria-label="Facebook" class="text-gray-400 hover:text-white"><i class="pi pi-facebook text-2xl"></i></a>
            <a href="https://linkedin.com/company/ia-innovation" target="_blank" aria-label="LinkedIn" class="text-gray-400 hover:text-white"><i class="pi pi-linkedin text-2xl"></i></a>
            <a href="https://twitter.com" target="_blank" aria-label="Twitter" class="text-gray-400 hover:text-white"><i class="pi pi-twitter text-2xl"></i></a>
          </div>
        </div>
        <!-- Enlaces de Ética -->
        <div class="col-12 md:col-4 text-right">
          <h3 class="text-xl font-bold mb-3">Legal</h3>
          <a href="/terms" class="block text-gray-400 no-underline hover:text-white mb-2">Términos y Condiciones de Servicio</a>
          <a href="/privacy" class="block text-gray-400 no-underline hover:text-white">Política de Privacidad</a>
        </div>
      </div>
      <div class="text-center mt-5 border-top-1 border-gray-800 pt-4">
        <p class="text-gray-500">&copy; 2026 IA-INNOVATION. Todos los derechos reservados.</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
section[id] { scroll-margin-top: 70px; }
</style>