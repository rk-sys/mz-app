<template>
  <mz-form class="mz-registration-form"
           :form-ref.sync="formElement"
           :model="registrationForm"
           :rules="rules"
           @submit.prevent.native="registerNewUser"
           id="registrationForm">

    <div class="mz-registration-form__container">
      <div class="mz-registration-form__icon icon-user--green"></div>

      <mz-form-item class="mz-registration-form__item"
                    prop="name">

        <mz-input :holder="$t(`registerForm.name`)"
                  :is-password="false"
                  :value="registrationForm.name"
                  @input="setName"
                  id="name"></mz-input>
      </mz-form-item>
    </div>


    <div class="mz-registration-form__container">
      <div class="mz-registration-form__icon icon-user--green"></div>

      <mz-form-item class="mz-registration-form__item"
                    prop="lastName">

        <mz-input :holder="$t(`registerForm.lastName`)"
                  :is-password="false"
                  :value="registrationForm.lastName"
                  @input="setLastName"
                  id="lastName"></mz-input>

      </mz-form-item>
    </div>

    <div class="mz-registration-form__container">
      <div class="mz-registration-form__icon icon-mail--green"></div>

      <mz-form-item class="mz-registration-form__item"
                    prop="email">

        <mz-input :holder="$t(`registerForm.email`)"
                  :is-password="false"
                  :value="registrationForm.email"
                  @input="setEmail"
                  id="email"></mz-input>

      </mz-form-item>
    </div>

    <div class="mz-registration-form__container">
      <div class="mz-registration-form__icon icon-locked--green"></div>

      <mz-form-item class="mz-registration-form__item"
                    prop="password">

        <mz-input :holder="$t(`registerForm.password`)"
                  :type="'password'"
                  :value="registrationForm.password"
                  @input="setPassword"
                  id="password"></mz-input>

      </mz-form-item>
    </div>

    <div class="mz-registration-form__container">
      <div class="mz-registration-form__icon icon-locked--green"></div>

      <mz-form-item class="mz-registration-form__item"
                    prop="passwordRepeat">

        <mz-input :holder="$t(`registerForm.repeatPassword`)"
                  :type="'password'"
                  :value="registrationForm.passwordRepeat"
                  @input="setPasswordRepeat"
                  id="passwordRepeat"></mz-input>

      </mz-form-item>
    </div>

    <div class="mz-registration-form__rule">
      <mz-checkbox v-model="mzRule">
        {{$t(`registerForm.acceptRule`)}}
        <router-link to="#">{{$t(`registerForm.rule`)}}</router-link>
        {{$t(`service`)}}
      </mz-checkbox>

      <mz-checkbox v-model="mzNewsletter">
        {{$t(`registerForm.newsletter`)}}
      </mz-checkbox>
    </div>

    <div class="mz-registration-form__buttons">
      <mz-button class="button"
                 form="registrationForm"
                 native-type="submit">{{$t(`buttonsText.submit`)}}
      </mz-button>

      <router-link to="/login"
                   class="btn-register">

        {{$t(`buttonsText.gotAccount`)}}
        <span>{{$t(`buttonsText.login`)}}</span>
      </router-link>
    </div>
  </mz-form>
</template>

<script lang="ts">
import { Component, Vue }    from 'vue-property-decorator';
import { namespace }         from 'vuex-class';
import { i18n }              from '@/i18n/i18n';
import mzRegistrationModule  from '@/views/registration/store/registration.module';
import mzFormItem            from '@/components/form/form-item/form-item.component.vue';
import mzForm                from '@/components/form/form/form.component.vue';
import mzInput               from '@/components/input/mz-input.component.vue';
import mzCheckbox            from '@/components/form/checkbox/checkbox.component.vue';
import mzButton              from '@/components/buttons/button.component.vue';
import yInput                from '@/components/form/input/input.component.vue';
import { IRegistrationForm } from '@/views/registration/registration.interface';

const LOCAL_STORE = 'registration';
const local = namespace(LOCAL_STORE);

@Component({
  components: {
    mzForm,
    mzFormItem,
    mzButton,
    mzInput,
    mzCheckbox,
    yInput,
  },
})
export default class mzRegistrationForm extends Vue {
  @local.State((state: mzRegistrationModule) => state.mzRegistrationState.registrationForm) public registrationForm!: IRegistrationForm;
  @local.Mutation public setName!: (arg: string) => void;
  @local.Mutation public setLastName!: (arg: string) => void;
  @local.Mutation public setEmail!: (arg: string) => void;
  @local.Mutation public setPassword!: (arg: string) => void;
  @local.Mutation public setPasswordRepeat!: (arg: string) => void;
  @local.Mutation public setRule!: (arg: boolean) => void;
  @local.Mutation public setNewsletter!: (arg: boolean) => void;

  public formElement: HTMLElement | null = null;

  get mzRule(): boolean {
    return this.registrationForm.rule;
  }

  set mzRule(isChecked: boolean) {
    this.setRule(isChecked);
  }

  get mzNewsletter(): boolean {
    return this.registrationForm.newsletter;
  }

  set mzNewsletter(isChecked: boolean) {
    this.setNewsletter(isChecked);
  }

  public registerNewUser() {
    (this.formElement as any).validate(() => {
    });
  }

  public validateRoomsNumber = (rule: any, value: any, callback: any) => {
    console.log(12);
    callback();
  };

  public rules: any = {
    name: [
      { required: true, message: i18n.t('rules.required'), trigger: [ 'blur', 'submit' ] },
    ],
    lastName: [
      { required: true, message: i18n.t('rules.required'), trigger: [ 'blur', 'submit' ] },
    ],
    email: [
      { required: true, message: i18n.t('rules.required'), trigger: [ 'blur', 'submit' ] },
      { type: 'email', message: i18n.t('rules.correctEmail'), trigger: [ 'blur', 'submit' ] },
    ],
    password: [
      { required: true, message: i18n.t('rules.required'), trigger: [ 'blur', 'submit' ] },
      { min: 8, message: i18n.t('rules.minLength'), trigger: [ 'blur', 'submit' ] },
    ],
    passwordRepeat: [
      { required: true, message: i18n.t('rules.required'), trigger: [ 'blur', 'submit' ] },
      { min: 8, message: i18n.t('rules.minLength'), trigger: [ 'blur', 'submit' ] },
    ],
  };
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
</style>

<style lang="scss" scoped>
.mz-registration-form {

  &__container {
    display: flex;
    align-items: center;
  }

  &__icon {
    width: 3.2rem;
    height: 3.5rem;
    margin-right: 1.5rem;
  }

  &__item {
    margin: 0;
    width: 100%;
  }

  &__buttons {
    margin-top: 2rem;
    padding: 0 2rem;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    justify-content: center;
    font-size: 1.6rem;
    margin-bottom: 1rem;
    flex-direction: column;

    &__button {
      margin-top: 3rem;
    }
  }

  .btn-register {
    color: var(--black);
    font-weight: 400;
    text-decoration: none;
    width: 100%;
    border-radius: .2rem;
    border: solid 0.5px var(--gray-500);
    text-align: center;
    margin: 1rem auto 2rem;
    padding: 1rem 2rem;

    &:hover {
      box-shadow: 0 0 1rem 0 var(--gray-450);
    }

    span {
      color: var(--primary-color);
    }
  }

  &__rule {
    display: flex;
    flex-direction: column;
    padding: 0 2rem;
    margin-top: 1rem;
  }
}

@media only screen and (max-width: 767px) {

  .mz-registration-form__rule {
    padding: 0;
  }
}

@media only screen and (max-width: 425px) {

  .mz-registration-form__icon {
    display: none;
  }
}
</style>
