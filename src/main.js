import 'semantic-ui-css/semantic.css';
import 'semantic-ui-css/semantic';

import Vue from 'vue';
import VueRouter from 'vue-router';

import App from 'src/App';
import store from 'src/store';

import Pomodori from 'components/Pomodori';
import Help from 'components/Help';

Vue.use(VueRouter);

const routes = [
  { path: '/', component: Pomodori },
  { path: '/help', component: Help },
];

const router = new VueRouter({ routes });

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App />',
  components: { App },
  store,
  router,
});
