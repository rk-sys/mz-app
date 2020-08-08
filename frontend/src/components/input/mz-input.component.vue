<template>
  <div class="mz-input">
    <div class="mz-input__container">

      <mz-input :disabled="disabled"
                :id="id"
                :show-password="isPassword"
                :type="type"
                :value="value"
                @blur="changeInputStyle"
                @focus="changeInputStyle"
                @input="emit"
                class="mz-input__container__box"
                required>
      </mz-input>

      <label :class="{'set-top-label': primaryInput || value !== '',
                      'disabled': disabled,
				    		      'error-text': error}"
             :for="id"
             class="mz-input__container__label">
        {{holder}}</label>

      <div :class="{'show-border': primaryInput,
				    	      'error-border': error}"
           class="mz-input__container__border"></div>

    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import mzInput                  from '@/components/form/input/input.component.vue';

@Component({
  components: {
    mzInput,
  },
})
export default class Home extends Vue {
  @Prop(Boolean) public readonly isPassword!: boolean;
  @Prop(String) public readonly holder!: string;
  @Prop(String) public readonly id!: string;
  @Prop(String) public readonly type!: string;
  @Prop(String) public readonly value!: string;
  @Prop(Boolean) public readonly error!: boolean;
  @Prop(Boolean) public readonly disabled!: boolean;

  public primaryInput: boolean = false;

  public changeInputStyle(): void {
    this.primaryInput = !this.primaryInput;
  }

  public emit(event: any) {
    this.$emit('input', event);
  }
}
</script>

<style lang="scss"
       scoped>
.mz-input {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  &__container {
    width: 100%;
    position: relative;
    min-width: 32rem;
    display: flex;
    margin: 1.6rem 0;

    &__box {
      width: calc(100% - 1rem);
      font-size: 2.1rem;
      font-weight: 300;
      padding: .5rem 1rem 0;
      border: none;
      border-bottom: 1px solid var(--gray-400);
      z-index: 1;
      background: var(--transparent);

      &:focus {
        border: none;
        border-bottom: 1px solid var(--gray-400);
        outline: none;
      }
    }

    &__label {
      position: absolute;
      top: 20px;
      left: 1rem;
      font-size: 2rem;
      font-weight: 400;
      z-index: 0;
      transition: all .2s ease-in-out;
      color: var(--gray-700);
      line-height: 2.2rem;
    }

    .set-top-label {
      color: var(--primary-color);
      font-weight: 600;
      top: -.8rem;
      left: .5rem;
      font-size: 1.6rem;
      transition: all .2s ease-in-out;
      z-index: 1;
    }

    &__border {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 2px;
      width: calc(100% - 1rem);
      background: var(--primary-color);
      transform: scaleX(0);
      transform-origin: 0 0;
      transition: all .25s ease;
      z-index: 2;
    }

    .show-border {
      transform: scaleX(1);
    }

    .disabled {
      z-index: 3;
      cursor: not-allowed;
    }

    .error-text {
      color: var(--error);
    }

    .error-border {
      background: var(--error);
    }
  }
}

@media screen and (max-width: 425px) {
  .mz-input__container {
    min-width: 26rem;
    max-width: 100%;
    margin: 1.1rem 0;
  }
}
</style>
