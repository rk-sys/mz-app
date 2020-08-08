<template>
  <div class="mz-offers-list">
    <div class="mz-offers-list__container">
      <div class="mz-offers-list__container__filters">
        <mz-offers-filters />
      </div>

      <div class="mz-offers-list__container__list">
        <mz-offers-header-info :quantity="offersList.length" />

        <div class="mz-offers-list__container__list__cards"
             v-if="offersList.length">

          <mz-offer-card :key="id"
                         :offer="offer"
                         class="mz-offers-list__container__list__cards__item"
                         v-for="(offer, id) in offersList" />
        </div>

        <mz-empty-list-message :pageName="pageName"
                               v-if="!offersList.length" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue }        from 'vue-property-decorator';
import { namespace }             from 'vuex-class';
import { Route }                 from 'vue-router';
import { loadTranslationsAsync } from '@/i18n/i18n';
import { registerStoreModule }   from '@/helpers/helpers';
import Store                     from '@/store/store';
import { DEFAULT }               from '@/helpers/variables';
import { IOffer }                from '@/views/offers-list/store/offers-list.interface';
import mzEmptyListMessage        from '@/components/empty-list-message/empty-list-message.component.vue';
import mzOfferCard               from '@/components/offer-card/offer-card.component.vue';
import mzOffersListModule        from './store/offers-list.module';
import mzOffersHeaderInfo        from './components/offers-header-info.component.vue';
import mzOffersFilters           from './components/offers-filters.component.vue';

const LOCAL_STORE: string = 'offers-list';
const local = namespace(LOCAL_STORE);

@Component({
  components: {
    mzOfferCard,
    mzOffersFilters,
    mzOffersHeaderInfo,
    mzEmptyListMessage,
  },
})
export default class mzOffersList extends Vue {
  @local.State((state: mzOffersListModule) => state.mzOffersList.offersList) public offersList!: IOffer[];
  public imagePreviewVisible: boolean = false;
  public activeCardUuid: number = -1;
  public previewImageIndex: number = -1;
  public pageName: string | undefined;

  public beforePreviewClose(): void {
    this.imagePreviewVisible = false;
    const activeCard: HTMLElement | null = document.getElementById(`${this.activeCardUuid}`);

    if (activeCard) {
      activeCard.focus();
    }
  }

  public created(): void {
    this.pageName = this.$route.name ? this.$route.name.toLowerCase() : DEFAULT;
  }

  public destroyed(): void {
    Store.unregisterModule(LOCAL_STORE);
  }

  private async beforeRouteEnter(to: Route, from: Route, next: any): Promise<void> {
    const lang: string = Store.state.global.defaultLang;

    try {
      await loadTranslationsAsync(lang, import(`./i18n/${lang}` as string));
      registerStoreModule(LOCAL_STORE.split('/'), mzOffersListModule);
      await Store.dispatch(`${LOCAL_STORE}/getOffersList`);
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

.mz-offers-list {
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

      &__cards {
        width: 100%;
        display: flex;
        flex-wrap: wrap;

        &__item {
          margin-right: 2rem;
          margin-bottom: 2rem;

          &:nth-child(2n) {
            margin-right: 0;
          }
        }
      }
    }
  }
}

@include respond-to(desktop) {
  .mz-offers-list {
    &__container {
      &__list {
        width: 95rem;

        &__cards {
          &__item {
            width: 100%;
            margin-right: 0;

            &:nth-child(2n) {
              margin-right: 0;
            }
          }
        }
      }
    }
  }
}

@include respond-to(tablet) {
  .mz-offers-list {
    grid-template-rows: auto;

    &__container {
      width: 85rem;
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

        &__cards {
          &__item {
            width: 100%;
            margin-right: 0;

            &:nth-child(2n) {
              margin-right: 0;
            }
          }
        }
      }
    }
  }
}

@include respond-to(mobile) {
  .mz-offers-list {
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
        width: 46rem;

        &__cards {
          &__item {
            width: 100%;
            margin-right: 0;

            &:nth-child(2n) {
              margin-right: 0;
            }
          }
        }
      }
    }
  }
}
</style>
