<template>
  <el-tab-pane class="mz-tab-pane"
               v-bind="attributes"
               v-on="listeners">

    <slot :name="slot"
          :slot="slot"
          v-for="(_, slot) of $slots" />
  </el-tab-pane>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import mzTransparentWrapper  from '@/components/transparent-component.mixin';
import ElTabPane             from 'element-ui/lib/tab-pane.js';

@Component({
  components: {
    ElTabPane,
  },
})
export default class mzTabPane extends Mixins(mzTransparentWrapper) {

}
</script>

<style lang="scss" scoped>
@import '~element-ui/lib/theme-chalk/tab-pane.css';
</style>
