<template>
  <div class="mz-user-administration-product-history-list">
    <div class="mz-user-administration-product-history-list__summary-menu">

      <p class="mz-user-administration-product-history-list__summary-menu__label">
        {{ $t(`item.historyProducts`) }}

        <span class="mz-user-administration-product-history-list__summary-menu__label__value">
          {{items.length}}
        </span>
      </p>
    </div>

    <div class="mz-user-administration-product-history-list__items-wrapper">
      <mz-user-item v-for="(item, index) in items"
                    :item="item"
                    :key="index" />
    </div>

    <mz-empty-list-message v-if="!items.length"
                           :pageName="pageName" />

    <mz-dialog :title="$t(`dialog.warning`)"
               :visible.sync="isModalOpen"
               class="mz-user-administration-product-history-list__modal"
               width="30%"
               center>

      <span class="mz-user-administration-product-history-list__modal__label">
        {{ $t(`dialog.deleteItem`) }}
      </span>

      <span class="mz-user-administration-product-history-list__modal__item">
        {{deleteItem.title}}
      </span>

      <span slot="footer"
            class="mz-user-administration-product-history-list__modal__footer">

      <mz-button button-style="info"
                 class="mz-user-administration-product-history-list__modal__footer__button"
                 @click="setIsModalOpen(false)">

        {{ $t(`dialog.button.cancel`) }}
      </mz-button>

      <mz-button button-style="danger"
                 class="mz-user-administration-product-history-list__modal__footer__button"
                 @click="setIsModalOpen(false)">
        {{ $t(`dialog.button.delete`) }}
      </mz-button>
    </span>
    </mz-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue }                           from 'vue-property-decorator';
import { namespace }                                from 'vuex-class';
import { Route }                                    from 'vue-router';
import mzEmptyListMessage                           from '@/components/empty-list-message/empty-list-message.component.vue';
import { loadTranslationsAsync }                    from '@/i18n/i18n';
import { registerStoreModule }                      from '@/helpers/helpers';
import Store                                        from '@/store/store';
import { DEFAULT }                                  from '@/helpers/variables';
import { IUserItem, IDeleteItem }                   from './store/product-history.interface';
import mzUserAdministrationProductHistoryListModule from './store/product-history.module';
import mzUserItem                                   from './components/user-item-history.component.vue';
import mzDialog                                     from '@/components/dialog/dialog.component.vue';
import mzButton                                     from '@/components/buttons/button.component.vue';

const LOCAL_STORE: string = 'userAdministrationInRealization';
const local = namespace(LOCAL_STORE);

@Component({
  components: {
    mzDialog,
    mzButton,
    mzUserItem,
    mzEmptyListMessage,
  },
})
export default class mzUserAdministrationInRealization extends Vue {
  @local.State((state: mzUserAdministrationProductHistoryListModule) => state.mzItems) public items!: IUserItem[];
  @local.State((state: mzUserAdministrationProductHistoryListModule) => state.deleteItem) public deleteItem!: IDeleteItem;
  @local.State((state: mzUserAdministrationProductHistoryListModule) => state.isModalOpen) public isModalOpen!: boolean;
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
      registerStoreModule(LOCAL_STORE.split('/'), mzUserAdministrationProductHistoryListModule);
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

.mz-user-administration-product-history-list {
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

@include respond-to(tablet) {
}

@include respond-to(mobile) {
}

</style>
