<template>
  <div class="mz-product-history">
    <div class="mz-product-history__summary-menu">

      <p class="mz-product-history__summary-menu__label">
        {{ $t(`item.historyProducts`) }}

        <span class="mz-product-history__summary-menu__label__value">
          {{items.length}}
        </span>
      </p>
    </div>

    <div class="mz-product-history__items-wrapper">
      <mz-user-item :item="item"
                    :key="index"
                    v-for="(item, index) in items" />
    </div>

    <mz-empty-list-message :pageName="pageName"
                           v-if="!items.length" />

    <mz-dialog :title="$t(`dialog.warning`)"
               :visible.sync="isModalOpen"
               center
               class="mz-product-history__modal"
               width="30%">

      <span class="mz-product-history__modal__label">
        {{ $t(`dialog.deleteItem`) }}
      </span>

      <span class="mz-product-history__modal__item">
        {{deleteItem.title}}
      </span>

      <span class="mz-product-history__modal__footer"
            slot="footer">

      <mz-button @click="setIsModalOpen(false)"
                 button-style="info"
                 class="mz-product-history__modal__footer__button">

        {{ $t(`dialog.button.cancel`) }}
      </mz-button>

      <mz-button @click="setIsModalOpen(false)"
                 button-style="danger"
                 class="mz-product-history__modal__footer__button">
        {{ $t(`dialog.button.delete`) }}
      </mz-button>
    </span>
    </mz-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue }         from 'vue-property-decorator';
import { namespace }              from 'vuex-class';
import { Route }                  from 'vue-router';
import mzEmptyListMessage         from '@/components/empty-list-message/empty-list-message.component.vue';
import { loadTranslationsAsync }  from '@/i18n/i18n';
import { registerStoreModule }    from '@/helpers/helpers';
import Store                      from '@/store/store';
import { DEFAULT }                from '@/helpers/variables';
import { IDeleteItem, IUserItem } from './store/product-history.interface';
import mzProductHistorModule      from './store/product-history.module';
import mzUserItem                 from './components/user-item-history.component.vue';
import mzDialog                   from '@/components/dialog/dialog.component.vue';
import mzButton                   from '@/components/buttons/button.component.vue';

const LOCAL_STORE: string = 'mzProductHistory';
const local = namespace(LOCAL_STORE);

@Component({
  components: {
    mzDialog,
    mzButton,
    mzUserItem,
    mzEmptyListMessage,
  },
})
export default class mzProductHistory extends Vue {
  @local.State((state: mzProductHistorModule) => state.mzItems) public items!: IUserItem[];
  @local.State((state: mzProductHistorModule) => state.deleteItem) public deleteItem!: IDeleteItem;
  @local.State((state: mzProductHistorModule) => state.isModalOpen) public isModalOpen!: boolean;
  @local.Mutation public setIsModalOpen!: (payload: boolean) => void;
  @local.Action public getUserItems!: (arg: string) => void;
  public pageName: string | undefined;

  public created(): void {
    this.pageName = this.$route.name ? this.$route.name.toLowerCase() : DEFAULT;
  }

  private async beforeRouteEnter(to: Route, from: Route, next: any) {
    const lang: string = Store.state.global.defaultLang;

    try {
      await loadTranslationsAsync(lang, import(`./i18n/${lang}` as string));
      registerStoreModule(LOCAL_STORE.split('/'), mzProductHistorModule);
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

.mz-product-history {
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
        color: var(--gray-500);
        font-size: 2rem;
        margin: 0 .5rem;
      }
    }
  }

  &__items-wrapper {
    display: flex;
    flex-direction: column;
  }

  &__modal {
    &__label {
      text-align: center;
      font-size: 1.8rem;
      display: block;
      word-break: break-word;
    }

    &__item {
      font-weight: var(--font-medium);
      color: var(--black);
      text-align: center;
      font-size: 1.8rem;
      margin: 1rem 0;
      display: block;
    }

    &__footer {
      display: flex;
      justify-content: space-between;

      &__button {
        max-width: 15rem;
      }
    }
  }
}
</style>
