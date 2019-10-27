import Vue           from 'vue';
import locale        from 'element-ui/lib/locale';
import lang          from 'element-ui/lib/locale/lang/en';
import mzApp         from './App.vue';
import router        from './router';
import * as firebase from 'firebase/app';
import store         from './store/store';
import { i18n }      from './i18n/i18n';
import './class-component-hooks';

locale.use(lang);
Vue.config.productionTip = false;

firebase.initializeApp({
  apiKey: 'AIzaSyBsP7QHV9TA2tWIypoPKS9PkuBcb0fTJpo',
  authDomain: 'moja-zbroj.firebaseapp.com',
  databaseURL: 'https://moja-zbroj.firebaseio.com',
  projectId: 'moja-zbroj',
  storageBucket: 'gs://moja-zbroj.appspot.com/',
  messagingSenderId: '11806184685',
  appId: '1:11806184685:web:c0eba0b09735bda3f428e4',
});

const unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
  new Vue({
    router,
    i18n,
    store,
    render: (h) => h(mzApp),
    created() {
      if (firebaseUser) {
        const currentUser = {
          email: firebaseUser.email,
          name: firebaseUser.displayName,
          uid: firebaseUser.uid,
          photoURL: firebaseUser.photoURL,
        };
        store.commit('setCurrentUser', { currentUser });
      }
    },
  }).$mount('#mzApp');
  unsubscribe();
});
