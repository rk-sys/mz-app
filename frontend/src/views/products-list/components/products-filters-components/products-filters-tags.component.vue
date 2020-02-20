<template>
  <div class="mz-products-filters-tags">
    <p class="title">{{ $t(`filters.tags.title`) }}</p>

    <mz-input v-model="itemTag"
              :holder="$t(`filters.tags.addTags`)"
              id="itemTag"
              @keyup.enter.native="addTag(itemTag)" />

    <div class="mz-products-filters-tags__add-btn"
         @click="addTag(itemTag)">

      +
    </div>

    <div class="mz-products-filters-tags__list">
      <mz-tag v-for="(tag, index) in tags"
              :tag="tag"
              :index="index"
              :key="index"
              :remove-tag="removeTagFromFilters" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { namespace }      from 'vuex-class';
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
export default class yProductsFiltersTags extends Vue {
  @local.State((state: mzProductsModule) => state.mzProductsState.filters.tags) public tags!: string[];
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
.mz-products-filters-tags {
  .mz-input__container {
    min-width: 100%;
  }
}
</style>
<style lang="scss"
       scoped>

.mz-products-filters-tags {
  position: relative;
  margin-bottom: 3rem;

  .title {
    font-size: 2rem;
    color: var(--black);
    font-weight: var(--font-medium);
    margin-bottom: 1rem;
  }

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