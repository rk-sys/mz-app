<template>
  <el-option class="mz-option"
             v-bind="attributes"
             v-on="listeners">
  </el-option>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import ElOption              from 'element-ui/lib/option.js';

import mzTransparentWrapper from '@/components/transparent-component.mixin';

@Component({
  components: {
    ElOption,
  },
})
export default class mzOption extends Mixins(mzTransparentWrapper) {

}
</script>


<style lang="scss"
       scoped>

@import '~element-ui/lib/theme-chalk/option.css';
.el-select-dropdown {
  &__item.selected {
    color: var(--secondary-color);
  }
  &.is-multiple {
    .el-select-dropdown__item.selected {
      color: var(--secondary-color);
    }
  }
}

</style>
