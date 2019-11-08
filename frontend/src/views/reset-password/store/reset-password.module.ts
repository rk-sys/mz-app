import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import cloneDeep                                from 'lodash/cloneDeep';
import { mzResetPasswordState }                 from '@/views/reset-password/store/reset-password.state';
import { IResetPassword, IResetPasswordForm }   from '@/views/reset-password/reset-password.interface';
import 'firebase/auth';
import * as resetPasswordService                from '@/views/reset-password/reset-password.service';
import Notification                             from '@/components/notification/notifications';
import { i18n }                                 from '@/i18n/i18n';
import router                                   from '@/router';

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

  @Action
  public async sendPasswordResetEmail() {
    const credentials = {
      email: this.mzResetPasswordState.resetPasswordForm.email,
    };
    try {
      const response = await resetPasswordService.sendPasswordResetEmail(credentials);

      Notification.successNotification(i18n.t(`notification.success`), i18n.t(`notification.send`));
      this.context.commit('setRegistrationForm', {
        email: '',
      });
      router.push({ name: 'Login' });
    } catch (e) {
      Notification.errorNotification(i18n.t(`notification.error`), i18n.t(`notification.${e.code}`));
      throw new Error(e);
    }
  }
}
