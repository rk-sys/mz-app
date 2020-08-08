<template>
  <div class="mz-products-filters-price">
    <p class="title">{{ $t(`filters.price.title`) }}</p>

    <div class="mz-products-filters__price__wrapper">

      <mz-input :holder="$t(`filters.price.minValue`)"
                id="minValue"
                v-model="filters.price.minValue" />

      <span class="separator">
              {{ $t(`filters.price.separator`) }}
            </span>

      <mz-input :holder="$t(`filters.price.maxValue`)"
                id="maxValue"
                v-model="filters.price.maxValue" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace }      from 'vuex-class';
import { IPrice }         from '@/views/products-list/store/products.interface';
import mzTag              from '@/components/tag/tag.component.vue';
import mzInput            from '@/components/input/mz-input.component.vue';
import mzProductsModule   from '../../store/products.module';

const LOCAL_STORE: string = 'products-list';
const local = namespace(LOCAL_STORE);

@Component({
  components: {
    mzTag,
    mzInput,
  },
})
export default class yProductsFiltersTargetGroup extends Vue {
  @local.State((state: mzProductsModule) => state.mzProductsState.filters.price) public tags!: IPrice;
  @local.Mutation public removeTagFromFilters!: (index: number) => void;
  @local.Mutation public addTagToFilters!: (tag: string) => void;

  public itemTag: string = '';

  public addTag(newTag: string): void {
    if (this.itemTag !== '') {
      this.addTagToFilters(newTag);
      this.itemTag = '';
    }
  }
}
</script>
<style lang="scss">
.mz-products-filters__price {
  .mz-input__container {
    min-width: 100%;
  }
}
</style>
<style lang="scss"
       scoped>

.mz-products-filters-price {
  position: relative;
  margin-bottom: 3rem;


  &__list {
    display: flex;
    flex-wrap: wrap;
    margin-top: 1.5rem;
  }

  &__add-btn {
    color: var(--primary-color);
    border: .2rem solid var(--primary-color);
    background-color: var(--white);
    border-radius: 50%;
    height: 2.5rem;
    width: 2.5rem;
    font-size: 3.5rem;
    font-weight: 100;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: .4s;
    position: absolute;
    top: 7rem;
    right: 0;

    &:hover {
      color: var(--white);
      background-color: var(--primary-color);
      border: .2rem solid var(--primary-color);
    }
  }
}
</style>