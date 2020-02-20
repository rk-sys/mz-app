<template>
  <div class="mz-products-filters-gender">
    <p class="title">{{$t(`filters.gender.title`)}}</p>

    <div class="item">
      <mz-checkbox v-model="gender.male">
        <span class="label">{{ $t(`filters.gender.male`) }}</span>
      </mz-checkbox>
    </div>

    <div class="item">
      <mz-checkbox v-model="gender.female">
        <span class="label">{{ $t(`filters.gender.female`) }}</span>
      </mz-checkbox>
    </div>

    <div class="item">
      <mz-checkbox v-model="gender.unisex">
        <span class="label">{{ $t(`filters.gender.unisex`) }}</span>
      </mz-checkbox>
    </div>

    <div class="item">
      <mz-checkbox v-model="gender.noMatter">
        <span class="label">{{ $t(`filters.gender.noMatter`) }}</span>
      </mz-checkbox>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace }      from 'vuex-class';
import { IPrice }         from '@/views/products-list/store/products.interface';
import mzCheckbox         from '@/components/form/checkbox/checkbox.component.vue';
import mzProductsModule   from '../../store/products.module';

const LOCAL_STORE: string = 'products-list';
const local = namespace(LOCAL_STORE);

@Component({
  components: {
    mzCheckbox,
  },
})
export default class yProductsFiltersGender extends Vue {
  @local.State((state: mzProductsModule) => state.mzProductsState.filters.gender) public gender!: IPrice;

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

.mz-products-filters-gender {
  margin-bottom: 3rem;

  .title {
    font-size: 2rem;
    color: var(--black);
    font-weight: var(--font-medium);
    margin-bottom: 1rem;
  }

  .item {
    padding: 0 2rem;
    display: flex;
    cursor: pointer;
    flex-direction: column;

    .label {
      font-size: 2.2rem;
      margin: .5rem 0;
      padding: .5rem 0;
      color: var(--black);
    }

    &:hover {
      border-right: 2px;
      background: var(--gray-150);

      .label {
        color: var(--primary-color);
        font-weight: var(--font-medium);
      }
    }
  }
}
</style>