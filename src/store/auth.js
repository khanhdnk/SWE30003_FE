import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        name: '',
        email: '',
        password: '',
        role: 'customer',
        isAuthenticated: false,
        token: '',
        userId: null,
    }),

    getters: {
        isLoggedIn: (state) => state.isAuthenticated,
    },

    actions: {
        init() {
            const savedToken = localStorage.getItem('token');
            const savedUserId = localStorage.getItem('userId');
            const savedName = localStorage.getItem('name');
            const savedEmail = localStorage.getItem('email');
            const savedRole = localStorage.getItem('role');

            if (savedToken && savedUserId && savedName && savedEmail && savedRole) {
                this.token = savedToken;
                this.userId = Number(savedUserId);
                this.name = savedName;
                this.email = savedEmail;
                this.role = savedRole;
                this.isAuthenticated = true;
            }
        },

        async register() {
            const payload = {
                name: this.name,
                email: this.email,
                password: this.password,
                role: this.role,
            };

            try {
                const response = await axios.post('http://localhost:3000/user/register', payload);
                console.log('Registration successful:', response.data);
            } catch (error) {
                console.error('Registration failed:', error);
            }
        },

        async login() {
            const payload = {
                email: this.email,
                password: this.password,
                role: this.role,
            };

            try {
                const response = await axios.post('http://localhost:3000/user/login', payload);
                const data = response.data.data;
                this.name = data.user.name;
                this.email = data.user.email;
                this.role = data.user.role;
                this.userId = data.user.id;
                this.token = data.token;
                this.isAuthenticated = true;

                // Save session data to localStorage
                localStorage.setItem('token', this.token);
                localStorage.setItem('userId', String(this.userId));
                localStorage.setItem('name', this.name);
                localStorage.setItem('email', this.email);
                localStorage.setItem('role', this.role);

                console.log('Login successful:', response.data.message);
            } catch (error) {
                console.error('Login failed:', error);
            }
        },

        logout() {
            this.name = '';
            this.email = '';
            this.password = '';
            this.role = 'customer';
            this.token = '';
            this.isAuthenticated = false;
            this.userId = null;

            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            localStorage.removeItem('name');
            localStorage.removeItem('email');
            localStorage.removeItem('role');
        },
    },
});