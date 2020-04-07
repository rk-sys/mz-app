<template>
  <div class="mz-product-detail-craftsman">

    <div class="mz-product-detail-craftsman__content"
         @click="goToCraftsmanDetail(craftsman.id)">

      <div class="mz-product-detail-craftsman__content__layout">
        {{ $t(`craftsman.pictureHover`) }}
      </div>

      <img :src="craftsman.picture"
           :alt="craftsman.name"
           class="mz-product-detail-craftsman__content__picture">

      <h2 class="mz-product-detail-craftsman__content__name">{{ craftsman.name }}</h2>
    </div>

    <div class="mz-product-detail-craftsman__wrapper">
      <div class="mz-product-detail-craftsman__content__rate"
           v-for="item in craftsman.ratings">

      <span class="label">
        {{ $t(`craftsman.rate.${item.label}`) }}
      </span>

        <mz-rate v-model="item.value"
                 :is-reverse="true"
                 disabled />
      </div>
    </div>

    <div class="mz-product-detail-craftsman__social-media">
      <mz-social-media :facebook-url="craftsman.socialMedia.facebook"
                       :twitter-url="craftsman.socialMedia.twitter"
                       :youtube-url="craftsman.socialMedia.youtube"
                       :instagram-url="craftsman.socialMedia.instagram" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { ICraftsman }           from '@/views/product-detail/store/product-detail.interface';
import mzRate                   from '@/components/rate/rate.component.vue';
import mzSocialMedia            from '@/components/social-media/social-media.component.vue';
import router                   from '@/router';

@Component({
  components: {
    mzRate,
    mzSocialMedia,
  },
})
export default class mzProductsDetailCraftsman extends Vue {
  @Prop(Object) public readonly craftsman!: ICraftsman;

  public goToCraftsmanDetail(uuid: string): void {
    router.push({ name: 'Craftsmen detail', params: { uuid } });
  }
}
</script>

<style lang="scss"
       scoped>
.mz-product-detail-craftsman {
  grid-row-start: 2;
  grid-row-end: 2;
  grid-column-start: 2;
  padding: 3rem;
  background: var(--white);
  border: 1px solid var(--gray-400);
  height: 50rem;
  width: 32rem;

  &__content {
    display: flex;
    justify-content: center;
    flex-direction: column;
    position: relative;
    cursor: pointer;

    &__layout {
      position: absolute;
      width: 12.5rem;
      height: 12.5rem;
      border-radius: 50%;
      background: var(--black-60);
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      display: -webkit-box;
      display: -ms-flexbox;
      display: none;
      justify-content: center;
      align-items: center;
      color: var(--white);
      font-size: 1.8rem;
      text-align: center;
    }

    &__picture {
      width: 12.5rem;
      height: 12.5rem;
      border-radius: 50%;
      object-fit: cover;
      margin: 0 auto;
    }

    &__name {
      margin: 3rem 0;
      font-size: 2.6rem;
      font-weight: var(--font-medium);
      text-align: center;
    }

    &:hover {
      .mz-product-detail-craftsman__content__layout {
        display: flex;
      }

      .mz-product-detail-craftsman__content__name {
        color: var(--primary-color);
      }
    }

    &__rate {
      margin-bottom: 1rem;
      font-size: 1.6rem;
      font-weight: var(--font-medium);
      display: flex;
      justify-content: space-between;
    }
  }

  &__social-media {
    margin-top: 4rem;
    display: flex;
    justify-content: center;
  }
}

@media only screen and (max-width: 768px) and (min-width: 426px) {
  .mz-product-detail-craftsman {
    grid-row-start: 3;
    grid-row-end: 3;
    grid-column-start: 1;
    display: grid;
    grid-template-rows: auto auto;
    grid-template-columns: 1fr 2fr;
    height: 33rem;
    width: 100%;

    &__wrapper {
      grid-row-start: 1;
      grid-row-end: 3;
      grid-column-start: 2;
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin: 3rem;
    }

    &__content {
      grid-row-start: 1;
      grid-row-end: 2;
      grid-column-start: 1;

      &__name {
        margin: 3rem 0 0;
      }

      &__rate {
        margin: 1.5rem 0;
        display: flex;
        justify-content: space-between;

        .label {
          font-size: 2.2rem;
          font-weight: var(--font-medium);
        }
      }
    }

    &__social-media {
      margin: 0;
      grid-row-start: 2;
      grid-row-end: 2;
      grid-column-start: 1;
    }
  }
}

@media only screen and (max-width: 425px) {
  .mz-product-detail-craftsman {
    grid-row-start: 3;
    grid-row-end: 3;
    grid-column-start: 1;
    height: auto;
    width: 100%;

    &__wrapper {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin: 3rem;
    }

    &__content {
      &__name {
        margin: 3rem 0 0;
      }

      &__rate {
        margin: .5rem 0;
        display: flex;
        justify-content: space-between;
      }
    }

    &__social-media {
      margin: 0;
    }
  }
}
</style>