<template>
  <div class="mz-product-list">
    <div class="mz-product-list__container">
      <div class="mz-product-list__container__filters">
        <mz-products-filters />
      </div>

      <div class="mz-product-list__container__list">
        <mz-products-header-info :quantity="productList.length" />

        <main class="mz-product-list__container__list__cards">

          <mz-product-card v-for="(product, index) in productList"
                           :key="index"
                           :product="product"
                           class="product" />

          <mz-empty-list-message v-if="!productList.length"
                                 :pageName="pageName" />
        </main>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue }        from 'vue-property-decorator';
import { namespace }             from 'vuex-class';
import { Route }                 from 'vue-router';
import { loadTranslationsAsync } from '@/i18n/i18n';
import { registerStoreModule }   from '@/helpers/helpers';
import Store                     from '@/store/store';
import { IProduct }              from '@/views/products-list/store/products.interface';
import mzProductsModule          from './store/products.module';
import mzProductsFilters         from './components/products-filters.component.vue';
import mzProductsHeaderInfo      from './components/products-header-info.component.vue';
import mzProductCard             from './components/product-card.component.vue';
import mzEmptyListMessage        from '@/components/empty-list-message/empty-list-message.component.vue';
import { DEFAULT }               from '@/helpers/variables';

const LOCAL_STORE: string = 'products-list';
const local = namespace(LOCAL_STORE);

@Component({
  components: {
    mzProductsFilters,
    mzProductsHeaderInfo,
    mzProductCard,
    mzEmptyListMessage,
  },
})
export default class yProductsList extends Vue {
  @local.State((state: mzProductsModule) => state.mzProductsState.productList) public productList!: IProduct[];
  public pageName: string | undefined;

  public destroyed(): void {
    Store.unregisterModule(LOCAL_STORE);
  }

  public created(): void {
    this.pageName = this.$route.name ? this.$route.name.toLowerCase() : DEFAULT;
  }

  private async beforeRouteEnter(to: Route, from: Route, next: any) {
    const lang: string = Store.state.global.defaultLang;

    try {
      await loadTranslationsAsync(lang, import(`./i18n/${lang}` as string));
      registerStoreModule(LOCAL_STORE.split('/'), mzProductsModule);
      await Store.dispatch(`${LOCAL_STORE}/getProductList`);
      next();
    } catch (e) {
      next(false);
      throw new Error(e);
    }
  }
}
</script>

<style lang="scss"
       scoped>
.mz-product-list {
  min-height: 100vh;
  background: var(--background-color);
  height: 100%;
  display: grid;
  grid-template-rows: 6.4rem 7rem auto;
  grid-template-columns: 1fr 6fr 1fr;

  &__container {
    display: flex;
    grid-row-start: 3;
    grid-column-start: 2;
    justify-content: space-evenly;

    &__filters {
      width: 32rem;
      margin-right: 2.5rem;
    }

    &__list {
      width: 110rem;
      margin-bottom: 4rem;

      &__cards {
        margin-top: 1rem;
        display: flex;
        flex-wrap: wrap;

        .product {
          margin-right: 2rem;
          margin-top: 2rem;

          &:nth-child(4n) {
            margin-right: 0;
          }
        }
      }

      .pagination {
        display: flex;
        justify-content: center;
        margin: 4rem 0;
      }
    }
  }
}

@media screen and (max-width: 1024px) and (min-width: 769px) {
  .mz-product-list__container__list {
    width: 95rem;

    &__cards {
      margin-top: 1rem;
      display: flex;
      flex-wrap: wrap;

      .product {
        margin-right: 2rem;
        margin-top: 2rem;

        &:nth-child(4n) {
          margin-right: 2rem;
        }

        &:nth-child(3n) {
          margin-right: 0;
        }
      }
    }
  }
}

@media screen and (max-width: 768px) and (min-width: 426px) {
  .mz-product-list {
    grid-template-rows: auto;

    &__container {
      flex-direction: column;
      grid-row-start: 1;
      justify-content: flex-start;

      &__filters {
        width: 100%;
        margin-right: 0;
        margin-bottom: 4rem;
      }

      &__list {
        width: 85rem;

        &__cards {
          margin-top: 1rem;
          display: flex;
          flex-wrap: wrap;

          .product {
            margin-right: 2rem;
            margin-top: 2rem;

            &:nth-child(4n) {
              margin-right: 2rem;
            }

            &:nth-child(3n) {
              margin-right: 2rem;
            }

            &:nth-child(2n) {
              margin-right: 0;
            }
          }
        }
      }
    }
  }
}

@media screen and (max-width: 425px) {
  .mz-product-list {
    grid-template-rows: auto;
    grid-template-columns: 1fr 4fr 1fr;

    &__container {
      flex-direction: column;
      width: 46rem;

      &__filters {
        width: 100%;
        margin-right: 0;
        margin-bottom: 4rem;
      }

      &__list {
        width: 100%;

        &__cards {
          .product {
            margin-right: 0;
            margin-top: 2rem;

            &:nth-child(4n) {
              margin-right: 2rem;
            }

            &:nth-child(3n) {
              margin-right: 2rem;
            }

            &:nth-child(2n) {
              margin-right: 0;
            }
          }
        }
      }
    }
  }
}
</style>
