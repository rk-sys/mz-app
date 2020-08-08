<template>
  <div class="mz-user-administration-menu">

    <mz-collapse :key="index"
                 class="mz-user-administration-menu__container"
                 v-for="(item, index) in mobileMenu"
                 v-model="item.activeName">

      <mz-collapse-item :name="item.title"
                        :title="$t(`${item.title}.title`)"
                        class="mz-user-administration-menu__container__item">

        <router-link :key="id"
                     :to="{name: link.name}"
                     class="mz-user-administration-menu__container__item__link"
                     v-for="(link, id) in item.links">

          {{ $t(`${item.title}.${link.label}`) }}
        </router-link>
      </mz-collapse-item>
    </mz-collapse>

  </div>
</template>

<script lang="ts">
import { Component, Vue }         from 'vue-property-decorator';
import { namespace }              from 'vuex-class';
import { IMenuAdministration }    from '@/views/user-administration/store/user-administration.interface';
import mzCollapse                 from '@/components/commons/collapse/collapse.component.vue';
import mzCollapseItem             from '@/components/commons/collapse-item/collapse-item.component.vue';
import mzUserAdministrationModule from '../store/user-administration.module';

const LOCAL_STORE: string = 'userAdministration';
const local = namespace(LOCAL_STORE);

@Component({
  components: {
    mzCollapse,
    mzCollapseItem,
  },
})
export default class mzUserAdministrationMenu extends Vue {
  @local.State((state: mzUserAdministrationModule) => state.menuAdministration.menuLinks) public mobileMenu!: IMenuAdministration;
  @local.Mutation public setOpenMenu!: (payload: boolean) => void;
}
</script>
<style lang="scss">
.mz-user-administration-menu {
  .el-collapse-item__header {
    padding: 1rem 2rem;
  }

  .el-collapse-item__content {
    padding-bottom: 1.5rem;
  }
}
</style>
<style lang="scss"
       scoped>

.mz-user-administration-menu {
  background: var(--white);
  border: 1px solid var(--gray-400);
  width: 30rem;
  padding: .1rem;

  &__container {
    list-style: none;
    width: 100%;

    &__item {
      &__link {
        font-size: 1.6rem;
        padding: 1rem 3rem;
        font-weight: var(--font-medium);
        cursor: pointer;
        display: block;
        text-decoration: none;
        color: var(--black);

        &:hover {
          background: var(--primary-color);
          color: var(--white);
        }

        &.router-link-active {
          color: var(--primary-color-80);

          &:hover {
            color: var(--white);
          }
        }
      }
    }
  }
}
</style>