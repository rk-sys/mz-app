<template>
  <div class="mz-user-item">
    <div class="mz-user-item__background">
      <div class="mz-user-item__status"
           :class="[ `mz-user-item__status--${item.status}` ]">

        {{ item.status }}
      </div>

      <div class="mz-user-item__price">{{ item.price }}$</div>

      <img class="mz-user-item__avatar"
           :src="item.avatar"
           alt="item">
    </div>
    <div class="mz-user-item__content">
      <span class="mz-user-item__title">{{ item.name }}, {{ item.description }}</span>

      <div class="mz-user-item__wrapper">
        <router-link class="mz-user-item__link mz-user-item__link--details"
                     to="home">

          szczegóły
        </router-link>
        <router-link class="mz-user-item__link mz-user-item__link--edit"
                     to="home">

          edytuj
        </router-link>
        <router-link class="mz-user-item__link mz-user-item__link--delete"
                     to="home">

          usuń
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class mzUserItems extends Vue {
  @Prop(Object) public item!: any;
}
</script>

<style lang="scss"
       scoped>

.mz-user-item {

  &__background {
    height: 15rem;
    background-color: #0CCE92;
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
    border-radius: 0 0.3rem 0.3rem 0;
  }

  &__status {
    color: var(--white);
    min-width: 8rem;
    top: 0.5rem;
    padding: 0 0.8rem;

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
    height: 7rem;
    max-width: 27rem;
    display: block;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    padding: 1rem;
  }

  &__wrapper {
    margin-top: 1rem;
    display: flex;
    justify-content: space-between;
  }
}
</style>
