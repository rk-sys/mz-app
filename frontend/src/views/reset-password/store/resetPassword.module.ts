import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import cloneDeep                                from 'lodash/cloneDeep';
import { mzResetPasswordState }                 from '@/views/reset-password/store/resetPassword.state';
import { IResetPassword, IResetPasswordForm }   from '@/views/reset-password/resetPassword.interface';
import 'firebase/auth';

@Module({ namespaced: true, stateFactory: true })
export default class mzResetPasswordModule extends VuexModule {
  public mzResetPasswordState: IResetPassword = cloneDeep(mzResetPasswordState);

  @Mutation
  public setRegistrationForm(payload: IResetPasswordForm) {
    this.mzResetPasswordState.resetPasswordForm = payload;
  }

  @Mutation
  public setEmail(payload: string) {
    this.mzResetPasswordState.resetPasswordForm.email = payload;
  }
}
