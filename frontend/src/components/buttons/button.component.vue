<template>
  <el-button :class="buttonStyleClass"
             class="mz-button"
             v-bind="attributes"
             v-on="listeners">

    <slot :name="slot"
          :slot="slot"
          v-for="(_, slot) of $slots" />
  </el-button>
</template>

<script lang="ts">
import { Component, Mixins, Prop } from 'vue-property-decorator';
import mzTransparentWrapper         from '@/components/transparent-component.mixin';
import ElButton                    from 'element-ui/lib/button.js';

@Component({
  components: {
    ElButton,
  },
})
export default class mzButton extends Mixins(mzTransparentWrapper) {
  @Prop(String) private readonly buttonStyle!: string;

  get buttonStyleClass(): any {
    return this.buttonStyle ? [ `mz-button--${this.buttonStyle}` ] : '';
  }
}
</script>

<style lang="scss"
       scoped>

@import '~element-ui/lib/theme-chalk/button.css';

.mz-button {
  border-radius: .4rem;
  padding: 1rem 2rem;
  cursor: pointer;
  font-size: var(--font-size-14);

  &,
  &:hover {
    color: var(--white);
    background-color: var(--primary-color);
    border: none;
  }

  &--primary {
    &,
    &:hover {
      color: var(--white);
      background-color: var(--primary-color);
      border: .1rem solid var(--primary-color);
      font-size: var(--font-size-14);
    }
  }

  &--danger {
    &,
    &:hover {
      background-color: var(--error);
      border: .1rem solid var(--error);
    }
  }

  &--clear {
    &,
    &:hover {
      color: var(--enabled);
      background-color: transparent;
      border: .1rem solid transparent;
    }
  }

  &--filter {
    &,
    &:hover {
      background-color: var(--gray-200);
      border: .1rem solid transparent;
      color: var(--black);
    }
  }

  &--disabled {
    &,
    &:hover {
      color: var(--gray-450);
      cursor: not-allowed;
      background-image: none;
      background-color: var(--gray-100);
      border: .1rem solid var(--gray-450);
    }
  }
}

</style>
