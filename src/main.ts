import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import installElementPlus from './plugins/element'

import ElementPlus from 'element-plus'
import '@/assets/styles/element-variables.scss'
import locale from 'element-plus/lib/locale/lang/zh-cn'

createApp(App)
  .use(ElementPlus, { locale })
  .use(store)
  .use(router)
  .mount('#app')

// installElementPlus(app)
