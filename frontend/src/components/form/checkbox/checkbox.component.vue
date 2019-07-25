<template>
  <el-checkbox class="mz-checkbox"
               v-bind="attributes"
               v-on="listeners">

    <slot :name="slot"
          :slot="slot"
          v-for="(_, slot) of $slots" />
  </el-checkbox>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import ElCheckbox            from 'element-ui/lib/checkbox.js';
import mzTransparentWrapper   from '@/components/transparent-component.mixin';

@Component({
  components: {
    ElCheckbox,
  },
})
export default class mzCheckbox extends Mixins(mzTransparentWrapper) {

}
</script>


<style lang="scss"
       scoped>

@import '~element-ui/lib/theme-chalk/checkbox.css';

/deep/ .el-checkbox {
  &__input.is-checked + .el-checkbox__label,
  &__input.is-checked {
    color: var(--secondary-color);

    .el-checkbox__inner {
      border-color: var(--secondary-color);
      background: var(--secondary-color);
    }
  }
}


</style>
