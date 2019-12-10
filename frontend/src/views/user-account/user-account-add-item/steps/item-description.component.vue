<template>
  <div class="mz-item-description">
    <mz-box-with-title :title="$t(`itemDescription.title.description`)">

      <mz-form :form-ref.sync="formItemDescription"
               :model="newItem"
               :rules="itemDescriptionRules"
               @submit.prevent.native=""
               class="mz-item-description__form"
               id="itemDescriptionForm">

        <div class="mz-item-description__form__container">
          <p class="label"> {{ $t(`itemDescription.form.title`) }}</p>

          <mz-form-item class="form__container__item"
                        prop="title">

            <mz-input :holder="$t(`itemDescription.form.addTitle`)"
                      :is-password="false"
                      id="title"
                      v-model="newItem.title" />
          </mz-form-item>
        </div>

        <div class="mz-item-description__form__container">
          <p class="label"> {{ $t(`itemDescription.form.price`)}}</p>

          <mz-form-item class="form__container__item"
                        prop="price">

            <mz-input :holder="$t(`itemDescription.form.addPrice`)"
                      :is-password="false"
                      id="price"
                      v-model.trim="newItem.price" />
          </mz-form-item>
        </div>

        <div class="mz-item-description__form__container mz-item-description__form__container--gender">
          <p class="label">{{ $t('itemDescription.form.currency') }}</p>

          <mz-form-item class="form__container__item"
                        prop="currency">

            <mz-radio v-for="(option, index) in addItemGeneralInfo.currency"
                      :key="index"
                      v-model="newItem.currency"
                      :label="option.label"
                      class="gender-box">

              <span class="main-category__text">
                {{ $t(`itemDescription.form.${option.label}`) }}
              </span>
            </mz-radio>
          </mz-form-item>
        </div>

        <div class="mz-item-description__form__container mz-item-description__form__container--gender">
          <p class="label"> {{ $t(`itemDescription.form.gender`) }}</p>

          <mz-form-item class="form__container__item"
                        prop="gender">

            <mz-radio v-for="(gender, index) in addItemGeneralInfo.gender"
                      :key="index"
                      v-model="newItem.gender"
                      :label="gender.label"
                      class="gender-box">

              <span class="main-category__text">
                {{ $t(`itemDescription.form.${gender.label}`) }}
              </span>
            </mz-radio>
          </mz-form-item>
        </div>

        <div class="mz-item-description__form__container mz-item-description__form__container--gender">
          <p class="label"> {{ $t(`itemDescription.form.condition`) }}</p>

          <mz-form-item class="form__container__item"
                        prop="isNew">

            <mz-radio v-model="newItem.isNew"
                      :value="true"
                      :label="true"
                      class="gender-box">

              <span class="main-category__text">
                {{ $t(`itemDescription.form.new`) }}
              </span>
            </mz-radio>

            <mz-radio v-model="newItem.isNew"
                      :value="false"
                      :label="false"
                      class="gender-box">

              <span class="main-category__text">
                {{ $t(`itemDescription.form.used`) }}
              </span>
            </mz-radio>
          </mz-form-item>
        </div>

        <div class="mz-item-description__form__container
                    mz-item-description__form__container--textarea">

          <p class="label"> {{ $t(`itemDescription.form.description`) }}</p>

          <mz-form-item class="form__container__item form__container__item"
                        prop="description">

            <mz-input-textarea id="description"
                               v-model="newItem.description" />
          </mz-form-item>
        </div>
      </mz-form>
    </mz-box-with-title>

    <mz-box-with-title :title="$t(`itemDescription.title.addTags`)"
                       :sub-title="lengthOfTags() + $t('itemDescription.lengthOfTags')"
                       :add-color="true"
                       :tooltip-message="$t(`tooltip.addTags`)"
                       :hint="true">

      <div class="mz-item-description__tags">
        <p class="mz-item-description__tags__label"
           :class="{'disabled': disabledTags}">
          {{ $t('itemDescription.form.tags') }}</p>

        <mz-input v-model="itemTag"
                  :holder="$t(`itemDescription.form.addTags`)"
                  id="itemTag"
                  :disabled="disabledTags"
                  class="mz-item-description__tags__input"
                  @keyup.enter.native="addTag(itemTag)">
        </mz-input>

        <div class="mz-item-description__tags__add-btn"
             v-if="!disabledTags"
             @click="addTag(itemTag)">

          +
        </div>
      </div>

      <div class="mz-item-description__tags__list">
        <mz-tag v-for="(tag, index) in newItem.tags"
                :key="index"
                :tag="tag"
                id="tags"
                :index="index"
                :remove-tag="removeTag">

        </mz-tag>
      </div>
    </mz-box-with-title>

    <div class="mz-item-description__buttons">
      <mz-button class="button-previous"
                 @click="goToStep1()">

        {{ $t(`button.goToPrevious`) }}
      </mz-button>

      <mz-button class="button-next"
                 @click="goToNextStep()">

        {{ $t(`button.goNextStep`) }}
      </mz-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue }                       from 'vue-property-decorator';
import { namespace }                            from 'vuex-class';
import { IAddItemGeneralInfo, IAddItemNewItem } from '@/views/user-account/user-account-add-item/store/user-account-add-item.interface';
import { i18n }                                 from '@/i18n/i18n';
import mzAddItemModule                          from '@/views/user-account/user-account-add-item/store/user-account-add-item.module';
import mzButton                                 from '@/components/buttons/button.component.vue';
import mzInput                                  from '@/components/input/mz-input.component.vue';
import mzInputTextarea                          from '@/components/input-textarea/mz-input-textarea.component.vue';
import mzFormItem                               from '@/components/form/form-item/form-item.component.vue';
import mzForm                                   from '@/components/form/form/form.component.vue';
import mzBoxWithTitle                           from '@/components/box-with-title/box-with-title.component.vue';
import mzTag                                    from '@/components/tag/tag.component.vue';
import mzRadio                                  from '@/components/form/radio/radio.component.vue';
import mzSelect                                 from '@/components/form/select/select.component.vue';
import mzOption                                 from '@/components/form/option/option.component.vue';

const LOCAL_STORE = 'addItem';
const local = namespace(LOCAL_STORE);

@Component({
  components: {
    mzFormItem,
    mzInput,
    mzForm,
    mzOption,
    mzSelect,
    mzButton,
    mzBoxWithTitle,
    mzInputTextarea,
    mzTag,
    mzRadio,
  },
})
export default class mzUserAccount extends Vue {
  @local.State((state: mzAddItemModule) => state.mzAddItemGeneralInfo) public addItemGeneralInfo!: IAddItemGeneralInfo;
  @local.State((state: mzAddItemModule) => state.numberOfActiveStep) public activeNumber!: number;
  @local.State((state: mzAddItemModule) => state.newItem) public newItem!: IAddItemNewItem;
  @local.Mutation public setMainCategory!: (payload: string) => void;
  @local.Mutation public addTagToList!: (payload: string) => void;
  @local.Mutation public removeTagFromList!: (payload: number) => void;
  @local.Mutation public parsePrice!: (payload: string) => void;
  @local.Action public goToStep1!: () => void;
  @local.Action public goToStep3!: () => void;

  public itemTag: string = '';
  public disabledTags: boolean = false;

  public formItemDescription: HTMLElement | null = null;

  public itemDescriptionRules: any = {
    title: [
      { required: true, message: i18n.t('rules.required'), trigger: 'submit' },
    ],
    price: [
      { required: true, message: i18n.t('rules.required'), trigger: 'submit' },
      {
        validator: (rule: any, value: string, callback: (error?: Error) => void) => {
          if (!this.checkPrice()) {
            callback(new Error(i18n.t(`rules.minPrice`) as string));
          } else {
            callback();
          }
        },
        trigger: 'submit',
      },
    ],
    description: [
      { required: true, message: i18n.t('rules.required'), trigger: 'submit' },
    ],
  };

  public checkPrice(): boolean {
    const price: number = parseFloat(this.newItem.price);
    this.parsePrice(String(price));
    return price > 0;
  }

  public removeTag(index: number): void {
    this.removeTagFromList(index);
    this.checkDisabledTags();
  }

  public addTag(newTag: string): void {
    if (newTag && this.newItem.tags.length < 11) {
      this.addTagToList(newTag);
      this.itemTag = '';
      this.checkDisabledTags();
    }
  }

  public lengthOfTags(): number {
    return this.newItem.tags.length;
  }

  public checkDisabledTags(): void {
    this.disabledTags = this.newItem.tags.length === 10;
  }

  public goToNextStep(): void {
    (this.formItemDescription as any).validate(async (valid: boolean) => {
      if (valid) {
        this.goToStep3();
      } else {
        return false;
      }
    });
  }
}
</script>

<style lang="scss">
.el-form-item__error {
  bottom: 0;
  top: auto;
  font-weight: bold;
  left: auto;
  right: 0;
}

.el-form-item {
  margin: 0;
}
</style>

<style lang="scss"
       scoped>

.mz-item-description {
  margin-top: 6rem;

  &__form {
    margin: 0 3rem;

    &__container {
      display: flex;

      &--gender {
        height: 7.8rem;
      }

      .label {
        width: 8rem;
        font-size: 1.8rem;
        font-weight: var(--font-regular);
        display: flex;
        align-items: center;
        margin: 0 2rem 0 0;
        text-align: right;
        min-width: 8rem;
        justify-content: flex-end;

        &:after {
          content: '*';
          color: var(--error);
          margin-left: .2rem;
          margin-top: -1.5rem;
        }
      }

      .form__container__item {
        width: 100%;
        margin: 0;
        display: flex;
        align-items: center;

        .gender-box {
          margin-right: 2rem;
          color: var(--gray-500);
          padding: .5rem 1rem;
          background-color: var(--white);
          border: 1px solid var(--white);
          border-radius: 2px;

          &__text {
            font-size: 1.6rem;
            font-weight: var(--font-medium);
          }

          &:hover {
            border: 1px solid var(--primary-color);
            color: var(--primary-color);
            cursor: pointer;
            box-shadow: 0 0 .5rem 0 rgba(0, 0, 0, .2);
          }
        }

        .is-checked {
          background-color: var(--primary-color);
          border: 1px solid var(--primary-color);
          color: var(--white);

          &:hover {
            color: var(--white);
          }
        }
      }

      &--textarea {
        align-items: flex-start;

        .label {
          margin-top: 1.5rem;
        }
      }

      .icon {
        width: 3rem;
        height: 3rem;
        align-self: center;
        margin-right: 1rem;
      }
    }
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

  &__tags {
    display: flex;
    margin: 0 3rem;
    align-items: center;

    &__label {
      font-size: 1.8rem;
      font-weight: var(--font-regular);
      display: flex;
      align-items: center;
      margin: 0 2rem 0 0;
      min-width: 8rem;
      justify-content: flex-end;
    }

    &__list {
      display: flex;
      flex-wrap: wrap;
      margin: 2rem 3rem;
    }

    &__add-btn {
      color: var(--primary-color);
      border: .2rem solid var(--primary-color);
      background-color: var(--white);
      border-radius: 50%;
      height: 2.5rem;
      width: 2.5rem;
      font-size: 3.5rem;
      font-weight: 100;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      transition: .4s;

      &:hover {
        color: var(--white);
        background-color: var(--primary-color);
        border: .2rem solid var(--primary-color);
      }
    }
  }
}
</style>
