<template>
  <mz-dropdown-menu class="mz-nav-bar-account-sign-in"
                    slot="dropdown">

    <div class="mz-nav-bar-account-sign-in__account">
      <img alt="avatar"
           class="mz-nav-bar-account-sign-in__account__picture"
           src="https://via.placeholder.com/60" />

      <span class="mz-nav-bar-account-sign-in__account__name">
				{{ getCurrentUserName }}
			</span>
    </div>

    <div class="separator">{{$t(`navBar.account`)}}</div>

    <mz-dropdown-item class="mz-nav-bar-account-sign-in__item">
      <router-link :to="{name: 'User account'}"
                   class="mz-nav-bar-account-sign-in__item__link">

      {{$t(`navBar.settings`)}}
      </router-link>
    </mz-dropdown-item>

    <mz-dropdown-item class="mz-nav-bar-account-sign-in__item">
      <router-link :to="{name: 'User account'}"
                   class="mz-nav-bar-account-sign-in__item__link">

        {{$t(`navBar.myItems`)}}
      </router-link>
    </mz-dropdown-item>

    <mz-dropdown-item class="mz-nav-bar-account-sign-in__item">
      <router-link :to="{name: 'User account'}"
                   class="mz-nav-bar-account-sign-in__item__link">

        {{$t(`navBar.message`)}}
      </router-link>
    </mz-dropdown-item>

    <div class="separator">{{$t(`navBar.manage`)}}</div>

    <mz-dropdown-item @click.native="logout"
                      class="mz-nav-bar-account-sign-in__item">

      <span class="mz-nav-bar-account-sign-in__item__link">
        {{$t(`navBar.logout`)}}
      </span>
    </mz-dropdown-item>
  </mz-dropdown-menu>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';
import mzDropdown         from '@/components/commons/dropdown/dropdown.component.vue';
import mzDropdownMenu     from '@/components/commons/dropdown-menu/dropdown-menu.component.vue';
import mzDropdownItem     from '@/components/commons/dropdown-item/dropdown-item.component.vue';

@Component({
  components: {
    mzDropdown,
    mzDropdownMenu,
    mzDropdownItem,
  },
})
export default class mzNavBarAccountSignIn extends Vue {
  @Getter public getCurrentUser!: () => object;
  @Getter public getCurrentUserName!: () => string;
  @Action public logout!: () => void;
}
</script>

<style lang="scss" scoped>

.mz-nav-bar-account-sign-in {
  border-radius: 0.2rem;
  min-width: 24rem;

  &__item {
    font-size: 1.5rem;
    padding: 0;

    &:hover {
      background: var(--primary-color);
      color: var(--white);
    }

    &__link {
      padding: 0 2rem;
      color: var(--gray-950);
      width: 100%;
      height: 100%;
      display: block;
      text-decoration: none;

      &:hover {
        color: var(--white);
      }
    }
  }

  &__account {
    pointer-events: none;
    padding: 0 2rem;
    display: flex;
    align-items: center;
    margin: 1rem 0;
    font-size: 1.5rem;

    &__picture {
      border-radius: 50%;
      max-width: 5rem;
      max-height: 5rem;
      margin-right: 1rem;
    }
  }
}

.separator {
  min-width: 100%;
  background: var(--gray-150);
  margin: .4rem 0;
  color: var(--black);
  font-weight: var(--font-medium);
  font-size: 1.4rem;
  padding: 0.8rem;
}
</style>
