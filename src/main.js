import './assets/index.css';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import http from "@/plugins/axios.js";
import ElementPlus from 'element-plus';

const app = createApp(App);
app.use(ElementPlus);
app.config.globalProperties.$http = http;

app.use(createPinia());
app.mount('#app');
