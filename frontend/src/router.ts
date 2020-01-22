import Vue               from 'vue';
import Router, { Route } from 'vue-router';
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
    },
    {
      path: '/craftsmen',
      name: 'Craftsmen',
      component: () => import('./views/craftsmen/craftsmen.view.vue'),
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
      path: '/reset',
      name: 'Reset password',
      component: () => import ('./views/reset-password/reset-password.view.vue'),
    },
    {
      path: '/craftsmen/:uuid/detail',
      name: 'Craftsmen detail',
      redirect: '/craftsmen/:uuid/detail/info',
      component: () => import ('./views/craftsmen-detail/craftsmen-detail.view.vue'),
      children: [
        {
          path: 'info',
          name: 'Craftsmen detail info',
          component: () => import ('./views/craftsmen-detail/craftsmen-detail-general-info/craftsmen-detail-general-info.view.vue'),
        },
        {
          path: 'portfolio',
          name: 'Craftsmen detail portfolio',
          component: () => import ('./views/craftsmen-detail/craftsmen-detail-portfolio/craftsmen-detail-portfolio.view.vue'),
        },
      ],
    },
    {
      path: '/account',
      name: 'User account',
      redirect: '/account/edit',
      component: () => import ('./views/user-account/user-account.view.vue'),
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: 'edit',
          name: 'User account edit',
          component: () => import('./views/user-account/user-account-edit/user-account-edit.view.vue'),
        },
        {
          path: 'info',
          name: 'User account information',
          component: () => import('./views/user-account/user-account-info/user-account-info.view.vue'),
        },
        {
          path: 'items',
          name: 'User items',
          component: () => import('./views/user-account/user-items/user-items.view.vue'),
        },
        {
          path: 'add-item',
          name: 'Add item',
          component: () => import('./views/user-account/user-account-add-item/user-account-add-item.view.vue'),
        },
      ],
    },
    {
      path: '**',
      redirect: '/account',
    },
  ],
});

router.beforeEach((to: Route, from: Route, next: any) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) {
    next({ name: 'Login' });
  } else if (!requiresAuth && currentUser) {
    next();
  } else {
    next();
  }
});


export default router;
