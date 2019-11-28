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
import mzTransparentWrapper  from '@/components/transparent-component.mixin';

@Component({
  components: {
    ElInput,
  },
})
export default class mzInput extends Mixins(mzTransparentWrapper) {

}
</script>

<style lang="scss">

@import '~element-ui/lib/theme-chalk/input.css';

.mz-input {
  .el-input__inner {
    box-shadow: inset 10rem 10rem var(--transparent);
    border: none;
    background: var(--transparent);
    padding: 0;
  }
}
</style>
