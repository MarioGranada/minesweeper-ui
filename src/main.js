import Vue from 'vue'
import App from './App'
import styles from './styles/styles-loader';
import router from './router'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
