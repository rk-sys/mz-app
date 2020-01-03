<template>
  <el-select class="mz-select"
             v-bind="attributes"
             v-on="listeners">

    <slot :name="slot"
          :slot="slot"
          v-for="(_, slot) of $slots" />
  </el-select>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import ElSelect              from 'element-ui/lib/select.js';
import mzTransparentWrapper  from '@/components/transparent-component.mixin';

@Component({
  components: {
    ElSelect,
  },
})
export default class mzSelect extends Mixins(mzTransparentWrapper) {

}
</script>

<style lang="scss">

@import '~element-ui/lib/theme-chalk/select.css';

.el-input .el-input__inner {
  padding: 0 1.5rem;
}

.el-select .el-input.is-focus .el-input__inner:focus {
  border-color: var(--primary-color);
}

.el-select .el-input.is-focus .el-input__inner {
  border-color: var(--primary-color);
}

.el-select .el-input__inner:focus {
  border-color: var(--primary-color);
}

.el-select-dropdown {
  .mz-option {
    color: var(--black);

    &:hover {
      background: var(--primary-color);
      color: var(--white);
    }
  }
}
</style>
