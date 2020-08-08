<template>
  <mz-form :form-ref.sync="form"
           :model="displayContactForm"
           :rules="contactRules"
           @submit.prevent.native="updateAccountContact()"
           class="mz-contact__form"
           id="displayContactForm">

    <div :key="i"
         class="form__container"
         v-for="(contact, i) in contactList">

      <div :class="[ `form__container__icon icon-${contact.icon}--primary` ]"></div>

      <mz-form-item :prop="contact.type"
                    class="form__container__item">

        <mz-input :holder="$t(`form.${contact.type}`)"
                  :id="contact.type"
                  v-model="displayContactForm[contact.type]" />
      </mz-form-item>
    </div>

    <div class="mz-contact__form__button">
      <mz-button buttonStyle="primary"
                 form="displayContactForm"
                 native-type="submit">{{$t(`form.save`)}}
      </mz-button>
    </div>
  </mz-form>
</template>

<script lang="ts">
import { Component, Vue }                    from 'vue-property-decorator';
import { registerStoreModule }               from '@/helpers/helpers';
import { namespace }                         from 'vuex-class';
import { i18n, loadTranslationsAsync }       from '@/i18n/i18n';
import Store                                 from '@/store/store';
import { Route }                             from 'vue-router';
import { IVueElementFormReference }          from '../../store/user-account.state';
import mzUserAccountModule                   from '../../store/user-account.module';
import mzInput                               from '@/components/input/mz-input.component.vue';
import mzForm                                from '@/components/form/form/form.component.vue';
import mzFormItem                            from '@/components/form/form-item/form-item.component.vue';
import mzButton                              from '@/components/buttons/button.component.vue';
import { IContact, IUserDisplayContactForm } from '../../store/user-account.interface';

const LOCAL_STORE: string = 'userAccount';
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
  @local.State((state: mzUserAccountModule) => state.mzUserDisplayContactForm) public displayContactForm!: IUserDisplayContactForm;
  @local.State((state: mzUserAccountModule) => state.mzContactList) public contactList!: IContact[];
  @local.Action public updateContact!: () => any;

  public form: HTMLElement | null = null;

  public contactRules: any = {
    phone: [
      // { min: 9, message: i18n.t('rules.phoneLength'), trigger: 'submit' },
      // { max: 9, message: i18n.t('rules.phoneLength'), trigger: 'submit' },
      // { type: 'number', message: i18n.t('rules.correctPhone'), trigger: 'submit' },
    ],
    email: [
      { type: 'email', message: i18n.t('rules.correctEmail'), trigger: 'submit' },
    ],
    facebook: [
      { min: 4, message: i18n.t('rules.minLength', [ 4 ]), trigger: 'submit' },
      { max: 32, message: i18n.t('rules.maxLength', [ 32 ]), trigger: 'submit' },
    ],
    website: [
      { min: 4, message: i18n.t('rules.minLength', [ 4 ]), trigger: 'submit' },
      { max: 32, message: i18n.t('rules.maxLength', [ 32 ]), trigger: 'submit' },
    ],
    address: [
      { min: 4, message: i18n.t('rules.minLength', [ 4 ]), trigger: 'submit' },
      { max: 32, message: i18n.t('rules.maxLength', [ 32 ]), trigger: 'submit' },
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
    const lang: string = Store.state.global.defaultLang;

    try {
      await loadTranslationsAsync(lang, import(`../i18n/${lang}` as string));
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

.mz-contact__form {
  margin: 2rem 3rem 0;

  .form__container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 36rem;
    margin: .1rem 0;

    &__icon {
      min-width: 3.8rem;
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


@media screen and (max-width: 560px) {
  .mz-contact__form {
    margin: 2rem 1.5rem 0;

    &__button {
      max-width: fit-content;
    }
  }
}
</style>

