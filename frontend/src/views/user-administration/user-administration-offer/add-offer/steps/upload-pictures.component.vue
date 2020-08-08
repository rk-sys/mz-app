<template>
  <div class="mz-upload-pictures">
    <mz-box-with-title :add-color="true"
                       :sub-title="lengthOfPicture() + $t('uploadPicture.of5')"
                       :title="$t(`uploadPicture.title`)"
                       icon-name="icon-camera">

      <div class="mz-upload-pictures__container">
        <input @change="onFileChange"
               class="mz-upload-pictures__container__input-upload"
               ref="pictureUpload"
               type="file" />

        <div class="upload-wrapper"
             v-for="(item, index) in newOffer.pictures">

          <template v-if="item.url">
            <div @click="changeMainPicture(index)"
                 class="overlay-picture">
              {{ $t(`uploadPicture.setMainPicture`) }}
            </div>

            <img :alt="item.url"
                 :src="item.url"
                 class="upload-wrapper__picture" />

            <div @click="removePicture(index)"
                 class="upload-wrapper__remove-picture">x
            </div>

          </template>
        </div>

        <template v-if="newOffer.pictures.length < 5">
          <div @click="$refs.pictureUpload.click()"
               class="upload-wrapper__action">

            <div class="icon icon-upload"></div>
            <span class="text">
              {{ $t(`uploadPicture.uploadPicture`) }}
            </span>
          </div>
        </template>
      </div>

      <div class="mz-upload-pictures__main-picture">
        <span class="label">

              {{ $t(`uploadPicture.mainPicture`) }}
        </span>

        <img :src="newOffer.mainPicture.url"
             alt="mainPicture"
             class="picture"
             v-if="newOffer.mainPicture.url !== ''">

        <div class="mz-upload-pictures__main-picture__empty" v-else>
          <div class="icon icon-empty">
          </div>
          <span class="text">

              {{ $t(`uploadPicture.noPicture`) }}
          </span>
        </div>
      </div>
    </mz-box-with-title>

    <div class="mz-upload-pictures__buttons">
      <mz-button @click="goToStep2()"
                 class="button-previous">

        {{ $t(`button.goToPrevious`) }}
      </mz-button>

      <mz-button @click="goToStep4()"
                 class="button-next">

        {{ $t(`button.goNextStep`) }}
      </mz-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue }          from 'vue-property-decorator';
import { namespace }               from 'vuex-class';
import { i18n }                    from '@/i18n/i18n';
import Notification                from '@/components/notification/notifications';
import mzBoxWithTitle              from '@/components/box-with-title/box-with-title.component.vue';
import mzButton                    from '@/components/buttons/button.component.vue';
import mzUserAccountAddOfferModule from '../store/user-account-add-offer.module';
import { IAddNewOffer }            from '@/views/user-administration/user-administration-offer/add-offer/store/user-account-add-offer.interface';

const LOCAL_STORE: string = 'addOffer';
const local = namespace(LOCAL_STORE);

@Component({
  components: {
    mzBoxWithTitle,
    mzButton,
  },
})
export default class mzUserAdministrationUploadPictures extends Vue {
  @local.State((state: mzUserAccountAddOfferModule) => state.newOffer) public newOffer!: IAddNewOffer;
  @local.Mutation public uploadPicture!: (payload: any) => void;
  @local.Mutation public changeMainPicture!: (payload: number) => void;
  @local.Mutation public removePicture!: (payload: number) => void;
  @local.Action public goToStep2!: () => void;
  @local.Action public goToStep4!: () => void;

  public beforeAvatarUpload(file: any): boolean {
    const isJPG = file.type === 'image/jpeg';
    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isJPG) {
      Notification.errorNotification(i18n.t(`notification.error`) as string, i18n.t(`notification.mustBeJPG`) as string);
    }
    if (!isLt2M) {
      Notification.errorNotification(i18n.t(`notification.error`) as string, i18n.t(`notification.toLarge`) as string);
    }
    return isJPG && isLt2M;
  }

  public lengthOfPicture(): number {
    return this.newOffer.pictures.length;
  }

  public onFileChange(file: any): void {
    const blobFile = new Blob([ file.target.files[ 0 ] ], { type: file.target.files [ 0 ].type });
    this.uploadPicture(blobFile);
  }
}
</script>

<style lang="scss"
       scoped>

.mz-upload-pictures {
  margin-top: 6rem;

  &__container {
    margin: 3.5rem 2rem 0 2rem;
    display: flex;
    justify-content: center;
    height: auto;

    &__input-upload {
      display: none;
    }

    .upload-wrapper {
      width: 12.5rem;
      height: 12.5rem;
      margin-right: 1.1rem;
      position: relative;

      &__action {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border: 2px dashed var(--primary-color);
        border-radius: .2rem;
        cursor: pointer;
        width: 12.5rem;
        height: 12.5rem;

        .icon {
          padding: 0 1rem;
          width: 5rem;
          height: 5rem;
        }

        .text {
          padding: 0 1rem;
          font-size: 1.4rem;
          font-weight: var(--font-medium);
          color: var(--primary-color);
        }

        &:hover {
          background-color: var(--primary-color);

          .text {
            color: var(--white);
          }
        }
      }

      &__picture {
        width: 12.5rem;
        height: 12.5rem;
        object-fit: cover;
        border-radius: .2rem;
        border: 2px dashed var(--primary-color);
      }

      &__remove-picture {
        position: absolute;
        width: 100%;
        height: 0;
        background: var(--error);
        bottom: .2rem;
        transition: .3s ease;
        color: var(--white);
        text-align: center;
        font-size: 1.8rem;
        font-weight: var(--font-medium);
        cursor: pointer;
        border-bottom-left-radius: .2rem;
        border-bottom-right-radius: .2rem;
      }

      &:hover .upload-wrapper__remove-picture {
        bottom: -2.2rem;
        transition: .5s ease;
        display: block;
        height: 2.4rem;
      }

      .overlay-picture {
        border-top-left-radius: .2rem;
        border-top-right-radius: .2rem;
        cursor: pointer;
        position: absolute;
        width: 100%;
        height: 100%;
        background: var(--black-80);
        color: var(--white);
        font-size: 1.4rem;
        font-weight: var(--font-bold);
        display: none;
        align-items: center;
        text-align: center;
      }

      &:hover .overlay-picture {
        transition: .5s ease;
        display: flex;
      }
    }
  }

  &__main-picture {
    width: 34rem;
    height: 34rem;
    margin: 7rem auto;
    border: 2px dashed var(--gray-500);
    position: relative;
    display: flex;

    .label {
      position: absolute;
      top: -3rem;
      left: 50%;
      transform: translateX(-50%);
      color: var(--primary-color);
      font-weight: var(--font-medium);
    }

    .picture {
      height: 100%;
      object-fit: cover;
      width: 100%;
    }

    &__empty {
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      width: 100%;

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

@media screen and (max-width: 768px) {
  .mz-upload-pictures {
    &__container {
      font-size: 2.2rem;

      .upload-wrapper {
        width: 14.5rem;
        height: 14.5rem;

        &__action {
          width: 14.5rem;
          height: 14.5rem;
        }

        &__picture {
          width: 14.5rem;
          height: 14.5rem;
        }

        .overlay-picture {
          font-size: 1.6rem;
        }
      }
    }

    &__main-picture {
      width: 45rem;
      height: 45rem;

      .label {
        width: 20rem;
        text-align: center;
        font-size: 2.2rem;
        top: -4rem;
      }
    }
  }
}

@media screen and (max-width: 425px) {
  .mz-upload-pictures {
    &__container {
      flex-wrap: wrap;
      margin: 2rem 0 0 0;
      justify-content: space-evenly;

      .upload-wrapper {
        margin: 0 0 3rem 0;
      }
    }

    &__main-picture {
      width: 39rem;
      height: 39rem;

      .label {
        width: 20rem;
        text-align: center;
        font-size: 2.2rem;
        top: -4rem;
      }
    }
  }
}

</style>
