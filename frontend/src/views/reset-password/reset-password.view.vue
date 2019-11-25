<template>
  <div class="mz-reset-password">
    <mz-logo :is-green="false"
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
          <div class="form__container__icon icon-mail--green"></div>

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
                   native-type="submit">

          {{ $t(`resetPasswordForm.send`) }}
        </mz-button>
      </mz-form>
    </div>

    <mz-footer :is-light="true"
               class="mz-reset-password__footer"></mz-footer>

    <mz-social-media :is-light="true" class="mz-reset-password__social-media" />
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


const LOCAL_STORE = 'resetPassword';
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
      {
        required: true,
        message: i18n.t('rules.required'),
        trigger: 'submit',
      },
      {
        type: 'email',
        message: i18n.t('rules.correctEmail'),
        trigger:
          [
            'blur',
            'submit',
          ],
      },
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
    const lang = Store.state.global.defaultLang;

    try {
      await loadTranslationsAsync(lang, import(/* webpackChunkName: "user/[request]" */ `./i18n/${lang}`));
      registerStoreModule(LOCAL_STORE.split('/'), mzResetPasswordModule);
      next();
    } catch (e) {
      next(false);
      throw new Error(e);
    }
  }
}
</script>

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
    font-size: 1.2rem;
    line-height: 1.8rem;
    width: 26rem;
    align-self: center;
    color: var(--gray-950);
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
  .mz-reset-password {
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

    &__title {
      font-size: 2.8rem;
    }

    &__info-message {
      font-size: 1rem;
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
  .mz-reset-password {

    &__box {
      width: 30rem;
    }

    &__title {
      font-size: 2.2rem;
    }
  }

  .form__container__icon {
    display: none;
  }
}
</style>
