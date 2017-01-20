import 'semantic/semantic.css';

import Vue from 'vue';

import App from 'src/App';
import store from 'src/store';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App />',
  components: { App },
  store,
});
