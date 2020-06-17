<template>
  <div class="mz-product-detail-card">

    <mz-craftsman-card-simple :craftsman="offer.craftsman" />

    <div class="mz-product-detail-card__product">

      <div class="mz-product-detail-card__product__type">
        <span class="mz-product-detail-card__product__type__label">
          {{ $t(`type.${offer.offerDetail.type}`) }}
        </span>

        <mz-tooltip :content="$t(`follow.${offer.offerDetail.follow}`)"
                    placement="top"
                    class="mz-product-detail-card__product__type__follow">

          <div class="icon"
               :class="{'red icon-heart--full' : offer.offerDetail.follow,
                      'gray icon-heart' : !offer.offerDetail.follow}"></div>
        </mz-tooltip>
      </div>

      <div class="mz-product-detail-card__product__title">
        {{offer.offerDetail.title}}
      </div>

      <div class="mz-product-detail-card__product__price">

        {{ $t(`price`) }}
        <span class="mz-product-detail-card__product__price__value">
          {{ offer.offerDetail.price }} {{ offer.offerDetail.currency }}
        </span>

        <span v-if="!offer.offerDetail.isFinalPrice"
              class="mz-product-detail-card__product__price__not-final">
                  {{ $t(`notFinalPrice`) }}
        </span>
      </div>

      <div class="mz-product-detail-card__product__description">
        {{ offer.offerDetail.description }}
      </div>

      <mz-gallery :pictures="offer.offerDetail.images" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import router                   from '@/router';
import { IOffer }               from '../store/offer-detail.interface';
import mzTooltip                from '@/components/tooltip/tooltip.component.vue';
import mzGallery                from '@/components/mz-gallery/gallery.component.vue';
import mzCraftsmanCardSimple    from '@/components/craftsman-card-simple/craftsmen-card-simple.component.vue';

@Component({
  components: {
    mzTooltip,
    mzGallery,
    mzCraftsmanCardSimple,
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
      position: relative;

      &__label {
        opacity: .6;
        line-height: 1;
        font-size: 3rem;
        letter-spacing: .4rem;
        color: var(--thirth-color);
        font-weight: var(--font-bold);
      }

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
    }

    &__price {
      font-size: 1.6rem;

      &__value {
        color: var(--primary-color);
        font-weight: var(--font-medium);
        line-height: 1.8;
        font-size: 2rem;
      }

      &__not-final {
        background: var(--blue-25);
        margin-left: auto;
        margin-right: 0;
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