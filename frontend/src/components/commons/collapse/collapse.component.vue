<template>
  <el-collapse class="mz-collapse"
               :class="collapseClass"
               v-bind="attributes"
               v-on="listeners">

    <slot :name="slot"
          :slot="slot"
          v-for="(_, slot) of $slots" />
  </el-collapse>
</template>

<script lang="ts">
import { Component, Mixins, Prop } from 'vue-property-decorator';
import mzTransparentWrapper        from '@/components/transparent-component.mixin';
import elCollapse                  from 'element-ui/lib/collapse.js';

@Component({
  components: {
    elCollapse,
  },
})
export default class mzCollapse extends Mixins(mzTransparentWrapper) {
  @Prop(String) public collapseStyle !: string;

  get collapseClass() {
    if (this.collapseStyle) {
      return `mz-collapse--${this.collapseStyle}`;
    }

    return null;
  }
}
</script>

<style lang="scss" scoped>
@import '~element-ui/lib/theme-chalk/collapse.css';

.mz-collapse {
  border-top: 0;
  border-bottom: 0;

  &--section {
    border: none;
  }
}
</style>
