<template>
  <div class="box-with-title">
    <span class="box-with-title__text">
      {{title}}
      <span v-if="subTitle"
            class="subtitle"
            :class="{'subtitle--error': !addColor}">( {{subTitle}} )</span>
    </span>

    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class mzBoxWithTitle extends Vue {
  @Prop(String) public readonly title!: boolean;
  @Prop(String) public readonly subTitle!: string;
  @Prop(Boolean) public readonly addColor!: boolean;
}
</script>

<style lang="scss"
       scoped>
.box-with-title {
  background: var(--white);
  padding: 2rem;
  margin-bottom: 5rem;

  &__text {
    display: block;
    padding: 1rem 0;
    font-weight: 500;
    font-size: 2.2rem;
    margin: 0 3rem;

    .subtitle {
      font-size: 1.4rem;
      color: var(--gray-450);
    }

    .subtitle--error {
      color: var(--error);
    }
  }
}
</style>
