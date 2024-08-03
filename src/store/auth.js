// store/auth.js
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        isAuthenticated: false,
        user: {
            id: '',
            username: '',
            email: '',
            // Add other user information here
        },
    }),
    actions: {
        login(userData) {
            this.isAuthenticated = true;
            this.user = { ...userData };
        },
        logout() {
            this.isAuthenticated = false;
            this.user = {
                id: '',
                username: '',
                email: '',
                // Reset other user information here
            };
        },
    },
    persist: {
        enabled: true,
    },
});
