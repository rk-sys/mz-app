import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import cloneDeep                                from 'lodash/cloneDeep';
import { ILogin, ILoginForm }                   from '../login.interface';
import { mzLoginState }                         from './login.state';
import * as loginService                        from '../login.service';
import { i18n }                                 from '@/i18n/i18n';
import Notification                             from '@/components/notification/notifications';
import router                                   from '@/router';

@Module({ namespaced: true, stateFactory: true })
export default class mzLoginModule extends VuexModule {
  public mzLoginState: ILogin = cloneDeep(mzLoginState);

  @Mutation
  public setLoginForm(payload: ILoginForm) {
    this.mzLoginState.loginForm = payload;
  }

  @Mutation
  public setEmail(payload: string) {
    this.mzLoginState.loginForm.email = payload;
  }

  @Mutation
  public setPassword(payload: string) {
    this.mzLoginState.loginForm.password = payload;
  }

  @Action
  public async loginIntoService() {
    const credentials = {
      email: this.mzLoginState.loginForm.email,
      password: this.mzLoginState.loginForm.password,
    };
    try {
      await loginService.loginIntoService(credentials).then((response) => {
        const currentUser = {
          email: response.user.email,
          name: response.user.displayName,
          uid: response.user.uidl,
        };
        this.context.commit('setCurrentUser', { currentUser }, { root: true });
      });
      Notification.successNotification(i18n.t(`notification.success`), i18n.t(`notification.login`));
      this.context.commit('setLoginForm', {
        email: '',
        password: '',
      });
      router.push({ name: 'Home' });
    } catch (e) {
      Notification.errorNotification(i18n.t(`notification.error`), i18n.t(`notification.${e.code}`));
      throw new Error(e);
    }
  }
}
