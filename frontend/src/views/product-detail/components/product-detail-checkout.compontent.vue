<template>
  <div class="mz-product-detail-checkout">
    <div class="mz-product-detail-checkout__price">
      <span class="mz-product-detail-checkout__price__label">{{ $t(`product.price`) }}</span>
      <span class="mz-product-detail-checkout__price__value">{{price}} {{ $t(`product.zl`) }}</span>
    </div>

    <div class="mz-product-detail-checkout__main-range">
      <span class="mz-product-detail-checkout__main-range__label">{{ $t(`product.mainRange`) }}</span>
      <span class="mz-product-detail-checkout__main-range__value">{{mainRange}}</span>
    </div>

    <div class="mz-product-detail-checkout__is-new">
      <span class="mz-product-detail-checkout__is-new__label">{{ $t(`product.condition`) }}</span>
      <span class="mz-product-detail-checkout__is-new__value">{{ $t(`product.isNew.${isNew}`) }}</span>
    </div>

    <div class="mz-product-detail-checkout__btn"
         @click="goToCheckout(productUuid)">
      {{ $t(`product.addToCheckout`) }}
    </div>

  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import router                   from '@/router';

@Component({
  components: {},
})
export default class mzProductsDetailcheckout extends Vue {
  @Prop(String) public readonly price!: string;
  @Prop(String) public readonly mainRange!: string;
  @Prop(String) public readonly productUuid!: string;
  @Prop(Boolean) public readonly isNew!: boolean;

  public goToCheckout(productUuid: string) {
    router.push({ name: 'Product checkout', params: { productUuid } });
  }
}
</script>

<style lang="scss"
       scoped>
.mz-product-detail-checkout {
  background: var(--white);
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 1.5rem;
  width: 80rem;
  padding: 1rem;
  flex-wrap: wrap;

  &__price,
  &__main-range,
  &__is-new {
    width: 33%;

    &__label {
      display: block;
      text-align: center;
      font-size: 2rem;
      font-weight: var(--font-medium);
    }

    &__value {
      display: block;
      text-align: center;
      color: var(--primary-color);
      font-weight: var(--font-bold);
      font-size: 2.2rem;
      margin: 1rem 0;
    }
  }

  &__btn {
    border-radius: 2px;
    background: var(--primary-color);
    width: 50%;
    text-align: center;
    margin: .5rem 0;
    padding: 1rem;
    color: var(--white);

    &:hover {
      cursor: pointer;
      background: var(--primary-color-80);
    }
  }
}

@include respond-to(desktop) {
  .mz-product-detail-checkout {
    width: 100%;
  }
}

@include respond-to(tablet) {
  .mz-product-detail-checkout {
    width: 100%;
  }
}

@include respond-to(mobile) {
  .mz-product-detail-checkout {
    width: 100%;
  }
}
</style>