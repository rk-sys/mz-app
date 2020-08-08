<template>
  <div class="mz-products-filters-category">
    <p class="title">{{ $t(`filters.category`) }}</p>

    <mz-collapse :key="index"
                 accordion
                 class="mz-products-filters-category__content"
                 v-for="(filter, index) in category"
                 v-model="activeCategory">

      <mz-collapse-item :name="filter.title"
                        :title="$t(`filters.mainCategory.${filter.title}`)">

        <div :key="id"
             class="item"
             v-for="(item, id) in filter.items">

          <span class="label">{{ $t(`filters.subcategory.${item}`) }}</span>
        </div>

      </mz-collapse-item>
    </mz-collapse>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace }      from 'vuex-class';
import { IProduct }       from '@/views/products-list/store/products.interface';
import mzCollapse         from '@/components/commons/collapse/collapse.component.vue';
import mzCollapseItem     from '@/components/commons/collapse-item/collapse-item.component.vue';
import mzProductsModule   from '../../store/products.module';

const LOCAL_STORE: string = 'products-list';
const local = namespace(LOCAL_STORE);

@Component({
  components: {
    mzCollapse,
    mzCollapseItem,
  },
})
export default class yProductsFiltersCategory extends Vue {
  @local.State((state: mzProductsModule) => state.mzProductsState.filters.category) public category!: IProduct[];

  public activeCategory: string[] = [];
}
</script>

<style lang="scss">
.mz-products-filters-category {
  .mz-collapse-item {
    .el-collapse-item__content {
      padding-bottom: 1rem;
    }

    .el-collapse-item__header {
      font-size: 1.9rem;
      font-weight: var(--font-regular);

      &.is-active {
        border-bottom: 1px solid var(--white);
      }
    }
  }
}
</style>
<style lang="scss"
       scoped>

.mz-products-filters-category {
  margin-bottom: 3rem;

  .title {
    font-size: 2rem;
    color: var(--black);
    font-weight: var(--font-medium);
    margin-bottom: 1rem;
  }

  &__content {
    margin-left: 1.5rem;

    .item {
      display: flex;
      cursor: pointer;
      padding: .25rem 1rem;

      .label {
        font-size: 1.8rem;
        font-weight: var(--font-light);
      }

      &:hover {
        background: var(--gray-150);

        .label {
          color: var(--primary-color);
          font-weight: var(--font-medium);
        }
      }
    }
  }
}

@media screen and (max-width: 768px) and (min-width: 426px) {
  .mz-products-filters-category {
    .item {
      padding: .5rem 4rem
    }
  }
}
</style>