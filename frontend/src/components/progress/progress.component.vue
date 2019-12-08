<template>
  <el-progress class="mz-progress"
               :stroke-width="10"
               v-bind="attributes"
               v-on="listeners">
  </el-progress>
</template>

<script lang="ts">
import { Component, Mixins, Prop } from 'vue-property-decorator';
import mzTransparentWrapper        from '@/components/transparent-component.mixin';
import ElProgress                  from 'element-ui/lib/progress.js';

@Component({
  components: {
    ElProgress,
  },
})
export default class mzProgress extends Mixins(mzTransparentWrapper) {
}
</script>

<style lang="scss">

.mz-progress {
  display: flex;
  margin-bottom: 2rem;

  .el-progress-bar__inner {
    background-color: var(--primary-color);
  }
}

</style>
