<template>
  <div class="mz-safety-rules">
    <span class="mz-safety-rules__title">{{ $t(`rules.title`) }}</span>
    <div class="mz-safety-rules__container">

      <div class="mz-safety-rules__container__link">
        <div class="bar"></div>
        <span class="text">{{ $t(`rules.priceToLow`) }}</span>
      </div>

      <div class="mz-safety-rules__container__link">
        <div class="bar"></div>
        <span class="text">{{ $t(`rules.externalLink`) }}</span>
      </div>

      <div class="mz-safety-rules__container__link">
        <div class="bar"></div>
        <span class="text">{{ $t(`rules.personalPickup`) }}</span>
      </div>

      <div class="mz-safety-rules__container__link">
        <div class="bar"></div>
        <span class="text">{{ $t(`rules.checkProduct`) }}</span>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class mzSafetyRules extends Vue {
}
</script>

<style lang="scss"
       scoped>
.mz-safety-rules {
  background: var(--white);
  width: 32rem;
  padding: 2rem;
  height: max-content;
  border-radius: 2px;

  &__title {
    text-align: center;
    display: block;
    font-size: 2.2rem;
    font-weight: var(--font-medium);
  }

  &__container {
    margin-top: 4rem;

    &__link {
      font-size: 1.6rem;
      color: var(--black);
      margin: 1rem 0 3rem;
      display: flex;

      .bar {
        min-width: 1rem;
        min-height: max-content;
        margin-right: 1rem;
        background: var(--primary-color);
        border-right: 2px;
      }
    }
  }
}

@include respond-to(tablet) {
  .mz-safety-rules {
    width: 100%;
  }
}

@include respond-to(mobile) {
  .mz-safety-rules {
    width: 100%;
  }
}
</style>