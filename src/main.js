import './assets/main.css'
import router from './router/router'
import { createApp } from 'vue'
import pinia from "@/store/index.js"
import App from './App.vue'

// Create the Vue app instance and configure it with router and Pinia
const app = createApp(App);

app.use(router);
app.use(pinia);

app.mount('#app');
