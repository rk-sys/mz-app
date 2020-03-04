<template>
  <div class="mz-user-administration-menu-mobile">

    <div class="mz-user-administration-menu-mobile__cross icon-close--black"
         @click="setOpenMenu(false)"></div>

    <div class="mz-user-administration-menu-mobile__container">
      <div class="mz-user-administration-menu-mobile__container__header">
        <div class="icon icon-shop"></div>
        <h3 class="mz-user-administration-menu-mobile__container__header__title">
          {{ $t('menu.administration')}}
        </h3>
      </div>

      <div class="mz-user-administration-menu-mobile__container__section"
           v-for="(menu, index) in mobileMenu"
           :key="index">

        <p class="mz-user-administration-menu-mobile__container__section__title">
          {{ $t(`${menu.title}.title`) }}
        </p>

        <div v-for="(link, index) in menu.links"
             :key="index"
             @click="setOpenMenu(false)"
             class="mz-user-administration-menu-mobile__container__section__wrapper">

          <router-link :to="{name : link.name}"
                       class="mz-user-administration-menu-mobile__container__section__wrapper__link">

            {{ $t(`${menu.title}.${link.label}`) }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue }         from 'vue-property-decorator';
import { namespace }              from 'vuex-class';
import { IMenuAdministration }    from '@/views/user-administration/store/user-administration.interface';
import mzUserAdministrationModule from '../store/user-administration.module';

const LOCAL_STORE: string = 'userAdministration';
const local = namespace(LOCAL_STORE);

@Component({
  components: {},
})
export default class mzUserAdministrationMenuMobile extends Vue {
  @local.State((state: mzUserAdministrationModule) => state.menuAdministration.menuLinks) public mobileMenu!: IMenuAdministration;
  @local.Mutation public setOpenMenu!: (payload: boolean) => void;

}
</script>
<style lang="scss"
       scoped>

.mz-user-administration-menu-mobile {
  background: var(--white);
  min-height: 100vh;
  height: 100%;
  width: 40rem;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 4;
  transition: .5s ease-in-out;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;

  &__cross {
    top: 2rem;
    position: absolute;
    right: 2.5rem;
    width: 2rem;
    height: 2rem;
    cursor: pointer
  }

  &__container {
    margin-top: 10rem;
    list-style: none;
    width: 100%;

    &__header {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 3rem;

      .icon {
        width: 12.5rem;
        height: 12.5rem;
      }

      &__title {
        text-align: center;
      }
    }

    &__section {
      margin-bottom: 1.5rem;

      &__title {
        padding: 1rem 3rem;
        font-weight: var(--font-bold);
        font-size: 2.6rem;
        margin: 0;
      }

      &__wrapper {
        &__link {
          font-size: 2.3rem;
          padding: 1rem 5rem;
          font-weight: var(--font-medium);
          cursor: pointer;
          display: block;
          text-decoration: none;
          color: var(--black);

          &:hover {
            background: var(--primary-color);
            color: var(--white);
          }

          &.router-link-active {
            color: var(--primary-color);

            &:hover {
              color: var(--white);
            }
          }
        }
      }
    }
  }
}

</style>