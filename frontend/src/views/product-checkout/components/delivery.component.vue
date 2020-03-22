<template>
  <div class="mz-delivery-product">
    <mz-box-with-title :title="$t(`box.deliveryProduct`)"
                       icon-name="icon-delivery">

      <div class="mz-delivery-product__options">

        <mz-radio v-for="(option, index) in delivery"
                  :key="index"
                  v-model="information.label"
                  :label="option.label"
                  @input="setOptionDelivery(option)"
                  class="radio-box">

          <span class="radio-box__text">{{ $t(`delivery.${option.label}`) }}</span>
        </mz-radio>
      </div>

      <div class="mz-delivery-product__delivery-option">
        <template v-if="deliveryOptions">

          <div v-for="(option, index) in deliveryOptions"
               :key="index"
               @click="setSuboptionDelivery(option)"
               class="mz-delivery-product__delivery-option__item">

            <div class="circle"
                 :class="{'circle--active' : isEqualObject(option)}"></div>

            <span class="title"
                  :class="{'title--active' :  isEqualObject(option)}">{{ option.title }}</span>

            <span class="price">{{ option.price }} {{ $t(`currency`) }}</span>

          </div>
        </template>

        <template v-if="information.label === 'personalPickup'">
          <p class="mz-delivery-product__delivery-option__personal-pickup">
            {{$t(`delivery.personalPickDescription`) }}
          </p>
        </template>
      </div>
    </mz-box-with-title>
  </div>
</template>

<script lang="ts">
import { Component, Vue }                                    from 'vue-property-decorator';
import { namespace }                                         from 'vuex-class';
import mzProductCheckoutModule                               from '../store/product-checkout.module';
import mzBoxWithTitle                                        from '@/components/box-with-title/box-with-title.component.vue';
import mzRadio                                               from '@/components/form/radio/radio.component.vue';
import { IDelivery, IDeliveryOptions, IInformationCheckout } from '@/views/product-checkout/store/product-checkout.interface';

const LOCAL_STORE: string = 'productCheckout';
const local = namespace(LOCAL_STORE);

@Component({
  components: {
    mzRadio,
    mzBoxWithTitle,
  },
})
export default class mzDeliveryProduct extends Vue {
  @local.State((state: mzProductCheckoutModule) => state.productCheckout.productDeliveryOptions) public delivery!: IDelivery;
  @local.State((state: mzProductCheckoutModule) => state.informationCheckout) public information!: IInformationCheckout;
  @local.Mutation public setDeliveryOption!: (payload: string | IDeliveryOptions) => void;
  @local.Mutation public setAddressSelected!: (payload: boolean) => void;
  @local.Mutation public setHideAddress!: (payload: boolean) => void;
  @local.Mutation public setAddressDeliveryTyp!: () => void;

  public deliveryOptions: IDeliveryOptions[] | string | undefined = '';

  public setOptionDelivery(delivery: IDelivery): void {
    this.setDeliveryOption('');
    this.checkDelivery(delivery);

    if ('options' in delivery) {
      this.deliveryOptions = delivery.options;
    } else {
      this.deliveryOptions = [];
    }
    this.setAddressDeliveryTyp();
  }

  public setSuboptionDelivery(delivery: string | IDeliveryOptions) {
    this.setDeliveryOption(delivery);
    this.setAddressSelected(true);
  }

  public checkDelivery(delivery: IDelivery) {
    if (delivery.options) {
      this.setHideAddress(false);
      this.setAddressSelected(false);
    } else {
      this.setHideAddress(true);
    }
  }

  public isEqualObject(option: IDeliveryOptions) {
    return Object.is(option, this.information.deliveryOption);
  }
}
</script>

<style lang="scss"
       scoped>

.mz-delivery-product {
  &__options {
    margin-top: 3rem;
    display: flex;
    justify-content: space-around;
    padding-bottom: 2rem;

    .radio-box {
      margin-right: 2rem;
      color: var(--gray-500);
      padding: .5rem 1rem;
      background-color: var(--white);
      border: 1px solid var(--white);
      border-radius: 2px;

      &__text {
        font-size: 2rem;
        font-weight: var(--font-medium);
      }

      &:hover {
        border: 1px solid var(--primary-color);
        color: var(--primary-color);
        cursor: pointer;
        box-shadow: 0 0 .5rem 0 rgba(0, 0, 0, .2);
      }
    }

    .is-checked {
      background-color: var(--primary-color);
      border: 1px solid var(--primary-color);
      color: var(--white) !important;

      &:hover {
        color: var(--white);
      }
    }
  }

  &__delivery-option {
    border-top: 1px solid var(--gray-200);

    &__item {
      display: flex;
      align-items: center;
      margin: 1rem 0;
      padding: .5rem 0;
      cursor: pointer;

      .circle {
        height: 15px;
        width: 15px;
        border: 1px solid var(--primary-color);
        border-radius: 50%;

        &--active {
          background: var(--primary-color);
        }
      }


      .title {
        font-weight: var(--font-medium);
        margin-left: 1rem;

        &--active {
          color: var(--primary-color);
        }
      }

      .price {
        margin: 0 0 0 auto;
        font-weight: var(--font-medium);
      }

      &:hover {
        .circle {
          border: 2px solid var(--primary-color);
        }

        .title {
          color: var(--primary-color);
        }
      }
    }

    &__parcel-locker,
    &__personal-pickup {
      text-align: center;
      display: block;
      margin: 3rem 0;
      font-size: 2rem;
      font-weight: var(--font-bold);
      color: var(--gray-950);
    }
  }
}


@include respond-to(mobile) {
  .mz-delivery-product {
    &__options {
      display: flex;
      flex-direction: column;

      .radio-box {
        margin: .5rem 0;
      }
    }
  }
}
</style>