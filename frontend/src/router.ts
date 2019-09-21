import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('./views/home/home.view.vue'),
      meta: {
        requiresAuth: true,
      },
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
