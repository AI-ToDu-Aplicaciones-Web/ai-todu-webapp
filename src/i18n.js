import { createI18n } from 'vue-i18n';
import en from './locales/en.json';
import es from './locales/es.json';

export const i18n = createI18n({
    legacy: false,
    locale: 'en',
    fallbackLocale: 'es',
    messages: { en, es }
});

const messages = {
    en_US: {
        nav: { home: 'Home', purpose: 'Platform', segments: 'Solutions', pricing: 'Pricing', team: 'Our Team', login: 'Log In' },
        hero: { title: 'The Digital Nervous System for', titleHighlight: 'your MSE', subtitle: 'Centralize your inventory, sales, and dispatch in one intuitive B2B platform. Stop losing money on missing stock.', cta: 'Start Free Trial' },
        purpose: { title: 'Why AI-ToDu?', inv: 'Inventory Control', invDesc: 'Real-time tracking and automated low-stock alerts.', sales: 'Sales & Billing', salesDesc: 'Connect sales directly with your warehouse.', dispatch: 'Logistics', dispatchDesc: 'Generate dispatch manifests and track deliveries.' },
        segments: { title: 'Built for your role', owner: 'Business Owners', ownerDesc: 'Monitor real profitability in real-time.', ownerCta: 'Go to Dashboard', worker: 'Warehouse Staff', workerDesc: 'Register entries and dispatches in 2 clicks.', workerCta: 'Go to Inventory' },
        pricing: { title: 'Subscription Plans', basic: 'Basic', pro: 'Pro', team: 'Teams' }
    },
    es_419: {
        nav: { home: 'Inicio', purpose: 'Plataforma', segments: 'Soluciones', pricing: 'Planes', team: 'Equipo', login: 'Iniciar Sesión' },
        hero: { title: 'El Sistema Nervioso Digital para', titleHighlight: 'tu MYPE', subtitle: 'Centraliza tu inventario, ventas y despachos en una plataforma B2B intuitiva. Deja de perder dinero por mermas.', cta: 'Prueba Gratis' },
        purpose: { title: '¿Por qué AI-ToDu?', inv: 'Control de Inventario', invDesc: 'Trazabilidad en tiempo real y alertas de stock.', sales: 'Ventas y Facturación', salesDesc: 'Conecta las ventas físicas con el almacén.', dispatch: 'Logística', dispatchDesc: 'Genera manifiestos y sigue cada entrega.' },
        segments: { title: 'Diseñado para tu rol', owner: 'Dueños de Negocio', ownerDesc: 'Monitorea la rentabilidad real en tiempo real.', ownerCta: 'Ir al Dashboard', worker: 'Operarios de Almacén', workerDesc: 'Registra ingresos y salidas en solo 2 clics.', workerCta: 'Ir a Inventario' },
        pricing: { title: 'Planes de Suscripción', basic: 'Básico', pro: 'Pro', team: 'Equipos' }
    }
};
