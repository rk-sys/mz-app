<template>
  <div class="mz-my-follow">

    <div class="mz-my-follow__wrapper">
      <h1 class="mz-my-follow__wrapper__title">
        {{ $t(`myFollow.${activeTab}`) }}
      </h1>

      <mz-tabs v-model="activeTab">

        <mz-tab-pane :label="$t(`tab.craftsmen`)"
                     name="craftsmen">

          <main class="mz-my-follow__wrapper__craftsmen-list">
            <mz-craftsmen-card v-for="(craftsmen, index) in myFollow.craftsmen"
                               :key="index"
                               class="mz-my-follow__wrapper__craftsmen-list__item"
                               :craftsmen-id="craftsmen.id"
                               :city="craftsmen.city"
                               :rating="craftsmen.rating"
                               :name="craftsmen.name"
                               :image="craftsmen.image"
                               :tags="craftsmen.tags" />
          </main>
        </mz-tab-pane>

        <mz-tab-pane :label="$t(`tab.items`)"
                     name="items">

          <main class="mz-my-follow__wrapper__products">
            <mz-product-card v-for="(product, index) in myFollow.productList"
                             :key="index"
                             :product="product"
                             class="mz-my-follow__wrapper__products__item" />
          </main>
        </mz-tab-pane>
      </mz-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue }        from 'vue-property-decorator';
import { Route }                 from 'vue-router';
import mzTabPane                 from 'element-ui/lib/tab-pane.js';
import { namespace }             from 'vuex-class';
import mzMyFollowModule          from './store/my-follow.module';
import Store                     from '@/store/store';
import { registerStoreModule }   from '@/helpers/helpers';
import { loadTranslationsAsync } from '@/i18n/i18n';
import { IMyFollow }             from '@/views/my-follow/store/my-follow.interface';
import mzTabs                    from '@/components/commons/tab/tabs.component.vue';
import mzCraftsmenCard           from '@/components/craftsmen-card/craftsmen-card.component.vue';
import mzProductCard             from '../../components/product-card/product-card.component.vue';


const LOCAL_STORE: string = 'myFollow';
const local = namespace(LOCAL_STORE);

@Component({
  components: {
    mzTabs,
    mzTabPane,
    mzProductCard,
    mzCraftsmenCard,
  },
})
export default class mzUserAdministration extends Vue {
  @local.State((state: mzMyFollowModule) => state.myFollow) public myFollow!: IMyFollow;

  public activeTab = 'craftsmen';

  private async beforeRouteEnter(to: Route, from: Route, next: any) {
    const lang: string = Store.state.global.defaultLang;
    try {
      await loadTranslationsAsync(lang, import(`./i18n/${lang}` as string));
      registerStoreModule(LOCAL_STORE.split('/'), mzMyFollowModule);
      await Store.dispatch(`${LOCAL_STORE}/getMyFollow`);
      next();
    } catch (e) {
      next(false);
      throw new Error(e);
    }
  }
}
</script>

<style lang="scss"
       scoped>

.fade-enter-active, .fade-leave-active {
  transition: opacity .25s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
{
  opacity: 0;
}

.mz-my-follow {
  min-height: 100vh;
  background: var(--background-color);
  height: 100%;
  display: grid;
  grid-template-rows: 2rem 7rem auto;
  grid-template-columns: 1fr 4fr 1fr;

  &__wrapper {
    display: flex;
    grid-row-start: 3;
    grid-column-start: 2;
    justify-content: flex-start;
    flex-direction: column;
    width: 110rem;
    margin: 0 auto 5rem;

    &__title {
      font-size: 3rem;
      margin-bottom: 5rem;
    }

    &__craftsmen-list {
      display: flex;
      flex-wrap: wrap;
      margin: 0 auto;

      &__item {
        margin-top: 2.4rem;

        &:not(:nth-child(3n)) {
          margin-right: 2.1rem;
        }
      }
    }

    &__products {
      display: flex;
      flex-wrap: wrap;
      margin: 0 auto;

      &__item {
        margin-right: 2rem;
        margin-top: 2rem;

        &:nth-child(4n) {
          margin-right: 0;

        }
      }

      .pagination {
        display: flex;
        justify-content: center;
        margin: 4rem 0;
      }
    }
  }
}

@include respond-to(desktop) {
  .mz-my-follow {
    &__wrapper {
      width: 95rem;

      &__craftsmen-list {
        &__item {
          margin-top: 1rem;

          &:not(:nth-child(3n)) {
            margin-right: 1rem;
          }
        }
      }

      &__products {
        &__item {
          margin-right: 2rem;
          margin-top: 2rem;

          &:nth-child(4n) {
            margin-right: 2rem;
          }

          &:nth-child(3n) {
            margin-right: 0;
          }
        }
      }
    }
  }
}

@include respond-to(tablet) {
  .mz-my-follow {
    grid-template-columns: 1fr 6fr 1fr;
    grid-template-rows: 0 0 auto;

    &__wrapper {
      width: 85rem;

      &__craftsmen-list {
        &__item {
          margin-top: 1rem;
          margin-right: 0;

          &:not(:nth-child(3n)) {
            margin-right: 0;
          }

          &:not(:nth-child(2n)) {
            margin-right: 1rem;
          }
        }
      }

      &__products {
        &__item {
          margin-right: 2rem;
          margin-top: 2rem;

          &:nth-child(4n) {
            margin-right: 2rem;
          }

          &:nth-child(3n) {
            margin-right: 2rem;
          }

          &:nth-child(2n) {
            margin-right: 0;
          }
        }
      }
    }
  }
}

@include respond-to(mobile) {
  .mz-my-follow {
    grid-template-columns: 1fr 4fr 1fr;
    grid-template-rows: 0 0 auto;

    &__wrapper {
      padding: 0 1rem;
      width: 46rem;

      &__craftsmen-list {
        &__item {
          margin-top: 1rem;
          margin-right: 0;

          &:not(:nth-child(3n)) {
            margin-right: 0;
          }

          &:not(:nth-child(2n)) {
            margin-right: 0;
          }
        }
      }

      &__products {
        &__item {
          margin-right: 2rem;
          margin-top: 2rem;

          &:nth-child(4n) {
            margin-right: 2rem;
          }

          &:nth-child(3n) {
            margin-right: 2rem;
          }

          &:nth-child(2n) {
            margin-right: 0;
          }
        }
      }
    }
  }
}
</style>