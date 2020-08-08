<template>
  <div class="nav-bar-profile">

    <div class="nav-bar-profile__messages">
      <div :class="searchHover? 'icon-chat--full' : 'icon-chat'"
           @click="goToMyMessage"
           @mouseenter="searchHover = true"
           @mouseleave="searchHover = false"
           class="icon">
      </div>
    </div>

    <div class="nav-bar-profile__user">
      <mz-dropdown class="nav-bar-profile__user--sign-in"
                   trigger="click">

        <div :class="userHover? 'icon-user--full' : 'icon-user'"
             @mouseenter="userHover = true"
             @mouseleave="userHover = false"
             class="icon"></div>

        <template v-if="getCurrentUser.name !== ''">
          <mz-nav-bar-account-sign-in />
        </template>

        <template v-else>
          <mz-nav-bar-account-not-sign-in />
        </template>
      </mz-dropdown>
    </div>

    <div class="nav-bar-profile__heart">

      <div :class="followHover? 'icon-heart--full':'icon-heart--gray'"
           @click="goToMyFollow()"
           @mouseenter="followHover = true"
           @mouseleave="followHover = false"
           class="icon "></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue }       from 'vue-property-decorator';
import { Getter }               from 'vuex-class';
import mzLogo                   from '@/components/logo/logo.component.vue';
import mzDropdown               from '@/components/commons/dropdown/dropdown.component.vue';
import mzDropdownMenu           from '@/components/commons/dropdown-menu/dropdown-menu.component.vue';
import mzDropdownItem           from '@/components/commons/dropdown-item/dropdown-item.component.vue';
import mzNavBarAccountSignIn    from '@/components/nav-bar/components/navbar-account-sign-in.component.vue';
import mzNavBarAccountNotSignIn from '@/components/nav-bar/components/navbar-account-not-sign-in.component.vue';
import router                   from '@/router';

@Component({
  components: {
    mzLogo,
    mzDropdown,
    mzDropdownMenu,
    mzDropdownItem,
    mzNavBarAccountSignIn,
    mzNavBarAccountNotSignIn,
  },
})
export default class mzNavBarProfile extends Vue {
  @Getter public getCurrentUser!: () => any;

  public searchHover = false;
  public userHover = false;
  public followHover = false;

  public goToMyFollow(): void {
    router.push({ name: 'My follow' });
  }

  public goToMyMessage(): void {
    router.push({ name: 'My messages' });
  }
}
</script>

<style lang="scss"
       scoped>
.nav-bar-profile {
  display: flex;
  height: 100%;
  align-items: center;
  padding: 0;

  &__heart {
    filter: grayscale(1);

    &:hover {
      filter: grayscale(0);
    }
  }

  &__heart,
  &__user,
  &__messages {
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 2rem;
    text-decoration: none;
    color: var(--black);
    font-weight: var(--font-medium);

    .icon {
      height: 2.2rem;
      width: 2.2rem;

      &:hover {
        cursor: pointer;
      }

      @media screen and (max-width: 768px) {
        width: 4rem;
        height: 4rem;
      }
    }


    @media screen and (max-width: 768px) {
      padding: 0 4rem;
    }
  }

  @media screen and (max-width: 768px) {
    grid-row-start: 1;
    grid-column-start: 2;
    display: flex;
    justify-content: center;
  }
}
</style>
