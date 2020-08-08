<template>
  <div class="mz-offers-header-info">
    <div class="total-items">
      <span class="total-items__label">{{ $t(`header.found`) }}</span>
      <span class="total-items__quantity">{{ quantity }}</span>
      <span class="total-items__label">{{ $t(`header.results`) }}</span>
    </div>

    <div class="sort-items">
      <span class="sort-items__label">{{ $t(`header.sortBy`) }}</span>

      <mz-select @change="changeOffersSortOption(defaultOfferSortOption)"
                 class="sort-items__select"
                 size="mini"
                 v-model="defaultOfferSortOption">

        <mz-option :key="index"
                   :label="$t(`sorting.${ option }`)"
                   :value="option"
                   v-for="(option, index) in offersSortOption" />
      </mz-select>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace }            from 'vuex-class';
import mzSelect                 from '@/components/form/select/select.component.vue';
import mzOption                 from '@/components/form/option/option.component.vue';
import mzOffersListModule       from '@/views/offers-list/store/offers-list.module';
import { TSort }                from '@/views/offers-list/store/offers-list.interface';

const LOCAL_STORE: string = 'offers-list';
const local = namespace(LOCAL_STORE);

@Component({
  components: {
    mzSelect,
    mzOption,
  },
})
export default class mzOffersHeaderInfo extends Vue {
  @local.State((state: mzOffersListModule) => state.mzOffersList.offersSortOption) public offersSortOption!: string[];
  @local.State((state: mzOffersListModule) => state.mzOffersList.defaultOffersSortOption) public defaultOffersSortOption!: TSort;
  @local.Action public changeOffersSortOption!: (value: string) => void;
  @Prop(Number) public readonly quantity!: number;

  public get defaultOfferSortOption(): TSort {
    return this.defaultOffersSortOption;
  }

  public set defaultOfferSortOption(value: TSort) {
    this.changeOffersSortOption(value);
  }
}
</script>

<style lang="scss"
       scoped>

.mz-offers-header-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;

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

@include respond-to(mobile) {
  .mz-offers-header-info {
    flex-direction: column;

    .total-items {
      justify-content: flex-start;
      margin-bottom: 1rem;
    }
  }

}
</style>
