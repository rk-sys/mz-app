<template>
  <div class="mz-craftsmen-header-info">
    <div class="total-items">
      <span class="total-items__label">{{ $t(`header.found`) }}</span>
      <span class="total-items__quantity">{{ quantity }}</span>
      <span class="total-items__label">{{ $t(`header.results`) }}</span>
    </div>

    <div class="sort-items">
      <span class="sort-items__label">{{ $t(`header.sortBy`) }}</span>

      <mz-select @change="changeCraftsmenSortOption(defaultCraftsmenSortOption)"
                 class="sort-items__select"
                 size="mini"
                 v-model="defaultCraftsmenSortOption">

        <mz-option :key="index"
                   :label="$t(`sorting.${ option }`)"
                   :value="option"
                   v-for="(option, index) in craftsmenSortOption" />
      </mz-select>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace }            from 'vuex-class';
import mzSelect                 from '@/components/form/select/select.component.vue';
import mzOption                 from '@/components/form/option/option.component.vue';
import mzCraftsmenModule        from '@/views/craftsmen/store/craftsmen.module';

const LOCAL_STORE: string = 'craftsmen';
const local = namespace(LOCAL_STORE);

@Component({
  components: {
    mzSelect,
    mzOption,
  },
})
export default class mzCraftsmenHeaderInfo extends Vue {
  @local.State((state: mzCraftsmenModule) => state.mzCraftsmenState.craftsmenSortOption) public craftsmenSortOption!: string[];
  @local.State((state: mzCraftsmenModule) => state.mzCraftsmenState.defaultCraftsmenSortOption) public defaultOption!: string;
  @local.Action public changeCraftsmenSortOption!: (value: string) => void;
  @Prop(Number) public readonly quantity!: number;

  public get defaultCraftsmenSortOption() {
    return this.defaultOption;
  }

  public set defaultCraftsmenSortOption(value: string) {
    this.changeCraftsmenSortOption(value);
  }
}
</script>

<style lang="scss"
       scoped>
.mz-craftsmen-header-info {
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
  .mz-craftsmen-header-info {
    flex-direction: column;

    .total-items {
      justify-content: flex-start;
      margin-bottom: 1rem;
    }
  }
}
</style>
