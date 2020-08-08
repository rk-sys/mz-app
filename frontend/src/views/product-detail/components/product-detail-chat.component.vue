<template>
  <div class="mz-product-detail-chat">
    <div class="mz-product-detail-chat__container">
      <div :class="{'align-right' : item.name === 'Kafał Rrukowski'}"
           :key="id"
           class="mz-product-detail-chat__container__message"
           v-for="(item, id) in messages">

        <div class="mz-product-detail-chat__container__message__header">
          <span class="mz-product-detail-chat__container__message__header__name">{{item.name}}</span>
          <span class="mz-product-detail-chat__container__message__header__date">{{item.date}}</span>
        </div>

        <p :class="{'own-message' : item.name === 'Kafał Rrukowski',
                    'client-message' : item.name !== 'Kafał Rrukowski'}"
           class="mz-product-detail-chat__container__message__description">{{item.message}}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue }    from 'vue-property-decorator';
import { namespace }         from 'vuex-class';
import mzProductDetailModule from '../store/product-detail.module';
import { IMessage }          from '@/views/product-detail/store/product-detail.interface';

const LOCAL_STORE: string = 'productDetail';
const local = namespace(LOCAL_STORE);

@Component({
  components: {},
})
export default class mzProductDetailChat extends Vue {
  @local.State((state: mzProductDetailModule) => state.message) public messages!: IMessage;
}
</script>

<style lang="scss"
       scoped>

.mz-product-detail-chat {
  overflow-y: scroll;
  margin-top: 1.5rem;
  background: var(--white);
  border-radius: 2px;
  width: 100%;
  height: 60rem;

  &__container {
    padding: 3rem;

    &__message {
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

@include respond-to(desktop) {
  .mz-product-detail-chat {
    margin-bottom: 5rem;
  }
}

@include respond-to(tablet) {
  .mz-product-detail-chat {
    margin-bottom: 3rem;
  }
}

@include respond-to(mobile) {
  .mz-product-detail-chat {
    margin-bottom: 1rem;
  }
}
</style>
