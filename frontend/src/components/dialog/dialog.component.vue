<template>
  <el-dialog classs="mz-dialog"
             v-bind="attributes"
             v-on="listeners">

    <slot :name="slot"
          :slot="slot"
          v-for="(_, slot) of $slots" />
  </el-dialog>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import mzTransparentWrapper  from '@/components/transparent-component.mixin';
import ElDialog              from 'element-ui/lib/dialog.js';

@Component({
  components: {
    ElDialog,
  },
})
export default class mzDialog extends Mixins(mzTransparentWrapper) {
}
</script>

<style lang="scss">
@import '~element-ui/lib/theme-chalk/dialog.css';

.el-dialog__body {
  padding: 0 3rem 3rem;
}
</style>
