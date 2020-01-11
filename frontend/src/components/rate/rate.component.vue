<template>
  <el-rate class="mz-rate"
           v-bind="attributes"
           v-on="listeners">

    <slot :name="slot"
          :slot="slot"
          v-for="(_, slot) of $slots" />
  </el-rate>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import mzTransparentWrapper  from '@/components/transparent-component.mixin';
import ElRate                from 'element-ui/lib/rate.js';

@Component({
  components: {
    ElRate,
  },
})
export default class mzRate extends Mixins(mzTransparentWrapper) {
}
</script>
<style lang="scss">

.el-rate__item {
  .el-rate__icon {
    margin: 0;
    font-size: 2.6rem;
    font-weight: var(--font-bold);
  }
}

</style>
<style lang="scss"
       scoped>

@import '~element-ui/lib/theme-chalk/rate.css';
@import '~element-ui/lib/theme-chalk/icon.css';
</style>
