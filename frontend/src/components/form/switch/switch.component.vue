<template>
  <el-switch class="mz-switch"
             v-bind="attributes"
             v-on="listeners">

  </el-switch>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import mzTransparentWrapper   from 'src/components/transparent-component.mixin';
import ElSwitch              from 'element-ui/lib/switch.js';

@Component({
  components: {
    ElSwitch,
  },
})
export default class mzSwitch extends Mixins(mzTransparentWrapper) {
}
</script>
<style lang="scss"
       scoped>
@import '~element-ui/lib/theme-chalk/switch.css';

</style>
