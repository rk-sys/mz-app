<template>
  <div :class="{'box-with-title--hide' : isDisabled}"
       class="box-with-title">

    <div class="box-with-title__header"
         v-if="title">

      <div :class="{'box-with-title__header__circle--disabled' : isDisabled}"
           class="box-with-title__header__circle">

        <div :class="[ iconName ]" class="icon"></div>
      </div>

      <div :class="{'box-with-title__header__title--disabled' : isDisabled}"
           class="box-with-title__header__title">

        <div :class="{'box-with-title__header__title__arrow--disabled' : isDisabled}"
             class="box-with-title__header__title__arrow"></div>
        {{ title }}


        <span :class="{'subtitle--error': !addColor}"
              class="subtitle"
              v-if="subTitle">( {{subTitle}} )</span>

      </div>
    </div>
    <div class="box-with-title__text"
         v-if="title">

      <mz-tooltip :content="tooltipMessage"
                  placement="top">

        <div class="box-with-title__icon icon-help--primary"
             v-if="hint"></div>
      </mz-tooltip>
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
  @Prop(String) public readonly iconName!: string;
  @Prop({ type: Boolean, default: false }) public readonly isDisabled!: boolean;
}
</script>

<style lang="scss"
       scoped>
.box-with-title {
  background: var(--white);
  padding: 2rem;
  margin-bottom: 5rem;
  position: relative;

  &__header {
    position: absolute;
    top: 0;
    left: 0;

    &__title {
      position: absolute;
      top: 0;
      left: 7rem;
      transform: translate(0, -50%);
      min-width: max-content;
      background: var(--primary-color);
      color: var(--white);
      padding: 1rem;
      font-size: 1.8rem;
      border-radius: 2px;
      font-weight: var(--font-medium);

      &__arrow {
        width: 2.5rem;
        height: 2.5rem;
        background: var(--primary-color);
        transform: rotate(45deg) translate(25%, 25%);
        position: absolute;
        left: -1rem;
        top: 0;
        z-index: -1;
        border-radius: 2px;

        &--disabled {
          background: var(--gray-950);
        }
      }

      .subtitle {
        font-weight: var(--font-light);
        color: var(--gray-450);
      }

      &--disabled {
        background: var(--gray-950);
      }
    }

    &__circle {
      border: 2px solid var(--primary-color);
      background: var(--white);
      height: 6.4rem;
      width: 6.4rem;
      border-radius: 50%;
      transform: translate(-30%, -50%);
      display: flex;
      justify-content: center;
      align-items: center;

      .icon {
        height: 4rem;
        width: 4rem;
        padding: 2px;
      }

      &--disabled {
        border: 2px solid var(--gray-950);
      }
    }
  }

  &--hide {
    background: transparent;
  }
}


@include respond-to(mobile) {
  .box-with-title {

    &__header {
      &__circle {
        transform: translate(0, -50%);
      }

      &__title {
        left: 8.5rem;
      }
    }

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
