 /* jshint esversion: 6 */ 
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import ElementUI from 'element-ui';
import router from './router';
import MyHttpServer from '@/plugins/http.js';

import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/reset.css';



Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(MyHttpServer);
// Vue.component("users",Users);

/* eslint-disable no-new */
new Vue({
  
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
