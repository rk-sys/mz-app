<template>
  <div class="mz-offer-card-normal">

    <div class="mz-offer-card-normal__content">
      <span class="mz-offer-card-normal__title">{{ offer.title }}</span>

      <div class="mz-offer-card-normal__text-wrapper">
        <span class="mz-offer-card-normal__location-label">{{ offer.location }}</span>

        <div class="mz-offer-card-normal__text-wrapper">
          <span class="mz-offer-card-normal__price-label">{{ $t(`price.minValue`) }} <span class="price">{{ offer.startPrice }}{{ $t(`currency.zl`) }}</span></span>
          <span class="mz-offer-card-normal__price-label">{{ $t(`price.maxValue`) }} <span class="price">{{ offer.finalPrice }}{{ $t(`currency.zl`) }}</span></span>
        </div>
      </div>
    </div>

    <img alt="offer-image"
         class="mz-offer-card-normal__image"
         :src="offer.image" />

    <span class="mz-offer-card-normal__background-signature"
          :class="[`mz-offer-card-normal__background-signature--${offer.status}`]">

        {{ $t(`backgroundSignature.${offer.status}`) }}
      </span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { IOffer }               from '@/views/offers-list/store/offers-list.interface';

@Component({
  components: {},
})
export default class mzOfferCardNormal extends Vue {
  @Prop(Object) public offer!: IOffer;
}
</script>


<style lang="scss"
       scoped>

.mz-offer-card-normal {
  width: 100%;
  height: 9rem;
  display: flex;
  position: relative;

  &__content {
    width: 100%;
    margin: .5rem 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  &__title {
    font-size: 1.6rem;
    font-weight: var(--font-bold);
  }

  &__location-label,
  &__price-label {
    font-size: 1.2rem;
  }

  &__price-label:first-child {
    margin-right: 1rem;
  }

  .price {
    color: var(--primary-color);
  }

  &__image {
    width: 10rem;
  }

  &__background-signature {
    position: absolute;
    bottom: -1rem;
    left: 1rem;
    font-size: 4.8rem;
    font-weight: bold;
    text-transform: uppercase;
    opacity: 0.1;

    &--lookingFor {
      color: var(--primary-color);
    }

    &--create {
      color: var(--secondary-color);
    }
  }

  &__text-wrapper {
    display: flex;
    justify-content: space-between;
  }
}

</style>
