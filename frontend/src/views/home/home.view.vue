<template>
  <div class="home">
    <div class="home__title">
      <h1 class="slogan">{{$t(`webFor`)}}
        <span class="slogan--green">{{$t(`craftsman`)}}</span>
      </h1>
    </div>

    <div class="home__register">
      <p class="home__register__title">{{$t(`registerTitle`)}}!</p>
      <p class="home__register__info"
         v-html="$t(`registerInfo`)"></p>


      <router-link class="home__register__button"
                   to="/registration">{{$t(`button`)}}
      </router-link>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue }        from 'vue-property-decorator';
import { Route }                 from 'vue-router';
import { loadTranslationsAsync } from '@/i18n/i18n';
import Store                     from '@/store/store';

@Component({
  components: {},
})
export default class yHome extends Vue {

  private async beforeRouteEnter(to: Route, from: Route, next: any): Promise<void> {
    const lang = Store.state.global.defaultLang;

    try {
      await loadTranslationsAsync(lang,
        import(/* webpackChunkName: "user/[request]" */ `./i18n/${lang}`));
      next();
    } catch (e) {
      next(false);
      throw new Error(e);
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  background: url("~@/assets/img/background.jpg") no-repeat center;
  min-height: 100vh;
  min-width: 100vw;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 20rem;

  .home__title {
    .slogan {
      font-size: 12rem;
      font-weight: var(--font-light);
      color: var(--black);
      line-height: 1.1;

      &--green {
        display: block;
        font-size: 7.5rem;
        color: var(--primary-color);
        font-weight: var(--font-bold);
      }
    }
  }

  .home__register {
    &__title {
      font-size: 3.2rem;
      font-weight: var(--font-medium);
      margin-bottom: 0;
    }

    &__info {
      margin-top: 1rem;
      font-size: 2rem;
    }

    &__button {
      display: block;
      width: 20rem;
      height: 4rem;
      border-radius: 0.2rem;
      padding: 1rem 2rem;
      cursor: pointer;
      font-size: var(--font-size-16);
      color: var(--white);
      background-color: var(--primary-color);
      border: 0.1rem solid var(--primary-color);
      text-decoration: none;
      text-align: center;

      &:hover {
        background-color: var(--primary-color-80);
        border: 0.1rem solid var(--primary-color-80);
      }
    }
  }
}

@media only screen and (max-width: 1024px) and (min-width: 768px) {
  .home {
    padding: 0 10rem;

    .home__title {
      .slogan {
        font-size: 10rem;

        &--green {
          font-size: 6rem;
        }
      }
    }
  }
}

@media only screen and (max-width: 768px) and (min-width: 426px) {
  .home {
    padding: 0 5rem;

    .home__title {
      .slogan {
        font-size: 6rem;

        &--green {
          font-size: 4rem;
        }
      }
    }

    .home__register {
      &__title {
        font-size: 2.6rem;
      }

      &__info {
        font-size: 1.8rem;
      }
    }
  }
}

@media only screen and (max-width: 425px) {
  .home {
    padding: 0 2rem;

    .home__title {
      .slogan {
        font-size: 4.5rem;

        &--green {
          font-size: 3.2rem;
        }
      }
    }

    .home__register {
      &__title {
        font-size: 2.2rem;
      }

      &__info {
        font-size: 1.6rem;
      }
    }
  }
}
</style>
