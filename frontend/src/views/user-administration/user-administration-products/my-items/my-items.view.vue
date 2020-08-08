<template>
  <div class="mz-user-administration-my-items">
    <div class="mz-user-administration-my-items__summary-menu">

      <p class="mz-user-administration-my-items__summary-menu__label">
        {{ $t(`item.found`) }}

        <span class="mz-user-administration-my-items__summary-menu__label__value">
          {{items.length}}
        </span>

        {{ $t(`item.items`)}}
      </p>
    </div>

    <div class="mz-user-administration-my-items__items-wrapper">
      <mz-user-item :item="item"
                    :key="index"
                    v-for="(item, index) in items" />
    </div>

    <mz-empty-list-message :pageName="pageName"
                           v-if="!items.length" />

    <mz-dialog :title="$t(`dialog.warning`)"
               :visible.sync="isModalOpen"
               center
               class="mz-user-administration-my-items__modal"
               width="30%">

      <span class="mz-user-administration-my-items__modal__label">
        {{ $t(`dialog.deleteItem`) }}
      </span>

      <span class="mz-user-administration-my-items__modal__item">
        {{deleteItem.title}}
      </span>

      <span class="mz-user-administration-my-items__modal__footer"
            slot="footer">

      <mz-button @click="setIsModalOpen(false)"
                 button-style="info"
                 class="mz-user-administration-my-items__modal__footer__button">

        {{ $t(`dialog.button.cancel`) }}
      </mz-button>

      <mz-button @click="setIsModalOpen(false)"
                 button-style="danger"
                 class="mz-user-administration-my-items__modal__footer__button">
        {{ $t(`dialog.button.delete`) }}
      </mz-button>
    </span>
    </mz-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue }                from 'vue-property-decorator';
import { namespace }                     from 'vuex-class';
import { Route }                         from 'vue-router';
import { loadTranslationsAsync }         from '@/i18n/i18n';
import { registerStoreModule }           from '@/helpers/helpers';
import Store                             from '@/store/store';
import { IDeleteItem, IUserItem }        from './store/my-items.interface';
import mzUserAdministrationMyItemsModule from './store/my-items.module';
import mzUserItem                        from './components/user-item.component.vue';
import mzSummaryItem                     from './components/summary-item.component.vue';
import mzDialog                          from '@/components/dialog/dialog.component.vue';
import mzButton                          from '@/components/buttons/button.component.vue';
import { DEFAULT }                       from '@/helpers/variables';
import mzEmptyListMessage                from '@/components/empty-list-message/empty-list-message.component.vue';

const LOCAL_STORE: string = 'userAdministrationMyItems';
const local = namespace(LOCAL_STORE);

@Component({
  components: {
    mzSummaryItem,
    mzUserItem,
    mzDialog,
    mzButton,
    mzEmptyListMessage,
  },
})
export default class mzUserItems extends Vue {
  @local.State((state: mzUserAdministrationMyItemsModule) => state.mzItems) public items!: IUserItem[];
  @local.State((state: mzUserAdministrationMyItemsModule) => state.isModalOpen) public isModalOpen!: boolean;
  @local.State((state: mzUserAdministrationMyItemsModule) => state.deleteItem) public deleteItem!: IDeleteItem;
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
      registerStoreModule(LOCAL_STORE.split('/'), mzUserAdministrationMyItemsModule);
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

.mz-user-administration-my-items {
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
        color: var(--primary-color);
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
