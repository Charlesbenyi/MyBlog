// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

//导入了饿了么的组件
import ElementUI from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.use(ElementUI)

//定义全局组件
import Logining from './components/login/login'
Vue.use(Logining)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { 
    App
   },
  template: '<App/>'
})
