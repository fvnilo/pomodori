import Vue from 'vue';
import Vuex from 'vuex';
import { initialState, mutations } from 'src/store/mutations';
import * as actions from 'src/store/actions';

Vue.use(Vuex);

export default new Vuex.Store({
  actions,
  mutations,
  state: initialState,
});
