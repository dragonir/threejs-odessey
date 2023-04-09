import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import 'amfe-flexible';
import Router from '@/router/index';

const app = createApp(App);
app.use(Router).mount('#app');
