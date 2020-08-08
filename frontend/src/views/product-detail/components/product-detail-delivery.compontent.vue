<template>
  <div class="mz-product-detail-delivery">
    <h2 class="mz-product-detail-delivery__title">{{ $t(`product.delivery`) }}</h2>

    <div :class="{'without-options': !item.options}"
         class="mz-product-detail-delivery__row"
         v-for="item in delivery">

        <span class="mz-product-detail-delivery__row__title">
          {{ $t(`delivery.${item.label}`) }}
        </span>

      <template v-if="item.label === 'personalPickup'">
        <div class="icon icon-success--primary"></div>
      </template>

      <template v-if="item.options">
        <p :key="index"
           class="option"
           v-for="(option, index) in item.options">

          <span class="option__title">{{option.title}}</span>

          <span class="option__price">{{option.price}} {{ $t(`product.zl`) }}</span>
        </p>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { IProductDetail }       from '@/views/product-detail/store/product-detail.interface';

@Component({
  components: {},
})
export default class mzProductsDetailDelivery extends Vue {
  @Prop(Array) public readonly delivery!: IProductDetail[];
}
</script>

<style lang="scss"
       scoped>

.mz-product-detail-delivery {
  border-bottom: 1px solid var(--gray-400);

  &__title {
    font-size: 2.3rem;
    margin: 1rem 0;
    display: block;
  }

  .option {
    display: flex;
    justify-content: space-between;
    font-size: 1.8rem;
    margin: 0;
    padding: 1rem;

    &__price {
      font-weight: var(--font-medium);
    }

    &:nth-child(2n) {
      background: var(--gray-100);
    }
  }

  &__row {
    font-size: 1.8rem;
    margin: 0;
    padding: 1.5rem;

    .value {
      font-weight: var(--font-medium);
      margin-left: 10rem;
    }
  }
}

.without-options {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .icon {
    width: 2.6rem;
    height: 2.6rem;
  }
}
</style>