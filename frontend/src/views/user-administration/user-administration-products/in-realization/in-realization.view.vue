<template>
  <div class="mz-user-administration-in-realization">
    <div class="mz-user-administration-in-realization__summary-menu">

      <p class="mz-user-administration-in-realization__summary-menu__label">
        {{ $t(`item.productInRealization`) }}

        <span class="mz-user-administration-in-realization__summary-menu__label__value">
          {{items.length}}
        </span>
      </p>
    </div>

    <div class="mz-user-administration-in-realization__items-wrapper">
      <mz-user-item v-for="(item, index) in items"
                    :item="item"
                    :key="index" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue }                      from 'vue-property-decorator';
import { namespace }                           from 'vuex-class';
import { Route }                               from 'vue-router';
import { loadTranslationsAsync }               from '@/i18n/i18n';
import Store                                   from '@/store/store';
import { registerStoreModule }                 from '@/helpers/helpers';
import { IUserItem }                           from './store/in-realization.interface';
import mzUserAdministrationInRealizationModule from './store/in-realization.module';
import mzUserItem                              from './components/user-item.component.vue';
import mzSummaryItem                           from './components/summary-item.component.vue';

const LOCAL_STORE: string = 'userAdministrationInRealization';
const local = namespace(LOCAL_STORE);

@Component({
  components: {
    mzUserItem,
    mzSummaryItem,
  },
})
export default class mzUserAdministrationInRealization extends Vue {
  @local.State((state: mzUserAdministrationInRealizationModule) => state.mzItems) public items!: IUserItem[];
  @local.Action public getUserItems!: (arg: string) => void;

  private async beforeRouteEnter(to: Route, from: Route, next: any) {
    const lang: string = Store.state.global.defaultLang;

    try {
      await loadTranslationsAsync(lang, import(`./i18n/${lang}` as string));
      registerStoreModule(LOCAL_STORE.split('/'), mzUserAdministrationInRealizationModule);
      await Store.dispatch(`${LOCAL_STORE}/getUserItems`);
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

.mz-user-administration-in-realization {
  margin-bottom: 5rem;

  &__summary-menu {
    justify-content: flex-start;
    margin-bottom: .5rem;
    font-size: 1.4rem;
    line-height: 3rem;
    display: flex;

    &__label {
      font-size: 1.8rem;
      font-weight: var(--font-medium);
      margin: 0 0 1.5rem;

      &__value {
        font-weight: var(--font-medium);
        color: var(--secondary-color);
        font-size: 2rem;
        margin: 0 .5rem;
      }
    }
  }

  &__items-wrapper {
    display: flex;
    flex-direction: column;
  }
}

@include respond-to(tablet) {
}

@include respond-to(mobile) {
}

</style>
