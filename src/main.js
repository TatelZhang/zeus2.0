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
const getCookie = function(name) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg))
      return decodeURI(arr[2]);
  else
      return null;
}
Vue.prototype.getCookie = getCookie;

function isLogin() {
  var userId = getCookie('userId');
  var comId = getCookie('comId');
  var userRole = getCookie('userRole');
  if(userId && comId && userRole) return true;
  return false;
}

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  // console.log(to)
  iView.LoadingBar.start();
  if(to.name !== 'Login' && !isLogin()){
    next('login');
  }else{
    next();
  }
});

router.afterEach((to, from, next) => {
  iView.LoadingBar.finish();
  window.scrollTo(0, 0)
});

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
