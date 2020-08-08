<template>
  <div class="mz-user-item">
    <div @click="goToProductDetail(item)"
         class="mz-user-item__picture">

      <img :alt="item.title"
           :src="item.avatar"
           class="picture" />
    </div>
    <div @click="goToProductDetail(item)"
         class="mz-user-item__info">

      <h2 class="mz-user-item__info__title">
        {{item.title}}
      </h2>
      <p class="mz-user-item__info__description">
        {{item.description}}
      </p>
      <p class="mz-user-item__info__price">
        {{item.price}} {{item.currency}}
      </p>
    </div>

    <div class="mz-user-item__action">
      <div :class="{'icon-edit': !isHoverEdit,
                    'icon-edit--primary': isHoverEdit}"
           @click="goToEdit(item)"
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
import { Component, Prop, Vue }          from 'vue-property-decorator';
import { namespace }                     from 'vuex-class';
import router                            from '@/router';
import { IDeleteItem, IUserItem }        from '../store/my-items.interface';
import mzUserAdministrationMyItemsModule from '../store/my-items.module';

const LOCAL_STORE: string = 'userAdministrationMyItems';
const local = namespace(LOCAL_STORE);

@Component({
  components: {},
})
export default class mzUserItems extends Vue {
  @local.State((state: mzUserAdministrationMyItemsModule) => state.isModalOpen) public isModalOpen!: boolean;
  @local.State((state: mzUserAdministrationMyItemsModule) => state.deleteItem) public deleteItem!: IDeleteItem;
  @local.Mutation public setIsModalOpen!: (payload: boolean) => void;
  @local.Mutation public setDeleteItem!: (payload: IUserItem) => void;
  @Prop(Object) public item!: IUserItem;

  public isHoverEdit: boolean = false;
  public isHoverDelete: boolean = false;

  public emitDeleteItem(arg: IUserItem): void {
    this.setDeleteItem(arg);
    this.setIsModalOpen(true);
  }

  public goToEdit(arg: IUserItem): void {
    router.push({ name: 'User administration edit product', params: { uuid: arg.uuid } });
  }

  public goToProductDetail(arg: IUserItem): void {
    router.push({ name: 'Product detail', params: { uuid: arg.uuid } });
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
    border: 1px solid var(--primary-color);
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
      cursor: pointer;
      margin-right: 3rem;
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

      &__price {
        font-weight: var(--font-bold);
        color: var(--primary-color);
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
      margin-left: 0;
      padding-bottom: 2rem;

      .icon {
        height: 3rem;
        width: 3rem;
        cursor: pointer;
        margin-right: 0;
      }

      .icon-edit,
      .icon-edit--primary {
        margin-right: 3rem;
      }
    }
  }
}
</style>
