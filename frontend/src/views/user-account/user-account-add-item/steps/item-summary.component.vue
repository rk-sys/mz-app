<template>
  <div class="mz-item-summary">
    <mz-box-with-title :title="newItem.title">
      <div class="mz-item-summary__header">

        <span class="mz-item-summary__item-price">
          {{ `${newItem.price}` }} {{ $t('itemSummary.currency') }}
        </span>
      </div>

      <div class="mz-item-summary__condition">
        <span class="mz-item-summary__condition__title">{{ $t(`itemDescription.form.condition`) }} </span>
        <span class="mz-item-summary__condition__subtitle">{{ $t(`itemDescription.isNew.${newItem.isNew}`) }}</span>
      </div>
      <div class="mz-item-summary__tag-list">
        <mz-tag v-for="(tag, index) in newItem.tags"
                :is-presentation="true"
                :key="index"
                :tag="tag">

        </mz-tag>
      </div>
    </mz-box-with-title>

    <mz-box-with-title :title="$t(`itemSummary.pictureSection`)">
      <img class="mz-item-summary__big-picture"
           :src="newItem.mainPicture.url"
           v-if="url === '' && newItem.mainPicture.url"
           alt="big picture">

      <div v-else-if="url === '' && !newItem.mainPicture.url"
           class="mz-item-summary__big-picture--empty">

        <div class="icon icon-empty"></div>

        <span class="text">{{ $t('itemSummary.mainPictureEmpty') }}</span>
      </div>

      <img class="mz-item-summary__big-picture"
           :src="url"
           alt="big picture"
           v-else>

      <div class="mz-item-summary__gallery">
        <div v-for="(picture, index) in newItem.pictures"
             class="mz-item-summary__gallery__picture-wrapper"
             :key="index">

          <img class="mz-item-summary__gallery__small-picture"
               @click="previewPicture(picture.url)"
               :src="picture.url"
               alt="small picture"
               :class="{ 'mz-item-summary__gallery__small-picture--select':
                        picture.url === url || (picture.url === newItem.mainPicture.url && !url) }">

          <span class="mz-item-summary__gallery__main-picture-label"
                v-if="picture.url === newItem.mainPicture.url">

            {{ $t('itemSummary.mainPicture') }}
          </span>
        </div>
      </div>
    </mz-box-with-title>

    <mz-box-with-title :title="$t(`itemDescription.title.description`)">

      <div class="mz-item-summary__item-description">
        {{ newItem.description }}
      </div>
    </mz-box-with-title>

    <div class="mz-item-summary__buttons">

      <mz-button class="button-previous"
                 @click="goToStep3()">
        {{ $t(`button.goToPrevious`)}}
      </mz-button>

      <mz-button class="button-next">
        {{ $t(`button.post`)}}
      </mz-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue }  from 'vue-property-decorator';
import { namespace }       from 'vuex-class';
import { IAddItemNewItem } from '@/views/user-account/user-account-add-item/store/user-account-add-item.interface';
import mzAddItemModule     from '@/views/user-account/user-account-add-item/store/user-account-add-item.module';
import mzButton            from '@/components/buttons/button.component.vue';
import mzInput             from '@/components/input/mz-input.component.vue';
import mzInputTextarea     from '@/components/input-textarea/mz-input-textarea.component.vue';
import mzFormItem          from '@/components/form/form-item/form-item.component.vue';
import mzForm              from '@/components/form/form/form.component.vue';
import mzBoxWithTitle      from '@/components/box-with-title/box-with-title.component.vue';
import mzTag               from '@/components/tag/tag.component.vue';
import mzRadio             from '@/components/form/radio/radio.component.vue';

const LOCAL_STORE = 'addItem';
const local = namespace(LOCAL_STORE);

@Component({
  components: {
    mzFormItem,
    mzInput,
    mzForm,
    mzButton,
    mzBoxWithTitle,
    mzInputTextarea,
    mzTag,
    mzRadio,
  },
})
export default class mzItemSummary extends Vue {
  @local.State((state: mzAddItemModule) => state.newItem) public newItem!: IAddItemNewItem;
  @local.Action public goToStep3!: () => void;
  public url: string = '';

  public previewPicture(pictureUrl: string): void {
    this.url = pictureUrl;
  }
}
</script>

<style lang="scss"
       scoped>

.mz-item-summary {
  margin-top: 6rem;
  position: relative;

  .box-with-title {
    margin-bottom: 3rem;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    font-size: 2.2rem;
    position: absolute;
    top: 30px;
    right: 50px;
  }

  &__condition {
    margin: 2rem 3rem 0;

    &__title {
      font-weight: var(--font-medium);
    }

    &__subtitle {
      font-weight: var(--font-bold);
      color: var(--primary-color);
    }
  }

  &__item-price {
    color: var(--primary-color);
    font-weight: var(--font-bold);
  }

  &__tag-list {
    display: flex;
    flex-wrap: wrap;
    margin: 3rem 3rem 0;
  }

  &__big-picture {
    width: 100%;
    height: 45rem;
    padding: 3rem;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;

    &--empty {
      width: 100%;
      height: 45rem;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      border: .2rem dashed var(--gray-500);
      border-radius: .2rem;

      .icon {
        width: 7rem;
        height: 7rem;
      }

      .text {
        font-weight: var(--font-medium);
        color: var(--gray-500);
        font-size: 2.2rem;
        margin-top: 2rem;
      }
    }
  }

  &__gallery {
    display: flex;
    justify-content: flex-start;
    margin: 4rem 0 2rem;

    &__picture-wrapper {
      position: relative;
      margin-right: 2.1rem;
    }

    &__small-picture {
      width: 12.5rem;
      height: 12.5rem;
      cursor: pointer;

      &:hover {
        transition: .2s;
        padding: 0.2rem;
        border: .2rem dashed var(--primary-color);
      }

      &--select {
        border: .2rem dashed var(--primary-color);
        padding: 0.2rem;
        border-radius: 2px;
      }
    }

    &__main-picture-label {
      color: var(--primary-color);
      width: max-content;
      position: absolute;
      top: -2.2rem;
      left: 50%;
      transform: translateX(-50%);
      font-size: 1.2rem;
      font-weight: var(--font-bold);
    }
  }

  &__item-description {
    padding: 1.5rem 3rem;
    line-height: 2.5rem;
    overflow-wrap: break-word;
  }

  &__buttons {
    margin-top: 7rem;
    margin-bottom: 7rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .button-next,
    .button-previous {
      width: 14.5rem;
    }

    .button-next {
      margin-right: 0;
      margin-left: auto;
    }
  }
}
</style>
