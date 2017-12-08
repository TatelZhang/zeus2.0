import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import iView from 'iview'
import 'axios'
import 'jquery'
import 'iview/dist/styles/iview.css'
import './assets/base.less'
import './assets/custom-iview.less'

Vue.config.productionTip = false
Vue.use(iView);

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
