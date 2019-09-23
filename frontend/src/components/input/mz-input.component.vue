<template>
  <div class="mz-input">
    <div class="mz-input__container">
      <mz-input class="mz-input__container__box"
                :id="id"
                :show-password="isPassword"
                :type="type"
                :value="value"
                @input="emit"
                @focus="changeInputStyle"
                @blur="changeInputStyle"
                required>
      </mz-input>

      <label class="mz-input__container__label"
             :class="{'set-top-label': greenInput || value !== '',
				    		'error-text': error}"
             :for="id">{{holder}}</label>

      <div class="mz-input__container__border"
           :class="{'show-border': greenInput,
				    	  'error-border': error}"></div>

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

  public greenInput = false;

  public changeInputStyle() {
    this.greenInput = !this.greenInput;
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
      font-size: 1.6rem;
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
      top: 2rem;
      left: 1rem;
      font-size: 1.6rem;
      font-weight: 400;
      z-index: 0;
      transition: all 0.2s ease-in-out;
      color: var(--gray-700);
    }

    .set-top-label {
      color: var(--primary-color);
      font-weight: 600;
      top: -.2rem;
      left: .5rem;
      font-size: 1.2rem;
      transition: all 0.2s ease-in-out;
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
    max-width: 28rem;
  }
}
</style>
