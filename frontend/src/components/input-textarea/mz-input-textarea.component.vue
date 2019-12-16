<template>
  <div class="mz-input-textarea">
    <mz-input class="mz-input-textarea__box"
              :id="id"
              type="textarea"
              :value="value"
              @input="emit"
              @focus="changeInputStyle"
              @blur="changeInputStyle"
              required>
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

  public greenInput: boolean = false;

  public changeInputStyle(): void {
    this.greenInput = !this.greenInput;
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
