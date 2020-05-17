<template>
  <div class="mz-user-item">
    <div class="mz-user-item__picture"
         @click="goToProductDetail(item.id)">

      <img class="picture"
           :src="item.avatar"
           :alt="item.title" />
    </div>
    <div class="mz-user-item__info"
         @click="goToProductDetail(item.id)">

      <h2 class="mz-user-item__info__title">
        {{item.title}} -

        <span v-if="item.status === 'cancelled'"
              class="status cancelled">

        {{ $t(`item.${item.status}`) }}
      </span>

        <span v-else
              class="status completed">
        {{ $t(`item.${item.status}`) }}
      </span>
      </h2>

      <p class="mz-user-item__info__description">
        {{item.description}}
      </p>
      <p class="mz-user-item__info__price">
        {{item.price}} {{ $t(`item.currency`) }}

        <span class="currency">
          {{item.currency}}
        </span>
      </p>
    </div>
    <div class="mz-user-item__action">
      <div class="icon"
           :class="{'icon-chat': !isHoverChat,
                    'icon-chat--blue': isHoverChat}"
           @mouseenter="isHoverChat = true"
           @mouseleave="isHoverChat = false"></div>

      <div class="icon"
           @click="emitDeleteItem(item)"
           :class="{'icon-delete': !isHoverDelete,
                    'icon-delete--red': isHoverDelete}"
           @mouseenter="isHoverDelete = true"
           @mouseleave="isHoverDelete = false"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop }                     from 'vue-property-decorator';
import { IDeleteItem, IUserItem }                   from '../store/product-history.interface';
import router                                       from '@/router';
import mzUserAdministrationProductHistoryListModule from '../store/product-history.module';
import { namespace }                                from 'vuex-class';

const LOCAL_STORE: string = 'userAdministrationInRealization';
const local = namespace(LOCAL_STORE);

@Component({
  components: {},
})
export default class mzUserItems extends Vue {
  @local.State((state: mzUserAdministrationProductHistoryListModule) => state.isModalOpen) public isModalOpen!: boolean;
  @local.State((state: mzUserAdministrationProductHistoryListModule) => state.deleteItem) public deleteItem!: IDeleteItem;
  @local.Mutation public setIsModalOpen!: (payload: boolean) => void;
  @local.Mutation public setDeleteItem!: (payload: IUserItem) => void;
  @Prop(Object) public item!: IUserItem;

  public isHoverChat: boolean = false;
  public isHoverDelete: boolean = false;

  public emitDeleteItem(arg: IUserItem): void {
    this.setDeleteItem(arg);
    this.setIsModalOpen(true);
  }

  public goToProductDetail(uuid: string): void {
    router.push({ name: 'Product detail', params: { uuid } });
  }
}
</script>

<style lang="scss"
       scoped>

.mz-user-item {
  width: 100%;
  background: var(--white);
  margin-bottom: 1rem;
  display: flex;
  border-radius: 2px;
  align-items: center;
  border: 1px solid var(--white);

  &:hover {
    box-shadow: 0 0 1.5rem 0 var(--gray-500);
    border: 1px solid var(--gray-500);
    transition: var(--transition-product-card);
  }

  &__picture {
    width: 20rem;
    height: 15rem;
    cursor: pointer;

    .picture {
      object-fit: cover;
      width: 20rem;
      height: 15rem;
      border-radius: 2px;
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

    .status {
      width: 20rem;
      bottom: 0;
      background: var(--white);
      font-weight: var(--font-bold);
      text-align: center;

      &.cancelled {
        color: var(--error);
      }

      &.completed {
        color: var(--success)
      }
    }

    &__description {
      margin: 0;
      height: 4rem;
      overflow: hidden;
    }

    &__price {
      font-weight: var(--font-bold);
      color: var(--gray-500);
      font-size: 2.2rem;
      margin: 1rem 0 0 0;

      .currency {
        font-size: 1.8rem;
        font-weight: var(--font-medium);
        color: var(--black);
      }
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
  .mz-user-item {
    flex-direction: column;

    &__picture {
      width: 100%;
      height: 25rem;
      cursor: pointer;

      .picture {
        object-fit: cover;
        width: 100%;
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
