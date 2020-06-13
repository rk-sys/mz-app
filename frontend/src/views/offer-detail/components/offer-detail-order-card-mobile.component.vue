<template>
  <mz-collapse v-model="activeNames"
               class="mz-product-detail-card-mobile">

    <mz-collapse-item name="0">

      <template slot="title">
        <div class="mz-product-detail-card-mobile__header"
             @mouseenter="isHover = !isHover"
             @mouseleave="isHover = !isHover"
             @click="goToDetail(offer.craftsman.uuid)">

          <div class="mz-product-detail-card-mobile__header__picture">

            <img :src="offer.craftsman.picture"
                 :alt="offer.craftsman.name"
                 class="mz-product-detail-card-mobile__header__picture__img" />

            <div class="mz-product-detail-card-mobile__header__picture__img--cover-bg"
                 :class="{'show-overlay' : isHover}"
                 @click="openModal(indexItem)">

              {{ $t(`profileDetail`) }}
            </div>
          </div>

          <div class="mz-product-detail-card-mobile__header__title">

            <span class="mz-product-detail-card-mobile__header__title__type">
              {{ $t(`type.${offer.offerDetail.type}`) }}
            </span>

            <div class="mz-product-detail-card-mobile__header__title__name">
              {{offer.offerDetail.title}}
            </div>
          </div>

          <div class="mz-product-detail-card-mobile__header__img">

            <img :src="offer.offerDetail.images[0]"
                 :alt="offer.offerDetail.type"
                 class="product-image">
          </div>
        </div>
      </template>

      <div class="mz-product-detail-card-mobile__product">

        <div class="mz-product-detail-card-mobile__product__price">

          {{ $t(`price`) }}

          <span class="mz-product-detail-card-mobile__product__price__value">
            {{ offer.offerDetail.price }} {{ offer.offerDetail.price.currency }}
          </span>

          <span v-if="!offer.offerDetail.isFinalPrice"
                class="mz-product-detail-card-mobile__product__price__not-final">
                  {{ $t(`notFinalPrice`) }}
        </span>

          <mz-tooltip :content="$t(`follow.${offer.offerDetail.follow}`)"
                      placement="top"
                      class="mz-product-detail-card-mobile__product__price__follow">

            <div class="icon"
                 :class="{'red icon-heart--full' : offer.offerDetail.follow,
                      'gray icon-heart' : !offer.offerDetail.follow}"></div>
          </mz-tooltip>
        </div>

        <div class="mz-product-detail-card-mobile__product__description">
          {{ offer.offerDetail.description }}
        </div>

        <mz-offer-detail-picture :pictures="offer.offerDetail.images" />
      </div>
    </mz-collapse-item>
  </mz-collapse>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import mzRate                   from '@/components/rate/rate.component.vue';
import router                   from '@/router';
import { IOffer }               from '../store/offer-detail.interface';
import mzOfferDetailPicture     from './offer-detail-pictures.component.vue';
import mzCollapse               from '@/components/commons/collapse/collapse.component.vue';
import mzCollapseItem           from '@/components/commons/collapse-item/collapse-item.component.vue';
import mzTooltip                from '@/components/tooltip/tooltip.component.vue';

@Component({
  components: {
    mzRate,
    mzTooltip,
    mzCollapse,
    mzCollapseItem,
    mzOfferDetailPicture,
  },
})
export default class mzProductDetailCardMobile extends Vue {
  @Prop(Object) public readonly offer!: IOffer;

  public isHover: boolean = false;

  public activeNames = 0;

  public goToDetail(uuid: string) {
    router.push({ name: 'Craftsmen detail', params: { uuid } });
  }
}
</script>
<style lang="scss">
.mz-product-detail-card-mobile {
  .mz-collapse-item {
    min-height: 10rem;

    div {
      height: 100%;
    }

    &__arrow {
      height: 8rem;
      display: flex;
      align-items: center;
    }
  }
}
</style>
<style lang="scss"
       scoped>

.mz-product-detail-card-mobile {
  display: none;
  padding: 2rem;
  border-radius: 2px;
  margin-bottom: 1rem;
  background-color: var(--white);

  &__header {
    width: 100%;
    min-height: 10rem;
    display: flex;
    align-items: center;
    margin: 1rem 0 1rem 0;

    &__picture {
      height: 100%;
      display: flex;
      position: relative;
      align-items: center;

      &__img {
        width: 8rem;
        height: 8rem;
        object-fit: cover;
        border-radius: 50%;

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

    &__title {
      display: flex;
      margin-left: 2rem;
      flex-direction: column;
      justify-content: center;

      &__type {
        opacity: 0.3;
        line-height: 1;
        font-size: 3rem;
        display: block;
        letter-spacing: 0.4rem;
        color: var(--primary-color);
        font-weight: var(--font-bold);
      }

      &__name {
        line-height: 1;
        font-size: 2.8rem;
        position: relative;
        font-weight: var(--font-medium);
      }
    }

    &__img {
      height: 8rem;
      width: 8rem;
      border-radius: 2px;
      margin-right: 1rem;
      margin-left: auto;
      display: flex;
      align-items: center;

      .product-image {
        width: 8rem;
        height: 8rem;
        object-fit: cover;
      }
    }
  }

  &__product {
    padding: 0 1rem;

    &__price {
      font-size: 2.6rem;
      margin-bottom: 1rem;
      margin-top: 1rem;
      position: relative;

      &__follow {
        opacity: 1;
        position: absolute;
        right: 0;
        top: 0;
        width: 3.4rem;
        height: 3.4rem;
        cursor: pointer;
        filter: grayscale(1);
        transition: .3s ease;

        &.red {
          filter: grayscale(0);
        }

        &:hover {
          transition: .3s ease;

          &.red {
            filter: grayscale(1);
          }

          &.gray {
            filter: grayscale(0);
          }
        }
      }

      &__value {
        color: var(--primary-color);
        font-weight: var(--font-medium);
        line-height: 1.8;
        font-size: 3rem;
      }

      &__not-final {
        background: var(--blue-25);
        margin-left: auto;
        margin-right: 0;
      }
    }

    &__description {
      margin-bottom: 2rem;
    }
  }

  .show-overlay {
    display: flex;
  }
}

@include respond-to(desktop) {
  .mz-product-detail-card-mobile {
    display: block;
  }
}

@include respond-to(tablet) {
  .mz-product-detail-card-mobile {
    padding: 0;
    display: block;
  }
}

@include respond-to(mobile) {
  .mz-product-detail-card-mobile {
    padding: 0;
    display: block;
  }
}
</style>