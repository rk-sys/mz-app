<template>
  <div class="mz-product-detail-checkout">
    <h1 class="mz-product-detail-checkout__title">{{ productTitle }}</h1>
    <h2 class="mz-product-detail-checkout__price">
      {{ $t(`product.price`) }} <span class="value">{{ price }} {{ $t(`product.${currency}`) }} </span>
    </h2>
    <div class="mz-product-detail-checkout__button">{{ $t(`product.addToCheckout`) }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { ICraftsman }           from '@/views/product-detail/store/product-detail.interface';

@Component({
  components: {},
})
export default class mzProductsDetailCheckout extends Vue {
  @Prop(String) public readonly productTitle!: string;
  @Prop(String) public readonly price!: string;
  @Prop(String) public readonly currency!: string;

}
</script>

<style lang="scss"
       scoped>

.mz-product-detail-checkout {
  grid-row-start:1;
  grid-row-end: 1;
  grid-column-start: 2;
  margin-bottom: 5rem;
  background: var(--white);
  border: 1px solid var(--gray-400);
  border-radius: 2px;
  padding: 2rem;
  width: 32rem;

  &__title {
    margin-top: 0;
    font-size: 2.2rem;
    font-weight: var(--font-medium);
  }

  &__price {
    font-size: 2.2rem;
    display: flex;

    .value {
      margin-left: 1rem;
      color: var(--primary-color);
    }
  }

  &__button {
    width: 100%;
    padding: 1rem;
    background: var(--primary-color);
    font-weight: var(--font-medium);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    border-radius: 2px;
    cursor: pointer;

    &:hover {
      background: var(--primary-color-80);
    }
  }
}

@media only screen and (max-width: 768px) {
  .mz-product-detail-checkout {
    grid-row-start: 1;
    grid-row-end: 1;
    grid-column-start: 1;
    width: 100%;
  }
}
</style>