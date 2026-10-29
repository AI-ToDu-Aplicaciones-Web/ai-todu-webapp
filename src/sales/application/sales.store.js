import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { BaseApi } from '../../shared/infrastructure/base-api.js';
import { BaseEndpoint } from '../../shared/infrastructure/base-endpoint.js';
import { CommercialTransaction } from '../domain/model/commercial-transaction.entity.js';
import { useWarehouseStore } from '../../warehouse/application/warehouse.store.js';

const api = new BaseApi();
const endpoint = new BaseEndpoint(api, '/transactions');

export const useSalesStore = defineStore('sales', () => {
    const transactions = ref([]);
    const totalSalesRevenue = computed(() => transactions.value.reduce((acc, t) => acc + t.total, 0));

    async function fetchTransactions() {
        const res = await endpoint.getAll();
        transactions.value = (res.data || []).map(r => new CommercialTransaction(r));
    }

    // Domain Policy (US03 & US30): Confirming a sale validates Quarantine/StockOut and deducts Warehouse stock
    async function createSale({ customerName, item, quantity }) {
        if (!item.canBeSold) {
            throw new Error(`Item ${item.sku} is in ${item.status} and cannot be sold (US03/US16).`);
        }
        if (quantity > item.quantity) {
            throw new Error(`Requested quantity (${quantity}) exceeds available stock (${item.quantity}).`);
        }
        const warehouseStore = useWarehouseStore();
        await warehouseStore.adjustStock(item, -Math.abs(quantity));

        const trx = new CommercialTransaction({
            customerName,
            sku: item.sku,
            itemName: item.name,
            quantity,
            unitPrice: item.unitPrice
        });
        const res = await endpoint.create(trx.toPrimitives());
        transactions.value.unshift(new CommercialTransaction(res.data));
    }

    return { transactions, totalSalesRevenue, fetchTransactions, createSale };
});