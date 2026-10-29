import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { WarehouseApi } from '../infrastructure/warehouse-api.js';
import { InventoryItemAssembler } from '../infrastructure/inventory-item.assembler.js';
import { InventoryItem } from '../domain/model/inventory-item.entity.js';

const api = new WarehouseApi();

export const useWarehouseStore = defineStore('warehouse', () => {
    const items = ref([]);
    const searchQuery = ref('');
    const error = ref(null);

    const filteredItems = computed(() => {
        const q = searchQuery.value.trim().toLowerCase();
        if (!q) return items.value;
        return items.value.filter(
            i => i.sku.toLowerCase().includes(q) || i.name.toLowerCase().includes(q) || i.location.toLowerCase().includes(q)
        );
    });

    const lowStockCount = computed(() => items.value.filter(i => i.status === 'LOW_STOCK' || i.status === 'STOCK_OUT').length);
    const quarantineCount = computed(() => items.value.filter(i => i.status === 'QUARANTINE').length);
    const totalValuation = computed(() => items.value.reduce((acc, i) => acc + i.quantity * i.unitPrice, 0));

    async function fetchItems() {
        error.value = null;
        try {
            const response = await api.getAllItems();
            items.value = InventoryItemAssembler.toEntitiesFromResponse(response);
        } catch (err) {
            error.value = err.message;
        }
    }

    async function registerItem(payload) {
        if (items.value.some(i => i.sku === payload.sku?.trim().toUpperCase())) {
            throw new Error(`Duplicate SKU "${payload.sku}" is not allowed (US02).`);
        }
        const entity = new InventoryItem(payload);
        const response = await api.createItem(InventoryItemAssembler.toResourceFromEntity(entity));
        const saved = InventoryItemAssembler.toEntityFromResource(response.data);
        items.value.push(saved);
    }

    async function adjustStock(item, delta) {
        const updatedEntity = item.withUpdatedStock(delta);
        const response = await api.updateItem(item.id, InventoryItemAssembler.toResourceFromEntity(updatedEntity));
        const index = items.value.findIndex(i => i.id === item.id);
        if (index !== -1) items.value[index] = InventoryItemAssembler.toEntityFromResource(response.data);
    }

    async function toggleQuarantine(item) {
        const updatedEntity = item.withQuarantineToggled();
        const response = await api.updateItem(item.id, InventoryItemAssembler.toResourceFromEntity(updatedEntity));
        const index = items.value.findIndex(i => i.id === item.id);
        if (index !== -1) items.value[index] = InventoryItemAssembler.toEntityFromResource(response.data);
    }

    return {
        items,
        searchQuery,
        error,
        filteredItems,
        lowStockCount,
        quarantineCount,
        totalValuation,
        fetchItems,
        registerItem,
        adjustStock,
        toggleQuarantine
    };
});