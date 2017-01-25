import 'semantic-ui-css/semantic.css';
import 'semantic-ui-css/semantic';

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
