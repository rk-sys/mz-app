<template>
  <el-input class="mz-input"
            v-bind="attributes"
            v-on="listeners">

    <slot :name="slot"
          :slot="slot"
          v-for="(_, slot) of $slots" />
  </el-input>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import ElInput               from 'element-ui/lib/input.js';
import mzTransparentWrapper   from '@/components/transparent-component.mixin';

@Component({
  components: {
    ElInput,
  },
})
export default class mzInput extends Mixins(mzTransparentWrapper) {

}
</script>

<style lang="scss"
       scoped>

@import '~element-ui/lib/theme-chalk/input.css';

/deep/ {
  .el-input__inner {
    &:focus {
      border-color: var(--secondary-color);
    }
  }
}
</style>
