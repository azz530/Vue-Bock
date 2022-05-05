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
import './components/index' //全局组件

import VueQuillEditor from 'vue-quill-editor'

import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme

Vue.config.productionTip = false
Vue.use(Element);
Vue.prototype.$api = api;
Vue.prototype.$tools = tools;
Vue.use(VueQuillEditor);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
