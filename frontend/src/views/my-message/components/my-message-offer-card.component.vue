<template>
  <div class="mz-my-message-offer-card"
       @click="goToProductDetail(offer.uuid)">

    <div class="mz-my-message-offer-card__picture">
      <div class="mz-my-message-offer-card__picture__type"
           :class="{'buy' : offer.type === 'buy',
                       'crafting' : offer.type === 'crafting'}">

        <span class="mz-my-message-offer-card__picture__type__label">
                  {{ $t(`offer.${offer.type}`) }}</span>
      </div>

      <img class="picture"
           :src="offer.image"
           :alt="offer.title" />
    </div>

    <div class="mz-my-message-offer-card__info">

      <h2 class="mz-my-message-offer-card__info__title">
        {{offer.title}}
      </h2>

      <p class="mz-my-message-offer-card__info__description">
        {{offer.description}}
      </p>
      <p class="mz-my-message-offer-card__info__price">
        {{offer.price}} {{offer.currency}}
      </p>
    </div>

    <div class="mz-my-message-offer-card__action">
      <span class="value">{{offer.quantityChat}}</span>

      <div class="icon icon-chat--blue"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { IMessageOffer }        from '@/views/my-message/store/my-message.interface';
import router                   from '@/router';

@Component({
  components: {},
})
export default class mzUserOffer extends Vue {
  @Prop(Object) public offer!: IMessageOffer;

  public goToProductDetail(uuid: string): void {
    router.push({ name: 'Message detail', params: {uuid} });
  }
}
</script>

<style lang="scss"
       scoped>

.mz-my-message-offer-card {
  width: 100%;
  background: var(--white);
  margin-bottom: 1rem;
  display: flex;
  border-radius: 2px;
  align-items: center;
  border: 1px solid var(--white);
  cursor: pointer;

  &:hover {
    box-shadow: 0 0 1.5rem 0 var(--gray-500);
    transition: var(--transition-product-card);
    border: 1px solid var(--secondary-color);
  }

  &__picture {
    width: 23rem;
    height: 15rem;
    display: flex;

    .picture {
      object-fit: cover;
      width: 20rem;
      height: 15rem;
      border-radius: 2px;
    }

    &__type {
      width: 3rem;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 2px;

      &.buy {
        background: var(--thirth-color);
      }

      &.crafting {
        background: var(--secondary-color);
      }

      &__label {
        display: block;
        transform: rotate(-90deg);
        text-align: center;
        font-weight: var(--font-medium);
        color: var(--white);
      }
    }
  }

  &__info {
    margin-left: 3rem;

    &__title {
      font-size: 1.8rem;
      text-overflow: ellipsis;
      overflow: hidden;
      max-width: 60rem;
      height: 1.2em;
      white-space: nowrap;
    }

    &__description {
      margin: 0;
      height: 4rem;
      overflow: hidden;
    }

    &__price {
      font-weight: var(--font-bold);
      color: var(--secondary-color);
      font-size: 2.2rem;
      margin: 1rem 0 0 0;
    }
  }

  &__action {
    display: flex;
    margin-left: 2rem;

    .value {
      font-size: 2rem;
      margin-right: 1rem;
      font-weight: var(--font-medium);
      color: var(--blue);
    }

    .icon {
      height: 2.9rem;
      width: 3.1rem;
      margin-right: 3rem;
    }
  }
}


@include respond-to(mobile) {
  .mz-my-message-offer-card {
    flex-direction: column;

    &__picture {
      width: 100%;
      height: 25rem;

      .picture {
        object-fit: cover;
        width: calc(100% - 3rem);
        height: 25rem;
        border-radius: 2px;
      }
    }

    &__info {
      margin: 0 1rem;
    }

    &__action {
      margin-left: 0;
      padding-bottom: 2rem;

      .icon {
        height: 3rem;
        width: 3rem;
      }

      .icon-edit--primary,
      .icon-edit {
        margin-right: 3rem;
      }
    }
  }
}
</style>
