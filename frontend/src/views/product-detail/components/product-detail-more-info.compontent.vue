<template>
  <div class="mz-product-detail-more-info">
    <h2 class="mz-product-detail-more-info__title">{{ $t(`product.detail`) }}</h2>

    <p class="mz-product-detail-more-info__row">
      <span class="label">{{ $t(`product.category`) }}:</span>
      <span class="value">{{ mainCategory }}</span>
    </p>

    <p class="mz-product-detail-more-info__row">
      <span class="label">{{ $t(`product.subCategory`) }}:</span>
      <span class="value">{{ subCategory}}</span>
    </p>

    <p class="mz-product-detail-more-info__row">
      <span class="label">{{ $t(`product.gender`) }}:</span>
      <span class="value">{{ gender }}</span>
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class mzProductsDetailMoreInfo extends Vue {
  @Prop(String) public readonly mainRange!: string;
  @Prop(String) public readonly mainCategory!: string;
  @Prop(String) public readonly subCategory!: string;
  @Prop(String) public readonly gender!: string;
  @Prop(Boolean) public readonly isNew!: boolean;
}
</script>

<style lang="scss"
       scoped>

.mz-product-detail-more-info {
  &__title {
    font-size: 2.6rem;
    margin: 1rem 0;
  }

  &__row {
    font-size: 1.8rem;
    display: flex;
    justify-content: space-between;
    margin: 0;
    padding: 1.5rem;

    .value {
      font-weight: var(--font-medium);
      margin-left: 10rem;
    }

    &:nth-child(2n) {
      background: var(--gray-100);
    }
  }
}
</style>