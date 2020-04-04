<template>
  <footer class="mz-footer">

    <div class="mz-footer__header">
      <span class="mz-footer__header__copyright">{{ $t(`footer.copyright`) }}</span>
      <span class="mz-footer__header__link">{{ $t(`footer.privacyPolicy`) }}</span>
      <span class="mz-footer__header__link">{{ $t(`footer.cookie`) }}</span>
      <span class="mz-footer__header__link">{{ $t(`footer.faq`) }}</span>
      <span class="mz-footer__content__link link--disabled">{{ $t(`footer.and`) }}</span>
      <span class="mz-footer__header__link">{{ $t(`footer.rules`) }}</span>
    </div>

    <div class="mz-footer__content">
      <span class="mz-footer__content__follow">{{ $t(`footer.followUs`) }}</span>
      <span class="mz-footer__content__link">{{ $t(`footer.blog`) }}</span>
      <span class="mz-footer__content__link">{{ $t(`footer.facebook`) }}</span>
      <span class="mz-footer__content__link">{{ $t(`footer.twitter`) }}</span>
      <span class="mz-footer__content__link">{{ $t(`footer.youtube`) }}</span>
      <span class="mz-footer__content__link link--disabled">{{ $t(`footer.and`) }}</span>
      <span class="mz-footer__content__link">{{ $t(`footer.twitter`) }}</span>
    </div>

    <div class="mz-footer__contact">
      <span class="mz-footer__content__contact">{{ $t(`footer.contact`) }}</span>
      <span class="mz-footer__content__link">{{ $t(`footer.mail`) }}</span>
    </div>
  </footer>

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class mzFooter extends Vue {
}
</script>

<style lang="scss" scoped>
.mz-footer {
  height: 16rem;
  background: var(--white);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  &__header,
  &__content,
  &__contact {
    display: flex;
    align-items: center;
    margin: .5rem 0;

    &__copyright,
    &__follow,
    &__contact {
      font-weight: var(--font-bold);
      margin-right: .5rem;
      color: var(--black-75);
    }

    &__link {
      margin-right: .5rem;
      box-shadow: inset 0 -1px 0 0 var(--warning);
      transition: all;
      transition-duration: .25s;
      font-weight: var(--font-medium);
      color: var(--black-75);

      &:hover {
        cursor: pointer;
        box-shadow: inset 0 -2rem 0 0 var(--warning);
        color: var(--black);
      }

      &:after {
        content: ','
      }

      &:last-child {
        &:after {
          content: '';
        }
      }
    }

    .link--disabled {
      box-shadow: none;
      cursor: auto;
      color: var(--black);
    }
  }
}

@include respond-to(mobile) {
  .mz-footer {
    height: 30rem;
    padding: 3rem;
    justify-content: space-evenly;

    &__header,
    &__content,
    &__contact {
      flex-wrap: wrap;
      justify-content: center;

      &__copyright,
      &__follow,
      &__contact {
        display: block;
        width: 100%;
        text-align: center;
        margin: 1.5rem 0 .5rem;
        font-size: 2rem;
      }

      &__link {
        font-size: 1.8rem;
      }
    }
  }
}
</style>
