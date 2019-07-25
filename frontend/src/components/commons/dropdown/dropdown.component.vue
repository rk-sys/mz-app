<template>
  <el-dropdown class="mz-dropdown"
               v-bind="attributes"
               v-on="listeners">

    <slot :name="slot"
          :slot="slot"
          v-for="(_, slot) of $slots" />
  </el-dropdown>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import ElDropdown            from 'element-ui/lib/dropdown.js';
import mzTransparentWrapper   from 'src/components/transparent-component.mixin';

@Component({
  components: {
    ElDropdown,
  },
})
export default class mzDropdown extends Mixins(mzTransparentWrapper) {
}
</script>

<style lang="scss">
@import '~element-ui/lib/theme-chalk/dropdown.css';

.mz-dropdown {
  .el-dropdown-selfdefine {
    outline: none;
  }
}

</style>
