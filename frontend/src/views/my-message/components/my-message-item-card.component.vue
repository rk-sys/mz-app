<template>
  <div class="mz-my-message-item-card"
       @click="goToMessageDetail(item.uuid)">

    <div class="mz-my-message-item-card__picture">
      <img class="picture"
           :src="item.image"
           :alt="item.title" />
    </div>

    <div class="mz-my-message-item-card__info">
      <h2 class="mz-my-message-item-card__info__title">
        {{item.title}}
      </h2>
      <p class="mz-my-message-item-card__info__description">
        {{item.description}}
      </p>
      <p class="mz-my-message-item-card__info__price">
        {{item.price}} {{item.currency}}
      </p>
    </div>

    <div class="mz-my-message-item-card__action">
      <span class="value">{{item.quantityChat}}</span>

      <div class="icon icon-chat--blue"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import router                   from '@/router';

@Component({
  components: {},
})
export default class mzUserItems extends Vue {
  @Prop(Object) public item!: any;

  public goToMessageDetail(uuid: string): void {
    router.push({ name: 'Message detail', params: {uuid} });
  }
}
</script>

<style lang="scss"
       scoped>

.mz-my-message-item-card {
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
    border: 1px solid var(--secondary-color);
    transition: var(--transition-product-card);
  }

  &__picture {
    width: 20rem;
    height: 15rem;

    .picture {
      object-fit: cover;
      width: 20rem;
      height: 15rem;
      border-radius: 2px;
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
    align-items: center;
    padding: .5rem;

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
  .mz-my-message-item-card {
    flex-direction: column;

    &__picture {
      width: 100%;
      height: 25rem;

      .picture {
        object-fit: cover;
        width: 100%;
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
