<template>
  <nav class="nav-bar-mobile">
    <mz-nav-bar-profile />

    <mz-nav-bar-category-mobile />
  </nav>
</template>

<script lang="ts">
import { Component, Vue }     from 'vue-property-decorator';
import mzLogo                 from '@/components/logo/logo.component.vue';
import mzNavBarCategoryMobile from '@/components/nav-bar/components/navbar-category-mobile.component.vue';
import mzNavBarProfile        from '@/components/nav-bar/components/navbar-profile.component.vue';

@Component({
  components: {
    mzLogo,
    mzNavBarCategoryMobile,
    mzNavBarProfile,
  },
})
export default class mzNavBarMobile extends Vue {
}
</script>

<style lang="scss" scoped>
.nav-bar-mobile {
  width: 100%;
  height: auto;
  background: transparent;
  justify-content: space-around;
  z-index: 4;
  display: none;
  padding: 2rem 0 5rem;
  background: var(--gray-150);
  grid-template-rows: auto auto;
  grid-template-columns: 1fr 4fr 1fr;
}

@media screen and (max-width: 768px) and (min-width: 300px) {
  .nav-bar-mobile {
    display: grid;
  }
}
</style>
