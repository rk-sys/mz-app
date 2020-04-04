<template>
  <div class="mz-reset-password">
    <mz-logo :is-primary="false"
             class="mz-reset-password__logo" />

    <div class="mz-reset-password__box">
      <mz-icons-box :icons="resetPasswordState.icons" />

      <h2 class="mz-reset-password__title">
        {{ $t(`resetPassword`) }}</h2>

      <span class="mz-reset-password__info-message">
        {{ $t(`resetPasswordForm.message`) }}</span>

      <mz-form :form-ref.sync="formElement"
               :model="resetPasswordForm"
               :rules="resetPasswordRules"
               @submit.prevent.native="sendEmail"
               class="mz-reset-password__box__form"
               id="resetPasswordForm">

        <div class="form__container">
          <div class="form__container__icon icon-mail--primary"></div>

          <mz-form-item class="form__container__item"
                        prop="email">

            <mz-input :holder="$t(`resetPasswordForm.email`)"
                      :is-password="false"
                      id="login"
                      v-model="emailModel"></mz-input>
          </mz-form-item>
        </div>

        <mz-button buttonStyle="primary"
                   form="resetPasswordForm"
                   native-type="submit"
                   class="mz-reset-password__box__form__button">

          {{ $t(`resetPasswordForm.send`) }}
        </mz-button>
      </mz-form>
    </div>

    <mz-social-media :is-light="true"
                     class="mz-reset-password__social-media" />
  </div>
</template>

<script lang="ts">
import { Component, Vue }              from 'vue-property-decorator';
import { i18n, loadTranslationsAsync } from '@/i18n/i18n';
import { Route }                       from 'vue-router';
import Store                           from '@/store/store';
import { namespace }                   from 'vuex-class';
import { registerStoreModule }         from '@/helpers/helpers';
import mzResetPasswordModule           from '@/views/reset-password/store/reset-password.module';
import mzLogo                          from '@/components/logo/logo.component.vue';
import mzFooter                        from '@/components/footer/footer.component.vue';
import mzSocialMedia                   from '@/components/social-media/social-media.component.vue';
import mzForm                          from '@/components/form/form/form.component.vue';
import mzFormItem                      from '@/components/form/form-item/form-item.component.vue';
import mzInput                         from '@/components/input/mz-input.component.vue';
import mzButton                        from '@/components/buttons/button.component.vue';
import mzIconsBox                      from '@/components/icons-box/icons-box.component.vue';
import { IResetPasswordForm }          from '@/views/reset-password/reset-password.interface';


const LOCAL_STORE: string = 'resetPassword';
const local = namespace(LOCAL_STORE);

@Component({
  components: {
    mzLogo,
    mzFooter,
    mzSocialMedia,
    mzForm,
    mzFormItem,
    mzInput,
    mzButton,
    mzIconsBox,
  },
})
export default class mzResetPassword extends Vue {
  @local.State((state: mzResetPasswordModule) => state.mzResetPasswordState) public resetPasswordState!: any;
  @local.State((state: mzResetPasswordModule) => state.mzResetPasswordState.resetPasswordForm) public resetPasswordForm!: IResetPasswordForm;
  @local.Mutation public setEmail!: (arg: string) => void;
  @local.Action public sendPasswordResetEmail!: () => void;

  get emailModel(): string {
    return this.resetPasswordState.resetPasswordForm.email;
  }

  set emailModel(login: string) {
    this.setEmail(login);
  }

  public formElement: HTMLElement | null = null;

  public resetPasswordRules: any = {
    email: [
      { required: true, message: i18n.t('rules.required'), trigger: 'submit' },
      { type: 'email', message: i18n.t('rules.correctEmail'), trigger: [ 'blur', 'submit' ] },
    ],
  };

  public sendEmail(): void {
    (this.formElement as any).validate(async (valid: boolean) => {
      if (valid) {
        this.sendPasswordResetEmail();
      } else {
        return false;
      }
    });
  }

  private async beforeRouteEnter(to: Route, from: Route, next: any): Promise<void> {
    const lang: string = Store.state.global.defaultLang;

    try {
      await loadTranslationsAsync(lang, import(/* webpackChunkName: "user/[request]" */ `./i18n/${lang}` as string));
      registerStoreModule(LOCAL_STORE.split('/'), mzResetPasswordModule);
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
</style>

<style lang="scss"
       scoped>

.mz-reset-password {
  height: 100vh;
  background-color: var(--primary-color);
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
    width: 55rem;
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

    &__form {
      margin-bottom: 3rem;
    }

    .form__container {
      display: flex;
      justify-content: center;
      align-items: center;
      max-height: 8.5rem;
      margin-bottom: 2.8rem;

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
  }

  &__title,
  &__info-message {
    text-align: center;
    user-select: none;
    margin-bottom: 1rem;
  }

  &__title {
    font-weight: 300;
  }

  &__info-message {
    font-size: 2rem;
    width: 100%;
    align-self: center;
    color: var(--gray-950);
  }

  &__social-media {
    grid-row-start: 3;
    grid-column-start: 1;
    place-self: center;
  }
}

@include respond-to(tablet) {
  .mz-reset-password {
    grid-template-rows: 9rem auto 8rem 6rem;
    grid-template-columns: auto;

    &__logo {
      align-self: flex-start;
    }

    &__box {
      width: 65rem;
      max-width: 65rem;
      padding: 1rem 2rem;
      grid-row-start: 2;
      grid-column-start: 1;

      &__form {
        &__button {
          margin: auto;
          display: block;
          width: 100%;
        }
      }
    }

    &__title {
      font-size: 3rem;
      font-weight: var(--font-medium);
    }

    &__info-message {
      font-size: 2.2rem;
      width: 100%;
      line-height: 1.2;
    }

    &__social-media {
      grid-row-start: 3;
      grid-column-start: 1;
      align-self: center;
    }
  }
}

@include respond-to(mobile) {
  .mz-reset-password {
    &__box {
      width: 45rem;

      &__form {
        &__button {
          margin: auto;
          display: block;
          width: 100%;
        }
      }
    }

    &__title {
      font-size: 3rem;
      font-weight: var(--font-medium);
    }

    &__info-message {
      font-size: 2.2rem;
      width: 100%;
      line-height: 1.2;
    }
  }

  .form__container__icon {
    display: none;
  }
}
</style>
