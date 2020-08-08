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
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/craftsmen',
      name: 'Craftsmen',
      component: () => import('./views/craftsmen/craftsmen.view.vue'),
      meta: {
        requiresAuth: true,
      },
    },

    {
      path: '/products',
      name: 'Products list',
      component: () => import ('./views/products-list/products-list.view.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/products/:uuid/detail',
      name: 'Product detail',
      component: () => import ('./views/product-detail/product-detail.view.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/products/:uuid/detail/checkout',
      name: 'Product checkout',
      component: () => import ('./views/product-checkout/product-checkout.view.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/offers',
      name: 'Offers list',
      component: () => import ('./views/offers-list/offers-list.view.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/offers/:uuid/detail',
      name: 'Offer detail',
      component: () => import ('./views/offer-detail/offer-detail.view.vue'),
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
      meta: {
        requiresAuth: true,
      },
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
      meta: {
        requiresAuth: true,
      },
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
        {
          path: 'items',
          name: 'Craftsmen detail items',
          component: () => import ('./views/craftsmen-detail/craftsmen-detail-items/craftsmen-detail-items.view.vue'),
        },
        {
          path: 'comments',
          name: 'Comments and rating',
          component: () => import ('./views/craftsmen-detail/craftsmen-detail-comments/craftsmen-detail-comments.view.vue'),
        },
      ],
    },
    {
      path: '/user-administration',
      name: 'User administration',
      redirect: '/user-administration/products/my-items',
      component: () => import ('./views/user-administration/user-administration.view.vue'),
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: 'products/my-items',
          name: 'User administration my items',
          component: () => import ('./views/user-administration/user-administration-products/my-items/my-items.view.vue'),
        },
        {
          path: 'products/add-products',
          name: 'User administration add product',
          component: () => import ('./views/user-administration/user-administration-products/add-item/add-item.view.vue'),
        },
        {
          path: 'products/add-products/edit/:uuid',
          name: 'User administration edit product',
          component: () => import ('./views/user-administration/user-administration-products/add-item/add-item.view.vue'),
        },
        {
          path: 'products/in-realization',
          name: 'User administration product in realization',
          component: () => import ('./views/user-administration/user-administration-products/in-realization/in-realization.view.vue'),
        },
        {
          path: 'history/product-history',
          name: 'User administration history product list',
          component: () => import ('./views/user-administration/user-administration-products/history/product-history.view.vue'),
        },
        {
          path: 'history/offer-history',
          name: 'User administration history offer list',
          component: () => import ('./views/user-administration/user-administration-offer/history/offer-history.view.vue'),
        },
        {
          path: 'offers/my-offer',
          name: 'User administration my offers',
          component: () => import ('./views/user-administration/user-administration-offer/my-offers/my-offers.view.vue'),
        },
        {
          path: 'offers/in-realization',
          name: 'User administration offers in realization',
          component: () => import ('./views/user-administration/user-administration-offer/in-realization/in-realization.view.vue'),
        },
        {
          path: 'offers/add-offer',
          name: 'User administration add offer',
          component: () => import ('./views/user-administration/user-administration-offer/add-offer/add-offer.view.vue'),
        },
        {
          path: 'offer',
          name: 'User administration offer',
        },
        {
          path: 'history',
          name: 'User administration history',
        },
      ],
    },
    {
      path: '/follow',
      name: 'My follow',
      component: () => import ('./views/my-follow/my-follow.view.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/messages',
      name: 'My messages',
      component: () => import ('./views/my-message/my-message.view.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/messages/:uuid',
      name: 'Message detail',
      component: () => import ('./views/message-detail/message-detail.view.vue'),
      meta: {
        requiresAuth: true,
      },
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
          path: 'portfolio',
          name: 'User portfolio',
          component: () => import('./views/user-account/user-portfolio/user-portfolio.view.vue'),
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
    if (currentUser && (to.name === 'Login' || to.name === 'Registration')) {
      next({ name: 'Home' });
    }
    next();
  } else {
    next();
  }
});


export default router;
