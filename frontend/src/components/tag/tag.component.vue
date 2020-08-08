<template>
  <div :class="{ 'mz-tag--presentation': isPresentation }"
       class="mz-tag">

    <span class="mz-tag__text">{{ tag }}</span>

    <span @click="removeTag(index)"
          class="mz-tag__remove-button"
          v-if="!isPresentation">
      x
    </span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class mzTag extends Vue {
  @Prop(String) public tag!: string;
  @Prop(Number) public index!: number;
  @Prop(Function) public removeTag!: any;
  @Prop(Boolean) public isPresentation!: boolean;
}
</script>

<style lang="scss"
       scoped>

.mz-tag {
  color: var(--primary-color);
  min-width: 6rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 1.6rem;
  margin-right: 2rem;
  margin-bottom: 1rem;
  user-select: none;

  &__remove-button {
    border: 1px solid var(--primary-color);
    border-top-right-radius: 2px;
    border-bottom-right-radius: 2px;
    border-left: none;
    font-size: 1.6rem;
    font-weight: var(--font-regular);
    padding: .5rem 1rem;
    cursor: pointer;

    &:hover {
      border: 1px solid var(--error);
      border-left: none;
      color: var(--white);
      background-color: var(--error);
      border-top-left-radius: 0;
      border-top-right-radius: 0;
    }
  }

  &__text {
    border: 1px solid var(--primary-color);
    border-right: none;
    border-top-left-radius: 2px;
    border-bottom-left-radius: 2px;
    padding: .5rem;

    @media screen and (max-width: 560px) {
      font-size: 2.4rem;
    }
  }

  &--presentation {
    text-align: center;

    .mz-tag__text {
      border-right: 1px solid var(--primary-color);
      background-color: var(--primary-color);
      color: var(--white);
      width: 100%;
    }
  }
}

@media screen and (max-width: 768px) and (min-width: 426px) {
  .mz-tag {
    &__remove-button,
    &__text {
      font-size: 2.2rem;
    }

    &--presentation {
      &__text {
        font-size: 2.2rem;
      }
    }
  }
}

@media screen and (max-width: 425px) {
  .mz-tag {
    &__remove-button,
    &__text {
      font-size: 1.8rem;
    }

    &--presentation {
      &__text {
        font-size: 1.8rem;
      }
    }
  }
}
</style>
