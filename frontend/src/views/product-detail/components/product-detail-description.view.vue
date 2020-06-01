<template>
  <div class="mz-product-detail-description">
    <div class="mz-product-detail-description__wrapper">
      <h2 class="mz-product-detail-description__wrapper__title">
        {{ $t(`product.title`) }}

        <mz-tooltip :content="$t(`follow.${isFollow}`)"
                    placement="top"
                    class="mz-product-detail-description__wrapper__title__follow">

          <div class="icon"
               :class="{'red icon-heart--full' : isFollow,
                      'gray icon-heart' : !isFollow}"></div>
        </mz-tooltip>
      </h2>

      <p class="mz-product-detail-description__wrapper__info">{{ description }}</p>

      <div class="mz-product-detail-description__wrapper__tags">

        <mz-tag v-for="(tag, index) in tags"
                :tag="tag"
                :index="index"
                :key="index"
                :is-presentation="true" />
      </div>
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
      <h2 class="mz-product-detail-description__wrapper__title">{{ $t(`product.delivery`) }}</h2>

      <div v-for="item in delivery"
           class="mz-product-detail-description__wrapper__delivery"
           :class="{'without-options': !item.options}">

        <span class="mz-product-detail-description__wrapper__delivery__title">
          {{ $t(`delivery.${item.label}`) }}
        </span>

        <template v-if="item.label === 'personalPickup'">
          <div class="icon icon-success--primary"></div>
        </template>

        <template v-if="item.options">
          <p v-for="(option, index) in item.options"
             :key="index"
             class="option">

            <span class="option__title">{{option.title}}</span>

            <span class="option__price">{{option.price}} {{ $t(`product.zl`) }}</span>
          </p>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import mzTag                    from '@/components/tag/tag.component.vue';
import { IAddItemNewItem }      from '@/views/user-administration/user-administration-products/add-item/store/user-account-add-item.interface';
import mzTooltip                from '@/components/tooltip/tooltip.component.vue';

@Component({
  components: {
    mzTag,
    mzTooltip,
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
  @Prop(Boolean) public readonly isFollow!: boolean;
  @Prop(Array) public readonly delivery!: IAddItemNewItem[];
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
      position: relative;

      &__follow {
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

    &__info {
      font-size: 1.7rem;
      margin-bottom: 1.5rem;
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

    &__delivery {
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
    }

    .without-options {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .icon {
        width: 3rem;
        height: 3rem;
      }
    }
  }
}
</style>