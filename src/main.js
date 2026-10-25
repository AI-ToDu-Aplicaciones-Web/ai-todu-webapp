const WEB_APP_BASE_URL = 'https://ai-todu-aplicaciones-web.github.io/ai-todu-website/#';

const i18nDictionary = {
    en_US: {
        'nav.purpose': 'Platform',
        'nav.segments': 'Solutions',
        'nav.pricing': 'Pricing',
        'nav.videos': 'Videos',
        'nav.contact': 'Contact',
        'nav.login': 'Log In',
        'nav.trial': 'Start Free Trial',
        'hero.badge': 'B2B SaaS Logistics & ERP',
        'hero.title': 'The Central Nervous System for your MSE Supply Chain',
        'hero.pitch': 'Stop losing money to unaccounted shrinkage, stockouts, and disconnected spreadsheets. AI-ToDu unifies your warehouse inventory, commercial transactions, and dispatch manifests in one intuitive cloud platform.',
        'hero.ctaPrimary': 'Explore Subscription Plans',
        'hero.ctaSecondary': 'Try Web App Free',
        'hero.metric1': 'Weekly inventory check time',
        'hero.metric2': 'Stock traceability by SKU & Lot',
        'hero.metric3': 'To record inbound/outbound stock',
        'mockup.kpi1': 'Net Profitability',
        'mockup.kpi2': 'Active SKUs',
        'mockup.kpi3': 'Low Stock Alerts',
        'mockup.colItem': 'Inventory Item',
        'mockup.colStatus': 'Status',
        'purpose.title': 'Designed for Operational Excellence',
        'purpose.subtitle': 'Built on a modular Domain-Driven Architecture that connects every area of your business in real time.',
        'purpose.f1Title': 'Warehouse & Inventory Control',
        'purpose.f1Desc': 'Track Inventory Items by SKU, physical location, lots, expiration dates, and Quarantine states with instant barcode search.',
        'purpose.f2Title': 'Sales, Billing & SUNAT Sync',
        'purpose.f2Desc': 'Process Commercial Transactions, reserve stock automatically, and issue electronic receipts without stock discrepancies.',
        'purpose.f3Title': 'Logistics, Dispatch & IoT',
        'purpose.f3Desc': 'Generate Shipment Manifests, plan Waypoints, and monitor real-time GPS and temperature Telemetry during delivery.',
        'purpose.f4Title': 'Smart Financial Dashboard',
        'purpose.f4Desc': 'Visualize consolidated income, expenses, shrinkage reports, and AI-driven demand forecasting without complex accounting.',
        'segments.title': 'Tailored Experiences for Every Role',
        'segments.subtitle': 'Consistent navigation from our Landing Page directly to the specialized view your role requires.',
        'segments.s1Tag': 'Segment 1 • Decision Makers',
        'segments.s1Title': 'For Business Owners & Managers',
        'segments.s1Desc': 'Eliminate end-of-month anxiety and blind spots. Monitor net profitability, approve Purchase Orders, audit user actions, and receive low-stock alerts from your laptop or smartphone.',
        'segments.s1Item1': '✔ Real-time Executive & Financial Dashboard (US42, US45)',
        'segments.s1Item2': '✔ Role-based access control & action auditing (US05, US10)',
        'segments.s1Item3': '✔ Shrinkage & inventory variance reports (US41)',
        'segments.s1Cta': 'Go to Executive Dashboard →',
        'segments.s2Tag': 'Segment 2 • Operational Staff',
        'segments.s2Title': 'For Warehouse Managers & Operators',
        'segments.s2Desc': 'Say goodbye to paper notebooks and unpaid overtime counting boxes. Record merchandise entries, dispatches, and shrinkage in two clicks with a mobile-first interface.',
        'segments.s2Item1': '✔ Fast SKU & barcode inbound/outbound registration (US02, US19)',
        'segments.s2Item2': '✔ Shelf location finder & Quarantine control (US13, US16)',
        'segments.s2Item3': '✔ Guided Shipment Manifest & dispatch confirmation (US31, US34)',
        'segments.s2Cta': 'Go to Warehouse Inventory →',
        'pricing.title': 'Transparent SaaS Subscription Plans',
        'pricing.subtitle': 'Choose the plan that fits your MSE operational volume. Inspect features or start your registration immediately.',
        'pricing.p1Name': 'MYPE Starter',
        'pricing.p1Desc': 'Ideal for single-location restaurants and small retail stores.',
        'pricing.p1F1': '✔ Up to 500 SKUs & 1 Warehouse',
        'pricing.p1F2': '✔ 3 User Accounts (Owner, Cashier, Operator)',
        'pricing.p1F3': '✔ Core Inventory & Sales Module',
        'pricing.popular': 'Most Popular',
        'pricing.p2Name': 'Business Growth',
        'pricing.p2Desc': 'For growing food distributors and textile workshops.',
        'pricing.p2F1': '✔ Unlimited SKUs & up to 3 Warehouses',
        'pricing.p2F2': '✔ 10 User Accounts with Custom Role Permissions',
        'pricing.p2F3': '✔ Procurement, Lot/Expiration & Dispatch Manifests',
        'pricing.p3Name': 'Enterprise AI & IoT',
        'pricing.p3Desc': 'Full supply chain automation, telemetry, and predictive AI.',
        'pricing.p3F1': '✔ Unlimited Warehouses & Users',
        'pricing.p3F2': '✔ Real-time GPS & Cold-Chain IoT Telemetry',
        'pricing.p3F3': '✔ AI Demand Forecasting & Anomaly Detection',
        'pricing.viewDetails': 'View Included Features',
        'pricing.selectPlan': 'Select Plan & Register',
        'videos.title': 'Discover Our Product & Engineering Team',
        'videos.subtitle': 'Watch how AI-ToDu transforms daily operations and meet the IA-INNOVATION team behind the architecture.',
        'videos.productTitle': 'About the Product',
        'videos.productDesc': 'Promotional tour of AI-ToDu features, user flows, and validation testimonials.',
        'videos.teamTitle': 'About the Team (IA-INNOVATION)',
        'videos.teamDesc': 'Our collaborative software engineering process, ABET Student Outcome 5 reflections, and team members.',
        'contact.title': 'Ready to Modernize Your MSE?',
        'contact.subtitle': 'Request a personalized B2B consultation or reach out to our engineering support team in Lima, Peru.',
        'contact.labelCompany': 'Company / MSE Name',
        'contact.labelEmail': 'Business Email',
        'contact.labelRole': 'Your Role',
        'contact.roleOwner': 'Business Owner / Manager',
        'contact.roleOperator': 'Warehouse / Logistics Operator',
        'contact.submit': 'Request Live Demo',
        'footer.mission': 'Developed by IA-INNOVATION. Democratizing B2B supply chain technology for Latin American Micro and Small Enterprises.',
        'footer.navTitle': 'Platform',
        'footer.socialTitle': 'Social Media',
        'footer.legalTitle': 'Ethics & Legal',
        'footer.terms': 'Terms & Conditions of Service (ACM/IEEE & CIP)',
        'terms.title': 'Terms & Conditions of Service & Software Engineering Ethics',
        'terms.p1': '1. Public Interest & MSE Protection (ACM/IEEE Principle 1): IA-INNOVATION guarantees the integrity, confidentiality, and availability of commercial, inventory, and financial records entrusted to AI-ToDu by Micro and Small Enterprises.',
        'terms.p2': '2. Quality & Professional Responsibility (CIP Code of Ethics): All domain rules, stock calculations, and electronic billing integrations follow rigorous software engineering standards, Domain-Driven Design invariants, and Peruvian regulatory compliance (SUNAT & Ley N° 29733).',
        'terms.p3': '3. Transparency & Auditability: Every inventory adjustment, quarantine action, and commercial transaction is logged with full user traceability to prevent fraud and ensure fair operations.',
        'terms.close': 'Understood'
    },
    es_419: {
        'nav.purpose': 'Plataforma',
        'nav.segments': 'Soluciones',
        'nav.pricing': 'Planes',
        'nav.videos': 'Videos',
        'nav.contact': 'Contacto',
        'nav.login': 'Iniciar Sesión',
        'nav.trial': 'Prueba Gratis',
        'hero.badge': 'SaaS B2B de Logística y ERP',
        'hero.title': 'El Sistema Nervioso Central para la Cadena de Suministro de tu MYPE',
        'hero.pitch': 'Deja de perder dinero por mermas no registradas, quiebres de stock y hojas de Excel desconectadas. AI-ToDu unifica tu almacén, transacciones comerciales y manifiestos de despacho en una plataforma intuitiva.',
        'hero.ctaPrimary': 'Ver Planes de Suscripción',
        'hero.ctaSecondary': 'Probar Web App Gratis',
        'hero.metric1': 'Tiempo semanal de cuadre de inventario',
        'hero.metric2': 'Trazabilidad por SKU y Lote',
        'hero.metric3': 'Para registrar entradas y salidas',
        'mockup.kpi1': 'Rentabilidad Neta',
        'mockup.kpi2': 'SKUs Activos',
        'mockup.kpi3': 'Alertas de Stock Mínimo',
        'mockup.colItem': 'Artículo de Inventario',
        'mockup.colStatus': 'Estado',
        'purpose.title': 'Diseñado para la Excelencia Operativa',
        'purpose.subtitle': 'Construido sobre una arquitectura modular Domain-Driven Design que conecta cada área de tu negocio en tiempo real.',
        'purpose.f1Title': 'Control de Almacén e Inventario',
        'purpose.f1Desc': 'Rastrea artículos por SKU, ubicación física, lotes, vencimientos y estados de Cuarentena con búsqueda instantánea.',
        'purpose.f2Title': 'Ventas, Facturación y SUNAT',
        'purpose.f2Desc': 'Procesa Transacciones Comerciales, reserva stock automáticamente y emite comprobantes electrónicos sin descuadres.',
        'purpose.f3Title': 'Logística, Despacho e IoT',
        'purpose.f3Desc': 'Genera Manifiestos de Despacho, planifica puntos de ruta y monitorea Telemetría GPS y temperatura en tiempo real.',
        'purpose.f4Title': 'Dashboard Financiero Inteligente',
        'purpose.f4Desc': 'Visualiza ingresos, egresos, reportes de mermas y predicción de demanda sin requerir conocimientos contables.',
        'segments.title': 'Experiencias Diseñadas para cada Rol',
        'segments.subtitle': 'Navegación consistente desde nuestra Landing Page directamente hacia la vista especializada que tu rol necesita.',
        'segments.s1Tag': 'Segmento 1 • Tomadores de Decisión',
        'segments.s1Title': 'Para Dueños y Administradores de MYPE',
        'segments.s1Desc': 'Elimina el estrés de fin de mes. Monitorea la rentabilidad neta, aprueba Órdenes de Compra, audita acciones de usuarios y recibe alertas de stock mínimo en tu celular o laptop.',
        'segments.s1Item1': '✔ Dashboard Gerencial y Financiero en tiempo real (US42, US45)',
        'segments.s1Item2': '✔ Control de acceso por roles y auditoría (US05, US10)',
        'segments.s1Item3': '✔ Reportes de mermas y diferencias de inventario (US41)',
        'segments.s1Cta': 'Ir al Dashboard Gerencial →',
        'segments.s2Tag': 'Segmento 2 • Personal Operativo',
        'segments.s2Title': 'Para Jefes de Logística y Almaceneros',
        'segments.s2Desc': 'Despídete de los cuadernos de papel y las horas extra contando cajas. Registra ingresos, salidas y mermas en solo dos toques con una interfaz móvil ágil.',
        'segments.s2Item1': '✔ Registro ágil de entradas/salidas por SKU y código de barras (US02, US19)',
        'segments.s2Item2': '✔ Buscador de ubicación en estantes y Cuarentena (US13, US16)',
        'segments.s2Item3': '✔ Manifiesto de Despacho guiado y confirmación de entrega (US31, US34)',
        'segments.s2Cta': 'Ir al Módulo de Inventario →',
        'pricing.title': 'Planes de Suscripción SaaS Transparentes',
        'pricing.subtitle': 'Elige el plan que mejor se adapte al volumen operativo de tu MYPE. Consulta el detalle o inicia tu registro.',
        'pricing.p1Name': 'MYPE Inicial',
        'pricing.p1Desc': 'Ideal para restaurantes de un local y comercios minoristas.',
        'pricing.p1F1': '✔ Hasta 500 SKUs y 1 Almacén',
        'pricing.p1F2': '✔ 3 Usuarios (Dueño, Vendedor, Almacenero)',
        'pricing.p1F3': '✔ Módulo Base de Inventario y Ventas',
        'pricing.popular': 'Más Popular',
        'pricing.p2Name': 'Crecimiento MYPE',
        'pricing.p2Desc': 'Para distribuidoras de alimentos y talleres textiles en expansión.',
        'pricing.p2F1': '✔ SKUs Ilimitados y hasta 3 Almacenes',
        'pricing.p2F2': '✔ 10 Usuarios con Permisos por Rol configurables',
        'pricing.p2F3': '✔ Compras, Lotes/Vencimientos y Manifiestos de Despacho',
        'pricing.p3Name': 'Corporativo IA & IoT',
        'pricing.p3Desc': 'Automatización total, telemetría IoT y predicción con IA.',
        'pricing.p3F1': '✔ Almacenes y Usuarios Ilimitados',
        'pricing.p3F2': '✔ Telemetría GPS y Cadena de Frío IoT en tiempo real',
        'pricing.p3F3': '✔ Predicción de Demanda y Detección de Anomalías con IA',
        'pricing.viewDetails': 'Ver Funcionalidades Incluidas',
        'pricing.selectPlan': 'Seleccionar Plan y Registrarse',
        'videos.title': 'Conoce Nuestro Producto y Equipo de Ingeniería',
        'videos.subtitle': 'Mira cómo AI-ToDu transforma las operaciones diarias y conoce al equipo IA-INNOVATION.',
        'videos.productTitle': 'Video About-the-Product',
        'videos.productDesc': 'Recorrido promocional por las funcionalidades de AI-ToDu y testimonios de validación.',
        'videos.teamTitle': 'Video About-the-Team (IA-INNOVATION)',
        'videos.teamDesc': 'Nuestro proceso colaborativo de ingeniería de software, logro del ABET Outcome 5 e integrantes.',
        'contact.title': '¿Listo para Digitalizar tu MYPE?',
        'contact.subtitle': 'Solicita una asesoría B2B personalizada o comunícate con nuestro equipo de soporte en Lima, Perú.',
        'contact.labelCompany': 'Nombre de la Empresa / MYPE',
        'contact.labelEmail': 'Correo Corporativo',
        'contact.labelRole': 'Tu Rol en el Negocio',
        'contact.roleOwner': 'Dueño / Administrador de Negocio',
        'contact.roleOperator': 'Jefe de Logística / Operario de Almacén',
        'contact.submit': 'Solicitar Demostración en Vivo',
        'footer.mission': 'Desarrollado por IA-INNOVATION. Democratizando la tecnología logística B2B para las MYPES latinoamericanas.',
        'footer.navTitle': 'Plataforma',
        'footer.socialTitle': 'Redes Sociales',
        'footer.legalTitle': 'Ética y Legal',
        'footer.terms': 'Términos y Condiciones de Servicio (ACM/IEEE y CIP)',
        'terms.title': 'Términos y Condiciones de Servicio y Ética de Ingeniería de Software',
        'terms.p1': '1. Interés Público y Protección a la MYPE (Principio 1 ACM/IEEE): IA-INNOVATION garantiza la integridad, confidencialidad y disponibilidad de los registros comerciales, logísticos y financieros confiados a AI-ToDu.',
        'terms.p2': '2. Calidad y Responsabilidad Profesional (Código de Ética CIP): Todas las reglas de dominio, cálculos de inventario y facturación electrónica cumplen con estándares rigurosos de ingeniería de software, Domain-Driven Design y normativa peruana (SUNAT y Ley N° 29733).',
        'terms.p3': '3. Transparencia y Auditoría: Cada ajuste de inventario, pase a cuarentena y transacción comercial se registra con trazabilidad completa del usuario responsable.',
        'terms.close': 'Entendido'
    }
};

const planSpecifications = {
    starter: {
        en_US: {
            title: 'MYPE Starter Plan ($19/mo) — Detailed Specification',
            details: 'Includes: Core Inventory Module (US02, US11, US12), Physical Shelf Locations (US13), Commercial Transactions & Sales Cart (US03, US26), Electronic Receipt Generation (US28), and Basic Executive Dashboard (US42). Maximum 500 SKUs and 3 active users.'
        },
        es_419: {
            title: 'Plan MYPE Inicial ($19/mes) — Especificación Detallada',
            details: 'Incluye: Módulo Core de Inventario (US02, US11, US12), Ubicación Física en Estantes (US13), Transacciones Comerciales y Carrito de Ventas (US03, US26), Generación de Comprobantes (US28) y Dashboard General (US42). Límite de 500 SKUs y 3 usuarios activos.'
        }
    },
    growth: {
        en_US: {
            title: 'Business Growth Plan ($49/mo) — Detailed Specification',
            details: 'Includes everything in Starter plus: Role & Permission Management (US05, US09), Action Auditing (US10), Lot & Perishable Expiration Control (US14, US15), Quarantine Management (US16), Purchase Orders & Approvals (US21, US22), and Shipment Manifests (US31-US35).'
        },
        es_419: {
            title: 'Plan Crecimiento MYPE ($49/mes) — Especificación Detallada',
            details: 'Incluye todo lo del Plan Inicial más: Gestión de Roles y Permisos (US05, US09), Auditoría de Acciones (US10), Control de Lotes y Perecibles (US14, US15), Gestión de Cuarentena (US16), Órdenes de Compra (US21, US22) y Manifiestos de Despacho (US31-US35).'
        }
    },
    enterprise: {
        en_US: {
            title: 'Enterprise AI & IoT Plan ($99/mo) — Detailed Specification',
            details: 'Includes everything in Business Growth plus: External Services & SUNAT API Integration (US53), Real-time IoT Telemetry for Cold-Chain & GPS (US36, US54), Inventory Anomaly Detection (US55), AI Demand Forecasting (US56), and Smart Restocking Suggestions (US51, US57).'
        },
        es_419: {
            title: 'Plan Corporativo IA & IoT ($99/mes) — Especificación Detallada',
            details: 'Incluye todo lo del Plan Crecimiento más: Integración con Servicios Externos y SUNAT (US53), Telemetría IoT en tiempo real de GPS y Temperatura (US36, US54), Detección de Anomalías (US55), Predicción de Demanda con IA (US56) y Reposición Automática (US51, US57).'
        }
    }
};

let currentLang = 'en_US';

function setLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang === 'en_US' ? 'en' : 'es';

    document.querySelectorAll('[data-i18n]').forEach((el) => {
        const key = el.getAttribute('data-i18n');
        if (i18nDictionary[lang] && i18nDictionary[lang][key]) {
            el.textContent = i18nDictionary[lang][key];
        }
    });

    const btnEn = document.getElementById('btn-en');
    const btnEs = document.getElementById('btn-es');
    btnEn.classList.toggle('active', lang === 'en_US');
    btnEs.classList.toggle('active', lang === 'es_419');
    btnEn.setAttribute('aria-pressed', String(lang === 'en_US'));
    btnEs.setAttribute('aria-pressed', String(lang === 'es_419'));
}

document.addEventListener('DOMContentLoaded', () => {
    setLanguage('en_US');

    document.getElementById('btn-en').addEventListener('click', () => setLanguage('en_US'));
    document.getElementById('btn-es').addEventListener('click', () => setLanguage('es_419'));

    document.querySelectorAll('.cta-link').forEach((link) => {
        const route = link.getAttribute('data-route');
        if (route) {
            link.href = `${WEB_APP_BASE_URL}/${route}`;
        }
    });

    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    mobileToggle.addEventListener('click', () => {
        const isOpen = navMenu.classList.toggle('open');
        mobileToggle.setAttribute('aria-expanded', String(isOpen));
    });

    const planModal = document.getElementById('plan-modal');
    const planModalTitle = document.getElementById('plan-modal-title');
    const planModalBody = document.getElementById('plan-modal-body');
    const planModalCta = document.getElementById('plan-modal-cta');

    document.querySelectorAll('.plan-detail-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
            const planKey = btn.getAttribute('data-plan');
            const spec = planSpecifications[planKey][currentLang];
            planModalTitle.textContent = spec.title;
            planModalBody.innerHTML = `<p>${spec.details}</p>`;
            planModalCta.href = `${WEB_APP_BASE_URL}/register?plan=${planKey}`;
            planModal.hidden = false;
        });
    });

    document.getElementById('close-plan-modal').addEventListener('click', () => {
        planModal.hidden = true;
    });

    const termsModal = document.getElementById('terms-modal');
    document.getElementById('open-terms-btn').addEventListener('click', () => {
        termsModal.hidden = false;
    });
    document.getElementById('close-terms-modal').addEventListener('click', () => {
        termsModal.hidden = true;
    });
    document.getElementById('accept-terms-btn').addEventListener('click', () => {
        termsModal.hidden = true;
    });

    const contactForm = document.getElementById('contact-form');
    const feedback = document.getElementById('contact-feedback');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        feedback.hidden = false;
        feedback.textContent = currentLang === 'en_US'
            ? '✔ Thank you! Our B2B team will contact you shortly.'
            : '✔ ¡Gracias! Nuestro equipo B2B se comunicará contigo pronto.';
        contactForm.reset();
    });
});