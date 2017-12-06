import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import 'jquery'
import 'iview/dist/styles/iview.css'
import './assets/base.css'

Vue.config.productionTip = false
Vue.use(iView);

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
