<template>
  <div class="mz-product-in-realization">
    <div class="mz-product-in-realization__summary-menu">

      <p class="mz-product-in-realization__summary-menu__label">
        {{ $t(`item.productInRealization`) }}

        <span class="mz-product-in-realization__summary-menu__label__value">
          {{items.length}}
        </span>
      </p>
    </div>

    <div class="mz-product-in-realization__items-wrapper">
      <mz-user-item v-for="(item, index) in items"
                    :item="item"
                    :key="index" />
    </div>

    <mz-empty-list-message v-if="!items.length"
                           :pageName="pageName" />

    <mz-dialog :title="$t(`dialog.warning`)"
               :visible.sync="isModalOpen"
               class="mz-product-in-realization__modal"
               width="30%"
               center>

      <span class="mz-product-in-realization__modal__label">
        {{ $t(`dialog.deleteOffer`) }}
      </span>

      <span class="mz-product-in-realization__modal__item">
        {{deleteProduct.title}}
      </span>

      <span slot="footer"
            class="mz-product-in-realization__modal__footer">

      <mz-button button-style="info"
                 class="mz-product-in-realization__modal__footer__button"
                 @click="setIsModalOpen(false)">

        {{ $t(`dialog.button.cancel`) }}
      </mz-button>

      <mz-button button-style="danger"
                 class="mz-product-in-realization__modal__footer__button"
                 @click="setIsModalOpen(false)">
        {{ $t(`dialog.button.delete`) }}
      </mz-button>
    </span>
    </mz-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue }                      from 'vue-property-decorator';
import { namespace }                           from 'vuex-class';
import { Route }                               from 'vue-router';
import { loadTranslationsAsync }               from '@/i18n/i18n';
import Store                                   from '@/store/store';
import { registerStoreModule }                 from '@/helpers/helpers';
import { DEFAULT }                             from '@/helpers/variables';
import { IDeleteProduct, IUserItem }           from './store/in-realization.interface';
import mzButton                                from '@/components/buttons/button.component.vue';
import mzDialog                                from '@/components/dialog/dialog.component.vue';
import mzEmptyListMessage                      from '@/components/empty-list-message/empty-list-message.component.vue';
import mzUserAdministrationInRealizationModule from './store/in-realization.module';
import mzUserItem                              from './components/user-item.component.vue';
import mzSummaryItem                           from './components/summary-item.component.vue';

const LOCAL_STORE: string = 'userAdministrationInRealization';
const local = namespace(LOCAL_STORE);

@Component({
  components: {
    mzButton,
    mzDialog,
    mzUserItem,
    mzSummaryItem,
    mzEmptyListMessage,
  },
})
export default class mzUserAdministrationInRealization extends Vue {
  @local.State((state: mzUserAdministrationInRealizationModule) => state.mzItems) public items!: IUserItem[];
  @local.State((state: mzUserAdministrationInRealizationModule) => state.isModalOpen) public isModalOpen!: boolean;
  @local.State((state: mzUserAdministrationInRealizationModule) => state.deleteProduct) public deleteProduct!: IDeleteProduct;
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

.mz-product-in-realization {
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
