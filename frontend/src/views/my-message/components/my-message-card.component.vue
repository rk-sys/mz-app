<template>
  <div v-if="item.type === type || type === 'all'"
       class="my-message-card">

    <div class="my-message-card__container"
         @click="goToDetail(item.uuid)">

      <div class="my-message-card__container__craftsmen"
           @mouseenter="isHover = !isHover"
           @mouseleave="isHover = !isHover"
           @click="goToDetailCrafstmen(item.craftsmen.uuid)">

        <img :src="item.craftsmen.picture"
             :alt="item.craftsmen.name"
             class="picture">

        <div class="picture--cover-bg"
             :class="{ 'show-overlay' : isHover }">

          {{ $t(`profileDetail`) }}
        </div>

        <span class="name">{{ item.craftsmen.name }}</span>
      </div>

      <div class="my-message-card__container__message">

        <span v-if="item.message.isNewMessage"
              class="badge"></span>

        <span class="title">{{ item.message.title }}</span>

        <p class="description">{{ item.message.description }}</p>
      </div>

      <div class="my-message-card__container__icon">

        <mz-tooltip v-if="type !== 'archive'"
                    :content="$t(`archiveMessage`)"
                    placement="top">

          <div class="icon"
               @click="archiveMessage(item.uuid)"
               :class="{ 'icon-archive': !isHoverIcon,
                         'icon-archive--primary': isHoverIcon }"
               @mouseenter="isHoverIcon = true"
               @mouseleave="isHoverIcon = false"></div>
        </mz-tooltip>

        <mz-tooltip v-else
                    :content="$t(`deleteMessage`)"
                    placement="top">

          <div class="icon"
               @click="archiveMessage(item.uuid)"
               :class="{ 'icon-delete': !isHoverIconDelete,
                         'icon-delete--red': isHoverIconDelete }"
               @mouseenter="isHoverIconDelete = true"
               @mouseleave="isHoverIconDelete = false"></div>
        </mz-tooltip>

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { IMyMessage }           from '@/views/my-message/store/my-message.interface';
import router                   from '@/router';
import mzTooltip                from '@/components/tooltip/tooltip.component.vue';

@Component({
  components: {
    mzTooltip,
  },
})
export default class mzCraftsmenDetailPortfolio extends Vue {
  @Prop(String) public readonly type!: string;
  @Prop(Object) public readonly item!: IMyMessage;

  public isHover: boolean = false;
  public isHoverIcon: boolean = false;
  public isHoverIconDelete: boolean = false;

  public goToDetailCrafstmen(uuid: string): void {
    router.push({ name: 'Craftsmen detail', params: { uuid } });
  }

  public goToDetail(uuid: string): void {
    router.push({ name: 'Message detail', params: {uuid} });
  }

  public archiveMessage(uuid: string): void {
    router.push({ name: 'Home' });
  }
}
</script>

<style lang="scss"
       scoped>

.my-message-card {
  &__container {
    background: white;
    margin: 1rem .5rem;
    padding: 1rem;
    display: flex;
    align-items: center;
    border: 1px solid var(--gray-400);
    border-radius: 2px;

    &__craftsmen {
      height: 9rem;
      display: flex;
      align-items: center;
      position: relative;
      width: 25%;
      margin-right: 1.5rem;

      .picture {
        width: 7rem;
        height: 7rem;
        border-radius: 50%;
        object-fit: cover;
        margin-right: 1rem;

        &--cover-bg {
          position: absolute;
          width: 7rem;
          height: 7rem;
          border-radius: 50%;
          background: var(--black-60);
          top: 1rem;
          display: none;
          justify-content: center;
          align-items: center;
          color: var(--white);
          font-size: 1.6rem;
          font-weight: var(--font-regular);
          text-align: center;
        }
      }

      .show-overlay {
        display: flex;
      }

      .name {
        font-size: 1.8rem;
      }

      &:hover {
        cursor: pointer;

        .name {
          color: var(--primary-color);
        }
      }
    }

    &:hover {
      box-shadow: 0 0 1rem 0 var(--gray-400);
      border: 1px solid var(--primary-color);
      cursor: pointer;
    }

    &__message {
      width: 60%;
      position: relative;

      .title {
        font-size: 1.8rem;
        font-weight: vaR(--font-medium);
        display: block;
        width: 100%;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }

      .badge {
        position: absolute;
        left: -1.5rem;
        top: -.5rem;
        display: block;
        background: var(--blue);
        width: 1.25rem;
        height: 1.25rem;
        border-radius: 50%;
      }

      .description {
        display: block;
        width: 100%;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        color: var(--gray-900);
      }
    }

    &__icon {
      margin: 0 auto;
      width: 3rem;
      height: 3rem;

      .icon {
        width: 100%;
        height: 100%;
      }
    }
  }
}

@include respond-to(mobile) {
  .my-message-card {
    &__container {
      flex-direction: column;

      &__craftsmen {
        width: 100%;
        margin: 0;
        display: flex;
        justify-content: center;

        .picture--cover-bg {
          top: 1.2rem;
          left: 9rem;
        }
      }

      &__message {
        width: 100%;
        padding: 0 2.5rem;

        .badge {
          left: .5rem;
        }
      }
    }
  }
}
</style>