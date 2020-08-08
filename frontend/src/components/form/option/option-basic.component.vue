<template>
  <el-option class="mz-option-basic"
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


<style lang="scss">

@import '~element-ui/lib/theme-chalk/option.css';

.mz-option-basic {
  .el-select-dropdown {
    &__item.selected {
      color: var(--primary-color);
    }
  }
}
</style>
