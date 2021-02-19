import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { rootStore } from './store'

/* ========================= [START] STYLE ============================= */
import 'normalize.css'
import '@/assets/styles/main.scss'
/* ========================= [END] STYLE =============================== */

/* ========================= [START] AG GRID https://www.ag-grid.com/documentation/vue/getting-started/ ============================= */
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'
import { AgGridVue } from 'ag-grid-vue3'
/* ========================= [END] AG GRID =============================== */

const VUE_APP = createApp(App)

VUE_APP.use(rootStore).use(router)
VUE_APP.component('ag-grid', AgGridVue)
VUE_APP.mount('#app')