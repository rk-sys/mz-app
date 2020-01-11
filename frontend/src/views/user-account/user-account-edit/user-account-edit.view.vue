<template>
  <div class="user-account-edit">

    <mz-box-with-title :title="$t(`boxTitle.displayName`)">

      <mz-form :form-ref.sync="formDisplayedName"
               :model="displayNameForm"
               :rules="nameRules"
               @submit.prevent.native="changeDisplayName"
               class="user-account-edit__form"
               id="displayNameForm">

        <div class="form__container">
          <div class="form__container__icon icon-user--green"></div>

          <mz-form-item class="form__container__item"
                        prop="displayName">

            <mz-input :holder="$t(`form.displayName`)"
                      :is-password="false"
                      id="displayName"
                      v-model="displayNameForm.displayName" />
          </mz-form-item>
        </div>

        <div class="user-account-edit__form__button">
          <mz-button buttonStyle="primary"
                     :loading="loadingButtonDisplayName"
                     form="displayNameForm"
                     native-type="submit">{{$t(`form.save`)}}
          </mz-button>
        </div>
      </mz-form>
    </mz-box-with-title>

    <mz-box-with-title :title="$t(`boxTitle.email`)"
                       :sub-title="$t(`boxSubTitle.emailVerified.${userInfo.emailVerified}`)"
                       :add-color="userInfo.emailVerified">

      <mz-form :form-ref.sync="formEmail"
               :model="emailForm"
               :rules="emailRules"
               @submit.prevent.native="changeEmail"
               class="user-account-edit__form"
               id="emailForm">

        <div class="form__container">
          <div class="form__container__icon icon-mail--green"></div>

          <mz-form-item class="form__container__item"
                        prop="email">

            <mz-input :holder="$t(`form.email`)"
                      :is-password="false"
                      id="email"
                      v-model="emailForm.email" />
          </mz-form-item>
        </div>

        <div class="form__container">
          <div class="form__container__icon icon-mail--green"></div>

          <mz-form-item class="form__container__item"
                        prop="repeatEmail">

            <mz-input :holder="$t(`form.repeatEmail`)"
                      :is-password="false"
                      id="repeatEmail"
                      v-model="emailForm.repeatEmail" />
          </mz-form-item>
        </div>

        <div class="user-account-edit__form__button">
          <mz-button buttonStyle="primary"
                     :loading="loadingButtonEmail"
                     form="emailForm"
                     native-type="submit">{{$t(`form.save`)}}
          </mz-button>
        </div>
      </mz-form>
    </mz-box-with-title>

    <mz-box-with-title :title="$t(`boxTitle.password`)">
      <mz-form :form-ref.sync="formPassword"
               :model="passwordForm"
               :rules="passwordRules"
               @submit.prevent.native="changePassword"
               class="user-account-edit__form"
               id="passwordForm">

        <div class="form__container">
          <div class="form__container__icon icon-locked--green"></div>

          <mz-form-item class="form__container__item"
                        prop="password">

            <mz-input :holder="$t(`form.password`)"
                      :is-password="true"
                      id="password"
                      v-model="passwordForm.password" />
          </mz-form-item>
        </div>

        <div class="form__container">
          <div class="form__container__icon icon-locked--green"></div>

          <mz-form-item class="form__container__item"
                        prop="repeatPassword">

            <mz-input :holder="$t(`form.repeatPassword`)"
                      :is-password="true"
                      id="repeatPassword"
                      v-model="passwordForm.repeatPassword" />
          </mz-form-item>
        </div>

        <div class="user-account-edit__form__button">
          <mz-button buttonStyle="primary"
                     :loading="loadingButtonPassword"
                     form="passwordForm"
                     native-type="submit">{{$t(`form.save`)}}
          </mz-button>
        </div>
      </mz-form>
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
import {
  IUserAccountMenu,
  IUserDisplayNameForm,
  IUserEmailForm,
  IUserPasswordForm,
}                                      from '@/views/user-account/store/user-account.interface';
import mzUserAccountModule             from '../store/user-account.module';
import mzInput                         from '@/components/input/mz-input.component.vue';
import mzForm                          from '@/components/form/form/form.component.vue';
import mzFormItem                      from '@/components/form/form-item/form-item.component.vue';
import mzBoxWithTitle                  from '@/components/box-with-title/box-with-title.component.vue';
import mzButton                        from '@/components/buttons/button.component.vue';
import mzUpload                        from '@/components/upload/upload.component.vue';

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
  },
})
export default class mzUserAccountEdit extends Vue {
  @local.State((state: mzUserAccountModule) => state.mzUserDisplayNameForm) public displayNameForm!: IUserDisplayNameForm;
  @local.State((state: mzUserAccountModule) => state.mzUserEmailForm) public emailForm!: IUserEmailForm;
  @local.State((state: mzUserAccountModule) => state.mzUserPasswordForm) public passwordForm!: IUserPasswordForm;
  @local.State((state: mzUserAccountModule) => state.mzUserAccountMenuState.userInfo) public userInfo!: IUserAccountMenu;
  @local.Action public changeUserPassword!: () => Promise<void>;
  @local.Action public changeUserEmail!: () => Promise<void>;
  @local.Action public changeUserDisplayName!: () => Promise<void>;

  public loadingButtonPassword: boolean = false;
  public loadingButtonEmail: boolean = false;
  public loadingButtonDisplayName: boolean = false;

  public formDisplayedName: HTMLElement | null = null;
  public formEmail: HTMLElement | null = null;
  public formPassword: HTMLElement | null = null;

  public nameRules: any = {
    displayName: [
      { required: true, message: i18n.t('rules.required'), trigger: 'submit' },
      { min: 4, message: i18n.t('rules.minLength', [ 4 ]), trigger: 'submit' },
    ],
  };

  public emailRules: any = {
    email: [
      { required: true, message: i18n.t('rules.required'), trigger: 'submit' },
      { type: 'email', message: i18n.t('rules.correctEmail'), trigger: 'submit' },
      {
        validator: (rule: any, value: string, callback: (error?: Error) => void) => {
          if (!this.validEmail()) {
            callback(new Error(i18n.t(`rules.differenceEmail`) as string));
          } else {
            callback();
          }
        },
        trigger: 'submit',
      },
    ],
    repeatEmail: [
      { required: true, message: i18n.t('rules.required'), trigger: 'submit' },
      { type: 'email', message: i18n.t('rules.correctEmail'), trigger: 'submit' },
      {
        validator: (rule: any, value: string, callback: (error?: Error) => void) => {
          if (!this.validEmail()) {
            callback(new Error(i18n.t(`rules.differenceEmail`) as string));
          } else {
            callback();
          }
        },
        trigger: 'submit',
      },
    ],
  };

  public passwordRules: any = {
    password: [
      { required: true, message: i18n.t('rules.required'), trigger: 'submit' },
      { min: 8, message: i18n.t('rules.minLength', [ 8 ]), trigger: 'submit' },
      {
        validator: (rule: any, value: string, callback: (error?: Error) => void) => {
          if (!this.validPassword()) {
            callback(new Error(i18n.t(`rules.differencePassword`) as string));
          } else {
            callback();
          }
        },
        trigger: 'submit',
      },
    ],
    repeatPassword: [
      { required: true, message: i18n.t('rules.required'), trigger: 'submit' },
      { min: 8, message: i18n.t('rules.minLength', [ 8 ]), trigger: 'submit' },
      {
        validator: (rule: any, value: string, callback: (error?: Error) => void) => {
          if (!this.validPassword()) {
            callback(new Error(i18n.t(`rules.differencePassword`) as string));
          } else {
            callback();
          }
        },
        trigger: 'submit',
      },
    ],
  };

  public validEmail() {
    return this.emailForm.email === this.emailForm.repeatEmail;
  }

  public validPassword() {
    return this.passwordForm.password === this.passwordForm.repeatPassword;
  }

  public async changeEmail() {
    (this.formEmail as any).validate(async (valid: boolean) => {
      if (valid) {
        try {
          this.loadingButtonEmail = true;
          this.changeUserEmail();
        } catch (e) {
          throw new Error(e);
        } finally {
          this.loadingButtonEmail = false;
        }
      }
    });
  }

  public async changePassword() {
    (this.formPassword as any).validate(async (valid: boolean) => {
      if (valid) {
        try {
          this.loadingButtonPassword = true;
          this.changeUserPassword();
        } catch (e) {
          throw new Error(e);
        } finally {
          this.loadingButtonPassword = false;
        }
      }
    });
  }

  public async changeDisplayName() {
    (this.formDisplayedName as any).validate(async (valid: boolean) => {
      if (valid) {
        try {
          this.loadingButtonDisplayName = true;
          this.changeUserDisplayName();
        } catch (e) {
          throw new Error(e);
        } finally {
          this.loadingButtonDisplayName = false;
        }
      }
    });
  }

  private async beforeRouteEnter(to: Route, from: Route, next: any) {
    const lang = Store.state.global.defaultLang;


    try {
      await loadTranslationsAsync(lang, import(`./i18n/${lang}` as string));
      registerStoreModule(LOCAL_STORE.split('/'), mzUserAccountModule);
      await Store.dispatch(`${LOCAL_STORE}/getCurrentUserInfo`);
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

.user-account-edit {
  width: 85rem;
  margin-left: 10rem;

  &__form {
    margin: 0 3rem;

    .form__container {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      max-height: 8.5rem;
      margin: 2rem 0;

      &__icon {
        width: 3.7rem;
        height: 3.8rem;
        margin-right: 1rem;
      }

      &__item {
        margin: 0;
      }
    }

    &__button {
      margin: 0 0 0 auto;
      max-width: 14rem;
    }
  }
}

@media screen and (max-width: 768px) {
  .user-account-edit {
    margin-left: 0;
  }
}

@media screen and (max-width: 425px) {
  .user-account-edit {
    width: 46rem;

    &__form {
      &__button {
        display: flex;
        justify-content: flex-end;
      }
    }
  }
}
</style>
