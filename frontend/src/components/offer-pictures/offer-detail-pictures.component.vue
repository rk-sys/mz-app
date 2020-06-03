<template>
  <div class="mz-offer-detail-picture">
    <div class="mz-offer-detail-picture__list">

      <div class="mz-offer-detail-picture__list__item"
           v-for="(picture, index) in pictures"
           :key="index">

        <img :src="picture"
             alt="gallery"
             class="picture">

        <div class="layout"
             @click="changePreviewPicture(picture)">

          <span class="label">{{ $t(`show`) }}</span>
        </div>
      </div>
    </div>

    <div class="mz-offer-detail-picture__wrapper">
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
export default class mzOfferDetailPicture extends Vue {
  @Prop(Array) public readonly pictures!: string[];
  public previewPicture: string = this.pictures[ 0 ];

  public changePreviewPicture(picture: string): void {
    this.previewPicture = picture;
  }
}
</script>

<style lang="scss"
       scoped>
.mz-offer-detail-picture {
  display: flex;
  margin-bottom: 4rem;
  flex-direction: column-reverse;

  &__list {
    display: flex;
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
    .preview-picture {
      width: 47rem;
      height: 45rem;
      object-fit: cover;
      border-radius: 2px;
    }
  }
}

@include respond-to(desktop) {
  .mz-offer-detail-picture__wrapper {
    .preview-picture {
      width: 100%;
    }
  }
}

@include respond-to(tablet) {
  .mz-offer-detail-picture__wrapper {
    .preview-picture {
      width: 100%;
    }
  }
}

@include respond-to(mobile) {
  .mz-offer-detail-picture__wrapper {
    .preview-picture {
      width: 100%;
    }
  }
}

@media only screen and (max-width: 425px) {
  .mz-offer-detail-picture__wrapper {
    .preview-picture {
      width: 45rem;
      height: 50rem;
      object-fit: cover;
      border-radius: 2px;
    }
  }
}
</style>