<template>
  <div class="mz-offer-detail">
    <div class="mz-offer-detail__content">

      <mz-offer-detail-card :offer="mzOffer" />

      <mz-offer-detail-card-mobile :offer="mzOffer" />

      <div class="mz-offer-detail__content__actions">

        <mz-offer-detail-order-status status="STATUS" />

        <mz-offer-detail-customer-list :customer-list="mzOffer.customers" />

        <mz-offer-detail-chat />

        <div class="mz-offer-detail__content__actions__message">
          <textarea v-model="newMessage"
                    class="input" ></textarea>

          <mz-button @click="sendNewMessage"> {{ $t(`sendMessage`) }}
          </mz-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue }        from 'vue-property-decorator';
import { namespace }             from 'vuex-class';
import { Route }                 from 'vue-router';
import Store                     from '@/store/store';
import { loadTranslationsAsync } from '@/i18n/i18n';
import { registerStoreModule }   from '@/helpers/helpers';
import { IOffer }                from '@/views/offer-detail/store/offer-detail.interface';
import mzOfferDetailModule       from './store/offer-detail.module';
import mzOfferDetailCard         from './components/offer-detail-order-card.component.vue';
import mzOfferDetailCustomerList from './components/offer-detail-customer-list.component.vue';
import mzOfferDetailOrderStatus  from './components/offer-detail-order-status.component.vue';
import mzOfferDetailChat         from './components/offer-detail-chat.component.vue';
import mzOfferDetailCardMobile   from './components/offer-detail-order-card-mobile.component.vue';
import mzInput                   from '@/components/input/mz-input.component.vue';
import mzButton                  from '@/components/buttons/button.component.vue';

const LOCAL_STORE: string = 'offerDetail';
const local = namespace(LOCAL_STORE);

@Component({
  components: {
    mzButton,
    mzInput,
    mzOfferDetailChat,
    mzOfferDetailCard,
    mzOfferDetailCardMobile,
    mzOfferDetailOrderStatus,
    mzOfferDetailCustomerList,
  },
})
export default class mzOfferDetail extends Vue {
  @local.State((state: mzOfferDetailModule) => state.mzOffer) public mzOffer!: IOffer;

  public newMessage: string = '';

  public sendNewMessage(): void {
    this.newMessage = '';
  }

  private async beforeRouteEnter(to: Route, from: Route, next: any) {
    const lang: string = Store.state.global.defaultLang;

    try {
      await loadTranslationsAsync(lang, import(`./i18n/${lang}` as string));
      registerStoreModule(LOCAL_STORE.split('/'), mzOfferDetailModule);
      await Store.dispatch(`${LOCAL_STORE}/getOffer`, '1');
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

.mz-offer-detail {
  min-height: 100vh;
  background: var(--background-color);
  height: 100%;
  display: grid;
  grid-template-rows: 6.4rem 7rem auto;
  grid-template-columns: 1fr 4fr 1fr;

  &__content {
    display: flex;
    grid-row-start: 3;
    grid-column-start: 2;
    justify-content: center;

    &__actions {
      display: flex;
      margin-left: 3rem;
      flex-direction: column;

      &__message {
        background: var(--white);
        padding: 2rem;
        margin-top: 1.5rem;

        .input {
          width: 100%;
          height: 8rem;
          margin-bottom: 1rem;
          font-size: 1.6rem;
          font-weight: 300;
          border-radius: 2px;
          padding: .8rem 1.6rem;

          &:focus {
            border-radius: 2px;
            outline-color: var(--primary-color);
          }
        }
      }
    }
  }
}

@include respond-to(desktop) {
  .mz-offer-detail {
    &__content {
      flex-direction: column;
      justify-content: flex-start;

      &__actions {
        display: flex;
        margin-left: 0;
        flex-direction: column;
      }
    }
  }
}

@include respond-to(tablet) {
  .mz-offer-detail {
    grid-template-rows: 0 0 auto;

    &__content {
      width: 85rem;
      flex-direction: column;
      justify-content: flex-start;

      &__actions {
        display: flex;
        margin-left: 0;
        flex-direction: column;
      }
    }
  }
}

@include respond-to(mobile) {
  .mz-offer-detail {
    grid-template-rows: 0 0 auto;

    &__content {
      width: 46rem;
      flex-direction: column;
      justify-content: flex-start;

      &__actions {
        display: flex;
        margin-left: 0;
        flex-direction: column;
      }
    }
  }
}
</style>
