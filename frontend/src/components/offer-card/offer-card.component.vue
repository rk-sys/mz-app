<template>
  <div class="mz-offer-card"
       @click="goToDetail(offer.uuid)">

    <div class="mz-offer-card__line"
         :class="{'mz-offer-card__line--light' : offer.status === 'buy',
                  'mz-offer-card__line--dark' : offer.status === 'create'}"></div>

    <div class="mz-offer-card__content">
      <span class="mz-offer-card__content__status"
            :class="{'mz-offer-card__content__status--light' : offer.status === 'buy',
                     'mz-offer-card__content__status--dark' : offer.status === 'create'}">
        {{ $t(`status.${offer.status}`)}}
      </span>

      <span class="mz-offer-card__content__title">{{offer.title}}</span>

      <span class="mz-offer-card__content__price">
        {{$t(`price.label`)}}
        <span class="value">{{offer.price}} {{$t(`price.zl`)}}</span>

        <span v-if="!offer.isFinalPrice"
              class="mz-offer-card__content__price__not-final">

          {{$t(`price.notFinal`)}}
        </span>
      </span>
    </div>

    <div class="mz-offer-card__content__picture">
      <img :src="offer.image"
           :alt="offer.title"
           class="image" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { IOffer }               from '@/views/offers-list/store/offers-list.interface';
import router                   from '@/router';

@Component({
  components: {},
})
export default class mzOfferCard extends Vue {
  @Prop(Object) public readonly offer!: IOffer;

  public goToDetail(uuid: string): void {
    router.push({ name: 'Offer detail', params: { uuid } });
  }
}
</script>

<style lang="scss"
       scoped>
.mz-offer-card {
  width: 54rem;
  display: flex;
  height: 12rem;
  background: var(--white);
  border-radius: 2px;
  border: 1px solid var(--gray-400);

  &__line {
    height: 100%;
    min-width: 1.5rem;
    border-top-left-radius: 2px;
    border-bottom-left-radius: 2px;

    &--light {
      background: var(--thirth-color);
    }

    &--dark {
      background: var(--secondary-color);
    }
  }

  &__content {
    margin-left: 1.5rem;
    padding: .5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    &__status {
      display: block;
      opacity: .4;
      line-height: 1;
      font-size: 2.6rem;
      letter-spacing: .4rem;
      font-weight: var(--font-bold);

      &--light {
        color: var(--thirth-color);
      }

      &--dark {
        color: var(--secondary-color);
      }
    }

    &__title {
      font-size: 2rem;
      font-weight: var(--font-medium);
      overflow: hidden;
      width: 30rem;
      max-height: 5rem;
      display: block;
    }

    &__price {
      margin-top: 1rem;
      font-size: 1.6rem;

      .value {
        color: var(--primary-color);
        font-weight: var(--font-medium);
      }

      &__not-final {
        color: var(--gray-900);
        margin-left: 1rem;
      }
    }

    &__picture {
      width: 15rem;
      height: 12rem;
      margin-left: auto;
      margin-right: 0;

      .image {
        padding-bottom: .2rem;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }

  &:hover {
    cursor: pointer;
    box-shadow: 0 0 1.5rem 0 var(--gray-500);
    transition: var(--transition-product-card);
    border: 1px solid var(--primary-color);
  }
}

@include respond-to(desktop) {
  .mz-offer-card {
    width: 100%;

    &__content {
      &__title {
        width: 75rem;
      }
    }
  }
}

@include respond-to(tablet) {
  .mz-offer-card {
    &__content {
      &__title {
        width: 65rem;
      }
    }
  }
}
</style>