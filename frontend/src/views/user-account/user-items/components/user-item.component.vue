<template>
  <div class="mz-user-item"
       :class="{ 'mz-user-item--list-view': isListViewOn }">

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

          {{ $t(`item.action.details`) }}
        </router-link>
        <router-link class="mz-user-item__link mz-user-item__link--edit"
                     to="home">

          {{ $t(`item.action.edit`) }}
        </router-link>
        <router-link class="mz-user-item__link mz-user-item__link--delete"
                     to="home">

          {{ $t(`item.action.delete`) }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop }        from 'vue-property-decorator';
import { i18n, loadTranslationsAsync } from '@/i18n/i18n';
import Store                           from '@/store/store';
import { Route }                       from 'vue-router';
import { IUserItem }                   from '@/views/user-account/store/user-account.interface';

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
    background-color: var(--white);
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
    background-color: var(--white);
    height: 8.5rem;
    width: 100%;
    padding: 1rem;
  }

  &__title {
    font-size: 1.6rem;
    width: auto;
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  &__link-wrapper {
    margin-top: 2.2rem;
    display: flex;
    justify-content: space-between;
  }

  &__link {
    text-decoration: none;

    &--details {
      color: var(--black);

      &:hover {
        border-bottom: 0.1rem solid var(--black);
      }
    }

    &--edit {
      color: var(--primary-color);

      &:hover {
        border-bottom: .1rem solid var(--primary-color);
      }
    }

    &--transaction {
      color: var(--secondary-color);
    }

    &--history {
      color: var(--gray-900);
    }

    &--delete {
      color: var(--error);

      &:hover {
        border-bottom: 0.1rem solid var(--error);
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
      }

      &__text-wrapper {
        align-self: flex-start;
      }

      &__title {
        width: auto;
        height: 100%;
        white-space: unset;
        margin-bottom: .6rem;
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

@media screen and (max-width: 768px) and (min-width: 426px) {
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
    }
  }
}

@media screen and (max-width: 425px) and (min-width: 300px) {
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
    }
  }
}
</style>
