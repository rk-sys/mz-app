<template>
  <div class="mz-user-administration-add-item">

    <mz-steps :labels="['Informacje ogólne', 'Dodaj opis', 'Wrzuć zdjęcie', 'Podsumowanie'] "
              :active="activeNumber" />

    <transition name="fade"
                mode="out-in">

      <template v-if="activeNumber === 0">
        <mz-general-info />
      </template>
    </transition>

    <transition name="fade"
                mode="out-in">

      <template v-if="activeNumber === 1">
        <mz-item-description />
      </template>
    </transition>

    <transition name="fade"
                mode="out-in">

      <template v-if="activeNumber === 2">
        <mz-upload-pictures />
      </template>
    </transition>

    <transition name="fade"
                mode="out-in">

      <template v-if="activeNumber === 3">
        <mz-item-summary />
      </template>
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
import mzAddItemModule           from './store/user-account-add-item.module';
import mzSteps                   from '@/components/steps/steps.component.vue';
import mzItemSummary             from './steps/item-summary.component.vue';
import mzGeneralInfo             from './steps/general-info.component.vue';
import mzItemDescription         from './steps/item-description.component.vue';
import mzUploadPictures          from './steps/upload-pictures.component.vue';


const LOCAL_STORE: string = 'addItem';
const local = namespace(LOCAL_STORE);

@Component({
  components: {
    mzSteps,
    mzGeneralInfo,
    mzItemDescription,
    mzItemSummary,
    mzUploadPictures,
  },
})
export default class mzUserAdministrationAddItem extends Vue {
  @local.State((state: mzAddItemModule) => state.numberOfActiveStep) public activeNumber!: number;

  public destroyed(): void {
    Store.unregisterModule(LOCAL_STORE);
  }

  private async beforeRouteEnter(to: Route, from: Route, next: any) {
    const lang: string = Store.state.global.defaultLang;

    try {
      await loadTranslationsAsync(lang, import(`./i18n/${lang}` as string));
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

.mz-user-administration-add-item {
  width: 90rem;
  margin: 0 auto;
}

@media screen and (max-width: 768px) and (min-width: 426px) {
  .mz-user-administration-add-item {
    margin-left: 0;
    width: 85rem;
  }
}

@media screen and (max-width: 425px) {
  .mz-user-administration-add-item {
    margin-left: 0;
    width: 43rem;
  }
}
</style>
