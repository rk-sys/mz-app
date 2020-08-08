<template>
  <div class="user-account-menu">
    <div class="user-account-menu__info">

      <mz-upload :before-upload='beforeAvatarUpload'
                 :http-request='uploadPicture'
                 :on-success='handleAvatarSuccess'
                 :show-file-list='false'
                 action=''
                 class="user-account-menu__info__wrapper"
                 height='17.5rem'
                 width='17.5rem'>


        <transition name="fade">
          <span class="label"
                v-if="showLabel">{{$t(`picture.label`)}}</span>
        </transition>

        <img :class="{'picture--blur': showLabel}"
             @mouseenter="showLabel = true"
             alt="user_2_picture"
             class="picture"
             src="@/assets/img/user.png"
             v-if="userInfo.photoURL === null" />

        <img :class="{'picture--blur': showLabel}"
             :src="userInfo.photoURL"
             @mouseenter="showLabel = true"
             alt="user_picture"
             class="picture"
             v-else />

        <div class="picture--dark"
             v-show="showLabel"></div>

        <div @mouseleave="showLabel = false"
             class="picture--light"
             v-show="showLabel"></div>
      </mz-upload>

      <span class="user-account-menu__info__display-name">
        {{ userInfo.displayName }}
      </span>
    </div>

    <div class="user-account-menu__list">
      <div :key="link.label"
           class="user-account-menu__list__wrapper"
           v-for="link in menuLinks">

        <router-link :to="{name: link.nameUrl}"
                     class="user-account-menu__list__link">

          {{ $t(`links.${link.label}`) }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue }  from 'vue-property-decorator';
import { namespace }       from 'vuex-class';
import mzUserAccountModule from '../store/user-account.module';
import mzUpload            from '@/components/upload/upload.component.vue';
import Notification        from '@/components/notification/notifications';
import { i18n }            from '@/i18n/i18n';

const LOCAL_STORE: string = 'userAccount';
const local = namespace(LOCAL_STORE);

@Component({
  components: {
    mzUpload,
  },
})
export default class mzUserAccountMenu extends Vue {
  @local.State((state: mzUserAccountModule) => state.mzUserAccountMenuState.userInfo) public userInfo!: string;
  @local.State((state: mzUserAccountModule) => state.mzUserAccountMenuState.links) public menuLinks!: string;
  @local.Action public changeUserPicture!: (file: any) => void;

  public showLabel: boolean = false;

  public beforeAvatarUpload(file: any) {
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

  public handleAvatarSuccess(res: any, file: any) {
    Notification.successNotification(i18n.t(`notification.success`) as string, i18n.t(`notification.pictureWasChange`) as string);
  }

  public uploadPicture(file: any) {
    this.changeUserPicture(file);
  }
}
</script>

<style lang="scss"
       scoped>
.fade-enter-active {
  transition: opacity .5s;
}

.fade-enter /* .fade-leave-active below version 2.1.8 */
{
  opacity: 0;
}

.user-account-menu {
  width: 19rem;

  &__info {
    display: flex;
    flex-direction: column;;

    &__wrapper {
      position: relative;

      .picture {
        width: 17.5rem;
        height: 17.5rem;
        border-radius: 50%;
        z-index: 0;
        object-fit: cover;

        &--dark {
          width: 100%;
          height: 100%;
          background: var(--black);
          opacity: .5;
          position: absolute;
          border-radius: 50%;
        }

        &--light {
          width: 100%;
          height: 100%;
          background: var(--transparent);
          opacity: .5;
          position: absolute;
          border-radius: 50%;
          z-index: 2;
        }
      }

      .label {
        user-select: none;
        z-index: 1;
        color: var(--white);
        font-weight: var(--font-medium);
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }

    &__display-name {
      margin-top: 1rem;
      font-size: 2.2rem;
      font-weight: var(--font-medium);
      color: var(--black);
      text-align: center;
      margin-bottom: 7rem;
    }
  }

  &__list {
    .router-link-active {
      color: var(--primary-color);
      font-weight: var(--font-bold);
      border-bottom: 2px solid var(--primary-color);
    }

    &__link {
      font-size: 1.8rem;
      color: var(--gray-950);
      text-decoration: none;
      margin-bottom: 2rem;
      font-weight: var(--font-medium);
      display: inline-block;
      padding: .5rem 0;
      border-bottom: 2px solid var(--transparent);
      position: relative;

      &::before {
        content: "";
        left: 0;
        bottom: -.2rem;
        width: 100%;
        position: absolute;
        transform: scaleX(0);
        transition: transform .3s ease-in-out;
        transform-origin: left;
        border-bottom: 2px solid var(--primary-color);
      }

      &:hover {
        color: var(--primary-color);

        &::before {
          transition: transform .3s ease-in-out;
          transform: scaleX(1);
        }
      }
    }
  }

  @media screen and (max-width: 768px) {
    display: none;
  }
}
</style>
