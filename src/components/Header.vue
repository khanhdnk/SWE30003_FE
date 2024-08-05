<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand ml-10" href="#">{{ brandName }}</a>
        <button class="navbar-toggler" type="button" @click="toggleNavbar" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div :class="['collapse', 'navbar-collapse', { 'show': isNavbarOpen }]" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item active">
                    <router-link to="/dashboard" class="nav-link">Dashboard</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/list_booking" class="nav-link">My Booking</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/payment" class="nav-link">My Invoices</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/login" class="nav-link">Login</router-link>
 
                </li>
                <li class="nav-item">
                    <router-link to="/register" class="nav-link">Register</router-link>
                </li>
                <li>
                    <div class="nav-link" @click="handleLogout">Logout</div>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script setup>
import { ref } from 'vue';

const brandName = ref('OSPS');
const isNavbarOpen = ref(false);
import {useAuthStore} from "@/store/auth.js";
import router from "@/router/router.js";

const toggleNavbar = () => {
    isNavbarOpen.value = !isNavbarOpen.value;
};

function handleLogout(){
    // Clear the token from localStorage
    useAuthStore().logout();
    router.push('/login');
}
</script>

<style scoped>
/* You can add custom styles for the Navbar here */
</style>