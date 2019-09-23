import Vue               from 'vue';
import Router, { Route } from 'vue-router';
import store             from '@/store/store';
import firebase          from 'firebase/app';
import 'firebase/auth';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('./views/home/home.view.vue'),
      // meta: {
      //   requiresAuth: true,
      // },
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('./views/login/login.views.vue'),
    },
    {
      path: '/registration',
      name: 'Registration',
      component: () => import ('./views/registration/registration.view.vue'),
    },
    {
      path: '**',
      redirect: '/home',
    },
  ],
});

function authGuard() {
  (async (to: Route, from: Route, next: any) => {
    console.log(to);
    if (store.getters.getCurrentUser) {
      next();
    } else {
      next({ name: 'Registration' });
    }
  });
}

router.beforeEach((to: Route, from: Route, next: any) => {
  let currentUser = firebase.auth().currentUser;
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next({ name: 'Login' });
  else if (!requiresAuth && currentUser) next();
  else next();
});


export default router;
