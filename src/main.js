import './assets/main.css'
import router from './router/router'
import { createApp } from 'vue'
import { createPinia } from 'pinia';
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import {useAuthStore} from "@/store/auth.js";

// Create the Vue app instance and configure it with router and Pinia
const app = createApp(App);
const pinia = createPinia();


app.use(router);
app.use(pinia);
app.mount('#app');

const authStore = useAuthStore();
authStore.init();
