<template>
  <div class="mz-offers-list">
    <div class="mz-offers-list__container">
      <div class="mz-offers-list__container__filters">
        <mz-offers-filters />
      </div>

      <div class="mz-offers-list__container__list">
        <mz-offers-header-info :quantity="offersList.length" />

        <div v-if="offersList.length"
             class="mz-offers-list__container__list__cards">

          <div class="mz-offers-list__container__list__cards__column">
            <mz-offer-card v-for="(offer, index) in oddOffers"
                           :id="offer.uuid"
                           :key="index"
                           :offer="offer"
                           :imagePreviewVisible="imagePreviewVisible"
                           @activeCard="getActiveCard"
                           @imagePreview="imagePreview"
                           class="offer" />
          </div>

          <div class="mz-offers-list__container__list__cards__column">
            <mz-offer-card v-for="(offer, index) in evenOffers"
                           :id="offer.uuid"
                           :key="index"
                           :offer="offer"
                           :imagePreviewVisible="imagePreviewVisible"
                           @activeCard="getActiveCard"
                           @imagePreview="imagePreview"
                           class="offer" />
          </div>
        </div>

        <mz-empty-list-message v-if="!offersList.length"
                               :pageName="pageName" />

        <mz-offers-list-image-preview v-if="imagePreviewVisible"
                                      :imagePreviewVisible="imagePreviewVisible"
                                      :activeCardGallery="activeCardGallery"
                                      :beforePreviewClose="beforePreviewClose"
                                      :previewImageIndex="previewImageIndex" />

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
import mzOffersListModule        from '@/views/offers-list/store/offers-list.module';
import mzOffersHeaderInfo        from './components/offers-header-info.component.vue';
import mzOfferCard               from '@/views/offers-list/components/offer-card/offer-card.component.vue';
import mzOffersFilters           from '@/views/offers-list/components/offers-filters.component.vue';
import mzOffersListImagePreview  from '@/views/offers-list/components/offers-list-image-preview.component.vue';
import mzEmptyListMessage        from '@/components/empty-list-message/empty-list-message.component.vue';
import { IOffer }                from '@/views/offers-list/store/offers-list.interface';
import { DEFAULT }               from '@/helpers/variables';

const LOCAL_STORE: string = 'offers-list';
const local = namespace(LOCAL_STORE);

@Component({
  components: {
    mzOffersFilters,
    mzOffersHeaderInfo,
    mzOfferCard,
    mzOffersListImagePreview,
    mzEmptyListMessage,
  },
})
export default class mzOffersList extends Vue {


  get oddOffers(): IOffer[] {
    return this.offersList.filter((offer: IOffer) => this.offersList.indexOf(offer) % 2 === 0);
  }

  get evenOffers(): IOffer[] {
    return this.offersList.filter((offer: IOffer) => this.offersList.indexOf(offer) % 2 !== 0);
  }

  get activeCardGallery(): string[] {
    return (this.offersList.find((offer: IOffer) => offer.uuid === this.activeCardUuid) as IOffer).additionalImages;
  }
  @local.State((state: mzOffersListModule) => state.mzOffersList.offersList) public offersList!: IOffer[];
  public imagePreviewVisible: boolean = false;
  public activeCardUuid: number = -1;
  public previewImageIndex: number = -1;
  public pageName: string | undefined;

  public getActiveCard(cardUuid: number): void {
    this.activeCardUuid = cardUuid;
  }

  public imagePreview(index: number): void {
    this.imagePreviewVisible = true;
    this.previewImageIndex = index;
  }

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

    &__offer-status-legend {

      .legend-box {
        margin-bottom: 1rem;
        padding: .5rem;
        font-size: 1.6rem;
        font-weight: var(--font-medium);
        letter-spacing: .1rem;
        color: var(--white);
      }

      &--sale {
        background-color: var(--primary-color);
      }

      &--purchase {
        background-color: var(--warning);
      }

      &--craftsmen {
        background-color: var(--secondary-color);
      }
    }

    &__list {
      width: 110rem;
      margin-bottom: 4rem;

      &__cards {
        display: flex;
        width: 100%;
        height: 100%;

        &__column {
          margin-top: 1rem;
          width: 100%;
        }

        &__column:first-child {
          margin-right: 1rem;
        }

        &__column:last-child {
          margin-left: 1rem;
        }

      }
    }
  }
}

@include respond-to(tablet) {
  .mz-offers-list {
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
        width: 100%;

        &__cards {
          flex-direction: column;
        }
      }
    }
  }
}
</style>
