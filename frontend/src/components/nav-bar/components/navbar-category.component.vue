<template>
  <div class="nav-bar-category">
    <mz-logo :is-primary="true"
             class="nav-bar-category__logo" />

    <router-link :to="{ name: 'Craftsmen' }"
                 class="nav-bar-category__craftsmen">

      <div class="icon icon-hammer"></div>
      {{ $t(`navBar.craftsmen`) }}
    </router-link>

    <router-link :to="{ name: 'Products list' }"
                 class="nav-bar-category__items">

      <div class="icon icon-box"></div>
      {{ $t(`navBar.items`) }}
    </router-link>

    <router-link :to="{ name: 'Offers list' }"
                 class="nav-bar-category__services">

      <div class="icon icon-tag"></div>
      {{ $t(`navBar.services`) }}
    </router-link>
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
export default class mzNavBarCategory extends Vue {
}
</script>

<style lang="scss"
       scoped>

.nav-bar-category {
  display: flex;
  height: 100%;
  align-items: center;
  padding: 0;

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
</style>
