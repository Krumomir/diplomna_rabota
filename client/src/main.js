// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import dotenv from 'dotenv'

// import tailwind
import '@/input.css'

dotenv.config()

Vue.config.productionTip = false

Vue.config.ignoredElements = ['stripe-buy-button']

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
