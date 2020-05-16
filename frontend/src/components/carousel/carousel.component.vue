<template>
  <el-carousel class="mz-carousel"
               v-bind="attributes"
               v-on="listeners">

    <slot :name="slot"
          :slot="slot"
          v-for="(_, slot) of $slots" />
  </el-carousel>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import ElCarousel            from 'element-ui/lib/carousel.js';
import mzTransparentWrapper  from '@/components/transparent-component.mixin';

@Component({
  components: {
    ElCarousel,
  },
})
export default class mzCarousel extends Mixins(mzTransparentWrapper) {
}
</script>

<style lang="scss">
@import '~element-ui/lib/theme-chalk/carousel.css';
</style>
