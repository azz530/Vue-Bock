import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/global.css'
import api from './serve/api'
import './assets/iconfont/iconfont.css'
import tools from './utils/tools'
import './components/index' //全局组件


Vue.config.productionTip = false
Vue.prototype.$api = api;
Vue.prototype.$tools = tools;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
