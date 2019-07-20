<template>
  <div class="nav-bar-profile">
    <div class="nav-bar-profile__search">

      <div class="icon"
           @mouseenter="searchHover = true"
           @mouseleave="searchHover = false"
           :class="searchHover? 'icon-search--green' : 'icon-search'"></div>

    </div>
    <div class="nav-bar-profile__user">

      <div class="icon"
           @mouseenter="userHover = true"
           @mouseleave="userHover = false"
           :class="userHover? 'icon-user--green':'icon-user'"></div>

    </div>
    <div class="nav-bar-profile__basket">

      <div class="icon "
           @mouseenter="basketHover = true"
           @mouseleave="basketHover = false"
           :class="basketHover? 'icon-shopping-cart--green':'icon-shopping-cart'"></div>
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
export default class mzNavBarProfile extends Vue {
  public searchHover = false;
  public userHover = false;
  public basketHover = false;


};
</script>

<style lang="scss"
       scoped>
.nav-bar-profile {
  display: flex;
  height: 100%;
  align-items: center;
  padding: 0;

  &__basket,
  &__user,
  &__search {
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 2rem;
    text-decoration: none;
    color: var(--black);
    font-weight: var(--font-medium);

    .icon {
      height: 2.4rem;
      width: 2.4rem;

      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>
