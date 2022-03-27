import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/common/css/index.scss'
import lazyPlugin from 'vue3-lazy'
import { createPinia } from 'pinia'

const app = createApp(App).use(createPinia()).use(router)
app.use(lazyPlugin, {
  error: require('./common/images/error.svg'),
  loading: require('./common/images/loading.svg')
})
app.mount('#app')
