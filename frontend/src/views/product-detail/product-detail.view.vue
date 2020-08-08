<template>
  <div class="mz-product-detail">
    <div class="mz-product-detail__content">

      <main class="mz-product-detail__content__product-info">
        <mz-product-detail-description :product-detail="productDetail" />

        <mz-product-detail-description-mobile :product-detail="productDetail" />
      </main>

      <aside class="mz-product-detail__content__actions">

        <mz-product-detail-checkout :is-new="productDetail.product.isNew"
                                    :main-range="productDetail.product.mainRange"
                                    :price="productDetail.product.price"
                                    :uuid="productDetail.product.uuid" />

        <mz-product-detail-customer-list :customer-list="productDetail.customers"
                                         v-if="productDetail.customers" />

        <mz-product-detail-chat />

        <div class="mz-product-detail__content__actions__message">
          <textarea class="input"
                    v-model="newMessage"></textarea>

          <mz-button @click="sendNewMessage"> {{ $t(`sendMessage`) }}
          </mz-button>
        </div>
      </aside>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue }               from 'vue-property-decorator';
import { Route }                        from 'vue-router';
import { namespace }                    from 'vuex-class';
import { registerStoreModule }          from '@/helpers/helpers';
import { loadTranslationsAsync }        from '@/i18n/i18n';
import Store                            from '@/store/store';
import { IProductDetail }               from '@/views/product-detail/store/product-detail.interface';
import mzProductDetailModule            from './store/product-detail.module';
import mzProductDetailDescription       from './components/product-detail-description.compontent.vue';
import mzProductDetailDescriptionMobile from './components/product-detail-description-mobile.compontent.vue';
import mzProductDetailCheckout          from './components/product-detail-checkout.compontent.vue';
import mzProductDetailCustomerList      from './components/product-detail-customer-list.component.vue';
import mzProductDetailChat              from './components/product-detail-chat.component.vue';
import mzButton                         from '@/components/buttons/button.component.vue';

const LOCAL_STORE: string = 'productDetail';
const local = namespace(LOCAL_STORE);

@Component({
  components: {
    mzButton,
    mzProductDetailChat,
    mzProductDetailCheckout,
    mzProductDetailDescription,
    mzProductDetailCustomerList,
    mzProductDetailDescriptionMobile,
  },
})
export default class mzProductDetail extends Vue {
  @local.State((state: mzProductDetailModule) => state.mzProductDetail) public productDetail!: IProductDetail;

  public newMessage: string = '';

  public sendNewMessage(): void {
    this.newMessage = '';
  }

  private async beforeRouteEnter(to: Route, from: Route, next: any) {
    const lang: string = Store.state.global.defaultLang;

    try {
      await loadTranslationsAsync(lang, import(`./i18n/${lang}` as string));
      registerStoreModule(LOCAL_STORE.split('/'), mzProductDetailModule);
      await Store.dispatch(`${LOCAL_STORE}/getProductDetail`, '1');
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

.fade-enter-active, .fade-leave-active {
  transition: opacity .25s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
{
  opacity: 0;
}

.mz-product-detail {
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
    -webkit-box-pack: center;
    justify-content: center;

    &__product-info {
      width: 52rem;
      padding: 2.4rem;
      border-radius: 2px;
      background-color: var(--white);
      margin-bottom: 4rem;
      grid-row-start: 1;
      grid-row-end: 3;
      grid-column-start: 1;
    }

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
  .mz-product-detail {
    &__content {
      flex-direction: column;
      justify-content: flex-start;

      &__product-info {
        width: 100%;
        padding: 0 2.4rem;
        margin-bottom: 1rem;
      }

      &__actions {
        display: flex;
        margin-left: 0;
        flex-direction: column;
      }
    }
  }
}

@include respond-to(tablet) {
  .mz-product-detail {
    grid-template-rows: 0 0 auto;

    &__content {
      width: 85rem;
      flex-direction: column;
      justify-content: flex-start;

      &__product-info {
        width: 100%;
        padding: 0 2.4rem;
        margin-bottom: 1rem;
      }

      &__actions {
        display: flex;
        margin-left: 0;
        flex-direction: column;
      }
    }
  }
}

@include respond-to(mobile) {
  .mz-product-detail {
    grid-template-rows: 0 0 auto;

    &__content {
      width: 46rem;
      flex-direction: column;
      justify-content: flex-start;

      &__product-info {
        width: 100%;
        padding: 0 2.4rem;
        margin-bottom: 1rem;
      }

      &__actions {
        display: flex;
        margin-left: 0;
        flex-direction: column;
      }
    }
  }
}
</style>