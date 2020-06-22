<template>
  <el-tooltip class="mz-tooltip"
              v-bind="attributes"
              v-on="listeners">

    <slot :name="slot"
          :slot="slot"
          v-for="(_, slot) of $slots" />
  </el-tooltip>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import ElTooltip             from 'element-ui/lib/tooltip.js';
import mzTransparentWrapper  from '@/components/transparent-component.mixin';

@Component({
  components: {
    ElTooltip,
  },
})
export default class mzTooltip extends Mixins(mzTransparentWrapper) {

}
</script>

<style lang="scss"
       scoped>

@import '~element-ui/lib/theme-chalk/tooltip.css';

</style>
