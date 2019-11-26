<template>
  <div class="mz-summary-item"
       v-if="summaryLabel !== 'all'">

    {{ $t(`item.status.${ summaryLabel }`) }}:

    <span class="mz-summary-item__result">
      {{ filterUserItems(summaryLabel) }}
    </span>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop }        from 'vue-property-decorator';
import { namespace }                   from 'vuex-class';
import { i18n, loadTranslationsAsync } from '@/i18n/i18n';
import Store                           from '@/store/store';
import { Route }                       from 'vue-router';
import mzUserAccountModule             from '../../store/user-account.module';
import { IUserItem }                   from '../../store/user-account.interface';

const LOCAL_STORE = 'userAccount';
const local = namespace(LOCAL_STORE);

@Component({
  components: {},
})
export default class mzSummaryItem extends Vue {
  @local.State((state: mzUserAccountModule) => state.mzItems) public items!: IUserItem[];
  @Prop(String) public summaryLabel!: string;

  public filterUserItems(arg: string): number {
    const filteredItems = this.items.filter((item: IUserItem) => item.status === arg);
    return filteredItems.length;
  }

  private async beforeRouteEnter(to: Route, from: Route, next: any) {
    const lang = Store.state.global.defaultLang;

    try {
      await loadTranslationsAsync(lang, import(`../i18n/${lang}`));

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

.mz-summary-item {
  font-size: 1.4rem;
  margin-right: 2rem;

  &__result {
    color: var(--primary-color);
    font-weight: var(--font-bold);
  }
}

</style>
