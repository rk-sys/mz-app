<template>
  <div class="nav-bar-category-mobile">

    <div class="nav-bar-category-mobile__menu"
         @click="showMenu">

      {{$t(`navBar.menu`)}}

      <div class="icon icon-arrow--black"></div>
    </div>

    <div class="nav-bar-category-mobile__list"
         :class="{'hiddenLinks': isLinksHidden}">

      <router-link class="nav-bar-category-mobile__craftsmen link"
                   to="/#">

        <div class="icon icon-hammer"></div>
        {{$t(`navBar.craftsmen`)}}
      </router-link>

      <router-link class="nav-bar-category-mobile__items link"
                   to="/#">

        <div class="icon icon-box"></div>
        {{$t(`navBar.items`)}}
      </router-link>

      <router-link class="nav-bar-category-mobile__services link"
                   to="/#">

        <div class="icon icon-tag"></div>
        {{$t(`navBar.services`)}}
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import mzLogo             from '@/components/logo/logo.component.vue';

@Component({
  components: {
    mzLogo,
  },
})
export default class mzNavBarCategoryMobile extends Vue {
  public isLinksHidden: boolean = true;

  public showMenu() {
    this.isLinksHidden = !this.isLinksHidden;
  }
}
</script>

<style lang="scss"
       scoped>

.nav-bar-category-mobile {
  grid-row-start: 2;
  grid-column-start: 2;
  height: 100%;
  align-items: center;
  padding: 0;
  margin-top: 2.5rem;
  width: 85rem;

  &__menu {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2.4rem;
    height: 5rem;
    background: var(--white);
    cursor: pointer;
    border-bottom: 2px solid var(--white);

    .icon {
      height: 2.6rem;
      width: 2.6rem;
      margin-left: 1rem;
      transform: rotate(90deg);
    }

    &:hover {
      border-bottom: 2px solid var(--primary-color);
    }
  }

  .hiddenLinks {
    display: none;
  }

  .link {
    font-size: 2.4rem;
    height: 5.4rem;
    background: var(--white);
    margin-top: 2px;
    font-weight: var(--font-regular);

    &:hover {
      border-bottom: 2px solid var(--primary-color);
    }

    .icon {
      width: 4rem;
      height: 3.5rem;
    }
  }

  .router-link-active {
    background: var(--background-color);
  }

  &__craftsmen,
  &__items,
  &__services {
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 2rem;
    text-decoration: none;
    color: var(--black);
    font-weight: var(--font-medium);
    border-bottom: 2px solid transparent;
    font-size: 1.3rem;
    justify-content: center;

    .icon {
      height: 2.2rem;
      width: 2.2rem;
      margin-right: 2rem;
    }

    &:hover {
      border-bottom: 2px solid var(--primary-color);
      cursor: pointer;
    }
  }

  &__logo {
    width: 12rem;
    height: 4rem;
    margin-right: 4rem;
  }
}

@media screen and (max-width: 425px) and (min-width: 300px) {
  .nav-bar-category-mobile {
    width: 46rem;
  }
}
</style>
