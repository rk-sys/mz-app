<template>
  <div class="mz-message-detail-chat">
    <div class="mz-message-detail-chat__topic">
      <div class="mz-message-detail-chat__topic__text">

        <span :class="{'private-msg' : message.topic.type === 'forMe'}"
              @click="goToDetail(message.topic.type, message.topic.detail.uuid)"
              class="mz-message-detail-chat__topic__text__title">

          <span class="label">{{ $t('title') }}</span>
          {{message.topic.detail.title}}
        </span>

        <span class="mz-message-detail-chat__topic__text__description"
              v-if="message.topic.detail.description">
          <span class="label">{{ $t('description') }}</span>

          {{message.topic.detail.description}}
        </span>
      </div>
    </div>

    <div class="mz-message-detail-chat__container">
      <div :class="{'align-right' : item.name === 'Kafał Rrukowski'}"
           :key="id"
           class="mz-message-detail-chat__container__message"
           v-for="(item, id) in message.messages">

        <div class="mz-message-detail-chat__container__message__header">
          <span @click="goToDetailCrafstman(item.uuid)"
                class="mz-message-detail-chat__container__message__header__name">{{item.name}}</span>
          <span class="mz-message-detail-chat__container__message__header__date">{{item.date}}</span>
        </div>

        <p :class="{'own-message' : item.name === 'Kafał Rrukowski',
                    'client-message' : item.name !== 'Kafał Rrukowski'}"
           class="mz-message-detail-chat__container__message__description">{{item.message}}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { IMessageDetail }       from '@/views/message-detail/store/message-detail.interface';
import router                   from '@/router';

@Component({
  components: {},
})
export default class mzMessageDetailHeader extends Vue {
  @Prop(Object) public readonly message!: IMessageDetail;

  public goToDetailCrafstman(uuid: string): void {
    router.push({ name: 'Craftsmen detail', params: { uuid } });
  }

  public goToDetail(type: string, uuid: string): void {
    if (type === 'offer') {
      router.push({ name: 'Offer detail', params: { uuid } });
    } else if (type === 'product') {
      router.push({ name: 'Product detail', params: { uuid } });
    }
  }
}
</script>

<style lang="scss"
       scoped>

.mz-message-detail-chat {
  background: var(--white);
  padding: 3rem 5rem;
  border-radius: 2px;

  &__topic {
    margin: 0 auto 2rem auto;
    width: 100%;
    border-radius: 2px;
    padding: 1rem 2rem;
    display: flex;

    &__picture {
      width: 16rem;
      height: 10rem;
      border-radius: 2px;

      .image {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    &__text {
      width: 100%;
      display: flex;
      flex-direction: column;
      padding-left: 2rem;

      &__title {
        display: block;
        font-size: 2rem;
        font-weight: var(--font-medium);
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        margin-bottom: 1rem;
        margin-top: .5rem;

        &:hover {
          text-decoration: underline;
          cursor: pointer;
        }

        &.private-msg {

          &:hover {
            text-decoration: none;
            cursor: auto;
          }
        }
      }

      &__description {
        display: block;
        font-size: 1.7rem;
        color: var(--gray-900);
        overflow: hidden;
        height: 4.2rem;
      }

      &__description,
      &__title {

        .label {
          margin-right: 1.5rem;
        }
      }
    }
  }

  &__container {
    padding-top: 3rem;
    border-top: 1px solid var(--gray-450);

    &__message {
      width: 85rem;

      &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;

        &__name {
          font-weight: var(--font-medium);
          font-size: 1.4rem;

          &:hover {
            cursor: pointer;
            text-decoration: underline;
          }
        }

        &__date {
          color: var(--gray-500);
          font-size: 1.4rem
        }
      }

      &__description {
        margin-top: .5rem;
        border-radius: 2px;
        margin-bottom: 4rem;
        background: var(--gray-200);
        padding: 1.5rem;
        position: relative;

        &.own-message {
          background: var(--primary-color-30);

          &::before {
            content: "";
            border-top: 15px solid var(--primary-color-30);
            height: 0;
            width: 4px;
            position: absolute;
            top: 100%;
            margin-top: -2px;
            right: 0;
            border-left: 15px solid transparent;
          }
        }

        &.client-message {
          &::before {
            content: "";
            border-top: 15px solid var(--gray-300);
            height: 0;
            width: 4px;
            position: absolute;
            top: 100%;
            margin-top: 0;
            left: 0;
            border-right: 15px solid transparent;
          }
        }
      }

      &.align-right {
        margin: 0 0 0 auto;
      }
    }
  }
}
</style>
