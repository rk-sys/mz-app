<template>
  <div class="craftsmen-detail-portfolio">

    <mz-craftsmen-detail-portfolio-card :index-item="index"
                                        :key="index"
                                        :portfolio-item="item"
                                        v-for="(item, index) in craftsmenPortfolio" />

    <mz-modal :visible.sync="visibleModal"
              class="craftsmen-detail-portfolio__modal">

      <div @click="previewPortfolio()"
           class="icon icon--prev icon-arrow--white"></div>

      <div @click="nextPortfolio()"
           class="icon icon--next icon-arrow--white"></div>

      <img :alt="craftsmenPortfolio[activeItemIndex].title"
           :src="craftsmenPortfolio[activeItemIndex].pictureUrl"
           class="craftsmen-detail-portfolio__modal__picture" />

      <h2 class="craftsmen-detail-portfolio__modal__title">
        {{ craftsmenPortfolio[activeItemIndex].title }}
      </h2>

      <p class="craftsmen-detail-portfolio__modal__description">
        {{ craftsmenPortfolio[activeItemIndex].description }}
      </p>

      <div class="craftsmen-detail-portfolio__modal__tags">
        <span :key="index"
              class="tag"
              v-for="(tag, index) in craftsmenPortfolio[activeItemIndex].tags">
          {{ tag }}
        </span>
      </div>
    </mz-modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue }             from 'vue-property-decorator';
import { namespace }                  from 'vuex-class';
import { IPortfolio }                 from 'src/views/craftsmen-detail/store/craftsmen-detail.interface';
import mzCraftsmenDetailModule        from '../store/craftsmen-detail.module';
import mzCraftsmenDetailPortfolioCard from '../components/craftsmen-detail-portfolio-card.component.vue';
import mzModal                        from '@/components/form/modal/modal.component.vue';

const LOCAL_STORE: string = 'mzCraftsmenDetail';
const local = namespace(LOCAL_STORE);

@Component({
  components: {
    mzCraftsmenDetailPortfolioCard,
    mzModal,
  },
})
export default class mzCraftsmenDetailPortfolio extends Vue {
  @local.State((state: mzCraftsmenDetailModule) => state.mzCraftsmenDetailState.craftsmenPortfolio) public craftsmenPortfolio!: IPortfolio[];
  @local.State((state: mzCraftsmenDetailModule) => state.activeItemIndex) public activeItemIndex!: number;
  @local.State((state: mzCraftsmenDetailModule) => state.visibleModal) public modalHook!: boolean;
  @local.Mutation public setVisibleModal!: (payload: boolean) => void;
  @local.Mutation public previewPortfolio!: () => void;
  @local.Mutation public nextPortfolio!: () => void;

  set visibleModal(isChecked: boolean) {
    this.setVisibleModal(isChecked);
  }

  get visibleModal(): boolean {
    return this.modalHook;
  }
}
</script>

<style lang="scss"
       scoped>

.craftsmen-detail-portfolio {
  width: 80rem;
  margin-left: 10rem;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;

  &__modal {
    &__picture {
      width: 100%;
      height: 45rem;
      object-fit: cover;
    }

    &__title {
      font-size: 2.4rem;
      padding: 0 2rem;
    }

    &__description {
      font-size: 1.8rem;
      padding: 0 2rem;
      font-style: italic;
    }

    &__tags {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      padding: 0 2rem 2rem 2rem;

      .tag {
        margin: .5rem;
        padding: .5rem;
        border: 1px solid var(--primary-color);
        border-radius: 2px;
        color: var(--primary-color);
        background: var(--white);

        &:hover {
          background: var(--primary-color);
          color: var(--white);
          cursor: pointer;
        }
      }
    }

    .icon {
      position: absolute;
      width: 4rem;
      height: 4rem;
      cursor: pointer;
    }

    .icon--next {
      right: -10rem;
      top: 50%;
      transform: translateX(-50%);
    }

    .icon--prev {
      transform: rotate(180deg) translateX(-50%);
      left: -10rem;
      top: 50%;
    }
  }
}

@media only screen and (max-width: 768px) and (min-width: 426px) {
  .craftsmen-detail-portfolio {
    margin-left: 0;
    width: 85rem;
  }
}

@media only screen and (max-width: 425px) {
  .craftsmen-detail-portfolio {
    margin-left: 0;
    width: 46rem;

    .icon--next {
      top: 25%;
      right: 1rem;
    }

    .icon--prev {
      left: 0;
      top: 25%;
    }
  }
}
</style>