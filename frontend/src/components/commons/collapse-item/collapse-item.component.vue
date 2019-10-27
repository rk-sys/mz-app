<template>
  <el-collapse-item class="mz-collapse-item"
                    :class="collapseStyleClass"
                    v-bind="attributes"
                    v-on="listeners">

    <slot :name="slot"
          :slot="slot"
          v-for="(_, slot) of $slots" />
  </el-collapse-item>
</template>

<script lang="ts">

import { Component, Mixins, Prop } from 'vue-property-decorator';
import mzTransparentWrapper        from '@/components/transparent-component.mixin';
import elCollapseItem              from 'element-ui/lib/collapse-item.js';

@Component({
  components: {
    elCollapseItem,
  },
})
export default class mzCollapseItem extends Mixins(mzTransparentWrapper) {
  @Prop(String) private readonly collapseStyle!: string;

  public get collapseStyleClass(): string | null {
    return this.collapseStyle ? `mz-collapse-item--${this.collapseStyle}` : null;
  }
}

</script>

<style lang="scss">
@import '~element-ui/lib/theme-chalk/collapse-item.css';

.el-collapse-item__header {
  padding: 0 3rem;
  font-size: 1.8rem;
  height: 6.8rem;

  &.is-active {
    border-bottom: 1px solid var(--gray-200);
  }
}

.mz-collapse-item {

  &--section {
    .el-collapse-item {

      &__wrap,
      &__header {
        border: none;
      }
    }

  }
}

</style>
