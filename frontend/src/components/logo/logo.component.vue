<template>
  <div class="mz-logo">
    <router-link class="mz-logo__icon icon-logo--green"
                 to="/"
                 v-if="isGreen"></router-link>

    <router-link class="mz-logo__icon icon-logo" to="/" v-else></router-link>
  </div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class mzLogo extends Vue {
  @Prop(Boolean) public readonly isGreen!: boolean;
}
</script>

<style lang="scss" scoped>
.mz-logo {
  height: 4rem;

  &__icon {
    display: block;
    width: 100%;
    height: 100%;
  }
}
</style>
