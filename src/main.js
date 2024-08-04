import './assets/main.css'
import router from './router/router'
import { createApp } from 'vue'
import pinia from "@/store/index.js"
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import {useAuthStore} from "@/store/auth.js";

// Create the Vue app instance and configure it with router and Pinia
const app = createApp(App);

app.use(router);
app.use(pinia);

const authStore = useAuthStore();
authStore.init();

app.mount('#app');
