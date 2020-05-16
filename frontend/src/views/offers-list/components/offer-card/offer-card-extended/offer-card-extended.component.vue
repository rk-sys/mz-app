<template>
  <div class="mz-offer-card-extended">

    <div class="mz-offer-card-extended__content">
      <div class="mz-offer-card-extended__description">{{ offer.description }}</div>

      <button class="mz-offer-card-extended__ask-bid-button"
              id="related-button"
              @click.prevent.stop="emitClick()">

        {{ $t(`button.askBid`) }}
      </button>
    </div>

    <mz-offer-card-carousel :images="offer.additionalImages"
                            @emitImagePreview="emitImagePreview" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Emit, Vue } from 'vue-property-decorator';
import mzOfferCardCarousel            from '@/views/offers-list/components/offer-card/offer-card-extended/offer-card-carousel.component.vue';
import { IOffer }                     from '@/views/offers-list/store/offers-list.interface';

@Component({
  components: {
    mzOfferCardCarousel,
  },
})
export default class mzOfferCardExtended extends Vue {
  @Prop(Object) public offer!: IOffer;

  @Emit('handleClick')
  public emitClick(): void {
    return;
  }

  @Emit('emitImagePreview')
  public emitImagePreview(index: number): number {
    return index;
  }
}
</script>


<style lang="scss"
       scoped>

.mz-offer-card-extended {
  width: 100%;
  height: calc(100% - 9rem);
  display: flex;
  margin-bottom: 2rem;

  &__content {
    margin: 2rem 1rem 1.4rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  &__description {
    width: 30.5rem;
    text-align: left;
    line-height: 2.2rem;
  }

  &__ask-bid-button {
    width: 18rem;
    height: 3.1rem;
    margin-top: 2rem;
    font-family: var(--primary-font-family);
    font-weight: 300;
    font-size: 1.6rem;
    letter-spacing: .5px;
    border-radius: 2px;
    border: none;
    color: var(--white);
    background-color: var(--primary-color);
    cursor: pointer;

    &:focus {
      outline: none;
    }
  }
}

@include respond-to(tablet) {
  .mz-offer-card-extended {
    &__description {
      width: 100%;
      padding: 0 2rem;
    }

    &__ask-bid-button {
      align-self: center;
    }
  }
}

@include respond-to(mobile) {
  .mz-offer-card-extended {
    &__description {
      width: 100%;
      padding: 0 2rem;
      align-self: center;
    }

    &__ask-bid-button {
      align-self: center;
    }
  }
}

</style>
