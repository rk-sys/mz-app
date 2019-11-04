<template>
  <div id="mzApp">
    <mz-nav-bar v-if="!($route.name === 'Registration' || $route.name ===  'Login' || $route.name === 'Reset password')" />

    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import mzNavBar           from '@/components/nav-bar/navbar.component.vue';

@Component({
  components: {
    mzNavBar,
  },
})

export default class mzApp extends Vue {
}
</script>
<style lang="scss">
@import '~@/assets/styles/main';
</style>

<style lang="scss"
       scoped>
</style>
