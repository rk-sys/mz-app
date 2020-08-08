<template>
  <el-pagination :hide-on-single-page="true"
                 background
                 class="mz-pagination"
                 layout="prev, pager, next"
                 v-bind="attributes"
                 v-on="listeners">

    <slot :name="slot"
          :slot="slot"
          v-for="(_, slot) of $slots" />
  </el-pagination>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import mzTransparentWrapper  from '@/components/transparent-component.mixin';
import ElPagination          from 'element-ui/lib/pagination.js';

@Component({
  components: {
    ElPagination,
  },
})
export default class mzPagination extends Mixins(mzTransparentWrapper) {
}
</script>
<style lang="scss">
.mz-pagination {
  &.is-background {
    .el-pager {
      .number {
        color: var(--black);
        font-weight: var(--font-medium);

        &.active {
          background-color: var(--primary-color) !important;
          color: var(--white);

          &:hover {
            color: var(--white);
          }
        }

        &:hover {
          background: var(--gray-400);
          color: var(--primary-color) !important;
        }
      }
    }
  }
}
</style>
<style lang="scss"
       scoped>

@import '~element-ui/lib/theme-chalk/pagination.css';

</style>
