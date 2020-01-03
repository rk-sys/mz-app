<template>
  <div class="icons-box">
    <template v-for="item in icons">
      <div class="icons-box__icon"
           :style="item.style"
           :class="[item.icon]">
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class mzIconsBox extends Vue {
  @Prop(Array) public readonly icons!: string[];
}
</script>

<style lang="scss" scoped>
.icons-box {
  position: relative;

  &__icon {
    position: absolute;
    min-height: 5.2rem;
    min-width: 5.2rem;
  }
}

@media screen and (max-width: 767px) {
  .icons-box {
    display: none;
  }
}
</style>
