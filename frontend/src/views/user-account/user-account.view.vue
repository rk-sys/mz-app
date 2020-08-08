<template>
  <div class="user-account">
    <div class="user-account__container">
      <mz-user-account-menu />

      <div @click="changeStateOfMobileMenu"
           class="user-account__container__mobile-btn">

        <div class="icon icon-hamburger"></div>
      </div>

      <div :class="{'show-background': !mobileMenu}"
           class="user-account__container__mobile-background"></div>
      <mz-user-account-menu-mobile />

      <transition mode="out-in" name="fade">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue }        from 'vue-property-decorator';
import { namespace }             from 'vuex-class';
import { Route }                 from 'vue-router';
import { registerStoreModule }   from '@/helpers/helpers';
import { loadTranslationsAsync } from '@/i18n/i18n';
import Store                     from '@/store/store';
import mzUserAccountMenuMobile   from '@/views/user-account/components/user-account-menu-mobile.component.vue';
import mzUserAccountMenu         from './components/user-account-menu.components.vue';
import mzUserAccountModule       from './store/user-account.module';

const LOCAL_STORE: string = 'userAccount';
const local = namespace(LOCAL_STORE);

@Component({
  components: {
    mzUserAccountMenu,
    mzUserAccountMenuMobile,
  },
})
export default class mzUserAccount extends Vue {
  @local.State((state: mzUserAccountModule) => state.mzMobileMenu) public mobileMenu!: boolean;
  @local.Mutation public changeStateOfMobileMenu!: () => void;

  private async beforeRouteEnter(to: Route, from: Route, next: any) {
    const lang: string = Store.state.global.defaultLang;

    try {
      await loadTranslationsAsync(lang, import(`./i18n/${lang}` as string));
      registerStoreModule(LOCAL_STORE.split('/'), mzUserAccountModule);
      await Store.dispatch(`${LOCAL_STORE}/getCurrentUserInfo`);
      next();
    } catch (e) {
      next(false);
      throw new Error(e);
    }
  }

  private destroyed() {
    Store.unregisterModule(LOCAL_STORE);
  }
}
</script>

<style lang="scss"
       scoped>

.fade-enter-active, .fade-leave-active {
  transition: opacity .25s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
{
  opacity: 0;
}

.user-account {
  min-height: 100vh;
  background: var(--background-color);
  height: 100%;
  display: grid;
  grid-template-rows: 6.4rem 7rem auto;
  grid-template-columns: 1fr 4fr 1fr;

  &__container {
    display: flex;
    grid-row-start: 3;
    grid-column-start: 2;
    justify-content: center;

    &__mobile-background {
      position: fixed;
      width: 100%;
      height: calc(100% + 6.4rem);
      background: var(--black);
      filter: opacity(.6);
      z-index: 4;
      top: -6.4rem;
      visibility: hidden;
      transition: visibility .5s;

      @media screen and (min-width: 769px) {
        display: none;
      }
    }

    .show-background {
      visibility: visible;

      @media screen and (min-width: 769px) {
        display: none;
      }
    }

    &__mobile-btn {
      display: none;
      position: fixed;
      left: 0;
      border-top-right-radius: 2px;
      border-bottom-right-radius: 2px;
      width: 5rem;
      height: 4.5rem;
      background: var(--primary-color);
      transition: .2s;
      z-index: 3;
      top: 20.5rem;

      &:hover {
        box-shadow: 0 0 1rem 0 var(--gray-450);
        background: var(--primary-color-80);
        cursor: pointer;
        transition: .2s;
      }

      .icon {
        width: 2.4rem;
        height: 4.5rem;
      }

      @include respond-to(tablet) {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }

  @include respond-to(tablet) {
    grid-template-rows: 0 0 auto;
  }
}
</style>
