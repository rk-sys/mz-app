import Vue from 'vue';
import Vuex from 'vuex';
import cloneDeep from 'lodash/cloneDeep';
import state from './store.state';
import firebase from 'firebase/app';
import 'firebase/auth';
import router from '@/router';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        global: cloneDeep(state),
    },
    mutations: {
        setCurrentUser(state, payload) {
            state.global.currentUser = payload.currentUser;
        },
    },
    actions: {
        logout(context) {
            firebase.auth().signOut().then(() => {
                context.commit('setCurrentUser', {null: null}, {root: true});
            });
            router.push({name: 'Login'});
        },
    },
    getters: {
        getCurrentUser(state) {
            return state.global.currentUser;
        },
    },
});
