<template>
  <footer class="mz-footer">
    <ul class="mz-footer__link-list" :class="{'link--light': isLight}">
      <li class="link">{{$t(`footer.aboutUs`)}}</li>
      <li class="link">{{$t(`footer.contact`)}}</li>
      <li class="link">{{$t(`footer.faq`)}}</li>
      <li class="link">{{$t(`footer.rules`)}}</li>
    </ul>
  </footer>

</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class mzFooter extends Vue {
  @Prop(Boolean) public readonly isLight!: boolean;
}
</script>

<style lang="scss" scoped>
.mz-footer {

  .link--light {
    color: white;
  }

  &__link-list {
    display: flex;
    padding: 0;

    .link {
      margin-right: 4rem;
      font-size: 1.4rem;
      opacity: .5;
      list-style-type: none;
      position: relative;

      &:first-child:before {
        content: '';
      }

      &:before {
        content: '|';
        position: absolute;
        left: -2rem;
      }

      &:last-child {
        margin-right: 0;
      }

      &:hover {
        cursor: pointer;
        opacity: 1;
        text-decoration: underline;
      }
    }
  }
}

@media screen and (max-width: 425px) {
  .mz-footer__link-list {

    .link {
      font-size: 1.2rem;
    }
  }
}
</style>
