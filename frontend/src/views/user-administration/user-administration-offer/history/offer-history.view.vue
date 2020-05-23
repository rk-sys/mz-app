<template>
  <div class="mz-offer-history">
    <div class="mz-offer-history__summary-menu">

      <p class="mz-offer-history__summary-menu__label">
        {{ $t(`item.historyOffer`) }}

        <span class="mz-offer-history__summary-menu__label__value">
          {{items.length}}
        </span>
      </p>
    </div>

    <div class="mz-offer-history__items-wrapper">

      <mz-user-offer v-for="(item, index) in items"
                     :item="item"
                     :key="index" />
    </div>

    <mz-empty-list-message v-if="!items.length"
                           :pageName="pageName" />

    <mz-dialog :title="$t(`dialog.warning`)"
               :visible.sync="isModalOpen"
               class="mz-offer-history__modal"
               width="30%"
               center>

      <span class="mz-offer-history__modal__label">
        {{ $t(`dialog.deleteOffer`) }}
      </span>

      <span class="mz-offer-history__modal__item">
        {{deleteOffer.title}}
      </span>

      <span slot="footer"
            class="mz-offer-history__modal__footer">

      <mz-button button-style="info"
                 class="mz-offer-history__modal__footer__button"
                 @click="setIsModalOpen(false)">

        {{ $t(`dialog.button.cancel`) }}
      </mz-button>

      <mz-button button-style="danger"
                 class="mz-offer-history__modal__footer__button"
                 @click="setIsModalOpen(false)">
        {{ $t(`dialog.button.delete`) }}
      </mz-button>
    </span>
    </mz-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue }            from 'vue-property-decorator';
import { namespace }                 from 'vuex-class';
import { Route }                     from 'vue-router';
import mzEmptyListMessage            from '@/components/empty-list-message/empty-list-message.component.vue';
import { loadTranslationsAsync }     from '@/i18n/i18n';
import { registerStoreModule }       from '@/helpers/helpers';
import Store                         from '@/store/store';
import { DEFAULT }                   from '@/helpers/variables';
import { IUserOffers, IDeleteOffer } from './store/offer-history.interface';
import mzOfferHistoryModule          from './store/offer-history.module';
import mzUserOffer                   from './components/user-offer.component.vue';
import mzDialog                      from '@/components/dialog/dialog.component.vue';
import mzButton                      from '@/components/buttons/button.component.vue';

const LOCAL_STORE: string = 'mzOfferHistory';
const local = namespace(LOCAL_STORE);

@Component({
  components: {
    mzDialog,
    mzButton,
    mzUserOffer,
    mzEmptyListMessage,
  },
})
export default class mzOfferHistory extends Vue {
  @local.State((state: mzOfferHistoryModule) => state.mzOffers) public items!: IUserOffers[];
  @local.State((state: mzOfferHistoryModule) => state.deleteOffer) public deleteOffer!: IDeleteOffer;
  @local.State((state: mzOfferHistoryModule) => state.isModalOpen) public isModalOpen!: boolean;
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
      registerStoreModule(LOCAL_STORE.split('/'), mzOfferHistoryModule);
      await Store.dispatch(`${LOCAL_STORE}/getUserOffers`);
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

.mz-offer-history {
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
