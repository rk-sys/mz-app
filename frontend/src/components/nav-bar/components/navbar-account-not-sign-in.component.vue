<template>
  <mz-dropdown-menu class="mz-nav-bar-account-not-sign-in"
                    slot="dropdown">

    <div class="separator">{{$t(`navBar.manage`)}}</div>

    <mz-dropdown-item class="mz-nav-bar-account-not-sign-in__item">
      <router-link :to="{name: 'Login'}"
                   class="link">
        {{$t(`navBar.signIn`)}}
      </router-link>
    </mz-dropdown-item>

    <mz-dropdown-item class="mz-nav-bar-account-not-sign-in__item">
      <router-link :to="{name: 'Registration'}"
                   class="link">
        {{$t(`navBar.signUp`)}}
      </router-link>
    </mz-dropdown-item>

  </mz-dropdown-menu>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
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
export default class mzNavBarAccountNotSignIn extends Vue {
}
</script>

<style lang="scss" scoped>

.mz-nav-bar-account-not-sign-in {
  border-radius: .2rem;
  min-width: 24rem;

  &__item {
    font-size: 1.5rem;
    padding: 0;

    &:hover {
      background: var(--primary-color);
      color: var(--white);
    }

    .link {
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
}

.separator {
  min-width: 100%;
  background: var(--gray-150);
  margin: .4rem 0;
  color: var(--black);
  font-weight: var(--font-medium);
  font-size: 1.4rem;
  padding: .8rem;
}
</style>
