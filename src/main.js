import Vue from 'vue';
import App from './router/Layout.vue';
import styles from './styles/styles-loader';
import router from './router';
import moment from 'vue-moment';
import VeeValidate from 'vee-validate';

Vue.config.productionTip = false

Vue.use(moment);
Vue.use(VeeValidate);

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
