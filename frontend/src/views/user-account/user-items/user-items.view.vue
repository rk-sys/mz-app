<template>
  <div class="mz-user-items">
    <div class="mz-user-items__summary-menu">
      summary menu
    </div>
    <div class="mz-user-items__items-wrapper">
      <mz-user-item v-for="(item, i) in items"
                    :item="item"
                    :key="i" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue }              from 'vue-property-decorator';
import { registerStoreModule }         from '@/helpers/helpers';
import { namespace }                   from 'vuex-class';
import { i18n, loadTranslationsAsync } from '@/i18n/i18n';
import Store                           from '@/store/store';
import { Route }                       from 'vue-router';
import mzUserAccountModule             from '../store/user-account.module';
import mzUserItem                      from './components/user-item.component.vue';

const LOCAL_STORE = 'userAccount';
const local = namespace(LOCAL_STORE);

@Component({
  components: {
    mzUserItem,
  },
})
export default class mzUserItems extends Vue {
  @local.State((state: mzUserAccountModule) => state.mzItems) public items!: any;

  private async beforeRouteEnter(to: Route, from: Route, next: any) {
    const lang = Store.state.global.defaultLang;

    try {
      await loadTranslationsAsync(lang, import(`./i18n/${lang}`));

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

.mz-user-items {
  width: 75rem;
  margin-left: 10rem;

  &__summary-menu {
    height: 2.5rem;
  }

  &__items-wrapper {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 2rem;
    grid-row-gap: 2rem;
  }
}

</style>
