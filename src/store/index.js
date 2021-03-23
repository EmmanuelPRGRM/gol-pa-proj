import Vue from "vue";
import Vuex from "vuex";
import orientation from './modules/orientation'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    orientation,
  }
});
