import { createApp } from 'vue'
import App from './App.vue'
import mitt from 'mitt'
import io from 'socket.io-client'

const app = createApp(App);
const socket = io("https://223.171.78.159:3000");

app.config.globalProperties.eventBus = mitt();
app.config.globalProperties.socket = socket;

app.mount('#app');
