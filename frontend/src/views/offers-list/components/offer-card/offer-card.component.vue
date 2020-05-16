<template>
  <div class="mz-offer-card"
       tabindex="0"
       :class="[
                `mz-offer-card--${offer.status}`,
                { [`mz-offer-card--extended-${offer.status}`]: extendedCard }
               ]"
       @focus="[handleFocus(), emitActiveCard()]"
       @focusout="handleFocusOut($event.relatedTarget)">

    <div class="mz-offer-card__offer-status"
         :class="[`mz-offer-card__offer-status--${offer.status}`]"></div>

    <div class="mz-offer-card__wrapper">
      <mz-offer-card-normal :offer="offer" />

      <mz-offer-card-extended v-show="extendedCard"
                              @handleClick="handleClick(offer.uuid)"
                              @emitImagePreview="emitImagePreview"
                              :offer="offer" />
    </div>

    <div class="mz-offer-card__offer-status"
         :class="[`mz-offer-card__offer-status--${offer.status}`]">

    </div>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from 'vue-property-decorator';
import mzSelect                       from '@/components/form/select/select.component.vue';
import mzOption                       from '@/components/form/option/option.component.vue';
import mzTag                          from '@/components/tag/tag.component.vue';
import mzOfferCardCarousel            from '@/views/offers-list/components/offer-card/offer-card-extended/offer-card-carousel.component.vue';
import mzOfferCardExtended            from '@/views/offers-list/components/offer-card/offer-card-extended/offer-card-extended.component.vue';
import mzOfferCardNormal              from '@/views/offers-list/components/offer-card/offer-card-normal/offer-card-normal.component.vue';
import router                         from '@/router';
import { IOffer }                     from '@/views/offers-list/store/offers-list.interface';

@Component({
  components: {
    mzOfferCardNormal,
    mzOfferCardExtended,
    mzOfferCardCarousel,
    mzSelect,
    mzOption,
    mzTag,
  },
})
export default class mzOfferCard extends Vue {
  @Prop(Object) public readonly offer!: IOffer;
  @Prop(Boolean) public readonly imagePreviewVisible!: boolean;
  public extendedCard: boolean = false;

  @Emit('imagePreview')
  public emitImagePreview(index: number): number {
    return index;
  }

  @Emit('activeCard')
  public emitActiveCard(): number {
    return this.offer.uuid;
  }

  public handleFocus(): void {
    this.extendedCard = true;
  }

  public handleFocusOut(relatedElement: HTMLElement): void {
    this.extendedCard = this.imagePreviewVisible || (relatedElement && relatedElement.id === 'related-button');
  }

  public handleClick(uuid: string): void {
    router.push({ name: 'Offer detail', params: { uuid } });
  }
}
</script>


<style lang="scss"
       scoped>

.mz-offer-card {
  max-height: 10rem;
  background: var(--white);
  display: flex;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid transparent;
  transition: var(--transition-offer-card);
  margin-bottom: 2rem;

  &--extended-lookingFor,
  &--extended-create {
    max-height: 100rem;
  }

  &--extended-lookingFor {
    border: 1px solid var(--thirth-color);
  }

  &--extended-create {
    border: 1px solid var(--secondary-color);
  }

  &:hover {
    box-shadow: 0 0 1.5rem 0 var(--gray-500);
    cursor: pointer;
  }

  &--lookingFor {
    &:hover {
      border: 1px solid var(--thirth-color);
    }
  }

  &--create {
    &:hover {
      border: 1px solid var(--secondary-color);
    }
  }

  &:focus {
    outline: none;

    .mz-offer-card--lookingFor {
      border: 1px solid var(--thirth-color);
    }

    .mz-offer-card--create {
      border: 1px solid var(--secondary-color);
    }
  }

  &__offer-status {
    width: .8rem;

    &--lookingFor {
      background-color: var(--thirth-color);
    }

    &--create {
      background-color: var(--secondary-color);
    }
  }

  &__wrapper {
    width: 100%;
  }

}
</style>
