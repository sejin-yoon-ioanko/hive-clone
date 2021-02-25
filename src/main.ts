import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { rootStore } from './store'

/* ========================= [START] CUSTOM DIRECTIVES ============================= */
import clickSync from '@/globals/directives/clickSync'
import mountedFocus from '@/globals/directives/mountedFocus'
/* ========================= [END] CUSTOM DIRECTIVES =============================== */

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

VUE_APP
  .use(rootStore).use(router)
  .use(clickSync).use(mountedFocus)
  .component('ag-grid', AgGridVue)
  .mount('#app')