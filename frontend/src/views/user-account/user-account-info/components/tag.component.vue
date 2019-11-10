<template>
  <div class="mz-tag">
    {{ tag }}

    <span class="remove-button"
          @click="removeTag(index)">

      {{ $t(`removeButton`) }}
    </span>
  </div>
</template>

<script lang="ts">
import { Vue }                         from 'vue-property-decorator';
import { Component, Prop }             from 'vue-property-decorator';
import { i18n, loadTranslationsAsync } from '@/i18n/i18n';
import Store                           from '@/store/store';
import { Route }                       from 'vue-router';

@Component({
  components: {},
})
export default class mzTag extends Vue {
  @Prop(String) public tag!: string;
  @Prop(Number) public index!: number;
  @Prop(Function) public removeTag!: any;

  private beforeRouteEnter(to: Route, from: Route, next: any) {
    const lang = Store.state.global.defaultLang;

  }
}
</script>

<style lang="scss"
       scoped>

.mz-tag {
  border: 1px solid var(--primary-color);
  color: var(--primary-color);
  min-width: 6rem;
  height: 2.5rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 1.2rem;
  padding: 0 1.2rem;
  margin-right: 2rem;
  margin-bottom: 1rem;
  user-select: none;

  .remove-button {
    font-size: 2.6rem;
    font-weight: 300;
    transform: rotate(45deg);
    margin-left: 0.5rem;
    cursor: pointer;
  }
}
</style>
