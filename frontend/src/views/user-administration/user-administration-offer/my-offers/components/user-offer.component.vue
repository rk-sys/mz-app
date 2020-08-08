<template>
  <div class="mz-user-offer">
    <div @click="goToProductDetail(item.id)"
         class="mz-user-offer__picture">

      <div :class="{'buy' : item.type === 'buy',
                       'crafting' : item.type === 'crafting'}"
           class="mz-user-offer__picture__type">

        <span class="mz-user-offer__picture__type__label">
                  {{ $t(`item.${item.type}`) }}</span>
      </div>

      <img :alt="item.title"
           :src="item.avatar"
           class="picture" />
    </div>

    <div @click="goToProductDetail(item.id)"
         class="mz-user-offer__info">

      <h2 class="mz-user-offer__info__title">
        {{item.title}}
      </h2>

      <p class="mz-user-offer__info__description">
        {{item.description}}
      </p>
      <p class="mz-user-offer__info__price">
        {{item.price}} {{item.currency}}
      </p>
    </div>

    <div class="mz-user-offer__action">
      <div :class="{'icon-edit': !isHoverEdit,
                    'icon-edit--primary': isHoverEdit}"
           @mouseenter="isHoverEdit = true"
           @mouseleave="isHoverEdit = false"
           class="icon"></div>

      <div :class="{'icon-delete': !isHoverDelete,
                    'icon-delete--red': isHoverDelete}"
           @click="emitDeleteItem(item)"
           @mouseenter="isHoverDelete = true"
           @mouseleave="isHoverDelete = false"
           class="icon"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue }      from 'vue-property-decorator';
import { namespace }                 from 'vuex-class';
import router                        from '@/router';
import { IDeleteOffer, IUserOffers } from '../store/my-offer.interface';
import mzUserOfferListModule         from '../store/my-offer.module';

const LOCAL_STORE: string = 'mzOfferHistory';
const local = namespace(LOCAL_STORE);

@Component({
  components: {},
})
export default class mzUserOffer extends Vue {
  @local.State((state: mzUserOfferListModule) => state.isModalOpen) public isModalOpen!: boolean;
  @local.State((state: mzUserOfferListModule) => state.deleteOffer) public deleteItem!: IDeleteOffer;
  @local.Mutation public setIsModalOpen!: (payload: boolean) => void;
  @local.Mutation public setDeleteOffer!: (payload: IUserOffers) => void;
  @Prop(Object) public item!: IUserOffers;

  public isHoverEdit: boolean = false;
  public isHoverDelete: boolean = false;

  public emitDeleteItem(arg: IUserOffers): void {
    this.setDeleteOffer(arg);
    this.setIsModalOpen(true);
  }

  public goToProductDetail(uuid: string): void {
    router.push({ name: 'Product detail', params: { uuid } });
  }
}
</script>

<style lang="scss"
       scoped>

.mz-user-offer {
  width: 100%;
  background: var(--white);
  margin-bottom: 1rem;
  display: flex;
  border-radius: 2px;
  align-items: center;
  border: 1px solid var(--white);

  &:hover {
    box-shadow: 0 0 1.5rem 0 var(--gray-500);
    transition: var(--transition-product-card);
    border: 1px solid var(--primary-color);
  }

  &__picture {
    width: 23rem;
    height: 15rem;
    cursor: pointer;
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
    cursor: pointer;

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
      color: var(--primary-color);
      font-size: 2.2rem;
      margin: 1rem 0 0 0;
    }
  }

  &__action {
    display: flex;
    margin-left: 2rem;

    .icon {
      height: 2.9rem;
      width: 3.1rem;
      margin-right: 3rem;
      cursor: pointer;
    }
  }
}


@include respond-to(mobile) {
  .mz-user-offer {
    flex-direction: column;

    &__picture {
      width: 100%;
      height: 25rem;
      cursor: pointer;

      .picture {
        object-fit: cover;
        width: calc(100% - 3rem);
        height: 25rem;
        border-radius: 2px;
      }
    }

    &__info {
      margin: 0 1rem;
      cursor: pointer;
    }

    &__action {
      margin-left: 0;
      padding-bottom: 2rem;

      .icon {
        height: 3rem;
        width: 3rem;
        cursor: pointer;
      }

      .icon-edit--primary,
      .icon-edit {
        margin-right: 3rem;
      }
    }
  }
}
</style>
