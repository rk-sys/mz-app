<template>
  <div class="mz-tag"
       :class="{ 'mz-tag--presentation': isPresentation }">

    <span class="mz-tag__text">{{ tag }}</span>

    <span class="mz-tag__remove-button"
          @click="removeTag(index)"
          v-if="!isPresentation">
      x
    </span>
  </div>
</template>

<script lang="ts">
import { Vue }             from 'vue-property-decorator';
import { Component, Prop } from 'vue-property-decorator';

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
    }
  }

  &__text {
    border: 1px solid var(--primary-color);
    border-right: none;
    padding: .5rem 1rem;
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
</style>
