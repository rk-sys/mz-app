import Vue      from 'vue';
import locale   from 'element-ui/lib/locale';
import lang     from 'element-ui/lib/locale/lang/en';
import mzApp     from './App.vue';
import router   from './router';
import store    from './store/store';
import { i18n } from './i18n/i18n';
import './class-component-hooks';

locale.use(lang);
Vue.config.productionTip = false;

new Vue({
  router,
  i18n,
  store,
  render: (h) => h(mzApp),
}).$mount('#mzApp');

