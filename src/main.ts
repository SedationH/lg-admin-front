import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'

import '@/assets/styles/index.scss'

installElementPlus(createApp(App))
  .use(store)
  .use(router)
  .mount('#app')
