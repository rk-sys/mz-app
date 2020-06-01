<template>
  <div class="mz-progress">
    <div class="mz-progress__label">

      <mz-tooltip :content="$t(`progressBar.tooltip.${ customLabel() }`)"
                  placement="right">

        <span class="mz-progress__status">
          {{ $t('progressBar.profileEfficiency') }}

          <span class="mz-progress__level"
                :class="`mz-progress__level--${ customLabel() }`">

            {{ $t(`progressBar.${ customLabel() }`) }}
          </span>
        </span>
      </mz-tooltip>
    </div>

    <el-progress :percentage="percentage"
                 :color="customColor"
                 :text-inside="true"
                 :stroke-width="18"
                 v-bind="attributes"
                 v-on="listeners">
    </el-progress>
  </div>
</template>

<script lang="ts">
import { Component, Mixins, Prop } from 'vue-property-decorator';
import mzTransparentWrapper        from '@/components/transparent-component.mixin';
import ElProgress                  from 'element-ui/lib/progress.js';
import mzTooltip                   from '@/components/tooltip/tooltip.component.vue';

@Component({
  components: {
    ElProgress,
    mzTooltip,
  },
})
export default class mzProgress extends Mixins(mzTransparentWrapper) {
  @Prop(Number) public percentage!: number;

  public customColor(): string {
    if (this.percentage < 30) {
      return '#FF9D39';
    } else if (this.percentage < 70) {
      return '#3F55E2';
    } else {
      return '#019A7C';
    }
  }

  public customLabel(): string {
    if (this.percentage < 30) {
      return 'beginning';
    } else if (this.percentage < 70) {
      return 'middle';
    } else {
      return 'end';
    }
  }
}
</script>

<style lang="scss">

.mz-progress {
  margin-bottom: 5rem;

  &__label {
    display: flex;
    margin-bottom: .5rem;
  }

  &__status {
    margin-bottom: 1rem;
    cursor: pointer;
  }

  &__level {
    font-weight: var(--font-bold);

    &--beginning {
      color: var(--warning);
    }

    &--middle {
      color: var(--secondary-color);
    }

    &--end {
      color: var(--primary-color);
    }
  }

  .el-progress-bar__inner {
    background-color: var(--primary-color);
    border-radius: 2px;
  }

  .el-progress-bar__outer {
    border-radius: 2px;
  }
}

@media screen and (max-width: 768px) and (min-width: 426px) {
  .mz-progress {
    font-size: 2.4rem;
  }
}

@media screen and (max-width: 425px) {
  .mz-progress {
    font-size: 1.8rem;
  }
}
</style>
