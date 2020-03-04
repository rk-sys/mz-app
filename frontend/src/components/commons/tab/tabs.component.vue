<template>
  <el-tabs class="mz-tabs"
           v-bind="attributes"
           v-on="listeners">

    <slot :name="slot"
          :slot="slot"
          v-for="(_, slot) of $slots" />
  </el-tabs>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import mzTransparentWrapper  from '@/components/transparent-component.mixin';
import ElTabs                from 'element-ui/lib/tabs.js';

@Component({
  components: {
    ElTabs,
  },
})
export default class mzTabs extends Mixins(mzTransparentWrapper) {
}
</script>

<style lang="scss" scoped>
@import '~element-ui/lib/theme-chalk/tabs.css';
</style>


<style lang="scss">
.el-tabs__active-bar {
  background: var(--primary-color);
}

.el-tabs__item {
  &:hover {
    color: var(--primary-color);
  }
  &.is-active {
    color: var(--primary-color);
  }
}
</style>
