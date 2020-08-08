<template>
  <el-input class="mz-input-basic"
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
import mzTransparentWrapper  from '@/components/transparent-component.mixin';

@Component({
  components: {
    ElInput,
  },
})
export default class mzInputBasic extends Mixins(mzTransparentWrapper) {
}
</script>

<style lang="scss">

@import '~element-ui/lib/theme-chalk/input.css';


.mz-input-basic {
  .el-input__inner {
    font-size: 2.2rem;
    border-radius: 0;
    box-shadow: inset 10rem 10rem var(--transparent);
    border: none;
    padding: 0 1rem;
    height: 100%;
  }

  .el-input.is-disabled {
    .el-input__inner {
      background: var(--gray-100);
    }
  }
}
</style>
