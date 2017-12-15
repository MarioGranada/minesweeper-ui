import Vue from 'vue';
import App from './router/Layout.vue';
import styles from './styles/styles-loader';
import router from './router';
import moment from 'vue-moment';

Vue.config.productionTip = false

Vue.use(moment);

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
