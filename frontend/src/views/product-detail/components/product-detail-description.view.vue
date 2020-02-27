<template>
  <div class="mz-product-detail-description">
    <div class="mz-product-detail-description__wrapper">
      <h2 class="mz-product-detail-description__wrapper__title">{{ $t(`product.title`) }}</h2>
      <p class="mz-product-detail-description__wrapper__info">{{ description }}</p>
    </div>

    <div class="mz-product-detail-description__wrapper">
      <h2 class="mz-product-detail-description__wrapper__title">{{ $t(`product.detail`) }}</h2>

      <p class="mz-product-detail-description__wrapper__row">
        <span class="label">{{ $t(`product.mainRange`) }}:</span>
        <span class="value">{{ mainRange }}</span>
      </p>

      <p class="mz-product-detail-description__wrapper__row">
        <span class="label">{{ $t(`product.category`) }}:</span>
        <span class="value">{{ mainCategory }}</span>
      </p>

      <p class="mz-product-detail-description__wrapper__row">
        <span class="label">{{ $t(`product.subCategory`) }}:</span>
        <span class="value">{{ subCategory}}</span>
      </p>

      <p class="mz-product-detail-description__wrapper__row">
        <span class="label">{{ $t(`product.gender`) }}:</span>
        <span class="value">{{ gender }}</span>
      </p>

      <p class="mz-product-detail-description__wrapper__row">
        <span class="label">{{ $t(`product.condition`) }}:</span>
        <span class="value">{{ isNew }}</span>
      </p>
    </div>

    <div class="mz-product-detail-description__wrapper">
      <h2 class="mz-product-detail-description__wrapper__title">{{ $t(`product.tags`) }}</h2>
      <div class="mz-product-detail-description__wrapper__tags">

        <mz-tag v-for="(tag, index) in tags"
                :tag="tag"
                :index="index"
                :key="index"
                :is-presentation="true" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import mzTag                    from '@/components/tag/tag.component.vue';

@Component({
  components: {
    mzTag,
  },
})
export default class mzProductsDetailPicture extends Vue {
  @Prop(String) public readonly description!: string;
  @Prop(Array) public readonly tags!: string[];
  @Prop(String) public readonly mainRange!: string;
  @Prop(String) public readonly mainCategory!: string;
  @Prop(String) public readonly subCategory!: string;
  @Prop(String) public readonly gender!: string;
  @Prop(Boolean) public readonly isNew!: boolean;

}
</script>

<style lang="scss"
       scoped>
.mz-product-detail-description {
  grid-row-start: 1;
  grid-row-end: 3;
  grid-column-start: 1;

  &__wrapper {
    margin: 4rem 0;

    &__title {
      font-size: 2.6rem;
      margin: 1rem 0;
    }

    &__info {
      font-size: 1.7rem;
      margin-bottom: 4rem;
      display: block;
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

    &__tags {
      display: flex;
      flex-wrap: wrap;
    }
  }
}
</style>