<template>
  <div class="mz-steps">

    <div class="mz-steps__wrapper"
         v-for="(step, index) in labels">

      <div class="mz-steps__circle"
           :class="{'mz-steps__circle--active': index === active,
                    'mz-steps__circle--done': index < active}">

        <div v-if="index !== 0" class="mz-steps__line"
             :class="{'mz-steps__line--green': index <= active}"></div>

        <template v-if="index < active">
          <div class="mz-steps__circle__icon icon-success-green"></div>
        </template>

        <template v-else>
          <span class="step-number">
            {{ index + 1 }}
          </span>
        </template>

      </div>
      <p class="mz-steps__label"
         :class="{'mz-steps__label--active': index === active,
                    'mz-steps__label--done': index < active}">
        {{ step }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Mixins, Prop } from 'vue-property-decorator';
import mzTransparentWrapper        from '@/components/transparent-component.mixin';

@Component({
  components: {},
})
export default class mzSteps extends Mixins(mzTransparentWrapper) {
  @Prop(Array) public readonly labels!: string[];
  @Prop(Number) public readonly active!: number;
}
</script>

<style lang="scss">

@import '~element-ui/lib/theme-chalk/steps.css';

.mz-steps {
  display: flex;
  justify-content: space-around;
  align-items: center;

  &__wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
    width: 16.5rem;
  }

  &__line {
    position: absolute;
    width: 13rem;
    height: 2px;
    background-color: var(--gray-500);
    left: -7.5rem;
    z-index: 0;

    &--green {
      background-color: var(--primary-color);
    }
  }

  &__circle {
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    border: 2px solid var(--gray-500);
    color: var(--white);
    background-color: var(--background-color);

    .step-number {
      width: 3.4rem;
      height: 3.4rem;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      color: var(--gray-500);
    }

    &--active {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 4.5rem;
      height: 4.5rem;
      border-radius: 50%;
      background-color: var(--primary-color);
      color: var(--white);
      border: none;

      .step-number {
        width: 3.4rem;
        height: 3.4rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border: .22rem solid var(--white);
        border-radius: 50%;
        font-weight: var(--font-bold);
        color: var(--white);
      }
    }

    &--done {
      border: none;
    }

    &__icon {
      width: 100%;
      height: 100%;
      border: none
    }
  }

  &__label {
    text-align: center;
    font-weight: var(--font-medium);
    color: var(--gray-500);

    &--active,
    &--done {
      font-weight: var(--font-bold);
      color: var(--primary-color);
    }

    &--done {
      font-weight: var(--font-bold);
      color: var(--primary-color);
    }
  }
}

@media screen and (max-width: 768px) and (min-width: 560px) {
  .mz-steps {
    &__label {
      font-size: 1.8rem;
    }

    &__wrapper {
      width: 20rem;
    }

    &__line {
      left: -7rem;
    }
  }
}

@media screen and (max-width: 560px) and (min-width: 300px) {
  .mz-steps {
    flex-direction: column;

    &__wrapper {
      flex-direction: row;
      width: 40rem;
      justify-content: flex-start;
    }

    &__line {
      display: none;
    }

    &__circle {
      width: 5rem;
      height: 5rem;
    }

    &__label {
      font-size: 2.2rem;
      margin: 1.6rem 0 1.6rem 4rem;
    }

    .step-number {
      width: 4.5rem;
      height: 4.5rem;
      font-size: 2.2rem;
    }
  }
}
</style>
