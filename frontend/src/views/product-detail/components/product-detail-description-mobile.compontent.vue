<template>
  <mz-collapse class="mz-product-detail-description-mobile"
               v-model="activeNames">

    <mz-collapse-item name="0">

      <template slot="title">
        <div class="mz-product-detail-description-mobile__header">

          <div @click="goToDetail(productDetail.craftsman.uuid)"
               @mouseenter="isHover = !isHover"
               @mouseleave="isHover = !isHover"
               class="mz-product-detail-description-mobile__header__picture">

            <img :alt="productDetail.craftsman.name"
                 :src="productDetail.craftsman.picture"
                 class="mz-product-detail-description-mobile__header__picture__img" />

            <div :class="{'show-overlay' : isHover}"
                 class="mz-product-detail-description-mobile__header__picture__img--cover-bg">

              {{ $t(`profileDetail`) }}
            </div>
          </div>

          <div class="mz-product-detail-description-mobile__header__title">

            <div class="mz-product-detail-description-mobile__header__title__name">
              {{productDetail.product.title}}
            </div>
          </div>

          <div class="mz-product-detail-description-mobile__header__img">

            <img :alt="productDetail.product.title"
                 :src="productDetail.product.pictures[0]"
                 class="product-image" />
          </div>
        </div>
      </template>

      <mz-tooltip :content="$t(`follow.${productDetail.product.follow}`)"
                  class="mz-product-detail-description-mobile__follow"
                  placement="top">

        <div :class="{'red icon-heart--full' : productDetail.product.follow,
                      'gray icon-heart' : !productDetail.product.follow}"
             class="icon"></div>
      </mz-tooltip>

      <div class="mz-product-detail-description-mobile__info">
        {{productDetail.product.description}}
      </div>

      <div class="mz-product-detail-description-mobile__tags">
        <mz-tag :index="index"
                :is-presentation="true"
                :key="index"
                :tag="tag"
                v-for="(tag, index) in productDetail.product.tags" />
      </div>
      <mz-gallery :pictures="productDetail.product.pictures" />

      <mz-product-detail-more-info :gender="productDetail.product.gender"
                                   :is-new="productDetail.product.isNew"
                                   :main-category="productDetail.product.mainCategory"
                                   :main-range="productDetail.product.mainRange"
                                   :sub-category="productDetail.product.subCategory" />

      <mz-product-detail-delivery :delivery="productDetail.product.productDeliveryOptions" />

    </mz-collapse-item>
  </mz-collapse>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import router                   from '@/router';
import { IProductDetail }       from '@/views/product-detail/store/product-detail.interface';
import mzCraftsmanCardSimple    from '@/components/craftsman-card-simple/craftsmen-card-simple.component.vue';
import mzGallery                from '@/components/mz-gallery/gallery.component.vue';
import mzTooltip                from '@/components/tooltip/tooltip.component.vue';
import mzTag                    from '@/components/tag/tag.component.vue';
import mzProductDetailMoreInfo  from './product-detail-more-info.compontent.vue';
import mzProductDetailDelivery  from './product-detail-delivery.compontent.vue';
import mzCollapse               from '@/components/commons/collapse/collapse.component.vue';
import mzCollapseItem           from '@/components/commons/collapse-item/collapse-item.component.vue';

@Component({
  components: {
    mzTag,
    mzTooltip,
    mzGallery,
    mzCollapse,
    mzCollapseItem,
    mzCraftsmanCardSimple,
    mzProductDetailDelivery,
    mzProductDetailMoreInfo,
  },
})
export default class mzProductsDetailDescriptionMobile extends Vue {
  @Prop(Object) public readonly productDetail!: IProductDetail;

  public message: string = '';
  public activeNames = 0;
  public isHover: boolean = false;

  public goToDetail(uuid: string) {
    router.push({ name: 'Craftsmen detail', params: { uuid } });
  }

  public sendMessage(message: string): void {
    router.push({ name: 'Home' });
  }
}
</script>
<style lang="scss">
.mz-product-detail-description-mobile {
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

.mz-product-detail-description-mobile {
  display: none;
  grid-row-start: 1;
  grid-row-end: 3;
  grid-column-start: 1;
  position: relative;

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

  &__picture {
    width: 8rem;
    height: 8rem;
    object-fit: cover;
    border-radius: 50%;

    .image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__follow {
    opacity: 1;
    width: 3.4rem;
    height: 3.4rem;
    cursor: pointer;
    filter: grayscale(1);
    transition: .3s ease;
    margin: .5rem 0 0 auto;

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

  &__title {
    margin-bottom: 2rem;
    margin-top: .5rem;
    font-size: 2rem;
    position: relative;
    font-weight: var(--font-medium);
  }

  &__info {
    margin-bottom: 2rem;
  }

  &__tags {
    margin-bottom: 4rem;
    display: flex;
    flex-wrap: wrap;
  }

  .show-overlay {
    display: flex;
  }
}

@include respond-to(desktop) {
  .mz-product-detail-description-mobile {
    display: block;

    &__follow {
      margin: 1rem .5rem 1rem auto;
      height: 3.4rem !important;
    }
  }
}

@include respond-to(tablet) {
  .mz-product-detail-description-mobile {
    padding: 0;
    display: block;

    &__follow {
      margin: 1rem .5rem 1rem auto;
      height: 3.4rem !important;
    }
  }
}

@include respond-to(mobile) {
  .mz-product-detail-description-mobile {
    padding: 0;
    display: block;

    &__follow {
      margin: 1rem .5rem 1rem auto;
      height: 3.4rem !important;
    }
  }
}
</style>