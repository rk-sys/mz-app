<template>
  <el-dialog class="mz-dialog-upload-portfolio"
             v-bind="attributes"
             v-on="listeners">

    <slot :name="slot"
          :slot="slot"
          v-for="(_, slot) of $slots" />
  </el-dialog>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import mzTransparentWrapper  from '@/components/transparent-component.mixin';
import ElDialog              from 'element-ui/lib/dialog.js';

@Component({
  components: {
    ElDialog,
  },
})
export default class mzDialogUploadPortfolio extends Mixins(mzTransparentWrapper) {
}
</script>

<style lang="scss">
@import '~element-ui/lib/theme-chalk/dialog.css';

.mz-dialog-upload-portfolio {

  .el-dialog {
    width: 100rem;

    &__body {
      padding-top: 1rem !important;
      display: flex;
      align-items: center;
      min-height: 50rem;
    }
  }
}

@media only screen and (max-width: 768px) and (min-width: 426px) {
  .mz-dialog-upload-portfolio {

    .el-dialog {
      width: 85rem;
    }
  }
}

@media only screen and (max-width: 425px) {
  .mz-dialog-upload-portfolio {

    .el-dialog {
      width: 45rem;
      margin-top: 10vh !important;

      &__body {
        flex-direction: column;
      }

      &__upload-picture {
        width: 100%
      }

      &__content {
        width: 100%;
      }
    }
  }
}

</style>
