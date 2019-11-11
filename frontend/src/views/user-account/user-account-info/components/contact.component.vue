<template>
  <mz-form @submit.prevent.native="updateAccountContact()"
           class="contact__form"
           :form-ref.sync="form"
           :model="displayContactForm"
           :rules="contactRules"
           id="displayContactForm">

    <div class="form__container">
      <div class="form__container__icon icon-locked--green"></div>

      <mz-form-item class="form__container__item"
                    prop="phone">

        <mz-input :holder="$t(`form.phone`)"
                  v-model="displayContactForm.phone"
                  id="phone"></mz-input>
      </mz-form-item>
    </div>

    <div class="form__container">
      <div class="form__container__icon icon-mail--green"></div>

      <mz-form-item class="form__container__item"
                    prop="email">

        <mz-input :holder="$t(`form.email`)"
                  v-model="displayContactForm.email"
                  id="email"></mz-input>
      </mz-form-item>
    </div>

    <div class="form__container">
      <div class="form__container__icon icon-facebook--color"></div>

      <mz-form-item class="form__container__item"
                    prop="facebook">

        <mz-input :holder="$t(`form.facebook`)"
                  v-model="displayContactForm.facebook"
                  id="facebook"></mz-input>
      </mz-form-item>
    </div>

    <div class="form__container">
      <div class="form__container__icon icon-locked--green"></div>

      <mz-form-item class="form__container__item"
                    prop="website">

        <mz-input :holder="$t(`form.website`)"
                  v-model="displayContactForm.website"
                  id="website"></mz-input>
      </mz-form-item>
    </div>

    <div class="form__container">
      <div class="form__container__icon icon-locked--green"></div>

      <mz-form-item class="form__container__item"
                    prop="address">

        <mz-input :holder="$t(`form.address`)"
                  v-model="displayContactForm.address"
                  id="address"></mz-input>
      </mz-form-item>
    </div>

    <div class="contact__form__button">
      <mz-button buttonStyle="primary"
                 form="displayContactForm"
                 native-type="submit">{{$t(`form.save`)}}
      </mz-button>
    </div>
  </mz-form>
</template>

<script lang="ts">
import { Component, Vue }              from 'vue-property-decorator';
import { registerStoreModule }         from '@/helpers/helpers';
import { namespace }                   from 'vuex-class';
import { i18n, loadTranslationsAsync } from '@/i18n/i18n';
import Store                           from '@/store/store';
import { Route }                       from 'vue-router';
import { IVueElementFormReference }    from '../../store/user-account.state';
import mzUserAccountModule             from '../../store/user-account.module';
import mzInput                         from '@/components/input/mz-input.component.vue';
import mzForm                          from '@/components/form/form/form.component.vue';
import mzFormItem                      from '@/components/form/form-item/form-item.component.vue';
import mzButton                        from '@/components/buttons/button.component.vue';

const LOCAL_STORE = 'userAccount';
const local = namespace(LOCAL_STORE);

@Component({
  components: {
    mzInput,
    mzForm,
    mzFormItem,
    mzButton,
  },
})
export default class mzContact extends Vue {
  @local.State((state: mzUserAccountModule) => state.mzUserDisplayContactForm) public displayContactForm!: any;
  @local.Action public updateContact!: () => any;

  public form: HTMLElement | null = null;

  public contactRules: any = {
    phone: [
      { required: true, message: i18n.t('rules.required'), trigger: 'submit' },
      { min: 4, message: i18n.t('rules.minLength', [ 4 ]), trigger: 'submit' },
    ],
    email: [
      { min: 4, message: i18n.t('rules.minLength', [ 4 ]), trigger: 'submit' },
    ],
    facebook: [
      { min: 4, message: i18n.t('rules.minLength', [ 4 ]), trigger: 'submit' },
    ],
    website: [
      { min: 4, message: i18n.t('rules.minLength', [ 4 ]), trigger: 'submit' },
    ],
    address: [
      { min: 4, message: i18n.t('rules.minLength', [ 4 ]), trigger: 'submit' },
    ],
  };

  public async updateAccountContact() {
    (this.form as unknown as IVueElementFormReference).validate(async (valid: boolean) => {
      if (valid) {
        try {
          this.updateContact();
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
      await loadTranslationsAsync(lang, import(`../i18n/${lang}`));
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

<style lang="scss"
       scoped>

.contact__form {
  margin: 2rem 3rem 0;

  .form__container {
    display: flex;
    justify-content: start;
    align-items: center;
    width: 36rem;
    margin: 0.1rem 0;

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
</style>

