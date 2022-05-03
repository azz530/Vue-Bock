import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/global.css'
import api from './serve/api'
import './assets/iconfont/iconfont.css'
import tools from './utils/tools'

Vue.config.productionTip = false
Vue.use(Element);
Vue.prototype.$api = api;
Vue.prototype.$tools = tools;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
