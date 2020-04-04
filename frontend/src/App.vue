<template>
  <div id="mzApp">

    <template v-if="!($route.name === 'Registration'
                        || $route.name ===  'Login'
                        || $route.name === 'Reset password')">
      <mz-nav-bar />

      <mz-nav-bar-mobile />
    </template>

    <router-view />

    <mz-footer />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import mzNavBar           from '@/components/nav-bar/navbar.component.vue';
import mzNavBarMobile     from '@/components/nav-bar/navbar-mobile.component.vue';
import mzFooter           from '@/components/footer/footer.component.vue';

@Component({
  components: {
    mzNavBar,
    mzFooter,
    mzNavBarMobile,
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
