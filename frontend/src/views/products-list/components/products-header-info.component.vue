<template>
  <div class="mz-products-header-info">
    <div class="total-items">
      <span class="total-items__label">{{$t(`header.found`)}}</span>
      <span class="total-items__quantity">{{quantity}}</span>
      <span class="total-items__label">{{$t(`header.results`)}}</span>
    </div>

    <div class="sort-items">
      <span class="sort-items__label">{{$t(`header.sortBy`)}}</span>

      <mz-select class="sort-items__select"
                 v-model="defaultProductSortOption"
                 @change="changeProductsSortOption(defaultProductSortOption)"
                 size="mini">

        <mz-option v-for="(option, index) in productSortOption"
                   :value="option"
                   :label="$t(`sorting.${ option }`)"
                   :key="index" />
      </mz-select>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace }            from 'vuex-class';
import mzSelect                 from '@/components/form/select/select.component.vue';
import mzOption                 from '@/components/form/option/option.component.vue';
import mzProductsModule         from '../store/products.module';

const LOCAL_STORE: string = 'products-list';
const local = namespace(LOCAL_STORE);

@Component({
  components: {
    mzSelect,
    mzOption,
  },
})
export default class mzProductsHeaderInfo extends Vue {
  @local.State((state: mzProductsModule) => state.mzProductsState.productsSortOption) public productSortOption!: string[];
  @local.State((state: mzProductsModule) => state.mzProductsState.defaultProductsSortOption) public defaultOption!: string;
  @local.Action public changeProductsSortOption!: (value: string) => void;
  @Prop(Number) public readonly quantity!: number;

  // TODO  Zmiana Quantity z 13 na to co serwer zwróci
  public get defaultProductSortOption() {
    return this.defaultOption;
  }

  public set defaultProductSortOption(value: string) {
    this.changeProductsSortOption(value);
  }
}
</script>

<style lang="scss"
       scoped>
.mz-products-header-info {
  display: flex;
  justify-content: space-between;

  .total-items {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &__label {
      font-size: 1.6rem;
    }

    &__quantity {
      font-size: 2rem;
      font-weight: var(--font-medium);
      color: var(--primary-color);
      margin: 0 1rem;
    }
  }

  .sort-items {
    &__label {
      font-size: 1.6rem;
    }

    &__select {
      margin-left: 1rem;
    }
  }
}

@media screen and (max-width: 425px) {
  .mz-products-header-info {
    flex-direction: column;

    .total-items {
      justify-content: flex-start;
      margin-bottom: 1rem;
    }
  }
}
</style>
