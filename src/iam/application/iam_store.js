import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { BaseApi } from '../../shared/infrastructure/base-api.js';
import { BaseEndpoint } from '../../shared/infrastructure/base-endpoint.js';

const api = new BaseApi();
const usersEndpoint = new BaseEndpoint(api, '/users');

export const useIamStore = defineStore('iam', () => {
    const currentUser = ref(JSON.parse(localStorage.getItem('aitodu_user') || 'null'));
    const isAuthenticated = computed(() => !!currentUser.value);
    const isOwner = computed(() => currentUser.value?.role === 'BUSINESS_OWNER');

    async function signIn(email, password) {
        const res = await usersEndpoint.getAll({ email, password });
        if (!res.data || res.data.length === 0) {
            throw new Error('Invalid credentials (US07).');
        }
        currentUser.value = res.data[0];
        localStorage.setItem('aitodu_user', JSON.stringify(currentUser.value));
    }

    async function signUp(userPayload) {
        const existing = await usersEndpoint.getAll({ email: userPayload.email });
        if (existing.data?.length > 0) {
            throw new Error('Email is already registered (US06).');
        }
        const created = await usersEndpoint.create({
            id: `usr-${Date.now()}`,
            ...userPayload
        });
        currentUser.value = created.data;
        localStorage.setItem('aitodu_user', JSON.stringify(currentUser.value));
    }

    function signOut() {
        currentUser.value = null;
        localStorage.removeItem('aitodu_user');
    }

    return { currentUser, isAuthenticated, isOwner, signIn, signUp, signOut };
});