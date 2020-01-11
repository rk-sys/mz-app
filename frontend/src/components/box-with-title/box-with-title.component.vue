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

    <slot />
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
    font-size: 2.4rem;
    margin: 0 3rem;
    align-items: center;

    .subtitle {
      font-size: 2rem;
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
    margin: 0 1.5rem 0 .5rem;
  }
}


@media screen and (max-width: 425px) {
  .box-with-title {
    &__text {
      flex-wrap: wrap;
      margin: 0 1rem 0 0;
      align-items: center;

      .subtitle {
        margin-top: .6rem;
      }
    }
  }
}
</style>
