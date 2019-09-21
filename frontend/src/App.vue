<template>
  <div id="mzApp">
    <mz-nav-bar v-show="!($route.name === 'Registration' || $route.name ===  'Login')" />

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
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
{
  opacity: 0;
}
</style>
