<script setup>
import { ref, onMounted } from 'vue';
import { useIamStore } from './iam/application/iam.store.js';
import { useWarehouseStore } from './warehouse/application/warehouse.store.js';
import { useSalesStore } from './sales/application/sales.store.js';
import { useLogisticsStore } from './logistics/application/logistics.store.js';

const iam = useIamStore();
const warehouse = useWarehouseStore();
const sales = useSalesStore();
const logistics = useLogisticsStore();

const activeTab = ref('dashboard');
const lang = ref('en');
const feedbackMsg = ref('');
const errorMsg = ref('');

// Forms
const loginForm = ref({ email: 'carlos@restaurantesmendoza.pe', password: 'admin123' });
const registerMode = ref(false);
const registerForm = ref({ fullName: '', email: '', password: '', role: 'BUSINESS_OWNER', organization: '' });

const newItemForm = ref({ sku: '', name: '', category: 'Gastronomy', location: '', quantity: 20, minStock: 10, unitPrice: 50 });
const newSaleForm = ref({ customerName: '', selectedItemId: '', quantity: 1 });
const newManifestForm = ref({ route: '', driver: '', sku: '', quantity: 1 });

onMounted(async () => {
  await Promise.all([
    warehouse.fetchItems(),
    sales.fetchTransactions(),
    logistics.fetchManifests()
  ]);
});

function notify(msg, isError = false) {
  if (isError) { errorMsg.value = msg; feedbackMsg.value = ''; }
  else { feedbackMsg.value = msg; errorMsg.value = ''; }
  setTimeout(() => { feedbackMsg.value = ''; errorMsg.value = ''; }, 4000);
}

async function handleAuth() {
  try {
    if (registerMode.value) {
      await iam.signUp(registerForm.value);
      notify('Account created and authenticated (US06).');
    } else {
      await iam.signIn(loginForm.value.email, loginForm.value.password);
      notify(`Welcome back, ${iam.currentUser.fullName} (US07).`);
    }
  } catch (e) { notify(e.message, true); }
}

async function handleCreateItem() {
  try {
    await warehouse.registerItem(newItemForm.value);
    newItemForm.value = { sku: '', name: '', category: 'Gastronomy', location: '', quantity: 20, minStock: 10, unitPrice: 50 };
    notify('Inventory Item registered in Azure Mock API (US02).');
  } catch (e) { notify(e.message, true); }
}

async function handleCreateSale() {
  try {
    const item = warehouse.items.find(i => i.id === newSaleForm.value.selectedItemId);
    if (!item) throw new Error('Select a valid SKU.');
    await sales.createSale({ customerName: newSaleForm.value.customerName, item, quantity: Number(newSaleForm.value.quantity) });
    notify('Commercial Transaction recorded & stock deducted automatically (US03/US30).');
  } catch (e) { notify(e.message, true); }
}

async function handleCreateManifest() {
  try {
    await logistics.createManifest(newManifestForm.value);
    newManifestForm.value = { route: '', driver: '', sku: '', quantity: 1 };
    notify('Shipment Manifest dispatched with IoT Telemetry (US31/US36).');
  } catch (e) { notify(e.message, true); }
}
</script>

<template>
  <div class="app-shell">
    <!-- Top App Bar -->
    <header class="topbar" role="banner">
      <div class="brand">
        <span class="badge-teal">AI</span>ToDu <small>SaaS v2.0.0</small>
      </div>
      <div class="topbar-actions">
        <button class="btn-ghost" @click="lang = lang === 'en' ? 'es' : 'en'" aria-label="Switch Language">
          🌐 {{ lang.toUpperCase() }}
        </button>
        <span v-if="iam.isAuthenticated" class="user-chip">
          {{ iam.currentUser.fullName }} ({{ iam.currentUser.role }})
        </span>
        <button v-if="iam.isAuthenticated" class="btn-danger-sm" @click="iam.signOut()">Sign Out</button>
      </div>
    </header>

    <!-- Global Toast Alerts -->
    <div v-if="feedbackMsg" class="alert alert-success" role="status">{{ feedbackMsg }}</div>
    <div v-if="errorMsg" class="alert alert-danger" role="alert">{{ errorMsg }}</div>

    <!-- Unauthenticated IAM View (US06, US07) -->
    <main v-if="!iam.isAuthenticated" class="auth-wrapper">
      <section class="auth-card" aria-label="Authentication Panel">
        <h2>{{ registerMode ? (lang === 'en' ? 'Register MYPE Account (US06)' : 'Registrar Cuenta MYPE (US06)') : (lang === 'en' ? 'Sign In to AI-ToDu (US07)' : 'Iniciar Sesión en AI-ToDu (US07)') }}</h2>
        <form @submit.prevent="handleAuth" class="form-stack">
          <template v-if="registerMode">
            <input v-model="registerForm.fullName" placeholder="Full Name" required />
            <input v-model="registerForm.organization" placeholder="MYPE Company Name" required />
            <input v-model="registerForm.email" type="email" placeholder="Email" required />
            <input v-model="registerForm.password" type="password" placeholder="Password" required />
            <select v-model="registerForm.role">
              <option value="BUSINESS_OWNER">Business Owner (Admin)</option>
              <option value="WAREHOUSE_OPERATOR">Warehouse Operator</option>
            </select>
          </template>
          <template v-else>
            <input v-model="loginForm.email" type="email" placeholder="Email" required />
            <input v-model="loginForm.password" type="password" placeholder="Password" required />
          </template>
          <button type="submit" class="btn-teal">{{ registerMode ? 'Create Account' : 'Sign In' }}</button>
        </form>
        <p class="switch-link" @click="registerMode = !registerMode">
          {{ registerMode ? 'Already have an account? Sign In' : 'Need an account? Register your MYPE' }}
        </p>
      </section>
    </main>

    <!-- Authenticated Workspace (Responsive Sidenav + Main View) -->
    <div v-else class="workspace">
      <aside class="sidenav" role="navigation" aria-label="Sidebar Navigation">
        <button :class="{ active: activeTab === 'dashboard' }" @click="activeTab = 'dashboard'">
          📊 {{ lang === 'en' ? 'Executive Dashboard' : 'Dashboard Gerencial' }}
        </button>
        <button :class="{ active: activeTab === 'warehouse' }" @click="activeTab = 'warehouse'">
          📦 {{ lang === 'en' ? 'Warehouse & Stock' : 'Inventario y Almacén' }}
        </button>
        <button :class="{ active: activeTab === 'sales' }" @click="activeTab = 'sales'">
          💳 {{ lang === 'en' ? 'Sales & POS Billing' : 'Ventas y Facturación' }}
        </button>
        <button :class="{ active: activeTab === 'logistics' }" @click="activeTab = 'logistics'">
          🚚 {{ lang === 'en' ? 'Logistics & Dispatch' : 'Despacho y Logística' }}
        </button>
      </aside>

      <main class="main-panel" role="main">
        <!-- 1. EXECUTIVE DASHBOARD (US42, US43) -->
        <section v-if="activeTab === 'dashboard'">
          <h2>{{ lang === 'en' ? 'Real-Time Executive & Inventory Dashboard (US42/US43)' : 'Dashboard Ejecutivo y de Inventario en Tiempo Real' }}</h2>
          <div class="kpi-grid">
            <div class="kpi-box">
              <small>Inventory Valuation</small>
              <strong>S/ {{ warehouse.totalValuation.toFixed(2) }}</strong>
            </div>
            <div class="kpi-box">
              <small>Total Sales Revenue (IGV Incl.)</small>
              <strong>S/ {{ sales.totalSalesRevenue.toFixed(2) }}</strong>
            </div>
            <div class="kpi-box warn">
              <small>Low Stock / Stock-Out Alerts</small>
              <strong>{{ warehouse.lowStockCount }} SKUs</strong>
            </div>
            <div class="kpi-box danger">
              <small>Items in Quarantine (US16)</small>
              <strong>{{ warehouse.quarantineCount }} SKUs</strong>
            </div>
          </div>
        </section>

        <!-- 2. WAREHOUSE & INVENTORY (US02, US11, US12, US13, US16) -->
        <section v-if="activeTab === 'warehouse'">
          <h2>{{ lang === 'en' ? 'Warehouse & Inventory Control (Core Domain)' : 'Control de Almacén e Inventario' }}</h2>
          <form @submit.prevent="handleCreateItem" class="inline-form">
            <input v-model="newItemForm.sku" placeholder="SKU (e.g. SKU-900)" required />
            <input v-model="newItemForm.name" placeholder="Product Name" required />
            <input v-model="newItemForm.location" placeholder="Shelf Location (US13)" required />
            <input v-model.number="newItemForm.quantity" type="number" placeholder="Qty" required />
            <input v-model.number="newItemForm.unitPrice" type="number" step="0.01" placeholder="Price S/" required />
            <button type="submit" class="btn-teal">+ Register Entry (US02)</button>
          </form>

          <input v-model="warehouse.searchQuery" class="search-bar" placeholder="🔍 Global Search by SKU, Product Name, or Shelf Location (US12)..." />

          <div class="table-responsive">
            <table class="data-table">
              <thead>
              <tr>
                <th>SKU</th><th>Product</th><th>Location (US13)</th><th>Stock</th><th>Unit Price</th><th>Status</th><th>Actions (US11/US16)</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="item in warehouse.filteredItems" :key="item.id">
                <td><strong>{{ item.sku }}</strong></td>
                <td>{{ item.name }}</td>
                <td>{{ item.location }}</td>
                <td>{{ item.quantity }}</td>
                <td>S/ {{ item.unitPrice.toFixed(2) }}</td>
                <td><span :class="'status-tag ' + item.status.toLowerCase()">{{ item.status }}</span></td>
                <td class="action-buttons">
                  <button @click="warehouse.adjustStock(item, 5)">+5</button>
                  <button @click="warehouse.adjustStock(item, -1)">-1</button>
                  <button @click="warehouse.toggleQuarantine(item)">
                    {{ item.status === 'QUARANTINE' ? 'Release' : 'Quarantine' }}
                  </button>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- 3. SALES & BILLING (US03, US26, US27, US30) -->
        <section v-if="activeTab === 'sales'">
          <h2>{{ lang === 'en' ? 'Commercial Transactions & Auto-Stock Sync (US03/US30)' : 'Transacciones Comerciales y Sincronización de Stock' }}</h2>
          <form @submit.prevent="handleCreateSale" class="inline-form">
            <input v-model="newSaleForm.customerName" placeholder="Customer / RUC Name" required />
            <select v-model="newSaleForm.selectedItemId" required>
              <option value="" disabled>Select Available Product...</option>
              <option v-for="i in warehouse.items" :key="i.id" :value="i.id">
                {{ i.sku }} - {{ i.name }} (Stock: {{ i.quantity }} | {{ i.status }})
              </option>
            </select>
            <input v-model.number="newSaleForm.quantity" type="number" min="1" required />
            <button type="submit" class="btn-teal">Confirm Sale & Deduct Stock</button>
          </form>

          <div class="table-responsive">
            <table class="data-table">
              <thead>
              <tr><th>ID</th><th>Customer</th><th>SKU</th><th>Qty</th><th>Subtotal</th><th>IGV (18%)</th><th>Total</th><th>Status</th></tr>
              </thead>
              <tbody>
              <tr v-for="t in sales.transactions" :key="t.id">
                <td>{{ t.id }}</td><td>{{ t.customerName }}</td><td>{{ t.sku }}</td><td>{{ t.quantity }}</td>
                <td>S/ {{ t.subtotal.toFixed(2) }}</td><td>S/ {{ t.igv.toFixed(2) }}</td>
                <td><strong>S/ {{ t.total.toFixed(2) }}</strong></td>
                <td><span class="status-tag available">{{ t.paymentStatus }}</span></td>
              </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- 4. LOGISTICS & DISPATCH (US31, US34, US35, US36) -->
        <section v-if="activeTab === 'logistics'">
          <h2>{{ lang === 'en' ? 'Shipment Manifests & IoT Telemetry (US31/US36)' : 'Manifiestos de Despacho y Telemetría IoT' }}</h2>
          <form @submit.prevent="handleCreateManifest" class="inline-form">
            <input v-model="newManifestForm.route" placeholder="Route Waypoints (e.g. Surco -> Callao)" required />
            <input v-model="newManifestForm.driver" placeholder="Assigned Driver" required />
            <input v-model="newManifestForm.sku" placeholder="Assigned SKU" required />
            <input v-model.number="newManifestForm.quantity" type="number" min="1" required />
            <button type="submit" class="btn-teal">Create Manifest (US31)</button>
          </form>

          <div class="table-responsive">
            <table class="data-table">
              <thead>
              <tr><th>Code</th><th>Waypoints Route</th><th>Driver</th><th>SKU</th><th>IoT Temp</th><th>Status</th><th>Action</th></tr>
              </thead>
              <tbody>
              <tr v-for="m in logistics.manifests" :key="m.id">
                <td><strong>{{ m.code }}</strong></td><td>{{ m.route }}</td><td>{{ m.driver }}</td>
                <td>{{ m.sku }} ({{ m.quantity }})</td><td>{{ m.telemetryTemp }}</td>
                <td><span class="status-tag available">{{ m.status }}</span></td>
                <td>
                  <button v-if="m.status !== 'DELIVERED'" @click="logistics.confirmDelivery(m)" class="btn-teal">
                    Confirm Delivery (US35)
                  </button>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<style>
body { margin: 0; font-family: 'Roboto', sans-serif; background: #F1F5F9; color: #0F172A; }
.topbar { background: #0F172A; color: #FFF; padding: 0.9rem 1.5rem; display: flex; justify-content: space-between; align-items: center; }
.badge-teal { background: #0D9488; padding: 0.2rem 0.45rem; border-radius: 4px; margin-right: 4px; font-weight: 800; }
.topbar-actions { display: flex; gap: 0.75rem; align-items: center; }
.btn-teal { background: #0D9488; color: #FFF; border: none; padding: 0.6rem 1rem; border-radius: 6px; cursor: pointer; font-weight: 600; }
.btn-ghost { background: transparent; color: #FFF; border: 1px solid #475569; padding: 0.4rem 0.75rem; border-radius: 6px; cursor: pointer; }
.btn-danger-sm { background: #DC2626; color: #FFF; border: none; padding: 0.4rem 0.75rem; border-radius: 6px; cursor: pointer; }
.workspace { display: grid; grid-template-columns: 240px 1fr; min-height: calc(100vh - 58px); }
.sidenav { background: #1E293B; padding: 1rem; display: flex; flex-direction: column; gap: 0.5rem; }
.sidenav button { background: transparent; color: #CBD5E1; border: none; text-align: left; padding: 0.75rem 1rem; border-radius: 6px; cursor: pointer; font-size: 0.95rem; }
.sidenav button.active, .sidenav button:hover { background: #0D9488; color: #FFF; font-weight: 600; }
.main-panel { padding: 1.75rem; }
.kpi-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 1.25rem; margin-top: 1rem; }
.kpi-box { background: #FFF; padding: 1.25rem; border-radius: 10px; border-left: 5px solid #0D9488; box-shadow: 0 2px 6px rgba(0,0,0,0.05); }
.kpi-box.warn { border-left-color: #F59E0B; } .kpi-box.danger { border-left-color: #DC2626; }
.kpi-box strong { display: block; font-size: 1.6rem; margin-top: 0.35rem; }
.inline-form { display: flex; flex-wrap: wrap; gap: 0.6rem; background: #FFF; padding: 1rem; border-radius: 8px; margin: 1rem 0; }
.inline-form input, .inline-form select, .search-bar { padding: 0.6rem; border: 1px solid #CBD5E1; border-radius: 6px; }
.search-bar { width: 100%; margin-bottom: 1rem; }
.table-responsive { overflow-x: auto; background: #FFF; border-radius: 8px; }
.data-table { width: 100%; border-collapse: collapse; }
.data-table th, .data-table td { padding: 0.75rem 1rem; border-bottom: 1px solid #E2E8F0; text-align: left; }
.status-tag { padding: 0.2rem 0.55rem; border-radius: 4px; font-size: 0.75rem; font-weight: 700; }
.status-tag.available { background: #DCFCE7; color: #166534; }
.status-tag.low_stock { background: #FEF3C7; color: #92400E; }
.status-tag.stock_out, .status-tag.quarantine { background: #FEE2E2; color: #991B1B; }
.auth-wrapper { display: flex; justify-content: center; align-items: center; min-height: 80vh; }
.auth-card { background: #FFF; padding: 2rem; border-radius: 12px; width: 100%; max-width: 420px; box-shadow: 0 8px 24px rgba(0,0,0,0.08); }
.form-stack { display: flex; flex-direction: column; gap: 0.85rem; margin-top: 1rem; }
.form-stack input, .form-stack select { padding: 0.7rem; border: 1px solid #CBD5E1; border-radius: 6px; }
.alert { padding: 0.8rem 1.5rem; font-weight: 600; text-align: center; }
.alert-success { background: #DCFCE7; color: #166534; } .alert-danger { background: #FEE2E2; color: #991B1B; }
@media (max-width: 768px) { .workspace { grid-template-columns: 1fr; } }
</style>