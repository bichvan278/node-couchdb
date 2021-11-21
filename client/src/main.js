// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import axios from 'axios';
import Router from 'vue-router';
import routes from './route';

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

window.axios = require('axios');
axios.defaults.withCredentials = true;

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(Router);
Vue.config.productionTip = false;

const router = new Router({
    routes,
    mode: 'history'
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
