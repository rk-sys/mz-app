<template>
  <mz-collapse class="mz-craftsmen-filters"
               v-model="activeNames">

    <mz-collapse-item :title="$t(`filters.title`)"
                      class="mz-craftsmen-filters__collapse"
                      name="0">

      <div class="mz-craftsmen-filters__category">
        <p class="title">{{$t(`filters.category.title`)}}</p>

        <div class="item"
             v-for="item in filters.category">

          <span class="label">
            {{$t(`filters.category.${item.value}`)}}
          </span>

        </div>
      </div>

      <div class="mz-craftsmen-filters__target-group">
        <p class="title">{{ $t(`filters.targetGroup.title`) }}</p>

        <div :key="index"
             class="item"
             v-for="(item, index) in filters.targetGroup">

          <mz-checkbox @change="checkAllTargetGroup()"
                       v-model="item.isSelected">

            <span class="label">{{ $t(`filters.targetGroup.${item.value}`) }}</span>
          </mz-checkbox>
        </div>
      </div>

      <div class="mz-craftsmen-filters__tags">
        <p class="title">{{ $t(`filters.tags.title`) }}</p>

        <mz-input :holder="$t(`filters.tags.addTags`)"
                  @keyup.enter.native="addTag(itemTag)"
                  class="mz-craftsmen-filters__tags__input"
                  id="itemTag"
                  v-model="itemTag">
        </mz-input>

        <div @click="addTag(itemTag)"
             class="mz-craftsmen-filters__tags__add-btn">

          +
        </div>

        <div class="mz-craftsmen-filters__tags__list">
          <mz-tag :index="index"
                  :key="index"
                  :remove-tag="removeTagFromFilters"
                  :tag="tag"
                  v-for="(tag, index) in filters.tags" />
        </div>
      </div>
    </mz-collapse-item>
  </mz-collapse>
</template>

<script lang="ts">
import { Component, Vue }    from 'vue-property-decorator';
import { namespace }         from 'vuex-class';
import { ICraftsmenFilters } from '@/views/craftsmen/store/craftsmen.interface';
import mzCraftsmenModule     from '@/views/craftsmen/store/craftsmen.module';
import mzCheckbox            from '@/components/form/checkbox/checkbox.component.vue';
import mzTag                 from '@/components/tag/tag.component.vue';
import mzCollapse            from '@/components/commons/collapse/collapse.component.vue';
import mzCollapseItem        from '@/components/commons/collapse-item/collapse-item.component.vue';
import mzInput               from '@/components/input/mz-input.component.vue';

const LOCAL_STORE: string = 'craftsmen';
const local = namespace(LOCAL_STORE);

@Component({
  components: {
    mzCheckbox,
    mzTag,
    mzCollapse,
    mzCollapseItem,
    mzInput,
  },
})
export default class mzCraftsmenFilters extends Vue {
  @local.State((state: mzCraftsmenModule) => state.mzCraftsmenState.filters) public filters!: ICraftsmenFilters;
  @local.Action public checkTargetGroupSelected!: () => void;
  @local.Mutation public removeTagFromFilters!: (index: number) => void;
  @local.Mutation public addTagToFilters!: (tag: string) => void;

  public activeNames: string[] = [ '1' ];

  public itemTag: string = '';

  public addTag(newTag: string): void {
    if (this.itemTag !== '') {
      this.addTagToFilters(newTag);
      this.itemTag = '';
    }
  }

  public checkAllTargetGroup(): void {
    this.checkTargetGroupSelected();
  }
}
</script>
<style lang="scss">
.el-collapse-item__wrap {
  border-bottom: none;
}

.mz-craftsmen-filters__tags {
  .mz-input__container {
    min-width: 100%;
  }
}

@media screen and (max-width: 768px) and (min-width: 425px) {
  .mz-craftsmen-filters__collapse {
    .el-collapse-item__wrap {
      .el-collapse-item__content {
        display: grid;
        grid-template-rows: auto auto;
        grid-template-columns: 50% 50%;
        padding: 0 2rem;
      }
    }
  }
}
</style>

<style lang="scss"
       scoped>
.mz-craftsmen-filters {
  background: var(--white);
  border: 1px solid var(--gray-400);
  padding: 1rem 2.5rem;
  width: 32rem;

  &__category {
    border-bottom: 1px solid var(--gray-200);
    padding-bottom: 2rem;

    .title {
      font-size: 2rem;
      color: var(--black);
      font-weight: var(--font-medium);
      margin-bottom: 1rem;
    }

    .item {
      display: flex;
      cursor: pointer;
      padding: .6rem 2rem;

      .label {
        font-size: 2.2rem;
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

  &__target-group {
    border-bottom: 1px solid var(--gray-200);
    padding-bottom: 2rem;

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

  &__tags {
    position: relative;

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
}

@media screen and (max-width: 768px) and (min-width: 426px) {
  .mz-craftsmen-filters {
    width: 100%;

    &__collapse {

      .el-collapse-item__wrap {
        display: grid;
        grid-template-rows: auto auto;
        grid-template-columns: 50% 50%;
      }
    }

    &__category {
      grid-row-start: 1;
      grid-row-end: 1;
      grid-column-start: 1;
      grid-column-end: 1;
    }

    &__target-group {
      grid-row-start: 1;
      grid-row-end: 1;
      grid-column-start: 2;
      grid-column-end: 2;
    }

    &__tags {
      grid-row-start: 2;
      grid-row-end: 2;
      grid-column-start: 1;
      grid-column-end: span 2;

      &__list {
        margin-top: 2.5rem;
      }

      &__add-btn {
        top: 8.5rem;
      }
    }

  }
}

@media screen and (max-width: 425px) {
  .mz-craftsmen-filters {
    width: 100%;
  }
}
</style>
