<template>
  <el-dropdown-menu class="mz-dropdown-menu"
                    v-bind="attributes"
                    v-on="listeners">

    <slot :name="slot"
          :slot="slot"
          v-for="(_, slot) of $slots" />
  </el-dropdown-menu>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import ElDropdownMenu        from 'element-ui/lib/dropdown-menu.js';
import mzTransparentWrapper   from '../../transparent-component.mixin';

@Component({
  components: {
    ElDropdownMenu,
  },
})

export default class mzDropdownMenu extends Mixins(mzTransparentWrapper) {
}
</script>

<style lang="scss">
@import '~element-ui/lib/theme-chalk/dropdown-menu.css';
</style>
