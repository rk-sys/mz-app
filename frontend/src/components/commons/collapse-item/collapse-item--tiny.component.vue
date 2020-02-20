<template>
  <el-collapse-item class="mz-collapse-item-tiny"
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
export default class mzCollapseItemTiny extends Mixins(mzTransparentWrapper) {
  @Prop(String) private readonly collapseStyle!: string;

  public get collapseStyleClass(): string | null {
    return this.collapseStyle ? `mz-collapse-item-tiny--${this.collapseStyle}` : null;
  }
}

</script>

<style lang="scss">
@import '~element-ui/lib/theme-chalk/collapse-item.css';

.el-collapse-item__header {
  padding: 0;
  font-size: 2rem;
  color: var(--black);
  font-weight: var(--font-medium);
  height: 5rem;
  border-bottom: 1px solid var(--white);

  &.is-active {
    border-bottom: 1px solid var(--gray-200);
  }
}

.mz-collapse-item-tiny {
  &--section {
    .el-collapse-item {
      &__wrap,
      &__header {
        border: none;
      }
    }
  }
}


@media screen and (max-width: 768px) and (min-width: 425px) {
  .el-collapse-item__header {
    padding: 2rem 2rem;
  }
}
</style>
