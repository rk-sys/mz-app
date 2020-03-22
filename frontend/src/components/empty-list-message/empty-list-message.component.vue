<template>
  <div class="mz-empty-list-message">
    <span class="mz-empty-list-message__content">{{ $t(`emptyList.${pageName}`) }}</span>
    <div class="mz-empty-list-message__icon icon-empty--gray"></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  components: {},
})
export default class mzEmptyListMessage extends Vue {
  @Prop(String) public pageName!: string;
}
</script>

<style lang="scss"
       scoped>

.mz-empty-list-message {
  width: 100%;
  text-align: center;
  font-size: 6rem;
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--gray-900);

  &__icon {
    width: 5rem;
    height: 5rem;
    margin-left: 2rem;
  }
}

</style>
