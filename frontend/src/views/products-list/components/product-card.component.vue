<template>
  <div class="mz-products-card">
    <span class="mz-products-card__price">
      {{ product.price }} {{ $t(`currency.zl`) }}
    </span>

    <div class="mz-products-card__wrapper"
         @click="goToProductDetail(product.id)"
         @mouseenter="showLayout(true)"
         @mouseleave="showLayout(false)">

      <div class="mz-products-card__wrapper__layout"
           :class="{'show-layout': isHover}">
        <span class="label">{{ $t('pictureHover') }}</span>
      </div>

      <img :src="product.image"
           alt="product-image"
           class="mz-products-card__wrapper__image" />

    </div>

    <span class="mz-products-card__title">
      {{ product.title }}
    </span>

  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import mzSelect                 from '@/components/form/select/select.component.vue';
import mzOption                 from '@/components/form/option/option.component.vue';
import { IProduct }             from 'src/views/products-list/store/products.interface';
import router                   from '@/router';

@Component({
  components: {
    mzSelect,
    mzOption,
  },
})
export default class mzProductsHeaderInfo extends Vue {
  @Prop(Object) public readonly product!: IProduct;

  public isHover: boolean = false;

  public showLayout(arg: boolean): void {
    this.isHover = arg;
  }

  public goToProductDetail(uuid: string): void {
    router.push({name: 'Product detail', params: {uuid}});
  }
}
</script>

<style lang="scss"
       scoped>
.mz-products-card {
  width: 26rem;
  min-height: 25rem;
  background: var(--white);
  position: relative;
  border: 1px solid transparent;
  border-radius: 2px;
  transition: var(--transition-product-card);

  &__price {
    position: absolute;
    top: 0;
    left: 0;
    background: var(--white);
    padding: 1rem;
    border-top-left-radius: 2px;
    z-index: 1;
    font-weight: var(--font-bold);
  }

  &__wrapper {
    position: relative;

    &__layout {
      background: var(--black-60);
      position: absolute;
      top: 0;
      left: 0;
      height: 20rem;
      width: 26rem;
      display: none;
      align-items: center;
      justify-content: center;
      transition: var(--transition-product-card);

      .label {
        color: var(--white);
      }

      &.show-layout {
        display: flex;
        transition: var(--transition-product-card);
      }
    }

    &__image {
      width: 26rem;
      height: 20rem;
      object-fit: cover;
    }

    &:hover {
      cursor: pointer;
    }
  }

  &__title {
    padding: 1rem;
    min-height: 5rem;
    text-align: center;
    display: block;
  }

  &:hover {
    border: 1px solid var(--primary-color);
    box-shadow: 0 0 1.5rem 0 var(--gray-500);
    transition: var(--transition-product-card);
  }
}

@media screen and (max-width: 1024px) and (min-width: 769px) {
  .mz-products-card {
    width: 30rem;
    min-height: 30rem;

    &__price {
      font-size: 2rem;
    }

    &__wrapper {
      &__layout {
        height: 25rem;
        width: 30rem;

        .label {
          font-size: 2rem;
        }
      }

      &__image {
        width: 30rem;
        height: 25rem;
      }
    }

    &__title {
      font-size: 2rem;
    }
  }
}

@media screen and (max-width: 768px) and (min-width: 425px) {
  .mz-products-card {
    width: 41.5rem;
    min-height: 30rem;

    &__price {
      font-size: 2rem;
    }

    &__wrapper {
      &__layout {
        height: 25rem;
        width: 41.4rem;

        .label {
          font-size: 2rem;
        }
      }

      &__image {
        width: 41.4rem;
        height: 25rem;
      }
    }

    &__title {
      font-size: 2rem;
    }
  }
}

@media screen and (max-width: 425px) {
  .mz-products-card {
    width: 100%;
    min-height: 30rem;

    &__price {
      font-size: 2rem;
    }

    &__wrapper {
      &__layout {
        height: 25rem;
        width: 100%;

        .label {
          font-size: 2rem;
        }
      }

      &__image {
        height: 25rem;
        width: 100%;
      }
    }

    &__title {
      font-size: 2rem;
    }
  }
}
</style>
