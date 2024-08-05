import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from "@/store/auth.js";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Booking from "@/views/Booking.vue";
import Payment from "@/views/Payment.vue";
import Admin from "@/views/Admin.vue";
import Dashboard from '@/views/Dashboard.vue';
import ListBooking from "@/views/ListBooking.vue";
import UpdateSlot from "@/views/UpdateSlot.vue";

const routes = [
    { path: '/admin', component: Admin, name: 'admin' },
    {path:'/login', component: Login, name: 'login' },
    {path:'/register', component: Register, name: 'register'},
    {path: '/booking', component: Booking, name: 'booking', meta: { requiresAuth: true }},
    {path: '/list_booking', component: ListBooking, name: 'list_booking', meta: { requiresAuth: true }},
    {path: '/payment', component: Payment, name: 'payment', meta: { requiresAuth: true }},
    { path: '/dashboard', component: Dashboard, name: 'dashboard', meta: { requiresAuth: true } },
    {path: '/update_slot', component: UpdateSlot, meta: { requiresAuth: true }},

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, _, next) => {
    const authStore = useAuthStore();
    const isAuthenticated = authStore.isAuthenticated;

    if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
        next('/login');
    // } else if (to.name === 'login' && isAuthenticated) {
    //     next('/dashboard');
    } else {
        next();
    }
});

export default router;
