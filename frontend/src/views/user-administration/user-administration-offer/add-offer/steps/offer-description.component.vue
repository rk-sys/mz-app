<template>
  <div class="mz-item-description">

    <mz-form :form-ref.sync="formItemDescription"
             :model="newOffer"
             :rules="itemDescriptionRules"
             @submit.prevent.native=""
             class="mz-item-description__form"
             id="itemDescriptionForm">

      <mz-box-with-title :title="$t(`itemDescription.title.description`)"
                         icon-name="icon-file-edit">

        <div class="mz-item-description__form__container">
          <p class="label">{{ $t(`itemDescription.form.title`) }}</p>

          <mz-form-item class="form__container__item"
                        prop="title">

            <mz-input :holder="$t(`itemDescription.form.addTitle`)"
                      :is-password="false"
                      id="title"
                      v-model="newOffer.title" />
          </mz-form-item>
        </div>

        <div class="mz-item-description__form__container
                    mz-item-description__form__container--textarea">

          <p class="label">{{ $t(`itemDescription.form.description`) }}</p>

          <mz-form-item class="form__container__item form__container__item"
                        prop="description">

            <mz-input-textarea id="description"
                               v-model="newOffer.description" />
          </mz-form-item>
        </div>
      </mz-box-with-title>

      <mz-box-with-title :title="$t(`itemDescription.title.information`)"
                         icon-name="icon-file-edit">

        <div class="mz-item-description__form__container">
          <p class="label">{{ $t(`itemDescription.form.price`)}}</p>

          <mz-form-item class="form__container__item"
                        prop="price">

            <mz-input :holder="$t(`itemDescription.form.addPrice`)"
                      :is-password="false"
                      id="price"
                      v-model.trim="newOffer.price" />
          </mz-form-item>
        </div>

        <div class="mz-item-description__form__container mz-item-description__form__container--switch">
          <p class="label">{{ $t(`itemDescription.form.isFinalPrice`)}}</p>

          <mz-form-item class="form__container__item"
                        prop="isFinalPrice">

            <mz-switch :holder="$t(`itemDescription.form.addPrice`)"
                       :is-password="false"
                       id="isFinalPrice"
                       v-model.trim="newOffer.isFinalPrice" />
          </mz-form-item>
        </div>

        <div class="mz-item-description__form__container">
          <p class="label">{{ $t('itemDescription.form.currency') }}</p>

          <mz-form-item class="form__container__item"
                        prop="currency">

            <mz-radio :key="index"
                      :label="option.label"
                      class="radio-box"
                      v-for="(option, index) in mzAddOfferGeneralInfo.currency"
                      v-model="newOffer.currency">

              <span class="main-category__text">
                {{ $t(`itemDescription.form.${option.label}`) }}
              </span>
            </mz-radio>
          </mz-form-item>
        </div>
      </mz-box-with-title>
    </mz-form>

    <mz-box-with-title :add-color="true"
                       :hint="true"
                       :sub-title="lengthOfTags() + $t('itemDescription.lengthOfTags')"
                       :title="$t(`itemDescription.title.addTags`)"
                       :tooltip-message="$t(`tooltip.addTags`)"
                       icon-name="icon-tag">

      <div class="mz-item-description__tags">
        <p :class="{'disabled': disabledTags}"
           class="mz-item-description__tags__label">
          {{ $t('itemDescription.form.tags') }}</p>

        <mz-input :disabled="disabledTags"
                  :holder="$t(`itemDescription.form.addTags`)"
                  @keyup.enter.native="addTag(itemTag)"
                  class="mz-item-description__tags__input"
                  id="itemTag"
                  v-model="itemTag" />

        <div @click="addTag(itemTag)"
             class="mz-item-description__tags__add-btn"
             v-if="!disabledTags">

          +
        </div>
      </div>

      <div class="mz-item-description__tags__list">
        <mz-tag :index="index"
                :key="index"
                :remove-tag="removeTag"
                :tag="tag"
                id="tags"
                v-for="(tag, index) in newOffer.tags">

        </mz-tag>
      </div>
    </mz-box-with-title>

    <div class="mz-item-description__buttons">
      <mz-button @click="goToStep1()"
                 class="button-previous">

        {{ $t(`button.goToPrevious`) }}
      </mz-button>

      <mz-button @click="goToNextStep()"
                 class="button-next">

        {{ $t(`button.goNextStep`) }}
      </mz-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue }                     from 'vue-property-decorator';
import { namespace }                          from 'vuex-class';
import { i18n }                               from '@/i18n/i18n';
import { IAddNewOffer, IAddOfferGeneralInfo } from '../store/user-account-add-offer.interface';
import mzUserAccountAddOfferModule            from '../store/user-account-add-offer.module';
import mzButton                               from '@/components/buttons/button.component.vue';
import mzInput                                from '@/components/input/mz-input.component.vue';
import mzInputTextarea                        from '@/components/input-textarea/mz-input-textarea.component.vue';
import mzFormItem                             from '@/components/form/form-item/form-item.component.vue';
import mzForm                                 from '@/components/form/form/form.component.vue';
import mzBoxWithTitle                         from '@/components/box-with-title/box-with-title.component.vue';
import mzTag                                  from '@/components/tag/tag.component.vue';
import mzRadio                                from '@/components/form/radio/radio.component.vue';
import mzSelect                               from '@/components/form/select/select.component.vue';
import mzOption                               from '@/components/form/option/option.component.vue';
import mzSwitch                               from '@/components/form/switch/switch.component.vue';

const LOCAL_STORE: string = 'addOffer';
const local = namespace(LOCAL_STORE);

@Component({
  components: {
    mzTag,
    mzForm,
    mzRadio,
    mzInput,
    mzOption,
    mzSelect,
    mzButton,
    mzSwitch,
    mzFormItem,
    mzBoxWithTitle,
    mzInputTextarea,
  },
})
export default class mzUserAdministrationItemDescription extends Vue {
  @local.State((state: mzUserAccountAddOfferModule) => state.mzAddOfferGeneralInfo) public mzAddOfferGeneralInfo!: IAddOfferGeneralInfo;
  @local.State((state: mzUserAccountAddOfferModule) => state.numberOfActiveStep) public activeNumber!: number;
  @local.State((state: mzUserAccountAddOfferModule) => state.newOffer) public newOffer!: IAddNewOffer;
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
    const price: number = parseFloat(this.newOffer.price);
    this.parsePrice(String(price));
    return price > 0;
  }

  public removeTag(index: number): void {
    this.removeTagFromList(index);
    this.checkDisabledTags();
  }

  public addTag(newTag: string): void {
    if (newTag && this.newOffer.tags.length < 11) {
      this.addTagToList(newTag);
      this.itemTag = '';
      this.checkDisabledTags();
    }
  }

  public lengthOfTags(): number {
    return this.newOffer.tags.length;
  }

  public checkDisabledTags(): void {
    this.disabledTags = this.newOffer.tags.length === 10;
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
  bottom: -1rem;
  font-size: 1.6rem;
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

    &__container {
      display: flex;
      margin-top: 1rem;

      .label {
        width: 8rem;
        font-size: 1.8rem;
        font-weight: var(--font-regular);
        display: flex;
        align-items: center;
        margin: 0 2rem 0 0;
        text-align: right;
        min-width: 8rem;
        justify-content: flex-start;

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

        .radio-box {
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

          &.mz-switch {
            background: var(--white);
            border: 1px solid var(--white);
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

      &--switch {
        .label {
          width: 24rem;
          margin: 2rem 2rem 3rem 0;
        }
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
      width: auto;
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

@media screen and (max-width: 425px) {
  .mz-item-description {
    &__form {
      margin: 0 1rem;

      &__container {
        flex-direction: column;
        height: auto;
        margin-top: 3.5rem;

        .label {
          font-size: 2.4rem;
          margin: 0;
          width: auto;
          justify-content: flex-start;
        }

        &--switch {
          .label {
            width: 24rem;
            margin: 2rem 2rem 1rem 0;
          }
        }
      }
    }

    &__tags {
      margin: 3.5rem 0 0 0;
      flex-direction: column;
      align-items: flex-start;
      position: relative;

      &__label {
        font-size: 2.4rem;
      }

      &__add-btn {
        position: absolute;
        right: 3rem;
        bottom: 3rem;
      }

      &__list {
        margin: 2rem 0;
      }
    }

    .form__container__item {
      .radio-box {
        display: block;
        margin: 1rem 0;
        border: 1px solid var(--gray-400);
      }
    }
  }
}
</style>
