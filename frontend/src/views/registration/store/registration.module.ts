import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import cloneDeep                                from 'lodash/cloneDeep';
import * as registrationService                 from '../registration.service';
import { mzRegistrationState }                  from '@/views/registration/store/registration.state';
import { IRegistration, IRegistrationForm }     from '@/views/registration/registration.interface';
import { i18n }                                 from '@/i18n/i18n';
import Notification                             from '@/components/notification/notifications';


@Module({ namespaced: true, stateFactory: true })
export default class mzLoginModule extends VuexModule {
  public mzRegistrationState: IRegistration = cloneDeep(mzRegistrationState);

  @Mutation
  public setRegistrationForm(payload: IRegistrationForm) {
    this.mzRegistrationState.registrationForm = payload;
  }

  @Mutation
  public setEmail(payload: string) {
    this.mzRegistrationState.registrationForm.email = payload;
  }

  @Mutation
  public setName(payload: string) {
    this.mzRegistrationState.registrationForm.name = payload;
  }

  @Mutation
  public setPassword(payload: string) {
    this.mzRegistrationState.registrationForm.password = payload;
  }

  @Mutation
  public setPasswordRepeat(payload: string) {
    this.mzRegistrationState.registrationForm.passwordRepeat = payload;
  }

  @Mutation
  public setRule(payload: boolean) {
    this.mzRegistrationState.registrationForm.rule = payload;
  }

  @Mutation
  public setNewsletter(payload: boolean) {
    this.mzRegistrationState.registrationForm.newsletter = payload;
  }

  get getRegistrationForm() {
    return this.mzRegistrationState.registrationForm;
  }

  get getEmail(): string {
    return this.mzRegistrationState.registrationForm.email;
  }

  get getName(): string {
    return this.mzRegistrationState.registrationForm.name;
  }

  get getPassword() {
    return this.mzRegistrationState.registrationForm.passwordRepeat;
  }

  get getPasswordRepeat() {
    return this.mzRegistrationState.registrationForm.passwordRepeat;
  }

  get getRuleMz() {
    return this.mzRegistrationState.registrationForm.rule;
  }

  get getNewsletter() {
    return this.mzRegistrationState.registrationForm.newsletter;
  }

  @Action
  public async createNewUser(): Promise<void> {
    const newUser = {
      email: this.getEmail,
      name: this.getName,
      password: this.getPassword,
    };
    try {
      await registrationService.createNewUser(newUser).then((response) => {
        if (response.user && !response.user.emailVerified) {
          response.user.sendEmailVerification();
        }
        response.user.updateProfile({ displayName: newUser.name });
      });
      Notification.successNotification(i18n.t(`response.success`), i18n.t(`response.userWasCreated`));
      this.context.commit('setRegistrationForm', {
        name: '',
        lastName: '',
        email: '',
        password: '',
        passwordRepeat: '',
        rule: false,
        newsletter: false,
      });
    } catch (e) {
      Notification.errorNotification(i18n.t(`response.error`), i18n.t(`response.${e.code}`));
      throw new Error(e);
    }
  }
}
