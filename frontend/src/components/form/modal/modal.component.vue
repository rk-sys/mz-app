<template>
  <el-dialog class="mz-modal"
             v-bind="attributes"
             v-on="listeners">

    <slot :name="slot"
          :slot="slot"
          v-for="(_, slot) of $slots" />

  </el-dialog>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import ElDialog              from 'element-ui/lib/dialog.js';
import mzTransparentWrapper  from '@/components/transparent-component.mixin';

@Component({
  components: {
    ElDialog,
  },
})

export default class mzModal extends Mixins(mzTransparentWrapper) {
  get attributes() {
    const { ...attrs } = (this as any).$attrs;

    return {
      closeOnClickModal: false,
      ...attrs,
    };
  }
}
</script>

<style lang="scss"
       scoped>

@import '~element-ui/lib/theme-chalk/dialog.css';

.mz-modal {
  /deep/ {
    .el-dialog {
      top: 50%;
      transform: translateY(-50%);

      &__header {
        position: relative;
        padding: 1.5rem;
        background-color: var(--gray-200);
      }

      &__title {
        @extend %heading-4;
        color: var(--black);
      }

      &__headerbtn {
        top: 50%;
        transform: translateY(-50%);
      }

      &__close {
        font-size: var(--font-size-18);

        &:hover {
          color: var(--secondary-color);
        }
      }

      &__body {
        padding: 3rem 5rem;
      }
    }
  }
}

</style>
