<template>
  <el-form-item class="mz-form-item"
                v-bind="attributes"
                v-on="listeners">

    <slot :name="slot"
          :slot="slot"
          v-for="(_, slot) of $slots" />
  </el-form-item>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import ElFormItem            from 'element-ui/lib/form-item.js';
import mzTransparentWrapper  from '@/components/transparent-component.mixin';

@Component({
  components: {
    ElFormItem,
  },
})
export default class mzFormItem extends Mixins(mzTransparentWrapper) {

}
</script>

<style lang="scss">

.mz-form-item {

  .el-form-item__content {
    line-height: 1rem;
  }

  .el-form-item__label {
    position: relative;

    &::before {
      position: absolute;
      right: - .5rem;
    }
  }
}
</style>
