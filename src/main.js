import { createApp } from 'vue'
import { createVfm } from 'vue-final-modal'
import router from './router'
import App from './App.vue'


import './style.css'
import 'vue-final-modal/style.css'

createApp(App)
.use(router)
.use(createVfm)
.mount('#app')
