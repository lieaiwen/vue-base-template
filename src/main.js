// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'; // 引入el
import './assets/styles/normalize.css' // 引入 默认 样式
import './assets/styles/common.css' // 引入 默认 样式
import 'element-ui/lib/theme-chalk/index.css'; // 引入 el 样式
import store from './store/index'
Vue.use(ElementUI); // 使用el



Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
