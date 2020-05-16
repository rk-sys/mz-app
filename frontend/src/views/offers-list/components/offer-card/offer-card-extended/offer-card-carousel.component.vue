<template>
  <mz-carousel class="mz-offer-card-carousel"
               indicator-position="none"
               direction="vertical"
               height="20rem"
               ref="carousel"
               type="card"
               :autoplay="false">

    <el-carousel-item v-for="(src, index) in images"
                      :key="index">

      <img class="mz-offer-card-carousel__image"
           alt="offer-image"
           @click="emitImagePreview(index)"
           :src="src" />
    </el-carousel-item>
  </mz-carousel>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
import mzCarousel                     from '@/components/carousel/carousel.component.vue';
import ElCarouselItem                 from 'element-ui/lib/carousel-item.js';

@Component({
  components: {
    mzCarousel,
    ElCarouselItem,
  },
})
export default class mzOfferCardCarousel extends Vue {
  @Prop(Array) public images!: string[];

  @Emit('emitImagePreview')
  public emitImagePreview(index: number): number {
    return index;
  }
}
</script>

<style lang="scss">
@import '../../../../../../node_modules/element-ui/lib/theme-chalk/carousel-item.css';

.el-carousel__item {
  width: 100%;
}

</style>

<style lang="scss"
       scoped>

.mz-offer-card-carousel {
  margin: 2rem 0;
  width: 100%;

  &__image {
    width: 100%;
  }
}

@include respond-to(tablet) {
  .mz-offer-card-carousel {
    display: none;
  }
}

@include respond-to(mobile) {
  .mz-offer-card-carousel {
    display: none;
  }
}
</style>
