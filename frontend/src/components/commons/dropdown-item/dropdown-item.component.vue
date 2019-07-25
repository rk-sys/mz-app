<template>
  <el-dropdown-item class="mz-dropdown-item"
                    v-bind="attributes"
                    v-on="listeners">

    <slot :name="slot"
          :slot="slot"
          v-for="(_, slot) of $slots" />
  </el-dropdown-item>
</template>

<script lang="ts">
import mzTransparentWrapper   from 'src/components/transparent-component.mixin';
import { Component, Mixins } from 'vue-property-decorator';
import ElDropdownItem        from 'element-ui/lib/dropdown-item.js';

@Component({
  components: {
    ElDropdownItem,
  },
})

export default class mzDropdownItem extends Mixins(mzTransparentWrapper) {
}
</script>

<style lang="scss">
@import '~element-ui/lib/theme-chalk/dropdown-item.css';
</style>

<style lang="scss" scoped>
.el-dropdown-menu__item {
  &.mz-dropdown-item {
    line-height: 1.2;
    display: flex;

    &:hover {
      background: none;
      color: var(--secondary-color);
    }
  }
}
</style>
