<template>
  <div class="mz-upload-pictures">
    <mz-box-with-title :title="$t(`uploadPicture.title`)"
                       :sub-title="lengthOfPicture() + $t('uploadPicture.of5')"
                       :add-color="true">

      <div class="mz-upload-pictures__container">
        <input class="mz-upload-pictures__container__input-upload"
               type="file"
               @change="onFileChange"
               ref="pictureUpload" />

        <div class="upload-wrapper"
             v-for="(item, index) in newItem.pictures">

          <template v-if="item.url">
            <div class="overlay-picture"
                 @click="changeMainPicture(index)">
              {{ $t(`uploadPicture.setMainPicture`) }}
            </div>

            <img :src="item.url"
                 class="upload-wrapper__picture"
                 :alt="item.url" />

            <div class="upload-wrapper__remove-picture"
                 @click="removePicture(index)">x
            </div>

          </template>
        </div>

        <template v-if="newItem.pictures.length < 5">
          <div class="upload-wrapper__action"
               @click="$refs.pictureUpload.click()">

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

        <img v-if="newItem.mainPicture.url !== ''"
             :src="newItem.mainPicture.url"
             alt="mainPicture"
             class="picture">

        <div v-else class="mz-upload-pictures__main-picture__empty">
          <div class="icon icon-empty">
          </div>
          <span class="text">

              {{ $t(`uploadPicture.noPicture`) }}
          </span>
        </div>
      </div>
    </mz-box-with-title>

    <div class="mz-upload-pictures__buttons">
      <mz-button class="button-previous"
                 @click="goToStep2()">

        {{ $t(`button.goToPrevious`) }}
      </mz-button>

      <mz-button class="button-next"
                 @click="goToStep4()">

        {{ $t(`button.goNextStep`) }}
      </mz-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue }  from 'vue-property-decorator';
import { namespace }       from 'vuex-class';
import { i18n }            from '@/i18n/i18n';
import Notification        from '@/components/notification/notifications';
import mzAddItemModule     from '@/views/user-account/user-account-add-item/store/user-account-add-item.module';
import mzBoxWithTitle      from '@/components/box-with-title/box-with-title.component.vue';
import { IAddItemNewItem } from '@/views/user-account/user-account-add-item/store/user-account-add-item.interface';
import mzButton            from '@/components/buttons/button.component.vue';

const LOCAL_STORE = 'addItem';
const local = namespace(LOCAL_STORE);

@Component({
  components: {
    mzBoxWithTitle,
    mzButton,
  },
})
export default class mzUploadPictures extends Vue {
  @local.State((state: mzAddItemModule) => state.newItem) public newItem!: IAddItemNewItem;
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
    return this.newItem.pictures.length;
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
    height: 12.5rem;

    &__input-upload {
      display: none;
    }

    .upload-wrapper {
      width: 12.5rem;
      height: 12.5rem;
      margin-right: 1.1rem;
      position: relative;

      &__action {
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border: 2px dashed var(--primary-color);
        border-radius: .2rem;
        cursor: pointer;

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
      width: 14.5rem;
    }

    .button-next {
      margin-right: 0;
      margin-left: auto;
    }
  }
}
</style>
