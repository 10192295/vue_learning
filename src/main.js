import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import axiosInstance, { get, post } from './service/index'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

// 将 Axios 实例和封装的请求方法挂载到全局
app.config.globalProperties.$axios = axiosInstance;
app.config.globalProperties.$get = get;
app.config.globalProperties.$post = post;
app.mount('#app')
