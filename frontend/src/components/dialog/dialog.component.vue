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
import { Component, Mixins, Prop } from 'vue-property-decorator';
import mzTransparentWrapper        from '@/components/transparent-component.mixin';
import ElDialog                    from 'element-ui/lib/dialog.js';

@Component({
  components: {
    ElDialog,
  },
})
export default class mzDialog extends Mixins(mzTransparentWrapper) {
}
</script>

<style lang="scss">

.el-dialog {
  width: 100rem !important;

  &__body {
    padding-top: 1rem !important;
    display: flex;
    min-height: 50rem;
  }
}

</style>
<style lang="scss"
       scoped>

@import url("//unpkg.com/element-ui@2.13.0/lib/theme-chalk/index.css");

</style>
