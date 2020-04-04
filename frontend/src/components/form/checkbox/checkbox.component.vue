<template>
  <el-checkbox class="mz-checkbox"
               v-bind="attributes"
               v-on="listeners">

    <slot :name="slot"
          :slot="slot"
          v-for="(_, slot) of $slots" />
  </el-checkbox>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import ElCheckbox            from 'element-ui/lib/checkbox.js';
import mzTransparentWrapper  from '@/components/transparent-component.mixin';

@Component({
  components: {
    ElCheckbox,
  },
})
export default class mzCheckbox extends Mixins(mzTransparentWrapper) {

}
</script>


<style lang="scss">

@import '~element-ui/lib/theme-chalk/checkbox.css';

.mz-checkbox {
  .el-checkbox__label {
    font-size: 2rem;
  }
}

.el-checkbox {
  display: flex;
  white-space: initial;
  font-weight: var(--font-light);
  color: var(--black);
  margin: .5rem 0;

  &__input.is-checked + .el-checkbox__label,
  &__input.is-checked {
    color: var(--primary-color);
    font-weight: var(--font-light);

    .el-checkbox__inner {
      border-color: var(--primary-color);
      background: var(--primary-color);
    }
  }


  &__input.is-focus {
    .el-checkbox__inner {
      border-color: var(--primary-color);
    }
  }
}


</style>
