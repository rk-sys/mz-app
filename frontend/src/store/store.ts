import Vue       from 'vue';
import Vuex      from 'vuex';
import cloneDeep from 'lodash/cloneDeep';
import state     from './store.state';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    global: cloneDeep(state),
  },
  mutations: {
    setCurrentUser(state, payload) {
      console.log(payload);
      state.global.currentUser = payload.currentUser;
    },
  },
  actions: {},
  getters: {
    getCurrentUser(state) {
      return state.global.currentUser;
    },
  },
});
