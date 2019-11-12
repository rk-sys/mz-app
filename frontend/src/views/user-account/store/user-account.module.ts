import { Action, Module, Mutation, VuexModule }                                                 from 'vuex-module-decorators';
import cloneDeep                                                                                from 'lodash/cloneDeep';
import { userAccountMenu }                                                                      from './user-account.state';
import * as userAccountService                                                                  from './user-account.service';
import 'firebase/auth';
import { IUserAccountMenu, IUserDisplayNameForm, IUserEmailForm, IUserInfo, IUserPasswordForm } from '@/views/user-account/store/user-account.interface';
import Notification                                                                             from '@/components/notification/notifications';
import { i18n }                                                                                 from '@/i18n/i18n';


@Module({ namespaced: true, stateFactory: true })
export default class mzUserAccountModule extends VuexModule {
  public mzUserAccountMenuState: IUserAccountMenu = cloneDeep(userAccountMenu);
  public mzUserDisplayNameForm: IUserDisplayNameForm = {
    displayName: '',
  };

  public mzUserEmailForm: IUserEmailForm = {
    email: '',
    repeatEmail: '',
  };

  public mzUserPasswordForm: IUserPasswordForm = {
    password: '',
    repeatPassword: '',
  };

  get userAccountMenuLinks() {
    return this.mzUserAccountMenuState.links;
  }

  get userAccountInfo() {
    return this.mzUserAccountMenuState.userInfo;
  }

  @Mutation
  public setUserPasswordForm(payload: IUserPasswordForm) {
    this.mzUserPasswordForm = payload;
  }

  @Mutation
  public setUserDisplayNameForm(payload: IUserDisplayNameForm) {
    this.mzUserDisplayNameForm = payload;
  }

  @Mutation
  public setUserEmailForm(payload: IUserEmailForm) {
    this.mzUserEmailForm = payload;
  }

  @Mutation
  public setUserInfo(payload: IUserInfo) {
    this.mzUserAccountMenuState.userInfo = {
      displayName: payload.displayName,
      photoURL: payload.photoURL,
      emailVerified: payload.emailVerified,
      email: payload.email,
      uid: payload.uid,
    };
  }

  @Action
  public async getCurrentUserInfo() {
    try {
      const user = await userAccountService.getCurrentLoginUser();
      this.context.commit('setUserInfo', user);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Action
  public async changeUserPassword() {
    const newUserPassword = this.mzUserPasswordForm.password;

    if (newUserPassword !== undefined) {
      try {
        await userAccountService.changeUserPassword(newUserPassword);
        this.context.commit('setUserPasswordForm', { password: '', repeatPassword: '' });
        Notification.successNotification(i18n.t(`notification.success`) as string, i18n.t(`notification.passwordChanged`) as string);
      } catch (e) {
        Notification.errorNotification(i18n.t(`notification.error`) as string, i18n.t(`notification.${e.code}`) as string);
        throw new Error(e);
      }
    }
  }

  @Action
  public async changeUserEmail() {
    const newUserEmail = this.mzUserEmailForm.email;

    if (newUserEmail !== undefined) {
      try {
        await userAccountService.updateEmail(newUserEmail);
        this.context.commit('setUserEmailForm', { email: '', repeatEmail: '' });
        Notification.successNotification(i18n.t(`notification.success`) as string, i18n.t(`notification.emailChanged`) as string);
      } catch (e) {
        Notification.errorNotification(i18n.t(`notification.error`) as string, i18n.t(`notification.${e.code}`) as string);
        throw new Error(e);
      }
    }
  }

  @Action
  public async changeUserDisplayName() {
    const newUserDisplayName = this.mzUserDisplayNameForm.displayName;

    if (newUserDisplayName !== undefined && newUserDisplayName !== null) {
      try {
        await userAccountService.updateDisplayName(newUserDisplayName);
        const response = await userAccountService.getCurrentLoginUser();

        if (response !== null) {
          const currentUser = {
            displayName: response.displayName,
            photoURL: response.photoURL,
            emailVerified: response.emailVerified,
            email: response.email,
            uid: response.uid,
          };
          this.context.commit('setCurrentUser', { currentUser }, { root: true });
          this.context.commit('setUserInfo', currentUser);
        }
        this.context.commit('setUserDisplayNameForm', { name: '' });
        Notification.successNotification(i18n.t(`notification.success`) as string, i18n.t(`notification.displayName`) as string);
      } catch (e) {
        Notification.errorNotification(i18n.t(`notification.error`) as string, i18n.t(`notification.${e.code}`) as string);
        throw new Error(e);
      }
    }
  }

  @Action
  public async changeUserPicture(payload: any) {
    try {
      await userAccountService.updateUserPicture(payload);
      const picture = await userAccountService.getUserPicture();
      const response = await userAccountService.getCurrentLoginUser();

      if (response !== null) {
        const currentUser = {
          displayName: response.displayName,
          photoURL: picture,
          emailVerified: response.emailVerified,
          email: response.email,
          uid: response.uid,
        };

        this.context.commit('setCurrentUser', { currentUser }, { root: true });
        this.context.commit('setUserInfo', currentUser);
      }
      Notification.successNotification(i18n.t(`notification.success`) as string, i18n.t(`notification.pictureWasChange`) as string);
    } catch (err) {
      Notification.errorNotification(i18n.t(`notification.error`) as string, i18n.t(`notification.somethingWrong`) as string);
      throw new Error(err);
    }
  }
}
