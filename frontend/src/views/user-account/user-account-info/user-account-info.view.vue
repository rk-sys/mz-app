<template>
  <div class="mz-user-account-info">
    <mz-progress :percentage="accountProgress" />

    <mz-box-with-title :hint="true"
                       :title="$t(`boxTitle.description`)"
                       :tooltip-message="$t(`tooltip.description`)"
                       icon-name="icon-user">

      <mz-form :form-ref.sync="craftsmanDescriptionForm"
               :model="craftsmanDescription"
               :rules="descriptionRules"
               @submit.prevent.native="updateAccountDescription()"
               class="mz-user-account-info__form"
               id="craftsmanDescription">

        <div class="form__container">
          <mz-form-item class="form__container__item"
                        prop="description">

            <mz-input-textarea class="form__container__profile-description"
                               id="description"
                               v-model="craftsmanDescription.description" />
          </mz-form-item>
        </div>

        <div class="mz-user-account-info__form__button">

          <mz-button buttonStyle="primary"
                     form="craftsmanDescription"
                     native-type="submit">{{$t(`form.save`)}}
          </mz-button>
        </div>
      </mz-form>
    </mz-box-with-title>

    <mz-box-with-title :title="$t(`boxTitle.products`)"
                       icon-name="icon-shop">

      <mz-form :form-ref.sync="productDescriptionForm"
               :model="productDescription"
               :rules="productRules"
               @submit.prevent.native="updateProductDescription"
               class="mz-user-account-info__form"
               id="productDescriptionForm">

        <div class="form__container">
          <mz-form-item class="form__container__item"
                        prop="description">

            <mz-input-textarea class="form__container__profile-description"
                               id="product"
                               v-model="productDescription.description" />
          </mz-form-item>
        </div>

        <div class="mz-user-account-info__form__button">

          <mz-button buttonStyle="primary"
                     form="productDescriptionForm"
                     native-type="submit">{{$t(`form.save`)}}
          </mz-button>
        </div>
      </mz-form>
    </mz-box-with-title>

    <mz-box-with-title :add-color="true"
                       :hint="true"
                       :sub-title="lengthOfTags() + $t('boxTitle.tags.lengthOfTags')"
                       :title="$t(`boxTitle.tags.newTag`)"
                       :tooltip-message="$t(`tooltip.tags`)"
                       icon-name="icon-tag">

      <div class="mz-user-account-info__form">
        <div class="form__container">
          <div class="form__container__icon icon-tag--primary"></div>

          <mz-input :disabled="displayTagsForm.tagList.length >= 10"
                    :holder="$t(`form.tag`)"
                    @keyup.enter.native="addTag(userTag)"
                    v-model="userTag">

          </mz-input>

          <div @click="addTag(userTag)"
               class="form__container__add-btn"
               v-if="!(displayTagsForm.tagList.length >= 10)">

            {{ $t(`removeButton`) }}
          </div>
        </div>

        <div class="form__container__inner-title">
          {{ $t(`boxTitle.tags.activeTags`) }}
        </div>

        <div class="form__container__tag-list">
          <mz-tag :index="index"
                  :key="index"
                  :removeTag="removeTag"
                  :tag="tag"
                  v-for="(tag, index) in displayTagsForm.tagList" />
        </div>

        <div class="mz-user-account-info__form__button">
          <mz-button @click="updateTags()"
                     buttonStyle="primary">

            {{ $t(`form.save`) }}
          </mz-button>
        </div>
      </div>
    </mz-box-with-title>

    <mz-box-with-title :hint="true"
                       :title="$t(`boxTitle.contact`)"
                       :tooltip-message="$t(`tooltip.contact`)"
                       icon-name="icon-chat">

      <mz-contact />
    </mz-box-with-title>
  </div>
</template>

<script lang="ts">
import { Component, Vue }                                    from 'vue-property-decorator';
import { registerStoreModule }                               from '@/helpers/helpers';
import { namespace }                                         from 'vuex-class';
import { i18n, loadTranslationsAsync }                       from '@/i18n/i18n';
import Store                                                 from '@/store/store';
import { Route }                                             from 'vue-router';
import { IVueElementFormReference }                          from '../store/user-account.state';
import { IUserDisplayDescriptionForm, IUserDisplayTagsForm } from '@/views/user-account/store/user-account.interface';
import mzUserAccountModule                                   from '../store/user-account.module';
import mzInput                                               from '@/components/input/mz-input.component.vue';
import mzForm                                                from '@/components/form/form/form.component.vue';
import mzFormItem                                            from '@/components/form/form-item/form-item.component.vue';
import mzBoxWithTitle                                        from '@/components/box-with-title/box-with-title.component.vue';
import mzInputTextarea                                       from '@/components/input-textarea/mz-input-textarea.component.vue';
import mzButton                                              from '@/components/buttons/button.component.vue';
import mzUpload                                              from '@/components/upload/upload.component.vue';
import mzTag                                                 from '@/components/tag/tag.component.vue';
import mzContact                                             from './components/contact.component.vue';
import mzProgress                                            from '@/components/progress/progress.component.vue';

const LOCAL_STORE: string = 'userAccount';
const local = namespace(LOCAL_STORE);

@Component({
  components: {
    mzInput,
    mzForm,
    mzFormItem,
    mzBoxWithTitle,
    mzButton,
    mzUpload,
    mzTag,
    mzContact,
    mzProgress,
    mzInputTextarea,
  },
})
export default class mzUserAccountInfo extends Vue {
  @local.State((state: mzUserAccountModule) => state.mzUserDisplayTagsForm) public displayTagsForm!: IUserDisplayTagsForm;
  @local.State((state: mzUserAccountModule) => state.craftsmanDescription) public craftsmanDescription!: IUserDisplayDescriptionForm;
  @local.State((state: mzUserAccountModule) => state.productDescription) public productDescription!: IUserDisplayDescriptionForm;

  @local.Getter public accountProgress!: () => number;
  @local.Mutation public addTagToList!: (arg: string) => void;
  @local.Mutation public removeTagFromList!: (arg: number) => void;
  @local.Action public updateTags!: () => void;
  @local.Action public updateDescriptionCraftsman!: () => void;
  @local.Action public updateDescriptionProduct!: () => void;

  public userTag: string = '';
  public disabledTagInput: boolean = false;

  public craftsmanDescriptionForm: HTMLElement | null = null;
  public productDescriptionForm: HTMLElement | null = null;

  public descriptionRules: any = {
    description: [
      { max: 256, message: i18n.t('rules.descriptionLength', [ 256 ]), trigger: 'submit' },
    ],
  };

  public productRules: any = {
    description: [
      { max: 256, message: i18n.t('rules.descriptionLength', [ 256 ]), trigger: 'submit' },
    ],
  };

  public addTag(userTag: string): void {
    if (userTag) {
      this.addTagToList(userTag);
      this.userTag = '';
      this.checkDisabledTags();
    }
  }

  public removeTag(index: number): void {
    this.removeTagFromList(index);
    this.checkDisabledTags();
  }

  public checkDisabledTags(): void {
    this.disabledTagInput = this.displayTagsForm.tagList.length === 10;
  }

  public async updateAccountDescription() {
    (this.craftsmanDescriptionForm as unknown as IVueElementFormReference).validate(async (valid: boolean) => {
      if (valid) {
        try {
          this.updateDescriptionCraftsman();
        } catch (e) {
          (this.craftsmanDescriptionForm as unknown as IVueElementFormReference).validate(() => null);
        }
      } else {
        return false;
      }
    });
  }

  public async updateProductDescription() {
    (this.productDescriptionForm as any).validate(async (valid: boolean) => {
      if (valid) {
        try {
          this.updateDescriptionProduct();
        } catch (e) {
          (this.productDescriptionForm as any).validate(() => null);
        }
      } else {
        return false;
      }
    });
  }

  public lengthOfTags(): number {
    return this.displayTagsForm.tagList.length;
  }

  private async beforeRouteEnter(to: Route, from: Route, next: any) {
    const lang: string = Store.state.global.defaultLang;

    try {
      await loadTranslationsAsync(lang, import(`./i18n/${lang}` as string));
      registerStoreModule(LOCAL_STORE.split('/'), mzUserAccountModule);
      await Store.dispatch(`${LOCAL_STORE}/getAccountDetails`);
      next();
    } catch (e) {
      next(false);
      throw new Error(e);
    }
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

.mz-user-account-info {
  width: 85rem;
  margin-left: 10rem;

  &__form {
    margin: 0 3rem;

    .form__container {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin: 2rem 0;

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

      &__icon {
        width: 3.5rem;
        height: 3.5rem;
        margin-right: 1rem;
      }

      &__item {
        margin: 0;
        width: 100%;
      }

      &__profile-description {
        font-family: var(--primary-font-family);
        font-size: 1.4rem;
        width: 100%;
        height: 20rem;
        resize: none;
      }

      &__tag-list {
        margin: 2rem 0;
        display: flex;
        flex-wrap: wrap;
      }

      &__inner-title {
        display: block;
        padding: 1rem 0;
        font-weight: 500;
        font-size: 2.2rem;
      }
    }

    &__button {
      margin: 0 0 0 auto;
      max-width: 14rem;
    }

    &--contact {
      margin: 5rem 3rem 0;

      .form__container {
        margin: 0;
      }
    }
  }
}

@media screen and (max-width: 768px) and (min-width: 426px) {
  .mz-user-account-info {
    margin-left: 0;

    &__form {

      &__button {
        max-width: fit-content;
      }
    }
  }
}

@media screen and (max-width: 425px) {
  .mz-user-account-info {
    margin-left: 0;
    width: 43rem;

    &__form {
      margin: 0;

      &__button {
        max-width: fit-content;
      }
    }
  }
}
</style>
