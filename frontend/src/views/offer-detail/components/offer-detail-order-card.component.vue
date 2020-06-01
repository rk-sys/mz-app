<template>
  <div class="mz-product-detail-card">

    <div class="mz-product-detail-card__craftsman"
         @mouseenter="isHover = !isHover"
         @mouseleave="isHover = !isHover"
         @click="goToDetail(offer.craftsman.uuid)">

      <div class="mz-product-detail-card__craftsman__picture">

        <img :src="offer.craftsman.picture"
             :alt="offer.craftsman.name"
             class="mz-product-detail-card__craftsman__picture__img" />

        <div class="mz-product-detail-card__craftsman__picture__img--cover-bg"
             :class="{'show-overlay' : isHover}"
             @click="openModal(indexItem)">

          {{ $t(`profileDetail`) }}
        </div>
      </div>

      <div class="mz-product-detail-card__craftsman__info">

        <span class="mz-product-detail-card__craftsman__info__name"
              :class="{'isHover' : isHover}">
          {{offer.craftsman.name}}
        </span>

        <mz-rate disabled
                 v-model="offer.craftsman.rating"
                 score-template="{value} points"
                 class="mz-product-detail-card__craftsman__info__rating" />

        <span class="mz-product-detail-card__craftsman__info__city">
          {{offer.craftsman.city}}
        </span>
      </div>
    </div>

    <div class="mz-product-detail-card__product">

      <span class="mz-product-detail-card__product__type">
         {{ $t(`type.${offer.offerDetail.type}`) }}
       </span>

      <div class="mz-product-detail-card__product__title">
        {{offer.offerDetail.title}}
      </div>

      <div class="mz-product-detail-card__product__price">

        {{ $t(`price.from`) }}
        <span class="mz-product-detail-card__product__price__value">
          {{ offer.offerDetail.price.from }} {{ offer.offerDetail.price.currency }}
        </span>

        {{ $t(`price.to`) }}
        <span class="mz-product-detail-card__product__price__value">
          {{ offer.offerDetail.price.to }} {{ offer.offerDetail.price.currency }}
        </span>
      </div>

      <div class="mz-product-detail-card__product__description">
        {{ offer.offerDetail.description }}
      </div>

      <mz-offer-detail-picture :pictures="offer.offerDetail.images" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import mzRate                   from '@/components/rate/rate.component.vue';
import router                   from '@/router';
import { IOffer }               from '../store/offer-detail.interface';
import mzOfferDetailPicture     from './offer-detail-pictures.component.vue';

@Component({
  components: {
    mzRate,
    mzOfferDetailPicture,
  },
})
export default class mzProductDetailCard extends Vue {
  @Prop(Object) public readonly offer!: IOffer;

  public isHover: boolean = false;

  public goToDetail(uuid: string) {
    router.push({ name: 'Craftsmen detail', params: { uuid } });
  }
}
</script>

<style lang="scss"
       scoped>

.mz-product-detail-card {
  width: 52rem;
  padding: 2.4rem;
  border-radius: 2px;
  background-color: var(--white);
  height: 118rem;
  margin-bottom: 4rem;

  &__craftsman {
    display: flex;
    align-items: center;

    &__picture {
      position: relative;

      &__img {
        width: 8rem;
        height: 8rem;
        border-radius: 50%;
        object-fit: cover;

        &--cover-bg {
          position: absolute;
          width: 8rem;
          height: 8rem;
          border-radius: 50%;
          background: var(--black-60);
          top: 0;
          display: none;
          justify-content: center;
          align-items: center;
          color: var(--white);
          font-size: 1.8rem;
          font-weight: var(--font-regular);
          text-align: center;
        }
      }
    }

    &__info {
      margin-left: 2rem;
      font-size: 2.4rem;
      padding: 1rem 0;
      cursor: pointer;

      &__name {
        margin-right: .5rem;
      }

      &__rating {
        display: inline-flex;
      }

      &__city {
        font-size: 2rem;
        color: var(--gray-500);
      }
    }

    .isHover {
      color: var(--primary-color);
      cursor: pointer;
    }

    &:hover {
      cursor: pointer;
    }
  }

  &__product {
    margin-top: 3rem;

    &__title {
      font-size: 2rem;
      position: relative;
      font-weight: var(--font-medium);
    }

    &__type {
      opacity: .3;
      line-height: 1;
      font-size: 3rem;
      letter-spacing: .4rem;
      color: var(--primary-color);
      font-weight: var(--font-bold);
    }

    &__price {
      &__value {
        color: var(--primary-color);
        font-weight: var(--font-medium);
        line-height: 1.8;
      }
    }

    &__description {
      margin-top: 2rem;
      margin-bottom: 4rem;
    }
  }

  .show-overlay {
    display: flex;
  }
}

@include respond-to(desktop) {
  .mz-product-detail-card {
    display: none
  }
}

@include respond-to(tablet) {
  .mz-product-detail-card {
    display: none
  }
}

@include respond-to(mobile) {
  .mz-product-detail-card {
    display: none
  }
}
</style>