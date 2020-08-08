<template>
  <div class="mz-home">

    <div class="mz-home__title">
      <h1 class="mz-home__title__slogan">{{ $t(`webFor`) }}
        <span class="mz-home__title__slogan--primary">{{$t(`craftsman`)}}</span>
      </h1>

      <div class="mz-home__search">
        <mz-input-basic class="mz-home__search__input"
                        placeholder="Czego szukasz?"
                        v-model="search" />

        <mz-select class="mz-home__search__select"
                   size="mini"
                   v-model="searchType">

          <mz-option :key="index"
                     :label="$t(`options.${option}`)"
                     :value="option"
                     v-for="(option, index) in searchTypes" />
        </mz-select>

        <div class="mz-home__search__button">{{ $t(`search`) }}</div>
      </div>
    </div>

    <div class="mz-home__craftsmen">
      <h2 class="mz-home__craftsmen__title">{{ $t(`newCraftsmen`) }}</h2>

      <div class="mz-home__craftsmen__list">

        <mz-craftsmen-card :city="craftsmen.city"
                           :craftsmen-id="craftsmen.uuid"
                           :image="craftsmen.image"
                           :key="index"
                           :name="craftsmen.name"
                           :rating="craftsmen.rating"
                           :tags="craftsmen.tags"
                           class="mz-home__craftsmen__list__item"
                           v-for="(craftsmen, index) in mzHome.craftsmen"
                           v-if="index < 4" />
      </div>
    </div>

    <div class="mz-home__products">
      <h2 class="mz-home__products__title">{{ $t(`newProducts`) }}</h2>

      <div class="mz-home__products__list">
        <mz-product-card :key="index"
                         :product="product"
                         class="mz-home__products__list__item"
                         v-for="(product, index) in mzHome.products"
                         v-if="index < 5" />
      </div>
    </div>

    <div class="mz-home__events">
      <h2 class="mz-home__events__title">{{ $t(`newEvents`) }}</h2>

      <div class="mz-home__events__list">

        <mz-event-card :event="event"
                       :key="index"
                       class="mz-home__events__list__item"
                       v-for="(event, index) in mzHome.events"
                       v-if="index < 2" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue }        from 'vue-property-decorator';
import { Route }                 from 'vue-router';
import { namespace }             from 'vuex-class';
import Store                     from '@/store/store';
import { loadTranslationsAsync } from '@/i18n/i18n';
import { registerStoreModule }   from '@/helpers/helpers';
import { IHome }                 from '@/views/home/store/home.interface';
import mzInputBasic              from '@/components/input/mz-input-basic.component.vue';
import mzSelect                  from '@/components/form/select/select-basic.component.vue';
import mzOption                  from '@/components/form/option/option-basic.component.vue';
import mzButton                  from '@/components/buttons/button.component.vue';
import mzHomeModule              from './store/home.module';
import mzCraftsmenCard           from '@/components/craftsmen-card/craftsmen-card.component.vue';
import mzProductCard             from '@/components/product-card/product-card.component.vue';
import mzEventCard               from '@/components/event/event-card.component.vue';

const LOCAL_STORE: string = 'mzHome';
const local = namespace(LOCAL_STORE);

@Component({
  components: {
    mzButton,
    mzOption,
    mzSelect,
    mzEventCard,
    mzInputBasic,
    mzProductCard,
    mzCraftsmenCard,
  },
})
export default class mzHome extends Vue {
  @local.State((state: mzHomeModule) => state.mzHome) public mzHome!: IHome;
  @local.State((state: mzHomeModule) => state.search) public search!: string;
  @local.State((state: mzHomeModule) => state.searchTypes) public searchTypes!: string[];
  @local.State((state: mzHomeModule) => state.searchType) public searchTypeOption!: string;
  @local.Mutation public setSearchType!: (arg: string) => void;

  set searchType(arg: string) {
    this.setSearchType(arg);
  }

  get searchType(): string {
    return this.searchTypeOption;
  }

  private async beforeRouteEnter(to: Route, from: Route, next: any): Promise<void> {
    const lang: string = Store.state.global.defaultLang;

    try {
      await loadTranslationsAsync(lang,
        import(/* webpackChunkName: "user/[request]" */ `./i18n/${lang}` as string));
      registerStoreModule(LOCAL_STORE.split('/'), mzHomeModule);
      await Store.dispatch(`${LOCAL_STORE}/getHomePage`);
      next();
    } catch (e) {
      next(false);
      throw new Error(e);
    }
  }
}
</script>

<style lang="scss" scoped>
.mz-home {
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  &__title {
    height: 50rem;
    margin-top: 16.2rem;
    padding: 0 20rem;
    background: url("~@/assets/img/background-craft.jpg") no-repeat center;
    background-size: cover;

    &__slogan {
      font-family: var(--secondary-font-family);
      margin: 5rem 0;
      font-size: 12rem;
      font-weight: var(--font-light);
      color: var(--white);
      line-height: 1.1;

      &--primary {
        display: block;
        font-size: 7.5rem;
        color: var(--primary-color);
        font-weight: var(--font-bold);
      }
    }
  }

  &__search {
    padding: 1rem;
    display: flex;
    width: 80rem;

    &__input {
      margin-right: .5rem;
    }

    &__select {
      margin-right: .5rem;
    }

    &__button {
      cursor: pointer;
      background: var(--primary-color);
      width: 25rem;
      text-align: center;
      font-size: 2.4rem;
      padding: 1rem;
      color: var(--white);
      font-weight: 500;

      &:hover {
        background-color: var(--primary-color-80);
      }
    }
  }

  &__craftsmen {
    margin-top: 10rem;
    padding: 0 20rem 5rem;
    background: var(--gray-150);

    &__list {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;

      &__item {
        margin-top: 2.4rem;

        &:not(:nth-child(4n)) {
          margin-right: 2.4rem;
        }
      }
    }
  }

  &__products {
    margin-top: 5rem;
    padding: 0 20rem 5rem;

    &__list {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;

      &__item {
        margin-right: 5rem;
        margin-top: 2rem;

        &:nth-child(5n) {
          margin-right: 0;
        }
      }
    }
  }

  &__events {
    margin-top: 5rem;
    padding: 0 20rem 5rem;
    background-color: var(--gray-150);

    &__list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
    }

  }
}

@media screen and (max-width: 1440px) and (min-width: 1025px) {
  .mz-home {
    &__title {
      padding: 0 10rem;
    }

    &__craftsmen,
    &__products,
    &__events {
      padding: 0 5rem 5rem;
    }
  }
}

@media screen and (max-width: 1024px) and (min-width: 769px) {
  .mz-home {
    &__title {
      padding: 0 10rem;
    }

    &__craftsmen,
    &__products,
    &__events {
      padding: 0 10rem 5rem;
    }
  }
}

@media screen and (max-width: 768px) and (min-width: 430px) {
  .mz-home {
    &__title {
      padding: 0 5rem;
      margin-top: 10rem;
    }

    &__craftsmen,
    &__products,
    &__events {
      padding: 0 10rem 5rem;

      &__list {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;

        &__item {
          margin-top: 2.4rem;
          margin-right: 0;

          &:not(:nth-child(4n)) {
            margin-right: 0;
          }
        }
      }
    }
  }
}

@media screen and (max-width: 429px) {
  .mz-home {
    &__title {
      padding: 0 2rem;
      margin-top: 5rem;
      height: 60rem;

      &__slogan {
        font-size: 8rem;
      }
    }

    &__search {
      flex-direction: column;
      width: 100%;
      height: 20rem;
      justify-content: space-between;
      align-items: center;

      &__input,
      &__select,
      &__button {
        height: 5rem;
        width: 100%;
      }
    }

    &__craftsmen,
    &__products,
    &__events {
      padding: 0 2rem 5rem;

      &__title {
        font-size: 2.6rem;
      }

      &__list {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;

        &__item {
          margin-top: 2.4rem;
          margin-right: 0;

          &:not(:nth-child(4n)) {
            margin-right: 0;
          }
        }
      }
    }
  }
}
</style>
