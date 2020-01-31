<template>
  <div class="mz-user-item"
       :class="[ {'mz-user-item--list-view': isListViewOn},
                  `background--${item.status}` ]">

    <div class="mz-user-item__background">
      <span class="mz-user-item__status"
            :class="[ `mz-user-item__status--${ item.status }` ]">

        {{ $t(`item.status.${ item.status }`) }}
      </span>

      <span class="mz-user-item__price"
            v-if="!isListViewOn">

        {{ item.price }}$
      </span>

      <img class="mz-user-item__avatar"
           :src="item.avatar"
           alt="item">
    </div>
    <div class="mz-user-item__content">
      <div class="mz-user-item__text-wrapper">
        <span class="mz-user-item__title">
        {{ item.name }}
        </span>

        <span class="mz-user-item__description"
              v-if="isListViewOn">

        {{ item.description }}
        </span>

        <span class="mz-user-item__price"
              v-if="isListViewOn">

          {{ item.price }}$
        </span>
      </div>

      <div class="mz-user-item__link-wrapper">
        <router-link class="mz-user-item__link mz-user-item__link--details"
                     v-if="!isListViewOn"
                     to="home">

          <div class="icon icon-edit--white"></div>
        </router-link>

        <router-link class="mz-user-item__link mz-user-item__link--edit"
                     to="home">

          <div class="icon icon-eye--white"
               v-if="!isListViewOn"></div>

          <div class="icon icon-eye"
               v-else></div>
        </router-link>

        <router-link class="mz-user-item__link mz-user-item__link--delete"
                     to="home">

          <div class="icon icon-delete--white"
               v-if="!isListViewOn"></div>

          <div class="icon icon-delete"
               v-else></div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { IUserItem }            from '@/views/user-account/store/user-account.interface';

@Component({
  components: {},
})
export default class mzUserItems extends Vue {
  @Prop(Object) public item!: IUserItem;
  @Prop(Boolean) public isListViewOn!: boolean;
}
</script>

<style lang="scss"
       scoped>

.background {
  &--active {
    background: var(--primary-color);
  }

  &--ended {
    background: var(--gray-900);
  }

  &--in-progress {
    background: var(--secondary-color);
  }
}

.mz-user-item {
  &:hover {
    box-shadow: 0 0 1rem 0 var(--gray-450);
  }

  &__background {
    height: 15rem;
    position: relative;
  }

  &__status,
  &__price {
    height: 2rem;
    font-size: 1.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    border-radius: 0 .3rem .3rem 0;
  }

  &__status {
    color: var(--white);
    min-width: 8rem;
    top: .5rem;
    padding: 0 .8rem;

    &--active {
      background-color: var(--primary-color);
    }

    &--in-progress {
      background-color: var(--secondary-color);
    }

    &--ended {
      background-color: var(--gray-900);
    }
  }

  &__price {
    min-width: 5.2rem;
    top: 3rem;
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
    height: 8.5rem;
    width: 100%;
    padding: 1rem;
  }

  &__title {
    font-size: 1.6rem;
    width: 25rem;
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: var(--white)
  }

  &__link-wrapper {
    margin: 1rem;
    display: flex;
    justify-content: space-evenly;
  }

  &__link {
    text-decoration: none;

    &--details,
    &--edit,
    &--delete {
      .icon {
        height: 2.5rem;
        width: 2.5rem;
        cursor: pointer;
      }
    }
  }

  &--list-view {
    display: flex;
    height: 10rem;

    .mz-user-item {
      width: 100%;

      &__background {
        height: 100%;
      }

      &__status {
        transform: rotate(-90deg);
        border-radius: 0;
        position: absolute;
        top: 4rem;
        left: -4rem;
        width: 10rem;
      }

      &__avatar {
        width: 15rem;
      }

      &__content {
        height: 100%;
        padding: 1rem 2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: var(--white);
      }

      &__text-wrapper {
        align-self: flex-start;
      }

      &__title {
        width: auto;
        height: 100%;
        white-space: unset;
        margin-bottom: .6rem;
        color: var(--black);
      }

      &__description {
        font-size: 1.2rem;
        font-weight: var(--font-light);
        width: 40rem;
        display: block;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      &__price {
        margin-top: 2rem;
        position: unset;
        font-size: 1.6rem;
        justify-content: flex-start;
      }

      &__link-wrapper {
        margin: 0;
      }

      &__link {
        margin: 0 2rem;
      }
    }
  }
}

@include respond-to(tablet) {
  .mz-user-item {
    &__content {
      height: 10rem;
    }

    &__background {
      height: 30rem;
    }

    &__status {
      top: 1rem;
      min-width: 12rem;
      height: 3rem;
      font-size: 2.2rem;
    }

    &__price {
      top: 5rem;
      font-size: 2.2rem;
      width: 7.5rem;
      height: 3rem;
    }

    &__title {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      width: 38rem;
    }

    &__title,
    &__link {
      font-size: 2.2rem;

      &--details,
      &--edit,
      &--delete {
        .icon {
          height: 3.5rem;
          width: 3.5rem;
        }
      }
    }
  }
}

@include respond-to(mobile) {
  .mz-user-item {
    &__content {
      height: 12rem;
    }

    &__background {
      height: 30rem;
    }

    &__status {
      top: 1rem;
      min-width: 12rem;
      height: 3rem;
      font-size: 2rem;
    }

    &__price {
      top: 5rem;
      font-size: 2rem;
      width: 7.5rem;
      height: 3rem;
    }

    &__title {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      width: 40rem;
    }

    &__title,
    &__link {
      font-size: 2.2rem;

      &--details,
      &--edit,
      &--delete {
        .icon {
          height: 3.5rem;
          width: 3.5rem;
        }
      }
    }
  }
}
</style>
