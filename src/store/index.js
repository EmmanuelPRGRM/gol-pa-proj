import Vue from "vue";
import Vuex from "vuex";
import orientation from './modules/orientation'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    modal: false,
    termsModalState: false,
    firstName: '',
    teamName: ''
  },
  mutations: {},
  actions: {},
  modules: {
    orientation,
  }
});
