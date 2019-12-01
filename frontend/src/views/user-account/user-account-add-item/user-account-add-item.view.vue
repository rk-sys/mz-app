<template>
  <div class="mz-add-item">

    <mz-steps :labels="['Informacje ogólne', 'Dodaj opis', 'Wrzuć zdjęcie', 'Podsumowanie'] "
              :active="activeNumber" />

    <transition name="fade" mode="out-in">
      <router-view />
    </transition>

  </div>
</template>


<script lang="ts">
import { Component, Vue }        from 'vue-property-decorator';
import { registerStoreModule }   from '@/helpers/helpers';
import { namespace }             from 'vuex-class';
import { loadTranslationsAsync } from '@/i18n/i18n';
import { Route }                 from 'vue-router';
import Store                     from '@/store/store';

import mzAddItemModule from '@/views/user-account/user-account-add-item/store/user-account-add-item.module';
import MzSteps         from '@/components/steps/steps.component.vue';
import mzButton        from '@/components/buttons/button.component.vue';

const LOCAL_STORE = 'addItem';
const local = namespace(LOCAL_STORE);

@Component({
  components: {
    MzSteps,
    mzButton,
  },
})
export default class mzUserAccount extends Vue {
  @local.State((state: mzAddItemModule) => state.numberOfActiveStep) public activeNumber!: number;

  private async beforeRouteEnter(to: Route, from: Route, next: any) {
    const lang = Store.state.global.defaultLang;

    try {
      await loadTranslationsAsync(lang, import(`./i18n/${lang}`));
      registerStoreModule(LOCAL_STORE.split('/'), mzAddItemModule);
      next();
    } catch (e) {
      next(false);
      throw new Error(e);
    }
  }
}
</script>

<style lang="scss"
       scoped>

.fade-enter-active, .fade-leave-active {
  transition: opacity .25s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
{
  opacity: 0;
}

.mz-add-item {
  width: 75rem;
  margin-left: 10rem;

}
</style>
