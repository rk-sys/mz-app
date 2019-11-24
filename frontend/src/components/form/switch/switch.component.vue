<template>
  <el-switch class="mz-switch"
             v-bind="attributes"
             v-on="listeners"
             activeColor="#019A7C">

  </el-switch>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import ElSwitch              from 'element-ui/lib/switch.js';
import mzTransparentWrapper  from '@/components/transparent-component.mixin';

@Component({
  components: {
    ElSwitch,
  },
})
export default class mzSwitch extends Mixins(mzTransparentWrapper) {
}
</script>

<style lang="scss">

@import '~element-ui/lib/theme-chalk/switch.css';

.mz-switch {
  .el-switch__label.is-active {
    color: var(--primary-color);
  }
}

</style>
