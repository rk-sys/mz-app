<template>
  <div class="mz-message-detail-header">

    <div class="mz-message-detail-header__go-back"
         @click="goBack">

      <div class="icon icon-arrow--black"></div>
      <span class="title">{{ $t('goBack') }}</span>
    </div>

    <div class="mz-message-detail-header__wrapper">

      <div class="mz-message-detail-header__block-user">
        <div class="icon icon-ban"></div>
        <span class="title">{{ $t('banUser') }}</span>
      </div>

      <div class="mz-message-detail-header__add-to-archive">
        <div class="icon icon-archive"></div>
        <span class="title">{{ $t('addToArchive') }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import router                   from '@/router';

@Component({
  components: {},
})
export default class mzMessageDetailHeader extends Vue {

  public goBack(): void {
    router.push({ name: 'My messages' });
  }
}
</script>

<style lang="scss"
       scoped>

.mz-message-detail-header {
  display: flex;
  align-items: center;
  justify-content: space-between;

  &__wrapper {
    min-width: 50%;
    justify-content: flex-end;
    display: flex;
  }

  &__go-back,
  &__add-to-archive,
  &__block-user {
    display: flex;
    align-items: center;
    margin: 4rem 0 1rem;
    box-shadow: inset 0 -1px 0 0 var(--warning);
    transition: all;
    transition-duration: .25s;
    font-weight: var(--font-medium);
    color: var(--black-75);
    width: 7.5rem;
    padding: .5rem 0;

    &:hover {
      cursor: pointer;
      box-shadow: inset 0 -2.75rem 0 0 var(--warning);
      color: var(--black);
    }

    .icon {
      width: 1.65rem;
      height: 1.65rem;
      margin-right: .5rem;
      opacity: .8;

      &-arrow--black {
        transform: rotate(180deg);
      }
    }

    .title {
      font-size: 1.6rem;
      opacity: .8;
    }
  }

  &__block-user {
    margin-right: 2rem;
    width: 25rem;
    padding-left: .5rem;
  }

  &__add-to-archive {
    width: 21rem;
    padding-left: .5rem;
  }
}
</style>
