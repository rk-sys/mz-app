<template>
  <div class="user-account-menu">
    <div class="user-account-menu__info">
      <div class="user-account-menu__info__wrapper">
        <img src="https://via.placeholder.com/250"
             alt="user_picture"
             class="user-account-menu__info__picture" />

      </div>

      <span class="user-account-menu__info__display-name">
        {{userInfo.displayName}}
      </span>
    </div>

    <div class="user-account-menu__separator"></div>

    <div class="user-account-menu__list">
      <div v-for="link in menuLinks"
           :key="link.label"
           class="user-account-menu__list__wrapper">

        <router-link :to="link.url"
                     class="user-account-menu__list__link">
          {{$t(`links.${link.label}`)}}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue }  from 'vue-property-decorator';
import { namespace }       from 'vuex-class';
import mzUserAccountModule from '../store/user-account.module';

const LOCAL_STORE = 'userAccount';
const local = namespace(LOCAL_STORE);

@Component({
  components: {},
})
export default class mzUserAccountMenu extends Vue {
  @local.State((state: mzUserAccountModule) => state.mzUserAccountMenuState.userInfo) public userInfo!: string;
  @local.State((state: mzUserAccountModule) => state.mzUserAccountMenuState.links) public menuLinks!: string;
}
</script>

<style lang="scss"
       scoped>
.user-account-menu {
  max-width: 20rem;
  grid-row-start: 3;
  grid-column-start: 2;

  &__info {
    display: flex;
    flex-direction: column;;

    &__picture {
      max-width: 17.5rem;
      max-height: 17.5rem;
      object-fit: contain;
      border-radius: 50%;
    }

    &__display-name {
      margin-top: 1rem;
      font-size: 2.2rem;
      font-weight: var(--font-medium);
      color: var(--black);
      text-align: center;
    }
  }

  &__separator {
    margin: 3.5rem 0;
    height: 1px;
    background: var(--gray-450);
  }

  &__list {

    &__link {
      font-size: 1.8rem;
      color: var(--gray-950);
      text-decoration: none;
      margin-bottom: 2.5rem;
      font-weight: var(--font-regular);
      display: inline-block;
      padding: .5rem 0;
      position: relative;

      &::before {
        content: "";
        left: 0;
        bottom: 0;
        width: 100%;
        position: absolute;
        transform: scaleX(0);
        transition: transform .3s ease-in-out;
        transform-origin: left;
        border-bottom: 2px solid var(--primary-color);
      }

      &:hover {
        color: var(--primary-color);

        &::before {
          transition: transform .3s ease-in-out;
          transform: scaleX(1);
        }
      }
    }
  }
}
</style>
