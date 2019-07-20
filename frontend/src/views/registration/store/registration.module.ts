import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import cloneDeep                                from 'lodash/cloneDeep';
import { mzRegistrationState }                  from '@/views/registration/store/registration.state';
import { IRegistration }                        from '@/views/registration/registration.interface';

@Module({namespaced: true, stateFactory: true})
export default class mzLoginModule extends VuexModule {
  public mzRegistrationState: IRegistration = cloneDeep(mzRegistrationState);

    @Mutation
    public setName(payload: string) {
      this.mzRegistrationState.registrationForm.name = payload;
    }

    @Mutation
    public setLastName(payload: string) {
      this.mzRegistrationState.registrationForm.lastName = payload;
    }

    @Mutation
    public setEmail(payload: string) {
      this.mzRegistrationState.registrationForm.email = payload;
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

    @Action
    public getName() {
      return this.mzRegistrationState.registrationForm.name;
    }

    @Action
    public getLastName() {
      return this.mzRegistrationState.registrationForm.lastName;
    }

    @Action
    public getEmail() {
      return this.mzRegistrationState.registrationForm.email;
    }

    @Action
    public getPassword() {
      return this.mzRegistrationState.registrationForm.passwordRepeat;
    }

    @Action
    public getPasswordRepeat() {
      return this.mzRegistrationState.registrationForm.passwordRepeat;
    }

    @Action
    public getRuleMz() {
      return this.mzRegistrationState.registrationForm.rule;
    }

    @Action
    public getNewsletter() {
      return this.mzRegistrationState.registrationForm.newsletter;
    }
}
