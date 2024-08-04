import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from "@/store/auth.js";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Booking from "@/views/Booking.vue";
import Payment from "@/views/Payment.vue";
import Admin from "@/views/Admin.vue";
import Dashboard from '@/views/Dashboard.vue';

const routes = [
    { path: '/admin', component: Admin, name: 'admin' },
    {path:'/login', component: Login, name: 'login' },
    {path:'/register', component: Register, name: 'register'},
    {path: '/booking', component: Booking, name: 'booking'},
    {path: '/payment', component: Payment, name: 'payment'},
    { path: '/dashboard', component: Dashboard, name: 'dashboard' },

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

const listOfUnprotectedRoutes = ['login', 'register'];

// Navigation guard to protect routes
router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    if (!listOfUnprotectedRoutes.includes(to.name) && !authStore.isAuthenticated) {
        next({ name: 'login' });
    } else {
        next();
    }
});

export default router;
