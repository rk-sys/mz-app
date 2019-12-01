<template>
  <div class="box-with-title">
    <div class="box-with-title__text"
         v-if="title">

      {{title}}

      <mz-tooltip :content="tooltipMessage"
                  placement="top">

        <div class="box-with-title__icon icon-help--green"
             v-if="hint"></div>
      </mz-tooltip>

      <span v-if="subTitle"
            class="subtitle"
            :class="{'subtitle--error': !addColor}">( {{subTitle}} )</span>
    </div>

    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import mzTooltip                from '@/components/tooltip/tooltip.component.vue';

@Component({
  components: {
    mzTooltip,
  },
})
export default class mzBoxWithTitle extends Vue {
  @Prop(String) public readonly title!: boolean;
  @Prop(String) public readonly subTitle!: string;
  @Prop(Boolean) public readonly addColor!: boolean;
  @Prop(Boolean) public readonly hint!: boolean;
  @Prop(String) public readonly tooltipMessage!: string;
}
</script>

<style lang="scss"
       scoped>
.box-with-title {
  background: var(--white);
  padding: 2rem;
  margin-bottom: 5rem;

  &__text {
    display: flex;
    padding: 1rem 0;
    font-weight: 500;
    font-size: 2.2rem;
    margin: 0 3rem;
    align-items: center;

    .subtitle {
      margin-left: 1rem;
      font-size: 1.4rem;
      color: var(--gray-450);
    }

    .subtitle--error {
      color: var(--error);
    }
  }

  &__icon {
    display: inline-block;
    height: 2rem;
    width: 2rem;
    cursor: pointer;
  }
}
</style>
