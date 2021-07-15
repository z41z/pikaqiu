import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant, { Notify, Toast } from 'vant';
import 'vant/lib/index.less'
import { DATE_FORMAT } from '@utils/format'
import { CONFIG } from '@config/index'
Vue.config.productionTip = false
Vue.config.devtools = false

Vue.prototype.CONFIG = CONFIG
DATE_FORMAT()
if (process.env.NODE_ENV === 'development') {
  let VConsole = require('vconsole')
  new VConsole();
}
Vue.use(Vant);
router.beforeEach((to, from, next) => {
  let containerEl = document.documentElement.querySelector(".app-container")
  if (containerEl) {
    containerEl.scrollTop = 0
  }
  // 去除Toast和Notify提醒
  Notify.clear()
  Toast.clear()
  next()
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
