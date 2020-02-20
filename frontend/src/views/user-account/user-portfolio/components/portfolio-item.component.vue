<template>
  <div class="mz-portfolio-item">
    <div class="mz-portfolio-item__background">
      <img class="mz-portfolio-item__avatar"
           alt="item"
           :src="item.picture.url">
    </div>

    <div class="mz-portfolio-item__content">
      <div class="mz-portfolio-item__text-wrapper">
        <span class="mz-portfolio-item__title">
        {{ item.title }}
        </span>
      </div>

      <div class="mz-portfolio-item__link-wrapper">
        <div class="mz-portfolio-item__link mz-portfolio-item__link--details"
             @click="openDialogWithItem(item)">

          <div class="icon icon-edit--white"></div>
        </div>

        <div class="mz-portfolio-item__link mz-portfolio-item__link--delete"
             @click="removePortfolioItem(item)">

          <div class="icon icon-delete--white"></div>
        </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop }      from 'vue-property-decorator';
import { namespace }                 from 'vuex-class';
import { IItemPortfolio, IUserItem } from '@/views/user-account/store/user-account.interface';
import mzUserAccountModule           from '@/views/user-account/store/user-account.module';


const LOCAL_STORE: string = 'userAccount';
const local = namespace(LOCAL_STORE);

@Component({
  components: {},
})
export default class mzPortfolioItem extends Vue {
  @Prop(Object) public item!: IUserItem;

  @local.State((state: mzUserAccountModule) => state.dialogVisible) public isDialogVisible!: boolean;
  @local.Mutation public setDialogVisible!: (status: boolean) => void;
  @local.Mutation public setMzNewItemPortfolio!: (payload: IItemPortfolio) => void;
  @local.Mutation public setMzRemovedItemFromPortfolio!: (payload: IItemPortfolio) => void;
  @local.Mutation public setMzRemoveModalItemPortfolio!: (payload: boolean) => void;

  set dialogVisible(status: boolean) {
    this.setDialogVisible(status);
  }

  get dialogVisible(): boolean {
    return this.isDialogVisible;
  }

  public openDialogWithItem(item: IItemPortfolio): void {
    this.setMzNewItemPortfolio(item);
    this.dialogVisible = true;
  }

  public removePortfolioItem(item: IItemPortfolio): void {
    this.setMzRemovedItemFromPortfolio(item);
    this.setMzRemoveModalItemPortfolio(true);
  }
}
</script>

<style lang="scss"
       scoped>

.mz-portfolio-item {
  position: relative;

  &:hover {
    box-shadow: 0 0 1rem 0 var(--gray-450);

    .mz-portfolio-item__content {
      height: 8rem;
    }
  }

  &__background {
    height: 25rem;
    position: relative;
  }

  &__avatar {
    height: 100%;
    width: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }

  &__content {
    font-size: 1.4rem;
    font-weight: var(--font-medium);
    height: 4rem;
    width: 100%;
    padding: 1.2rem .6rem;
    color: var(--white);
    background-color: var(--primary-color);
    position: absolute;
    left: 0;
    bottom: 0;
    transition: .2s ease-in-out;
    overflow: hidden;
  }

  &__title {
    font-size: 1.6rem;
    width: 25rem;
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  &__link-wrapper {
    margin-top: 1.5rem;
    display: flex;
    justify-content: center;
  }

  &__link {
    text-decoration: none;
    margin: 0 1.6rem;

    &--details,
    &--edit,
    &--delete {
      .icon {
        height: 2.2rem;
        width: 2.2rem;
        cursor: pointer;
      }
    }
  }
}

@media only screen and (max-width: 768px) and (min-width: 426px) {
  .mz-portfolio-item {

    &:hover {
      .mz-portfolio-item__content {
        height: 10rem;
      }
    }

    &__background {
      height: 30rem;
    }

    &__content {
      height: 10rem;
      position: relative;
    }

    &__title {
      font-size: 2rem;
      width: 40rem;
    }

    &__link {
      .icon {
        width: 3.5rem;
        height: 3.5rem;
      }
    }
  }
}

@media only screen and (max-width: 425px) {
  .mz-portfolio-item {

    &__background {
      height: 30rem;
    }

    &__content {
      height: 10rem;
      position: relative;
    }

    &__title {
      font-size: 2rem;
      width: 40rem;
    }

    &__link {
      .icon {
        width: 3.5rem;
        height: 3.5rem;
      }
    }
  }
}
</style>
