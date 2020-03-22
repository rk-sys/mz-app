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
import mzTransparentWrapper        from '@/components/transparent-component.mixin';
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
  height: 4rem;
  border-radius: .2rem;
  padding: 1rem 2rem;
  cursor: pointer;
  font-size: var(--font-size-16);
  color: var(--white);
  background-color: var(--primary-color);
  border: none;
  width: 100%;

  &:hover {
    background-color: var(--primary-color-80);
  }

  &--primary {
    background-color: var(--primary-color);
    border: .1rem solid var(--primary-color);

    &:hover {
      background-color: var(--primary-color-80);
      border: .1rem solid var(--primary-color-80);
    }
  }

  &--success {
    background-color: var(--success);
    border: .1rem solid var(--success);

    &:hover {
      background-color: var(--success-80);
      border: .1rem solid var(--success-80);
    }
  }

  &--danger {
    background-color: var(--error);
    border: .1rem solid var(--error);
    margin: 0;

    &:hover {
      background-color: var(--error-80);
      border: .1rem solid var(--error-80);
    }
  }

  &--warning {
    background-color: var(--warning);
    border: .1rem solid var(--warning);

    &:hover {
      background-color: var(--warning-80);
      border: .1rem solid var(--warning-80);
    }
  }

  &--info {
    background-color: var(--gray-900);
    border: .1rem solid var(--gray-900);

    &:hover {
      background-color: var(--gray-500);
      border: .1rem solid var(--gray-500);
    }
  }

  &--cancel {
    background-color: var(--gray-500);
    border: .1rem solid var(--gray-500);

    &:hover {
      background-color: var(--gray-450);
      border: .1rem solid var(--gray-450);
    }
  }

  &--light {
    background-color: var(--gray-100);
    border: .1rem solid var(--gray-500);
    color: var(--gray-700);

    &:hover {
      background-color: var(--gray-150);
      border: .1rem solid var(--gray-500);
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

@media screen and (max-width: 768px) and (min-width: 561px) {
  .mz-button {
    font-size: 2.2rem;
    width: auto;
    height: 5rem;
  }
}

@media screen and (max-width: 560px) and (min-width: 426px) {
  .mz-button {
    font-size: 2.4rem;
    width: auto;
    height: 6rem;
  }
}

@media screen and (max-width: 425px) {
  .mz-button {
    font-size: 2rem;
    width: auto;
    height: 4rem;
  }
}

</style>
