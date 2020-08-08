<template>
  <div class="mz-user-administration">
    <div class="mz-user-administration__wrapper">
      <div class="mz-user-administration__wrapper__menu">
        <mz-user-administration-menu />
      </div>

      <div @click="setOpenMenu(true)"
           class="mz-user-administration__wrapper__mobile-btn">

        <div class="icon icon-hamburger"></div>
      </div>

      <div :class="{'show-background': isOpen}"
           class="mz-user-administration__wrapper__mobile-background"></div>

      <div class="mz-user-administration__wrapper__menu-mobile">

        <mz-user-administration-menu-mobile :class="{'show-menu' : !isOpen}" />
      </div>


      <div class="mz-user-administration__wrapper__container">
        <transition mode="out-in" name="fade">
          <router-view />
        </transition>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue }             from 'vue-property-decorator';
import { Route }                      from 'vue-router';
import { loadTranslationsAsync }      from '@/i18n/i18n';
import Store                          from '@/store/store';
import mzUserAdministrationModule     from './store/user-administration.module';
import mzUserAdministrationMenu       from './components/user-administration-menu.component.vue';
import mzUserAdministrationMenuMobile from './components/user-administration-menu-mobile.component.vue';
import { namespace }                  from 'vuex-class';
import { registerStoreModule }        from '@/helpers/helpers';
import { IMenuAdministration }        from '@/views/user-administration/store/user-administration.interface';

const LOCAL_STORE: string = 'userAdministration';
const local = namespace(LOCAL_STORE);

@Component({
  components: {
    mzUserAdministrationMenu,
    mzUserAdministrationMenuMobile,
  },
})
export default class mzUserAdministration extends Vue {
  @local.State((state: mzUserAdministrationModule) => state.menuAdministration.menuLinks) public mobileMenu!: IMenuAdministration;
  @local.State((state: mzUserAdministrationModule) => state.menuAdministration.isOpen) public isOpen!: IMenuAdministration;
  @local.Mutation public setOpenMenu!: (payload: boolean) => void;


  private async beforeRouteEnter(to: Route, from: Route, next: any) {
    const lang: string = Store.state.global.defaultLang;
    try {
      await loadTranslationsAsync(lang, import(`./i18n/${lang}` as string));
      registerStoreModule(LOCAL_STORE.split('/'), mzUserAdministrationModule);
      next();
    } catch (e) {
      next(false);
      throw new Error(e);
    }
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

.mz-user-administration {
  min-height: 100vh;
  background: var(--background-color);
  height: 100%;
  display: grid;
  grid-template-rows: 6.4rem 7rem auto;
  grid-template-columns: 1fr 4fr 1fr;

  &__wrapper {
    display: flex;
    grid-row-start: 3;
    grid-column-start: 2;
    justify-content: center;

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
    }

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
      left: 0;
    }

    .show-background {
      visibility: hidden;
    }

    &__menu-mobile {
      display: none;
    }

    &__container {
      width: 100rem;
      margin-left: 5rem;
    }
  }
}

.show-menu {
  left: -40rem;
  transition: .5s ease-in-out;
}

@include respond-to(desktop) {
  .mz-user-administration {
    &__wrapper {
      display: flex;
      grid-row-start: 3;
      grid-column-start: 2;
      justify-content: center;

      &__container {
        width: 90rem;
        margin-left: 5rem;
      }
    }
  }
}

@include respond-to(tablet) {
  .mz-user-administration {
    grid-template-columns: 1fr 4fr 1fr;
    grid-template-rows: 0 0 auto;

    &__wrapper {
      display: flex;
      grid-row-start: 3;
      grid-column-start: 2;
      justify-content: flex-start;
      flex-direction: column;

      .show-background {
        visibility: visible;
      }

      &__mobile-btn {
        display: flex;
        justify-content: center;
      }

      &__menu {
        display: none;
      }

      &__menu-mobile {
        display: block;
      }

      &__container {
        width: 85rem;
        margin-left: 0;
      }
    }
  }
}

@include respond-to(mobile) {
  .mz-user-administration {
    grid-template-columns: 1fr 4fr 1fr;
    grid-template-rows: 0 0 auto;

    &__wrapper {
      display: flex;
      grid-row-start: 3;
      grid-column-start: 2;
      justify-content: center;
      flex-direction: column;

      .show-background {
        visibility: visible;
      }

      &__mobile-btn {
        display: flex;
        justify-content: center;
      }

      &__menu {
        display: none;
      }

      &__menu-mobile {
        display: block;
      }

      &__container {
        width: 46rem;
        margin-left: 0;
      }
    }
  }
}
</style>