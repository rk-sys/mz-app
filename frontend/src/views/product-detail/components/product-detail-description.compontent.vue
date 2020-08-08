<template>
  <div class="mz-product-detail-description">

    <mz-craftsman-card-simple :craftsman="productDetail.craftsman" />

    <mz-tooltip :content="$t(`follow.${productDetail.product.follow}`)"
                class="mz-product-detail-description__follow"
                placement="top">

      <div :class="{'red icon-heart--full' : productDetail.product.follow,
                      'gray icon-heart' : !productDetail.product.follow}"
           class="icon"></div>
    </mz-tooltip>

    <h1 class="mz-product-detail-description__title">
      {{productDetail.product.title}}
    </h1>

    <div class="mz-product-detail-description__info">
      {{productDetail.product.description}}
    </div>

    <div class="mz-product-detail-description__tags">
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
  </div>
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

@Component({
  components: {
    mzTag,
    mzTooltip,
    mzGallery,
    mzCraftsmanCardSimple,
    mzProductDetailDelivery,
    mzProductDetailMoreInfo,
  },
})
export default class mzProductsDetailDescription extends Vue {
  @Prop(Object) public readonly productDetail!: IProductDetail;

  public message: string = '';

  public sendMessage(message: string): void {
    router.push({ name: 'Home' });
  }
}
</script>

<style lang="scss"
       scoped>
.mz-product-detail-description {
  grid-row-start: 1;
  grid-row-end: 3;
  grid-column-start: 1;
  position: relative;

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
}

@include respond-to(desktop) {
  .mz-product-detail-description {
    display: none;
  }
}
</style>