<template>
  <div class="mz-selected-product">
    <mz-box-with-title :title="$t(`box.selectedProduct`)"
                       icon-name="icon-shop">

      <div class="mz-selected-product__wrapper">
        <p class="mz-selected-product__wrapper__text">
          {{ productSummary.title }}
          <span class="description">{{ productSummary.description }}</span>
        </p>
        <span class="mz-selected-product__wrapper__price">{{ productSummary.price }} {{ productSummary.currency }}</span>
      </div>

      <div class="mz-selected-product__city">
        <div class="icon icon-pin--primary"></div>
        <span class="mz-selected-product__city__text">{{ productSummary.city }}</span>
      </div>

      <div class="mz-selected-product__craftsman">
        <span class="mz-selected-product__craftsman__text">{{ $t(`productFrom`) }}</span>
        <div class="craftsman">

          <img :alt="productSummary.craftsman.name"
               :src="productSummary.craftsman.picture"
               class="craftsman__picture" />

          <span class="craftsman__name">{{ productSummary.craftsman.name }}</span>
        </div>
      </div>
    </mz-box-with-title>
  </div>
</template>

<script lang="ts">
import { Component, Vue }      from 'vue-property-decorator';
import { namespace }           from 'vuex-class';
import mzProductCheckoutModule from '../store/product-checkout.module';
import mzBoxWithTitle          from '@/components/box-with-title/box-with-title.component.vue';
import { IProductSummary }     from '@/views/product-checkout/store/product-checkout.interface';

const LOCAL_STORE: string = 'productCheckout';
const local = namespace(LOCAL_STORE);

@Component({
  components: {
    mzBoxWithTitle,
  },
})
export default class mzSelectedProduct extends Vue {
  @local.State((state: mzProductCheckoutModule) => state.productCheckout.productSummary) public productSummary!: IProductSummary;
}
</script>

<style lang="scss"
       scoped>
.mz-selected-product {
  margin-top: 3rem;

  &__wrapper {
    display: flex;
    align-items: center;

    &__text {
      font-size: 2rem;
      font-weight: var(--font-medium);
      width: 75%;
      margin: 3rem 0 1rem 0;

      .description {
        font-size: 1.8rem;
        display: block;
        font-weight: var(--font-regular);
        color: var(--gray-500);
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        margin: .5rem 0 1rem;
      }
    }

    &__price {
      font-size: 2.6rem;
      color: var(--primary-color);
      font-weight: var(--font-medium);
      text-align: center;
      white-space: nowrap;
      margin: 0 auto;
    }
  }

  &__city {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--gray-300);

    .icon {
      width: 3rem;
      height: 3rem;
    }

    &__text {
      font-size: 1.8rem;
      margin-left: 1rem;
      font-weight: var(--font-medium);
    }
  }

  &__craftsman {
    display: flex;
    align-items: center;
    margin: 2rem 0 1rem;

    &__text {
      font-size: 2rem;
      font-weight: var(--font-medium);
      color: var(--black);
      margin-right: 1.5rem;
    }

    .craftsman {
      display: flex;
      align-items: center;

      &__picture {
        height: 4rem;
        width: 4rem;
        margin-right: 1rem;
        object-fit: contain;
      }

      &__name {
        font-size: 2rem;
        font-weight: var(--font-regular);
      }
    }
  }
}

@include respond-to(mobile) {
  .mz-selected-product {
    margin-top: 3rem;

    &__wrapper {
      flex-direction: column-reverse;

      &__text {
        margin: 1rem 0;
        width: 100%
      }

      &__price {
        margin: 2rem 0 0;
        width: 100%;
        text-align: right;
      }
    }
  }
}

</style>