<template>
  <div class="mz-craftsmen">
    <div class="mz-craftsmen__container">

      <div class="mz-craftsmen__container__filters">
        <mz-craftsmen-filters />
      </div>

      <div class="mz-craftsmen__container__list">
        <mz-craftsmen-header-info :quantity="craftsmenList.length" />

        <main class="craftsmen-list">

          <mz-craftsmen-card :city="craftsmen.city"
                             :craftsmen-id="craftsmen.id"
                             :image="craftsmen.image"
                             :key="index"
                             :name="craftsmen.name"
                             :rating="craftsmen.rating"
                             :tags="craftsmen.tags"
                             class="craftsmen-list__item"
                             v-for="(craftsmen, index) in craftsmenList" />

          <mz-empty-list-message :pageName="pageName"
                                 v-if="!craftsmenList.length" />
        </main>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue }        from 'vue-property-decorator';
import { loadTranslationsAsync } from '@/i18n/i18n';
import { registerStoreModule }   from '@/helpers/helpers';
import { namespace }             from 'vuex-class';
import { Route }                 from 'vue-router';
import Store                     from '@/store/store';
import { ICraftsmenList }        from '@/views/craftsmen/store/craftsmen.interface';
import mzCraftsmenModule         from '@/views/craftsmen/store/craftsmen.module';
import mzCraftsmenCard           from '@/components/craftsmen-card/craftsmen-card.component.vue';
import mzCraftsmenFilters        from '@/views/craftsmen/components/craftsmen-filters.component.vue';
import mzCraftsmenHeaderInfo     from './components/craftsmen-header-info.component.vue';
import mzEmptyListMessage        from '@/components/empty-list-message/empty-list-message.component.vue';
import { DEFAULT }               from '@/helpers/variables';

const LOCAL_STORE: string = 'craftsmen';
const local = namespace(LOCAL_STORE);

@Component({
  components: {
    mzCraftsmenHeaderInfo,
    mzCraftsmenCard,
    mzCraftsmenFilters,
    mzEmptyListMessage,
  },
})
export default class mzCraftsmen extends Vue {
  @local.State((state: mzCraftsmenModule) => state.mzCraftsmenState.craftsmenList) public craftsmenList!: ICraftsmenList[];
  public pageName: string | undefined;

  public destroyed(): void {
    Store.unregisterModule(LOCAL_STORE);
  }

  public created(): void {
    this.pageName = this.$route.name ? this.$route.name.toLowerCase() : DEFAULT;
  }

  private async beforeRouteEnter(to: Route, from: Route, next: any) {
    const lang: string = Store.state.global.defaultLang;

    try {
      await loadTranslationsAsync(lang, import(`./i18n/${lang}` as string));
      registerStoreModule(LOCAL_STORE.split('/'), mzCraftsmenModule);
      await Store.dispatch(`${LOCAL_STORE}/getCraftsmenList`);
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

.mz-craftsmen {
  min-height: 100vh;
  background: var(--background-color);
  height: 100%;
  display: grid;
  grid-template-rows: 6.4rem 7rem auto;
  grid-template-columns: 1fr 6fr 1fr;

  &__container {
    display: flex;
    grid-row-start: 3;
    grid-column-start: 2;
    justify-content: space-evenly;

    &__filters {
      width: 32rem;
      margin-right: 2.5rem;
    }

    &__list {
      width: 110rem;
      margin-bottom: 4rem;

      .craftsmen-list {
        margin-top: 1rem;
        display: flex;
        flex-wrap: wrap;

        &__item {
          margin-top: 2.4rem;

          &:not(:nth-child(3n)) {
            margin-right: 2.4rem;
          }
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

@media screen and (max-width: 1024px) and (min-width: 769px) {
  .mz-craftsmen {
    &__container {
      &__list {
        width: 95rem;

        .craftsmen-list {

          &__item {
            margin-top: 1rem;

            &:not(:nth-child(3n)) {
              margin-right: 1rem;
            }
          }
        }
      }
    }
  }
}

@media screen and (max-width: 768px) and (min-width: 425px) {
  .mz-craftsmen {
    grid-template-rows: auto;

    &__container {
      flex-direction: column;
      grid-row-start: 1;
      justify-content: flex-start;

      &__filters {
        width: 100%;
        margin-right: 0;
        margin-bottom: 4rem;
      }

      &__list {
        width: 85rem;

        .craftsmen-list {
          justify-content: space-between;

          &__item {
            margin-top: 1rem;
            margin-right: 0;

            &:not(:nth-child(3n)) {
              margin-right: 0;
            }
          }
        }
      }
    }
  }
}

@media screen and (max-width: 425px) {
  .mz-craftsmen {
    grid-template-rows: auto;
    grid-template-columns: 1fr 4fr 1fr;

    &__container {
      flex-direction: column;
      width: 46rem;

      &__filters {
        width: 100%;
        margin-right: 0;
        margin-bottom: 4rem;
      }

      &__list {
        width: 100%;

        .craftsmen-list {
          justify-content: space-between;

          &__item {
            margin-top: 1rem;
            margin-right: 0;

            &:not(:nth-child(3n)) {
              margin-right: 0;
            }
          }
        }
      }
    }
  }
}
</style>
