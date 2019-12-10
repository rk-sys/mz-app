<template>
  <nav class="nav-bar">
    <mz-nav-bar-category />

    <mz-nav-bar-profile />
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import mzLogo             from '@/components/logo/logo.component.vue';
import mzNavBarCategory   from '@/components/nav-bar/components/navbar-category.component.vue';
import mzNavBarProfile    from '@/components/nav-bar/components/navbar-profile.component.vue';

@Component({
  components: {
    mzLogo,
    mzNavBarCategory,
    mzNavBarProfile,
  },
})
export default class mzNavBar extends Vue {
}
</script>

<style lang="scss" scoped>
.nav-bar {
  width: 100%;
  height: 6.4rem;
  position: fixed;
  background: transparent;
  display: flex;
  justify-content: space-around;
  background: var(--white);
  box-shadow: 0 2px 3px 0 var(--gray-300);
  z-index: 4;
}
</style>
