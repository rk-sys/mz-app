<template>
  <div class="mz-product-detail-picture">
    <div class="mz-product-detail-picture__list">

      <div class="mz-product-detail-picture__list__item"
           v-for="(picture, index) in pictures"
           :key="index">

        <img :src="picture"
             alt="gallery"
             class="picture">

        <div class="layout"
             @click="changePreviewPicture(picture)">

          <span class="label">{{ $t(`product.show`) }}</span>
        </div>
      </div>
    </div>

    <div class="mz-product-detail-picture__wrapper">
      <img :src="previewPicture"
           alt="main-picture"
           class="preview-picture">
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class mzProductsDetailPicture extends Vue {
  @Prop(Array) public readonly pictures!: string[];
  public isHover: boolean = false;
  public previewPicture: string = this.pictures[ 0 ];

  public changePreviewPicture(picture: string): void {
    this.previewPicture = picture;
  }
}
</script>

<style lang="scss"
       scoped>
.mz-product-detail-picture {
  display: flex;
  margin-bottom: 4rem;

  &__list {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    &__item {
      position: relative;

      .picture {
        width: 9rem;
        height: 9rem;
        object-fit: cover;
        border-radius: 2px;

        &:hover {
          cursor: pointer;
        }
      }

      .layout {
        display: none;
        position: absolute;
        width: 9rem;
        height: 9rem;
        background: var(--black-60);
        cursor: pointer;
        top: 0;
        left: 0;
        align-items: center;

        .label {
          display: block;
          color: var(--white);
          text-align: center;
        }
      }

      .showLayout {
        display: flex;
      }

      &:hover {
        .layout {
          display: flex;
        }
      }
    }
  }

  &__wrapper {
    margin-left: 2rem;

    .preview-picture {
      width: 65rem;
      height: 50rem;
      object-fit: cover;
      border-radius: 2px;
    }
  }
}

@media only screen and (max-width: 768px) {
  .mz-product-detail-picture__wrapper {
    .preview-picture {
      width: 74rem;
      height: 50rem;
      object-fit: cover;
      border-radius: 2px;
    }
  }
}

@media only screen and (max-width: 425px) {
  .mz-product-detail-picture__wrapper {
    .preview-picture {
      width: 35rem;
      height: 50rem;
      object-fit: cover;
      border-radius: 2px;
    }
  }
}
</style>