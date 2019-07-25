<template>
  <el-radio class="mz-radio"
            v-bind="attributes"
            v-on="listeners">

    <slot :name="slot"
          :slot="slot"
          v-for="(_, slot) of $slots" />
  </el-radio>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import ElRadio               from 'element-ui/lib/radio.js';
import mzTransparentWrapper   from '@/components/transparent-component.mixin';

@Component({
  components: {
    ElRadio,
  },
})
export default class mzRadio extends Mixins(mzTransparentWrapper) {
}
</script>

<style lang="scss" scoped>
@import '~element-ui/lib/theme-chalk/radio.css';
</style>
