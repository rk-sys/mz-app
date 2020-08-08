<template>
  <div class="mz-product-checkout">
    <div class="mz-product-checkout__container">
      <mz-safety-rules />

      <main class="mz-product-checkout__container__main">
        <mz-selected-product />

        <mz-delivery-product />

        <mz-address-recipient :trigger="trigger"
                              @formElement="setFormElement"
                              v-if="!hideAddress" />

        <mz-box-with-title class="mz-product-checkout__container__main__summary">
          <p class="title">{{ $t(`summary`) }}</p>

          <p class="product">
            <span class="label">{{ $t(`itemValue`) }}</span>
            <span class="price">{{ productSummary.price }} {{ $t(`currency`) }}</span>
          </p>

          <p class="delivery">
            <span class="label">{{ $t(`deliveryValue`) }}</span>
            <span class="price" v-if="deliveryOption">{{ deliveryOption.price }} {{ $t(`currency`) }}</span>
            <span class="price" v-else>-</span>
          </p>
          <p class="total-amount">
            <span>{{ $t(`totalAmount`) }}</span>
            <span>{{ calculateTotalAmount(productSummary.price, deliveryOption.price) }} {{ $t(`currency`) }}</span>
          </p>
        </mz-box-with-title>

        <div class="mz-product-checkout__container__main__buttons">

          <mz-button @click="goToProductDetail()"
                     button-style="cancel"
                     class="button button--cancel">

            {{ $t(`buttons.cancel`) }}
          </mz-button>

          <mz-button :class="{'disabled' : isDisabled()}"
                     :disabled="isDisabled()"
                     @click="onSubmit()"
                     class="button button--buy"
                     type="disabled">

            {{ $t(`buttons.buy`) }}
          </mz-button>
        </div>
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue }                    from 'vue-property-decorator';
import { Route }                             from 'vue-router';
import { namespace }                         from 'vuex-class';
import { registerStoreModule }               from '@/helpers/helpers';
import { loadTranslationsAsync }             from '@/i18n/i18n';
import Store                                 from '@/store/store';
import mzSafetyRules                         from './components/safety-rules.component.vue';
import mzSelectedProduct                     from './components/selected-product.component.vue';
import mzProductCheckoutModule               from './store/product-checkout.module';
import mzDeliveryProduct                     from './components/delivery.component.vue';
import mzAddressRecipient                    from './components/address-recipient.component.vue';
import mzBoxWithTitle                        from '@/components/box-with-title/box-with-title.component.vue';
import mzButton                              from '@/components/buttons/button.component.vue';
import { IDeliveryOptions, IProductSummary } from '@/views/product-checkout/store/product-checkout.interface';
import router                                from '@/router';

const LOCAL_STORE: string = 'productCheckout';
const local = namespace(LOCAL_STORE);

@Component({
  components: {
    mzButton,
    mzSafetyRules,
    mzDeliveryProduct,
    mzSelectedProduct,
    mzAddressRecipient,
    mzBoxWithTitle,
  },
})
export default class mzProductCheckout extends Vue {
  @local.State((state: mzProductCheckoutModule) => state.hideAddress) public hideAddress!: boolean;
  @local.State((state: mzProductCheckoutModule) => state.productUuid) public productUuid!: string;
  @local.State((state: mzProductCheckoutModule) => state.informationCheckout.deliveryOption) public deliveryOption!: string | IDeliveryOptions;
  @local.State((state: mzProductCheckoutModule) => state.informationCheckout.label) public deliveryLabel!: string;
  @local.State((state: mzProductCheckoutModule) => state.productCheckout.productSummary) public productSummary!: IProductSummary;
  @local.Action public buyProduct!: () => void;


  public formElement: HTMLElement | null = null;
  public trigger: boolean = false;

  public destroyed(): void {
    Store.unregisterModule(LOCAL_STORE);
  }

  public isDisabled(): boolean {
    if (this.deliveryLabel === '') {
      return true;
    } else if (this.deliveryLabel === 'personalPickup') {
      return false;
    } else {
      return this.deliveryOption === '';
    }
  }

  public calculateTotalAmount(product: number, delivery: number): number {
    if (delivery !== undefined) {
      return product + delivery;
    } else {
      return product;
    }
  }

  public goToProductDetail(): void {
    const uuid: string = this.productUuid;
    router.push({ name: 'Product detail', params: { uuid } });
  }

  public setFormElement(formElement: HTMLElement | null): void {
    this.formElement = formElement;
  }

  public onSubmit(): void {
    this.trigger = !this.trigger;

    if (this.deliveryLabel !== 'personalPickup') {
      this.$nextTick(() => {
        (this.formElement as any).validate(async (valid: boolean) => {
          if (valid) {
            this.buyProduct();
          } else {
            return false;
          }
        });
      });
    } else {
      this.buyProduct();
    }
  }

  private async beforeRouteEnter(to: Route, from: Route, next: any) {
    const lang: string = Store.state.global.defaultLang;

    try {
      await loadTranslationsAsync(lang, import(`./i18n/${lang}` as string));
      registerStoreModule(LOCAL_STORE.split('/'), mzProductCheckoutModule);
      await Store.dispatch(`${LOCAL_STORE}/getProductCheckout`, to.params.uuid);
      await Store.commit(`${LOCAL_STORE}/setProductUuid`, to.params.uuid);
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

.mz-product-checkout {
  min-height: 100vh;
  background: var(--background-color);
  height: 100%;
  display: grid;
  grid-template-rows: 6.4rem 7rem auto;
  grid-template-columns: 1fr 4fr 1fr;

  &__container {
    display: flex;
    grid-row-start: 3;
    grid-column-start: 2;

    &__main {
      margin-left: 6rem;
      max-width: 85rem;

      &__summary {
        .title {
          font-size: 3rem;
          margin: 1rem 0;
        }

        .product,
        .delivery {
          display: flex;
          justify-content: space-between;
          font-size: 2rem;
          margin: .5rem 0;

          .label,
          .price {
            font-size: 2rem;
            color: var(--gray-900);
          }
        }

        .total-amount {
          border-top: 1px solid var(--gray-450);
          font-size: 2.6rem;
          margin: 1rem 0;
          padding: 1rem 0;
          display: flex;
          justify-content: space-between;
        }
      }

      &__buttons {
        display: flex;
        justify-content: flex-end;

        .button {
          max-width: max-content;
        }

        .disabled {
          background: var(--gray-950);
        }
      }
    }
  }
}

@include respond-to(tablet) {
  .mz-product-checkout {
    grid-template-rows: 0 0 auto;

    &__container {
      flex-direction: column;

      &__main {
        margin-left: 0;
        margin-top: 5rem;
      }
    }
  }
}

@include respond-to(mobile) {
  .mz-product-checkout {
    grid-template-rows: 0 0 auto;

    &__container {
      flex-direction: column;

      &__main {
        margin-left: 0;
        margin-top: 5rem;
        width: 46rem;
      }
    }
  }
}
</style>
