<template>
  <div class="nav-bar-category-mobile">
    <mz-collapse class="nav-bar-category-mobile__content"
                 v-model="activeNames">

      <mz-collapse-item title="Menu"
                        name="0"
                        class="nav-bar-category-mobile__content__list">

        <router-link class="nav-bar-category-mobile__craftsmen link"
                     :to="{name: 'Craftsmen'}">

          <div class="icon icon-hammer"></div>
          {{$t(`navBar.craftsmen`)}}
        </router-link>

        <router-link class="nav-bar-category-mobile__items link"
                     :to="{ name: 'Products list' }">

          <div class="icon icon-box"></div>
          {{$t(`navBar.items`)}}
        </router-link>

        <router-link class="nav-bar-category-mobile__services link"
                     to="/#">

          <div class="icon icon-tag"></div>
          {{$t(`navBar.services`)}}
        </router-link>
      </mz-collapse-item>

    </mz-collapse>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import mzLogo             from '@/components/logo/logo.component.vue';
import mzCollapse         from '@/components/commons/collapse/collapse.component.vue';
import mzCollapseItem     from '@/components/commons/collapse-item/collapse-item.component.vue';

@Component({
  components: {
    mzLogo,
    mzCollapse,
    mzCollapseItem,
  },
})
export default class mzNavBarCategoryMobile extends Vue {
  public isLinksHidden: boolean = true;

  public activeNames: string[] = [ '1' ];

  public showMenu(): void {
    this.isLinksHidden = !this.isLinksHidden;
  }
}
</script>
<style lang="scss">
.el-collapse-item__wrap {
  border-bottom: none;
}
.nav-bar-category-mobile {
  .el-collapse-item__content {
    padding-bottom: 0;
  }
}
</style>
<style lang="scss"
       scoped>

.nav-bar-category-mobile {
  border: 1px solid var(--gray-400);
  grid-row-start: 2;
  grid-column-start: 2;
  align-items: center;
  padding: 0;
  margin-top: 2.5rem;
  width: 85rem;

  &__content {
    background: var(--white);
    padding: 1rem 2.5rem;
  }

  .link {
    font-size: 2.4rem;
    height: 5.4rem;
    background: var(--white);
    margin-top: 2px;
    font-weight: var(--font-regular);

    &:hover {
      background: var(--gray-150);
      color: var(--primary-color);
      cursor: pointer;
    }

    .icon {
      width: 4rem;
      height: 3.5rem;
    }
  }

  &__craftsmen,
  &__items,
  &__services {
    height: 100%;
    display: flex;
    align-items: center;
    padding: 0 2rem;
    text-decoration: none;
    color: var(--black);
    font-weight: var(--font-medium);
    border-bottom: 2px solid transparent;
    font-size: 1.3rem;
    justify-content: center;

    .icon {
      height: 2.2rem;
      width: 2.2rem;
      margin-right: 2rem;
    }
  }
}

@media screen and (max-width: 425px) {
  .nav-bar-category-mobile {
    width: 46rem;
  }
}
</style>
