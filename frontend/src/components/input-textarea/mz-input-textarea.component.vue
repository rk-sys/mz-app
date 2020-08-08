<template>
  <div class="mz-input-textarea">
    <mz-input :id="id"
              :value="value"
              @blur="changeInputStyle"
              @focus="changeInputStyle"
              @input="emit"
              class="mz-input-textarea__box"
              required
              type="textarea">
    </mz-input>
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
  @Prop(String) public readonly holder!: string;
  @Prop(String) public readonly id!: string;
  @Prop(String) public readonly value!: string;
  @Prop(Boolean) public readonly error!: boolean;

  public primaryInput: boolean = false;

  public changeInputStyle(): void {
    this.primaryInput = !this.primaryInput;
  }

  public emit(event: string): void {
    this.$emit('input', event);
  }
}
</script>

<style lang="scss">
.el-textarea {
  .el-textarea__inner {
    height: 20rem;

    &:focus {
      border: 2px solid var(--primary-color);
    }

    @media screen and (max-width: 560px) {
      font-size: 2.4rem;
    }
  }
}
</style>

<style lang="scss"
       scoped>
.mz-input-textarea {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  &__box {
    margin: 1.6rem 0;
    width: calc(100% - 1rem);
    font-size: 1.6rem;
    font-weight: 300;
    z-index: 1;
    background: var(--transparent);
  }
}

@media screen and (max-width: 425px) {
  .mz-input__container {
    min-width: 26rem;
    max-width: 28rem;
  }
}
</style>
