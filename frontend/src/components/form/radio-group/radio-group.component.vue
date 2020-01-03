<template>
  <el-radio-group v-bind="attributes"
                  v-on="listeners">

    <slot :name="slot"
          :slot="slot"
          v-for="(_, slot) of $slots" />
  </el-radio-group>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import ElRadioGroup          from 'element-ui/lib/radio.js';
import mzTransparentWrapper  from '@/components/transparent-component.mixin';

@Component({
  components: {
    ElRadioGroup,
  },
})
export default class mzRadioGroup extends Mixins(mzTransparentWrapper) {
}
</script>


<style lang="scss"
       scoped>
@import '~element-ui/lib/theme-chalk/radio-group.css';

.el-radio__input {
  &.is-checked {
    .el-radio__inner {
      background: #3F55E2;
      border-color: #3F55E2;
    }
  }
}
</style>
