import { defineStore } from 'pinia';
import { ref } from 'vue';
import { BaseApi } from '../../shared/infrastructure/base-api.js';
import { BaseEndpoint } from '../../shared/infrastructure/base-endpoint.js';

const api = new BaseApi();
const manifestsEndpoint = new BaseEndpoint(api, '/manifests');

export const useLogisticsStore = defineStore('logistics', () => {
    const manifests = ref([]);

    async function fetchManifests() {
        const res = await manifestsEndpoint.getAll();
        manifests.value = res.data || [];
    }

    async function createManifest(payload) {
        const res = await manifestsEndpoint.create({
            id: `man-${Date.now()}`,
            code: `MAN-2026-${Math.floor(100 + Math.random() * 900)}`,
            telemetryTemp: '18.2 °C',
            status: 'IN_TRANSIT',
            ...payload
        });
        manifests.value.unshift(res.data);
    }

    async function confirmDelivery(manifest) {
        const updated = { ...manifest, status: 'DELIVERED' };
        const res = await manifestsEndpoint.update(manifest.id, updated);
        const idx = manifests.value.findIndex(m => m.id === manifest.id);
        if (idx !== -1) manifests.value[idx] = res.data;
    }

    return { manifests, fetchManifests, createManifest, confirmDelivery };
});