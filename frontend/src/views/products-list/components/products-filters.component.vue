<template>
  <mz-collapse class="mz-products-filters"
               v-model="activeNames">

    <mz-collapse-item :title="$t(`filters.title`)"
                      :name="filters.title"
                      class="mz-products-filters__container">

      <mz-products-filters-category />

      <mz-products-filters-target-group />

      <mz-products-filters-tags />

      <mz-products-filters-gender />

      <mz-products-filters-condition />

    </mz-collapse-item>
  </mz-collapse>
</template>

<script lang="ts">
import { Component, Vue }           from 'vue-property-decorator';
import { namespace }                from 'vuex-class';
import mzCollapseItem               from '@/components/commons/collapse-item/collapse-item.component.vue';
import mzCollapse                   from '@/components/commons/collapse/collapse.component.vue';
import mzProductsFiltersTargetGroup from './products-filters-components/products-filters-target-group.component.vue';
import mzProductsFiltersCondition   from './products-filters-components/products-filters-condition.component.vue';
import mzProductsFiltersCategory    from './products-filters-components/products-filters-category.component.vue';
import mzProductsFiltersGender      from './products-filters-components/products-filters-gender.component.vue';
import mzProductsFiltersTags        from './products-filters-components/products-filters-tags.component.vue';
import mzProductsModule             from '../store/products.module';

const LOCAL_STORE: string = 'products-list';
const local = namespace(LOCAL_STORE);

@Component({
  components: {
    mzProductsFiltersTargetGroup,
    mzProductsFiltersCondition,
    mzProductsFiltersCategory,
    mzProductsFiltersGender,
    mzProductsFiltersTags,
    mzCollapseItem,
    mzCollapse,
  },
})
export default class mzProductsFilters extends Vue {
  @local.State((state: mzProductsModule) => state.mzProductsState.filters) public filters!: any;

  public activeNames: string[] = [];
}
</script>
<style lang="scss"
       scoped>

.mz-products-filters {
  background: var(--white);
  border: 1px solid var(--gray-400);
  padding: 1rem 2.5rem;
  width: 32rem;
}

@media screen and (max-width: 768px) and (min-width: 426px) {
  .mz-products-filters {
    width: 100%;
  }
}

@media screen and (max-width: 425px) {
  .mz-products-filters {
    width: 100%;
  }
}
</style>