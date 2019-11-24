<template>
  <div class="mz-user-items">
    <div class="mz-user-items__summary-menu">
      <div class="summary-menu__counter">
        <div class="summary-menu__toggle-view"
             @click="toggleView()"
             :class="{
                  'icon-tile': isListViewOn,
                  'icon-list': !isListViewOn
                   }"></div>

        <mz-summary-item v-for="(summaryItem, i) in summaryList"
                         :summary-label="summaryItem"
                         :key="i">
        </mz-summary-item>
      </div>

      <div class="summary-menu__category-select">
        {{ $t('item.action.show') }}

        <mz-select v-model="selectValue"
                   @change="test(selectValue)"
                   size="mini">

          <mz-option v-for="(option, index) in summaryList"
                     :value="option"
                     :label="$t(`item.status.${ option }`)"
                     :key="index" />
        </mz-select>
      </div>
    </div>

    <div class="mz-user-items__items-wrapper"
         :class="{ 'mz-user-items__items-wrapper--list-view': isListViewOn }">

      <mz-user-item v-for="(item, j) in items"
                    :isListViewOn="isListViewOn"
                    :item="item"
                    :key="j" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue }              from 'vue-property-decorator';
import { namespace }                   from 'vuex-class';
import { i18n, loadTranslationsAsync } from '@/i18n/i18n';
import Store                           from '@/store/store';
import { Route }                       from 'vue-router';
import mzUserAccountModule             from '../store/user-account.module';
import mzUserItem                      from './components/user-item.component.vue';
import mzSummaryItem                   from '@/views/user-account/user-items/components/summary-item.component.vue';
import mzSelect                        from '@/components/form/select/select.component.vue';
import mzOption                        from '@/components/form/option/option.component.vue';
import mzIconsBox                      from '@/components/icons-box/icons-box.component.vue';

const LOCAL_STORE = 'userAccount';
const local = namespace(LOCAL_STORE);

@Component({
  components: {
    mzUserItem,
    mzSummaryItem,
    mzSelect,
    mzOption,
    mzIconsBox,
  },
})
export default class mzUserItems extends Vue {
  @local.State((state: mzUserAccountModule) => state.mzItems) public items!: any;
  @local.Action test!: (arg: string) => void;
  public summaryList: string[] = [ 'active', 'in-progress', 'ended', 'all' ];
  public selectValue: string = '';
  public isListViewOn: boolean = false;

  public toggleView(): void {
    this.isListViewOn = !this.isListViewOn;
  }

  private async beforeRouteEnter(to: Route, from: Route, next: any) {
    const lang = Store.state.global.defaultLang;

    try {
      await loadTranslationsAsync(lang, import(`./i18n/${lang}`));
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

.mz-user-items {
  width: 75rem;
  margin-left: 10rem;

  &__summary-menu {
    height: 2.5rem;
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-between;

    .summary-menu {

      &__counter {
        display: flex;
      }

      &__toggle-view {
        height: 2rem;
        width: 2rem;
        margin-right: 2rem;
        cursor: pointer;
      }

      &__category-select {
        display: flex;
        font-size: 1.4rem;
        margin-right: 2.5rem;
        position: relative;

        .mz-select {
          position: absolute;
          top: -0.5rem;
          left: 5rem;
          height: 2rem;
          width: 12rem;
        }
      }
    }
  }

  &__items-wrapper {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-column-gap: 2rem;
    grid-row-gap: 2rem;

    &--list-view {
      grid-template-columns: repeat(1, 1fr);
    }
  }
}

</style>
