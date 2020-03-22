<template>
  <div class="mz-login-views">
    <mz-logo :is-green="false"
             class="mz-login-views__logo" />

    <div class="mz-login-views__box">
      <h2 class="title">{{$t(`login`)}}</h2>

      <mz-icons-box :icons="loginState.icons" />

      <mz-form :form-ref.sync="formElement"
               :model="loginForm"
               :rules="loginRules"
               @submit.prevent.native="loginUser"
               class="mz-login-view__box__form"
               id="loginForm">

        <div class="form__container">
          <div class="form__container__icon icon-mail--green"></div>

          <mz-form-item class="form__container__item"
                        prop="email">

            <mz-input :error="loginState.errorLoginForm"
                      :holder="$t(`loginForm.login`)"
                      :is-password="false"
                      id="login"
                      v-model="emailModel" />
          </mz-form-item>
        </div>

        <div class="form__container">
          <div class="form__container__icon icon-locked--green"></div>

          <mz-form-item class="form__container__item"
                        prop="password">

            <mz-input :error="loginState.errorLoginForm"
                      :holder="$t(`loginForm.password`)"
                      :is-password="true"
                      :type="'password'"
                      id="password"
                      v-model="passwordModel" />
          </mz-form-item>
        </div>

        <div class="mz-login-views__box__buttons">
          <mz-button buttonStyle="primary"
                     form="loginForm"
                     native-type="submit">{{$t(`login`)}}
          </mz-button>

          <router-link class="btn-register"
                       to="/registration">

            {{$t(`noAccount`)}}

            <span>{{$t('register')}}</span>
          </router-link>

        </div>
      </mz-form>

      <router-link class="mz-login-views__reset-password"
                   to="/reset">

        {{$t(`rememberPassword`)}}
      </router-link>
    </div>

    <mz-footer :is-light="true"
               class="mz-login-views__footer" />

    <mz-social-media :is-light="true"
                     class="mz-login-views__social-media" />
  </div>
</template>

<script lang="ts">
import { Component, Vue }              from 'vue-property-decorator';
import { i18n, loadTranslationsAsync } from '@/i18n/i18n';
import { Route }                       from 'vue-router';
import Store                           from '@/store/store';
import { registerStoreModule }         from '@/helpers/helpers';
import { ILogin, ILoginForm }          from '@/views/login/login.interface';
import { namespace }                   from 'vuex-class';
import mzLoginModule                   from '@/views/login/store/login.module';
import mzInput                         from '@/components/input/mz-input.component.vue';
import mzButton                        from '@/components/buttons/button.component.vue';
import mzFooter                        from '@/components/footer/footer.component.vue';
import mzIconsBox                      from '@/components/icons-box/icons-box.component.vue';
import mzSocialMedia                   from '@/components/social-media/social-media.component.vue';
import mzLogo                          from '@/components/logo/logo.component.vue';
import mzForm                          from '@/components/form/form/form.component.vue';
import mzFormItem                      from '@/components/form/form-item/form-item.component.vue';


const LOCAL_STORE: string = 'login';
const local = namespace(LOCAL_STORE);

@Component({
  components: {
    mzForm,
    mzFormItem,
    mzInput,
    mzFooter,
    mzIconsBox,
    mzButton,
    mzSocialMedia,
    mzLogo,
  },
})
export default class mzLogin extends Vue {
  @local.State((state: mzLoginModule) => state.mzLoginState) public loginState!: ILogin;
  @local.State((state: mzLoginModule) => state.mzLoginState.loginForm) public loginForm!: ILoginForm;
  @local.Mutation public setEmail!: (arg: string) => void;
  @local.Mutation public setPassword!: (arg: string) => void;
  @local.Action public loginIntoService!: () => Promise<void>;

  get emailModel(): string {
    return this.loginState.loginForm.email;
  }

  set emailModel(login: string) {
    this.setEmail(login);
  }

  get passwordModel() {
    return this.loginState.loginForm.password;
  }

  set passwordModel(password: string) {
    this.setPassword(password);
  }

  public formElement: HTMLElement | null = null;

  public loginRules: any = {
    email: [
      { required: true, message: i18n.t('rules.required'), trigger: 'submit' },
      { type: 'email', message: i18n.t('rules.correctEmail'), trigger: [ 'blur', 'submit' ] },
    ],
    password: [
      { required: true, message: i18n.t('rules.required'), trigger: 'submit' },
      { min: 8, message: i18n.t('rules.minLength'), trigger: [ 'blur', 'submit' ] },
    ],
  };

  public loginUser(): void {
    (this.formElement as any).validate(async (valid: boolean) => {
      if (valid) {
        this.loginIntoService();
      } else {
        return false;
      }
    });
  }

  private async beforeRouteEnter(to: Route, from: Route, next: any): Promise<void> {
    const lang: string = Store.state.global.defaultLang;

    try {
      await loadTranslationsAsync(lang,
        import(/* webpackChunkName: "user/[request]" */ `./i18n/${lang}` as string));

      registerStoreModule(LOCAL_STORE.split('/'), mzLoginModule);
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

.mz-login-views {
  height: 100vh;
  background: var(--primary-color);
  display: grid;
  grid-template-rows: 10rem auto 8rem 5rem;
  grid-template-columns: auto;

  &__logo {
    width: 15rem;
    height: 5rem;
    grid-row-start: 1;
    grid-column-start: 1;
    align-self: end;
    justify-self: center;
  }

  &__box {
    background: var(--white);
    width: 50rem;
    height: auto;
    -webkit-border-radius: .2rem;
    -moz-border-radius: .2rem;
    border-radius: .2rem;
    box-shadow: 0 0 1rem 0 var(--gray-700);
    padding: 1rem 4rem;
    display: flex;
    flex-direction: column;
    grid-row-start: 2;
    grid-column-start: 1;
    align-self: center;
    place-self: center;

    .title {
      text-align: center;
      font-weight: 300;
      user-select: none;
      margin-bottom: 1rem;
    }

    .form__container {
      display: flex;
      justify-content: center;
      align-items: center;
      max-height: 8.5rem;

      &__icon {
        width: 3.5rem;
        height: 3.5rem;
        margin-right: 1rem;
      }

      &__item {
        margin: 0;
        width: 100%;
      }
    }

    &__buttons {
      margin-top: 4rem;
      padding: 0 2rem;
      display: flex;
      justify-content: center;
      font-size: 1.6rem;
      margin-bottom: 2rem;
      flex-direction: column;

      .btn-register {
        color: var(--black);
        font-weight: 400;
        text-decoration: none;
        width: 100%;
        border-radius: .2rem;
        border: solid 0.5px var(--gray-500);
        text-align: center;
        margin: 1.5rem auto 0;
        padding: 1rem 2rem;

        &:hover {
          box-shadow: 0 0 1rem 0 var(--gray-450);
        }

        span {
          color: var(--primary-color);
        }
      }
    }
  }

  &__brand-name {
    color: var(--white);
    font-weight: 500;
    margin-top: -5rem;
    margin-bottom: 5rem;
  }

  &__reset-password {
    font-style: italic;
    display: block;
    text-decoration: none;
    color: var(--black);
    margin: 2rem auto;

    &:hover {
      color: var(--primary-color);
    }
  }

  &__footer {
    grid-row-start: 4;
    grid-column-start: 1;
    place-self: center;
  }

  &__social-media {
    grid-row-start: 3;
    grid-column-start: 1;
    place-self: center;
  }
}

@include respond-to(tablet) {
  .mz-login-views {
    grid-template-rows: 9rem auto 8rem 6rem;
    grid-template-columns: auto;

    &__logo {
      align-self: flex-start;
    }

    &__box {
      max-width: 40rem;
      padding: 1rem 2rem;
      grid-row-start: 2;
      grid-column-start: 1;

      .title {
        margin: 1rem 0 3rem;
        font-size: 2.8rem;
      }

      &__buttons {
        margin-top: 3rem;
        padding: 0 2rem;
        display: flex;
        justify-content: center;
        font-size: 1.6rem;
        margin-bottom: 2rem;
        flex-direction: column;
      }
    }

    &__footer {
      grid-row-start: 4;
      grid-column-start: 1;
    }

    &__social-media {
      grid-row-start: 3;
      grid-column-start: 1;
      align-self: center;
    }
  }
}

@include respond-to(mobile) {
  .mz-login-views__box {
    width: 45rem;
  }

  .form__container__icon {
    display: none;
  }
}
</style>
