<template>
  <div class="mz-craftsmen-detail-products">
    <mz-product-card v-for="(product, index) in products"
                     :key="index"
                     :product="product"
                     class="mz-craftsmen-detail-products__product" />
  </div>
</template>

<script lang="ts">
import { Component, Vue }             from 'vue-property-decorator';
import { namespace }                  from 'vuex-class';
import mzCraftsmenDetailModule        from '../store/craftsmen-detail.module';
import mzCraftsmenDetailPortfolioCard from '../components/craftsmen-detail-portfolio-card.component.vue';
import mzModal                        from '@/components/form/modal/modal.component.vue';
import mzProductCard                  from '@/components/product-card/product-card.component.vue';
import { IProduct }                   from '@/views/products-list/store/products.interface';

const LOCAL_STORE: string = 'mzCraftsmenDetail';
const local = namespace(LOCAL_STORE);

@Component({
  components: {
    mzCraftsmenDetailPortfolioCard,
    mzProductCard,
    mzModal,
  },
})
export default class mzCraftsmenDetailProduct extends Vue {
  @local.State((state: mzCraftsmenDetailModule) => state.mzCraftsmenDetailState.craftsmenProducts) public products!: IProduct[];
}
</script>

<style lang="scss"
       scoped>

.mz-craftsmen-detail-products {
  width: 80rem;
  margin-left: 10rem;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  margin-top: -2rem;

  &__product {
    margin-right: 1rem;
    margin-top: 2rem;

    &:nth-child(3n) {
      margin-right: 0;
    }
  }
}

@media screen and (max-width: 1024px) and (min-width: 769px) {
  .mz-craftsmen-detail-products {
    justify-content: space-evenly;
  }
}

@include respond-to(tablet) {
  .mz-craftsmen-detail-products {
    margin-left: 0;
    width: 85rem;
    justify-content: space-between;

    &__product {
      margin: 0 0 2rem 0;
    }
  }
}

@include respond-to(mobile) {
  .mz-craftsmen-detail-products {
    margin-left: 0;
    width: 46rem;

    .product {
      margin: 0 0 2rem 0;
    }
  }
}
</style>