<template>
  <div class="craftsmen-detail-portfolio-card"
       @mouseenter="isHover = true"
       @mouseleave="isHover = false">

    <img class="craftsmen-detail-portfolio-card__picture"
         :src="portfolioItem.pictureUrl"
         :alt="portfolioItem.title">

    <div class="craftsmen-detail-portfolio-card--cover-bg"
         :class="{'show-overlay': isHover}"
         @click="openModal(indexItem)" >

      {{ $t(`portfolio.detailPicture`) }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace }            from 'vuex-class';
import { IPortfolio }           from '@/views/craftsmen-detail/store/craftsmen-detail.interface';

const LOCAL_STORE: string = 'craftsmenDetail';
const local = namespace(LOCAL_STORE);

@Component({
  components: {},
})
export default class mzCraftsmenDetailPortfolio extends Vue {
  @local.Action public openModal!: (payload: number) => void;
  @Prop(Number) public readonly indexItem!: number;
  @Prop(Object) public readonly portfolioItem!: IPortfolio;

  public isHover: boolean = false;
}
</script>

<style lang="scss"
       scoped>
.craftsmen-detail-portfolio-card {
  width: 25rem;
  height: 20rem;
  margin-bottom: 2rem;
  margin-right: 2rem;
  position: relative;

  &:nth-child(3n) {
    margin-right: 0;
  }

  &__picture {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 2px;
  }

  &--cover-bg {
    width: 25rem;
    height: 20rem;
    position: absolute;
    background: var(--primary-color);
    top: 0;
    left: 0;
    opacity: .9;
    font-size: 2.6rem;
    color: var(--white);
    font-weight: var(--font-medium);
    display: none;
    justify-content: center;
    align-items: center;
    border-radius: 2px;
    cursor: pointer;
    word-break: break-all;
  }

  .show-overlay {
    display: flex;
  }
}

@media only screen and (max-width: 768px) and (min-width: 426px) {
  .craftsmen-detail-portfolio-card {
    width: 40rem;
    height: 30rem;

    &:nth-child(3n) {
      margin-right: 2rem;
    }

    &:nth-child(2n) {
      margin-right: 0;
    }
    &--cover-bg {
      width: 40rem;
      height: 30rem;
    }
  }
}

@media only screen and (max-width: 425px) {
  .craftsmen-detail-portfolio-card {
    width: 46rem;
    height: 30rem;
    margin-right: 0;

    &:nth-child(3n) {
      margin-right: 0;
    }

    &--cover-bg {
      width: 46rem;
      height: 30rem;
    }
  }
}
</style>