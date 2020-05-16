<template>
  <mz-dialog :visible.sync="imagePreviewVisible"
             :before-close="beforePreviewClose"
             :close-on-click-modal="true"
             class="mz-offers-list-image-preview">

    <mz-carousel :initial-index="previewImageIndex"
                 :autoplay="false"
                 arrow="hover">

      <el-carousel-item v-for="(src, index) in activeCardGallery"
                        :key="index">

        <img :src="src"
             alt="preview image"
             class="mz-offers-list-image-preview__image">

      </el-carousel-item>
    </mz-carousel>

  </mz-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import mzDialog                 from '@/components/dialog/dialog.component.vue';
import mzCarousel               from '@/components/carousel/carousel.component.vue';
import ElCarouselItem           from 'element-ui/lib/carousel-item.js';

@Component({
  components: {
    mzDialog,
    mzCarousel,
    ElCarouselItem,
  },
})
export default class mzOffersListImagePreview extends Vue {
  @Prop(Boolean) public imagePreviewVisible!: boolean;
  @Prop(Function) public beforePreviewClose!: () => void;
  @Prop(Array) public activeCardGallery!: string[];
  @Prop(Number) public previewImageIndex!: number;
}
</script>

<style lang="scss">
@import '../../../../node_modules/element-ui/lib/theme-chalk/carousel-item.css';

.mz-offers-list-image-preview {

  .el-dialog {
    height: 70rem;
    width: 110rem;
  }

  .el-dialog__header {
    display: none;
  }

  .el-dialog__body {
    padding: 0;
    height: 65rem;
  }

  .el-carousel__container {
    height: 70rem;
  }

  &__image {
    height: 100%;
    width: 100%;
  }
}

</style>
