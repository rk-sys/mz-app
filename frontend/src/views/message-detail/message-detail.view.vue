<template>
  <div class="mz-messages-detail">
    <div class="mz-messages-detail__wrapper">

      <mz-message-detail-header />

      <div class="mz-messages-detail__wrapper__container">

        <mz-message-detail-customers :customers="message.customers"
                                     v-if="message.customers" />

        <mz-message-detail-chat :message="message" />

        <div class="mz-messages-detail__wrapper__container__message">
          <textarea class="input"
                    v-model="newMessage"></textarea>

          <mz-button @click="sendNewMessage"> {{ $t(`sendMessage`) }}
          </mz-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue }        from 'vue-property-decorator';
import { Route }                 from 'vue-router';
import { namespace }             from 'vuex-class';
import { registerStoreModule }   from '@/helpers/helpers';
import { loadTranslationsAsync } from '@/i18n/i18n';
import Store                     from '@/store/store';
import { IMessageDetail }        from './store/message-detail.interface';
import mzMessageDetailModule     from './store/message-detail.module';
import mzMessageDetailHeader     from './components/message-detail-header.component.vue';
import mzMessageDetailChat       from './components/message-detail-chat.component.vue';
import mzMessageDetailCustomers  from './components/message-detail-customers.component.vue';
import mzButton                  from '@/components/buttons/button.component.vue';

const LOCAL_STORE: string = 'mzMessageDetail';
const local = namespace(LOCAL_STORE);

@Component({
  components: {
    mzButton,
    mzMessageDetailChat,
    mzMessageDetailHeader,
    mzMessageDetailCustomers,
  },
})
export default class mzUserAdministration extends Vue {
  @local.State((state: mzMessageDetailModule) => state.mzMessageDetail) public message!: IMessageDetail;

  public newMessage: string = '';

  public sendNewMessage(): void {
    this.newMessage = '';
  }

  private async beforeRouteEnter(to: Route, from: Route, next: any) {
    const lang: string = Store.state.global.defaultLang;
    try {
      await loadTranslationsAsync(lang, import(`./i18n/${lang}` as string));
      registerStoreModule(LOCAL_STORE.split('/'), mzMessageDetailModule);
      await Store.dispatch(`${LOCAL_STORE}/getMessageDetail`);
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

.mz-messages-detail {
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

    &__container {
      border-radius: 2px;

      &__message {
        background: var(--white);
        padding: 2rem;
        margin-top: 1.5rem;

        .input {
          width: 100%;
          height: 8rem;
          margin-bottom: 1rem;
          font-size: 1.6rem;
          font-weight: 300;
          border-radius: 2px;
          padding: .8rem 1.6rem;

          &:focus {
            border-radius: 2px;
            outline-color: var(--primary-color);
          }
        }
      }
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
  .mz-messages-detail {
    grid-template-columns: 1fr 6fr 1fr;
    grid-template-rows: 0 0 auto;
  }
}

@include respond-to(mobile) {
  .mz-messages-detail {
    grid-template-columns: 1fr 4fr 1fr;
    grid-template-rows: 0 0 auto;
  }
}
</style>