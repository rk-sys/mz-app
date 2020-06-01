<template>
  <el-badge class="mz-tooltip"
            v-bind="attributes"
            v-on="listeners">

    <slot :name="slot"
          :slot="slot"
          v-for="(_, slot) of $slots" />
  </el-badge>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import ElBadge               from 'element-ui/lib/badge.js';
import mzTransparentWrapper  from '@/components/transparent-component.mixin';

@Component({
  components: {
    ElBadge,
  },
})
export default class mzBadge extends Mixins(mzTransparentWrapper) {

}
</script>

<style lang="scss"
       scoped>

@import '~element-ui/lib/theme-chalk/badge.css';

</style>
