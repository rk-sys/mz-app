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

<style lang="scss">

@import '~element-ui/lib/theme-chalk/dialog.css';

.mz-modal {
  .el-dialog {
    margin-top: 1rem !important;
    top: 50%;
    transform: translateY(-50%);
    position: relative;
    width: 70rem;

    &__header {
      position: absolute;
      top: 0;
      background: none;
      width: 100%;
    }

    &__title {
      display: none;
    }

    &__headerbtn {
      transform: translateY(-50%);
      right: -1.5rem;
      top: 0;
      z-index: 1;
    }

    &__close {
      background: var(--white);
      border-radius: 50%;
      font-size: 3.5rem;

      &:hover {
        color: var(--black);
      }
    }

    &__body {
      padding: 0;
      position: relative;
    }
  }
}

@media only screen and (max-width: 425px) {
  .mz-modal {
    .el-dialog {
      width: 46rem;
    }
  }
}
</style>
