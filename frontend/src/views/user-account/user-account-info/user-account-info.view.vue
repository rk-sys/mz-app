<template>
  <div class="user-account-info">
    <mz-box-with-title :title="$t(`boxTitle.description`)">

      <mz-form @submit.prevent.native="updateAccountDescription()"
               :form-ref.sync="form"
               :model="displayDescriptionForm"
               :rules="descriptionRules"
               class="user-account-info__form"
               id="displayDescriptionForm">

        <div class="form__container">
          <mz-form-item class="form__container__item"
                        prop="description">

            <textarea id="description"
                      class="form__container__profile-description"
                      v-model="displayDescriptionForm.description"></textarea>
          </mz-form-item>
        </div>

        <div class="user-account-info__form__button">
          <mz-button buttonStyle="primary"
                     form="displayDescriptionForm"
                     native-type="submit">{{$t(`form.save`)}}
          </mz-button>
        </div>
      </mz-form>
    </mz-box-with-title>

    <mz-box-with-title :title="$t(`boxTitle.tags.newTag`)">
      <div class="user-account-info__form">
        <div class="form__container">
          <div class="form__container__icon icon-tag"></div>

          <mz-input v-model="userTag"
                    :holder="$t(`form.tag`)"
                    @keyup.enter.native="addTag($event.target.value)"></mz-input>
        </div>

        <div class="form__container__inner-title">
          {{ $t(`boxTitle.tags.activeTags`) }}
        </div>

        <div class="form__container__tag-list">
          <mz-tag v-for="(tag, index) in displayTagsForm.tagList"
                  :tag="tag"
                  :index="index"
                  :removeTag="removeTag" />
        </div>

        <div class="user-account-info__form__button">
          <mz-button buttonStyle="primary"
                     @click="updateTags()">

            {{ $t(`form.save`) }}
          </mz-button>
        </div>
      </div>
    </mz-box-with-title>

    <mz-box-with-title :title="$t(`boxTitle.contact`)">
      <mz-contact />
    </mz-box-with-title>
  </div>
</template>

<script lang="ts">
import { Component, Vue }              from 'vue-property-decorator';
import { registerStoreModule }         from '@/helpers/helpers';
import { namespace }                   from 'vuex-class';
import { i18n, loadTranslationsAsync } from '@/i18n/i18n';
import Store                           from '@/store/store';
import { Route }                       from 'vue-router';
import { IVueElementFormReference }    from '../store/user-account.state';
import mzUserAccountModule             from '../store/user-account.module';
import mzInput                         from '@/components/input/mz-input.component.vue';
import mzForm                          from '@/components/form/form/form.component.vue';
import mzFormItem                      from '@/components/form/form-item/form-item.component.vue';
import mzBoxWithTitle                  from '@/components/box-with-title/box-with-title.component.vue';
import mzButton                        from '@/components/buttons/button.component.vue';
import mzUpload                        from '@/components/upload/upload.component.vue';
import mzTag                           from './components/tag.component.vue';
import mzContact                       from './components/contact.component.vue';

const LOCAL_STORE = 'userAccount';
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
  },
})
export default class mzUserAccountInfo extends Vue {
  @local.State((state: mzUserAccountModule) => state.mzUserDisplayTagsForm) public displayTagsForm!: any;
  @local.State((state: mzUserAccountModule) => state.mzUserDisplayDescriptionForm) public displayDescriptionForm!: any;
  @local.Mutation public addTagToList!: (arg: string) => void;
  @local.Mutation public removeTagFromList!: (arg: number) => void;
  @local.Action public updateTags!: () => any;
  @local.Action public updateDescription!: () => any;
  public userTag: string = '';

  public form: HTMLElement | null = null;

  public descriptionRules: any = {
    description: [
      { required: true, message: i18n.t('rules.required'), trigger: 'submit' },
      { min: 4, message: i18n.t('rules.minLength', [ 4 ]), trigger: 'submit' },
    ],
  };

  public addTag(userTag: string): void {
    if (userTag) {
      this.addTagToList(userTag);
      this.userTag = '';
    }
  }

  public removeTag(index: number) {
    this.removeTagFromList(index);
  }

  public async updateAccountDescription() {
    (this.form as unknown as IVueElementFormReference).validate(async (valid: boolean) => {
      if (valid) {
        try {
          this.updateDescription();
        } catch (e) {
          (this.form as unknown as IVueElementFormReference).validate(() => null);
        }
      } else {
        return false;
      }
    });
  }

  private async beforeRouteEnter(to: Route, from: Route, next: any) {
    const lang = Store.state.global.defaultLang;

    try {
      await loadTranslationsAsync(lang, import(`./i18n/${lang}`));
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
  bottom: 1rem;
  top: auto;
  font-weight: bold;
  left: auto;
  right: 1rem;
}

.el-form-item {
  margin: 0;
}
</style>

<style lang="scss"
       scoped>

.user-account-info {
  width: 75rem;
  margin-left: 10rem;

  &__form {
    margin: 0 3rem;

    .form__container {
      display: flex;
      justify-content: start;
      align-items: center;
      margin: 2rem 0;

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
        padding: 2rem;
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
</style>
