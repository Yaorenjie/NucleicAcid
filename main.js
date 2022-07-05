
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import * as http from './utils/http' // http请求接口
import * as utils from './utils/utils' // 工具文件
import config from '@/config' // 配置
import store from './store' // vuex，不需要的可以自行删除
import storage from 'utils/storage' // 缓存文件

Vue.config.productionTip = false

// 定义全局
Vue.prototype.$store = store
Vue.prototype.$storage = storage
Vue.prototype.$http = http
Vue.prototype.$utils = utils
Vue.prototype.$config = config

App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif