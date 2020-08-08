<template>
  <div :class="{'show-menu' : mobileMenu}"
       class="user-account-menu-mobile">

    <div @click="changeStateOfMobileMenu"
         class="user-account-menu-mobile__cross icon-close--black"></div>
    <div class="user-info">

      <mz-upload :before-upload='beforeAvatarUpload'
                 :http-request='uploadPicture'
                 :on-success='handleAvatarSuccess'
                 :show-file-list='false'
                 action=''
                 class="user-info__wrapper"
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

      <span class="user-info__display-name">
        {{ userInfo.displayName }}
      </span>
    </div>

    <div class="menu-links">
      <div :key="link.label"
           @click="changeStateOfMobileMenu"
           class="menu-links__wrapper"
           v-for="link in menuLinks">

        <router-link :to="{name: link.nameUrl}"
                     class="menu-links__wrapper__link">

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
export default class mzUserAccountMenuMobile extends Vue {
  @local.State((state: mzUserAccountModule) => state.mzUserAccountMenuState.userInfo) public userInfo!: string;
  @local.State((state: mzUserAccountModule) => state.mzUserAccountMenuState.links) public menuLinks!: string;
  @local.State((state: mzUserAccountModule) => state.mzMobileMenu) public mobileMenu!: boolean;
  @local.Action public changeUserPicture!: (file: any) => void;
  @local.Mutation public changeStateOfMobileMenu!: () => void;

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

.user-account-menu-mobile {
  background: var(--white);
  min-height: 100vh;
  height: 100%;
  width: 40rem;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 4;
  transition: .5s ease-in-out;

  &__cross {
    top: 2rem;
    position: absolute;
    right: 2.5rem;
    width: 2rem;
    height: 2rem;
    cursor: pointer
  }

  .user-info {
    margin-top: 10rem;
    position: relative;

    &__wrapper {
      position: relative;
      margin: 0 auto;

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
        font-size: 2rem;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }

    &__display-name {
      margin-top: 3rem;
      font-size: 3.4rem;
      font-weight: var(--font-medium);
      color: var(--black);
      text-align: center;
      margin-bottom: 7rem;
      display: block;
    }
  }

  .menu-links {
    width: auto;

    .router-link-active {
      color: var(--primary-color);

      &:hover {
        color: var(--white);
      }
    }

    &__wrapper__link {
      font-size: 2.4rem;
      color: var(--black);
      text-decoration: none;
      font-weight: var(--font-medium);
      display: inline-block;
      width: 100%;
      padding: 1rem 5rem;
      border-bottom: 2px solid var(--transparent);
      position: relative;

      &:hover {
        background: var(--primary-color);
        color: var(--white);
      }
    }
  }
}

.show-menu {
  left: -40rem;
  transition: .5s ease-in-out;
}

@media screen and (min-width: 769px) {
  .user-account-menu-mobile {
    display: none;
  }
}

@media screen and (max-width: 650px) and (min-width: 426px) {
  .user-account-menu-mobile {
    width: 45rem;

    .menu-links {
      &__wrapper__link {
        font-size: 2.8rem;
      }
    }
  }

  .show-menu {
    left: -45rem;
  }
}


@include respond-to(mobile) {
  .user-account-menu-mobile {
    width: 40rem;

    .menu-links {
      &__wrapper__link {
        font-size: 2.2rem;
      }
    }

    .user-info {
      &__display-name {
        font-size: 2.8rem;
        margin-bottom: 5rem;
      }
    }
  }

  .show-menu {
    left: -43rem;
  }
}
</style>
