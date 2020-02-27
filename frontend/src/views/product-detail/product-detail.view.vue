<template>
  <div class="mz-product-detail">
    <div class="mz-product-detail__content">
      <main class="mz-product-detail__content__product-info">
        <mz-product-detail-picture :pictures="productDetail.product.pictures" />

        <mz-product-detail-description :description="productDetail.product.description"
                                       :tags="productDetail.product.tags"
                                       :mainRange="productDetail.product.mainRange"
                                       :mainCategory="productDetail.product.mainCategory"
                                       :subCategory="productDetail.product.subCategory"
                                       :gender="productDetail.product.gender"
                                       :isNew="productDetail.product.isNew" />
      </main>

      <mz-product-detail-checkout :product-title="productDetail.product.title"
                                  :price="productDetail.product.price"
                                  :currency="productDetail.product.currency" />

      <mz-product-detail-craftsman :craftsman="productDetail.craftsman" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue }         from 'vue-property-decorator';
import { Route }                  from 'vue-router';
import { namespace }              from 'vuex-class';
import { registerStoreModule }    from '@/helpers/helpers';
import { loadTranslationsAsync }  from '@/i18n/i18n';
import Store                      from '@/store/store';
import { ICraftsmenDetail }       from '@/views/craftsmen-detail/store/craftsmen-detail.interface';
import mzProductDetailDescription from './components/product-detail-description.view.vue';
import mzProductDetailCraftsman   from './components/product-detail-craftsman.view.vue';
import mzProductDetailPicture     from './components/product-detail-pictures.view.vue';
import mzProductDetailCheckout    from './components/product-detail-checkout.view.vue';
import mzProductDetailModule      from './store/product-detail.module';

const LOCAL_STORE: string = 'craftsmenDetail';
const local = namespace(LOCAL_STORE);

@Component({
  components: {
    mzProductDetailDescription,
    mzProductDetailCraftsman,
    mzProductDetailCheckout,
    mzProductDetailPicture,
  },
})
export default class mzProductDetail extends Vue {
  @local.State((state: mzProductDetailModule) => state.mzProductDetail) public productDetail!: ICraftsmenDetail;

  private async beforeRouteEnter(to: Route, from: Route, next: any) {
    const lang: string = Store.state.global.defaultLang;

    try {
      await loadTranslationsAsync(lang, import(`./i18n/${lang}` as string));
      registerStoreModule(LOCAL_STORE.split('/'), mzProductDetailModule);
      await Store.dispatch(`${LOCAL_STORE}/getProductDetail`, '1');
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

.fade-enter-active, .fade-leave-active {
  transition: opacity .25s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
{
  opacity: 0;
}

.mz-product-detail {
  min-height: 100vh;
  background: var(--background-color);
  height: 100%;
  display: grid;
  grid-template-rows: 6.4rem 7rem auto;
  grid-template-columns: 1fr 4fr 1fr;

  &__content {
    max-width: 100%;
    grid-row-start: 3;
    grid-column-start: 2;
    display: grid;
    grid-template-rows: 25rem auto auto;
    grid-template-columns: auto auto;

    &__product-info {
      width: 76rem;
      margin: 0 10rem 0 5rem;
      grid-row-start: 1;
      grid-row-end: 3;
      grid-column-start: 1;
    }

    &__side-menu {
      width: 32rem;
    }
  }
}

@media only screen and (max-width: 768px) and (min-width: 426px) {
  .mz-product-detail {
    grid-template-rows: auto;
    grid-template-columns: 1fr 4fr 1fr;

    &__content {
      grid-row-start: 1;
      grid-column-start: 2;
      grid-template-rows: auto auto auto;
      grid-template-columns: auto;

      &__product-info {
        width: 85rem;
        margin: 0;
        grid-row-start: 2;
        grid-row-end: 2;
        grid-column-start: 1;
      }
    }
  }
}

@media only screen and (max-width: 425px) {
  .mz-product-detail {
    grid-template-rows: auto;
    grid-template-columns: 1fr 4fr 1fr;

    &__content {
      grid-row-start: 1;
      grid-column-start: 2;
      grid-template-rows: auto auto auto;
      grid-template-columns: auto;

      &__product-info {
        width: 46rem;
        margin: 0;
        grid-row-start: 2;
        grid-row-end: 2;
        grid-column-start: 1;
      }
    }
  }
}
</style>