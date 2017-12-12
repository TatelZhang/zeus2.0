import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import iView from 'iview'
import ZComponents from './pages/components';
import 'axios'
import 'jquery'
import 'iview/dist/styles/iview.css'
import './assets/base.less'
import './assets/custom-iview.less'

Vue.config.productionTip = false
Vue.use(iView);
Vue.use(ZComponents);

//事件委托
var $bus = new Vue({});
Vue.prototype.$bus = $bus;

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
