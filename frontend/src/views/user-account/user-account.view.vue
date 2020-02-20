<template>
  <div class="user-account">
    <div class="user-account__container">
      <mz-user-account-menu />

      <div class="user-account__container__mobile-btn"
           @click="changeStateOfMobileMenu">

        <div class="icon icon-arrow--white"></div>
      </div>

      <div class="user-account__container__mobile-background"
           :class="{'show-background': !mobileMenu}"></div>
      <mz-user-account-menu-mobile />

      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue }        from 'vue-property-decorator';
import { registerStoreModule }   from '@/helpers/helpers';
import { namespace }             from 'vuex-class';
import { loadTranslationsAsync } from '@/i18n/i18n';
import Store                     from '@/store/store';
import { Route }                 from 'vue-router';
import mzUserAccountMenu         from './components/user-account-menu.components.vue';
import mzUserAccountMenuMobile   from '@/views/user-account/components/user-account-menu-mobile.component.vue';
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
      width: 2.4rem;
      height: 4.5rem;
      background: var(--primary-color);
      transition: .2s;
      z-index: 3;

      &:hover {
        width: 3.2rem;
        cursor: pointer;
        transition: .2s;
      }

      .icon {
        width: 2.4rem;
        height: 4.5rem;
      }

      @media screen and (max-width: 768px) {
        display: flex;
        justify-content: flex-end;
      }
    }
  }

  @media screen and (max-width: 768px) {
    grid-template-rows: 0 0 auto;
  }
}
</style>
