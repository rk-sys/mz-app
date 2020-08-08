<template>
  <div class="mz-offer-summary">
    <mz-box-with-title :title="$t(`itemSummary.title`)"
                       icon-name="icon-shop">

      <div class="mz-offer-summary__product">

        <div class="mz-offer-summary__product__type">
          <span class="mz-offer-summary__product__type__label">
            {{ $t(`listOfType.${newOffer.type}`) }}
          </span>
        </div>

        <div class="mz-offer-summary__product__title">
          {{newOffer.title}}
        </div>

        <div class="mz-offer-summary__product__price">

          <span class="mz-offer-summary__product__price__value">
          {{ $t(`itemDescription.form.price`) }} {{ newOffer.price }} {{ $t(`itemDescription.form.zl`) }}

            <span class="isFinalPrice"
                  v-if="newOffer.isFinalPrice">

              {{ $t(`itemDescription.form.notFinalPrice`) }}
            </span>
          </span>
        </div>

        <div class="mz-offer-summary__product__description">
          {{ newOffer.description }}
        </div>

        <div class="mz-offer-summary__product__tag-list">
          <mz-tag :is-presentation="true"
                  :key="index"
                  :tag="tag"
                  v-for="(tag, index) in newOffer.tags" />
        </div>

        <div class="mz-offer-summary__product__pictures">

          <img :src="newOffer.mainPicture.url"
               alt="main-picture"
               class="mz-offer-summary__product__pictures__main-picture"
               v-if="url === '' && newOffer.mainPicture.url">

          <div class="mz-offer-summary__product__pictures__main-picture--empty"
               v-else-if="url === '' && !newOffer.mainPicture.url">

            <div class="icon icon-empty"></div>
            <span class="text">{{ $t('itemSummary.mainPictureEmpty') }}</span>
          </div>

          <img :src="url"
               alt="big picture"
               class="mz-offer-summary__product__pictures__main-picture"
               v-else>

          <div class="mz-offer-summary__product__pictures__gallery">
            <div :key="index"
                 class="mz-offer-summary__product__pictures__gallery__picture-wrapper"
                 v-for="(picture, index) in newOffer.pictures">

              <img :class="{ 'mz-item-summary__gallery__small-picture--select':
                        picture.url === url || (picture.url === newOffer.mainPicture.url && !url) }"
                   :src="picture.url"
                   @click="previewPicture(picture.url)"
                   alt="small picture"
                   class="mz-offer-summary__product__pictures__gallery__small-picture">

              <span class="mz-offer-summary__product__pictures__gallery__main-picture-label"
                    v-if="picture.url === newOffer.mainPicture.url">

            {{ $t('itemSummary.mainPicture') }}
          </span>
            </div>
          </div>
        </div>
      </div>
    </mz-box-with-title>

    <div class="mz-offer-summary__buttons">
      <mz-button @click="goToStep3()"
                 class="button-previous">

        {{ $t(`button.goToPrevious`) }}
      </mz-button>

      <mz-button class="button-next">
        {{ $t(`button.post`)}}
      </mz-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue }          from 'vue-property-decorator';
import { namespace }               from 'vuex-class';
import { IAddNewOffer }            from '@/views/user-administration/user-administration-offer/add-offer/store/user-account-add-offer.interface';
import mzButton                    from '@/components/buttons/button.component.vue';
import mzBoxWithTitle              from '@/components/box-with-title/box-with-title.component.vue';
import mzTag                       from '@/components/tag/tag.component.vue';
import mzUserAccountAddOfferModule from '../store/user-account-add-offer.module';

const LOCAL_STORE: string = 'addOffer';
const local = namespace(LOCAL_STORE);

@Component({
  components: {
    mzTag,
    mzButton,
    mzBoxWithTitle,
  },
})
export default class mzUserAdministrationItemSummary extends Vue {
  @local.State((state: mzUserAccountAddOfferModule) => state.newOffer) public newOffer!: IAddNewOffer;
  @local.Action public goToStep3!: () => void;
  public url: string = '';

  public previewPicture(pictureUrl: string): void {
    this.url = pictureUrl;
  }
}
</script>

<style lang="scss"
       scoped>

.mz-offer-summary {
  margin-top: 6rem;
  position: relative;

  .box-with-title {
    margin-bottom: 3rem;
  }

  &__product {
    margin-top: 3.5rem;

    &__title {
      font-size: 2rem;
      position: relative;
      font-weight: var(--font-medium);
    }

    &__type {
      position: relative;

      &__label {
        opacity: .3;
        line-height: 1;
        font-size: 3rem;
        letter-spacing: .4rem;
        color: var(--primary-color);
        font-weight: var(--font-bold);
      }
    }

    &__price {
      margin-bottom: 4rem;

      &__value {
        color: var(--primary-color);
        font-weight: var(--font-medium);
        line-height: 1.8;
        font-size: 2.2rem;

        .isFinalPrice {
          font-size: 1.6rem;
          line-height: 1;
          color: var(--white);
          font-weight: var(--font-regular);
          background: var(--blue-50);
          padding: 0.2rem;
        }
      }
    }

    &__tag-list {
      display: flex;
      flex-wrap: wrap;
      margin: 3rem 0 3rem;
    }

    &__pictures {
      &__main-picture {
        width: auto;
        height: 45rem;
        padding: 3rem;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        margin: 0 auto;
        display: block;

        &--empty {
          width: 100%;
          height: 45rem;
          display: flex;
          justify-content: center;
          flex-direction: column;
          align-items: center;
          border: .2rem dashed var(--gray-500);
          border-radius: .2rem;

          .icon {
            width: 7rem;
            height: 7rem;
          }

          .text {
            font-weight: var(--font-medium);
            color: var(--gray-500);
            font-size: 2.2rem;
            margin-top: 2rem;
          }
        }
      }

      &__gallery {
        display: flex;
        justify-content: center;
        margin: 4rem 0 2rem;

        &__picture-wrapper {
          position: relative;
          margin-right: 2.1rem;

          &:last-child {
            margin-right: 0;
          }
        }

        &__small-picture {
          width: 12.5rem;
          height: 12.5rem;
          cursor: pointer;
          object-fit: cover;

          &:hover {
            transition: .2s;
            padding: .2rem;
            border: .2rem dashed var(--primary-color);
          }

          &--select {
            border: .2rem dashed var(--primary-color);
            padding: .2rem;
            border-radius: 2px;
          }
        }

        &__main-picture-label {
          color: var(--primary-color);
          width: max-content;
          position: absolute;
          top: -2.2rem;
          left: 50%;
          transform: translateX(-50%);
          font-size: 1.4rem;
          font-weight: var(--font-bold);
        }
      }
    }
  }

  &__buttons {
    margin-top: 7rem;
    margin-bottom: 7rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .button-next,
    .button-previous {
      width: auto;
    }

    .button-next {
      margin-right: 0;
      margin-left: auto;
    }
  }
}

@include respond-to(desktop) {
}

@include respond-to(tablet) {
  .mz-offer-summary {
    &__gallery {

      &__small-picture {
        width: 13.5rem;
        height: 13.5rem;
      }
    }
  }
}

@include respond-to(mobile) {
  .mz-offer-summary {
    &__product {
      &__pictures {

        &__main-picture {
          max-width: 100%;
        }

        &__gallery {
          flex-wrap: wrap;

          &__picture-wrapper {
            margin: 0 2rem 3rem 0;
          }

          &__small-picture {
            width: 13.5rem;
            height: 13.5rem;
          }
        }
      }
    }
  }
}

@media screen and (max-width: 560px) {
  .mz-offer-summary {
    &__condition {
      &__title {
        font-size: 2.2rem;
      }

      &__subtitle {
        font-size: 2.2rem;
      }
    }

    &__gallery {
      margin: 4rem 3.5rem 2rem;
      justify-content: space-between;

      &__small-picture {
        width: 13.5rem;
        height: 13.5rem;
      }
    }
  }
}

@media screen and (max-width: 425px) {
  .mz-offer-summary {
    &__tag-list {
      margin: 3rem 0;
    }

    &__condition {
      margin: 3rem 0;

      &__title {
        font-size: 2.2rem;
      }

      &__subtitle {
        font-size: 2.2rem;
      }
    }

    &__gallery {
      margin: 3rem 0 0 0;
      justify-content: space-evenly;
      flex-wrap: wrap;

      &__picture-wrapper {
        margin: 0 2rem 3rem 0;
      }
    }

    &__big-picture {
      padding: 0;
    }
  }
}
</style>
