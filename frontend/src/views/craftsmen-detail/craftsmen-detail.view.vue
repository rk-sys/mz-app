<template>
  <div class="mz-craftsmen-detail">
    <div class="mz-craftsmen-detail__content">
      <mz-craftsmen-detail-menu :base-info="craftsmenDetail.craftsmenBaseInfo" />

      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue }        from 'vue-property-decorator';
import { registerStoreModule }   from '@/helpers/helpers';
import { namespace }             from 'vuex-class';
import { loadTranslationsAsync } from '@/i18n/i18n';
import Store                     from '@/store/store';
import { Route }                 from 'vue-router';
import { ICraftsmenDetail }      from '@/views/craftsmen-detail/store/craftsmen-detail.interface';
import mzCraftsmenDetailMenu     from './components/craftsmen-detail-menu.component.vue';
import mzCraftsmenDetailModule   from './store/craftsmen-detail.module';

const LOCAL_STORE = 'craftsmenDetail';
const local = namespace(LOCAL_STORE);

@Component({
  components: {
    mzCraftsmenDetailMenu,
  },
})
export default class mzCraftsmenDetail extends Vue {
  @local.State((state: mzCraftsmenDetailModule) => state.mzCraftsmenDetailState) public craftsmenDetail!: ICraftsmenDetail;

  private async beforeRouteEnter(to: Route, from: Route, next: any) {
    const lang = Store.state.global.defaultLang;

    try {
      await loadTranslationsAsync(lang, import(`./i18n/${lang}` as string));
      registerStoreModule(LOCAL_STORE.split('/'), mzCraftsmenDetailModule);
      await Store.dispatch(`${LOCAL_STORE}/getCraftsmenDetail`, '1');
      next();
    } catch (e) {
      next(false);
      throw new Error(e);
    }
  }
}
</script>

<style lang="scss"
       scoped>

.fade-enter-active, .fade-leave-active {
  transition: opacity .25s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
{
  opacity: 0;
}

.mz-craftsmen-detail {
  min-height: 100vh;
  background: var(--background-color);
  height: 100%;
  display: grid;
  grid-template-rows: 6.4rem 7rem auto;
  grid-template-columns: 1fr 6fr 1fr;

  &__content {
    display: flex;
    grid-row-start: 3;
    grid-column-start: 2;
    justify-content: center;
  }
}

@media only screen and (max-width: 768px) {
  .mz-craftsmen-detail {
    grid-template-rows: auto;
    grid-template-columns: 1fr 6fr 1fr;

    &__content {
      flex-direction: column;
      align-items: center;
    }
  }
}
</style>