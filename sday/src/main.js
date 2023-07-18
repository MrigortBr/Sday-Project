import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "../node_modules/bulma/css/bulma.css"
import "../src/styles/style.css"
import "../node_modules/animate.css/source/animate.css"

createApp(App).use(router).mount('#app')
