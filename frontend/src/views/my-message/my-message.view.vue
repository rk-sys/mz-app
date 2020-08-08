<template>
  <div class="mz-my-messages">

    <div class="mz-my-messages__wrapper">
      <h1 class="mz-my-messages__wrapper__title">
        {{ $t(`myFollow.${activeTab}`) }}
      </h1>

      <mz-tabs v-model="activeTab">

        <mz-tab-pane :label="$t(`tab.craftsmen`)"
                     name="forMe">

          <mz-my-message-card :item="message"
                              :key="id"
                              type="forMe"
                              v-for="(message, id) in messages.forMe" />
        </mz-tab-pane>

        <mz-tab-pane :label="$t(`tab.items`)"
                     name="items">

          <mz-my-message-item-card :item="item"
                                   :key="id"
                                   v-for="(item, id) in messages.items" />
        </mz-tab-pane>

        <mz-tab-pane :label="$t(`tab.offers`)"
                     name="offers">

          <mz-my-message-offer-card :key="id"
                                    :offer="offer"
                                    v-for="(offer, id) in messages.offers" />
        </mz-tab-pane>

        <mz-tab-pane :label="$t(`tab.archives`)"
                     name="archives">

          <mz-my-message-card :item="message"
                              :key="id"
                              type="archive"
                              v-for="(message, id) in messages.archive" />
        </mz-tab-pane>
      </mz-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue }        from 'vue-property-decorator';
import { Route }                 from 'vue-router';
import mzTabPane                 from 'element-ui/lib/tab-pane.js';
import { namespace }             from 'vuex-class';
import { IMyMessage }            from '@/views/my-message/store/my-message.interface';
import Store                     from '@/store/store';
import { registerStoreModule }   from '@/helpers/helpers';
import { loadTranslationsAsync } from '@/i18n/i18n';
import mzTabs                    from '@/components/commons/tab/tabs.component.vue';
import mzMyMessageModule         from './store/my-message.module';
import mzMyMessageCard           from './components/my-message-card.component.vue';
import mzMyMessageItemCard       from './components/my-message-item-card.component.vue';
import mzMyMessageOfferCard      from './components/my-message-offer-card.component.vue';

const LOCAL_STORE: string = 'mzMyMessage';
const local = namespace(LOCAL_STORE);

@Component({
  components: {
    mzTabs,
    mzTabPane,
    mzMyMessageCard,
    mzMyMessageItemCard,
    mzMyMessageOfferCard,
  },
})
export default class mzMyMessage extends Vue {
  @local.State((state: mzMyMessageModule) => state.myMessages) public messages!: IMyMessage;

  public activeTab = 'forMe';

  private async beforeRouteEnter(to: Route, from: Route, next: any) {
    const lang: string = Store.state.global.defaultLang;
    try {
      await loadTranslationsAsync(lang, import(`./i18n/${lang}` as string));
      registerStoreModule(LOCAL_STORE.split('/'), mzMyMessageModule);
      await Store.dispatch(`${LOCAL_STORE}/getMyMessages`);
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

.mz-my-messages {
  min-height: 100vh;
  background: var(--background-color);
  height: 100%;
  display: grid;
  grid-template-rows: 2rem 7rem auto;
  grid-template-columns: 1fr 4fr 1fr;

  &__wrapper {
    display: flex;
    grid-row-start: 3;
    grid-column-start: 2;
    justify-content: flex-start;
    flex-direction: column;
    width: 110rem;
    margin: 0 auto 5rem;

    &__title {
      font-size: 3rem;
      margin-bottom: 5rem;
    }
  }
}

@include respond-to(desktop) {
  .mz-my-messages {
    &__wrapper {
      width: 95rem;
    }
  }
}

@include respond-to(tablet) {
  .mz-my-messages {
    grid-template-columns: 1fr 6fr 1fr;
    grid-template-rows: 0 0 auto;

    &__wrapper {
      width: 85rem;
    }
  }
}

@include respond-to(mobile) {
  .mz-my-messages {
    grid-template-columns: 1fr 4fr 1fr;
    grid-template-rows: 0 0 auto;

    &__wrapper {
      padding: 0 1rem;
      width: 46rem;
    }
  }
}
</style>