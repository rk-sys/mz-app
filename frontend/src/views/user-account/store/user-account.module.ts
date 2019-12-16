import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators';
import cloneDeep                                from 'lodash/cloneDeep';
import { contactList, userAccountMenu }         from './user-account.state';
import * as userAccountService                  from './user-account.service';
import 'firebase/auth';
import {
  IUserAccountMenu,
  IUserDisplayNameForm,
  IUserEmailForm,
  IUserInfo,
  IUserPasswordForm,
  IUserDisplayDescriptionForm,
  IUserDisplayTagsForm, IContact, IUserDisplayContactForm, IUserItem, IUserItemStatus,
}                                               from '@/views/user-account/store/user-account.interface';
import Notification                             from '@/components/notification/notifications';
import { i18n }                                 from '@/i18n/i18n';
import firebase                                 from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';

@Module({ namespaced: true, stateFactory: true })
export default class mzUserAccountModule extends VuexModule {
  public mzUserAccountMenuState: IUserAccountMenu = cloneDeep(userAccountMenu);
  public mzContactList: IContact[] = cloneDeep(contactList);
  public mzItems: IUserItem[] = [];

  public mzUserDisplayNameForm: IUserDisplayNameForm = {
    displayName: '',
  };

  public mzUserDisplayContactForm: IUserDisplayContactForm = {
    phone: '',
    email: '',
    facebook: '',
    website: '',
    address: '',
  };

  public mzUserDisplayDescriptionForm: IUserDisplayDescriptionForm = {
    description: '',
  };

  public mzUserDisplayTagsForm: IUserDisplayTagsForm = {
    tagList: [],
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

  get accountProgress(): number {
    let percentage: number = 0;
    const list: Array<string | string[]> = [
      this.mzUserDisplayDescriptionForm.description,
      this.mzUserDisplayTagsForm.tagList,
      this.mzUserDisplayContactForm.phone,
      this.mzUserDisplayContactForm.phone,
      this.mzUserDisplayContactForm.email,
      this.mzUserDisplayContactForm.facebook,
      this.mzUserDisplayContactForm.website,
      this.mzUserDisplayContactForm.address,
    ];
    const partialValue: number = 100 / list.length;
    list.forEach((element: string | string[]) => {
      if (element.length) {
        percentage += partialValue;
      }
    });
    return percentage;
  }

  @Mutation
  public addTagToList(payload: string): void {
    this.mzUserDisplayTagsForm.tagList.push(payload);
  }

  @Mutation
  public removeTagFromList(payload: number): void {
    this.mzUserDisplayTagsForm.tagList.splice(payload, 1);
  }

  @Mutation
  public setAccountDetails(payload: any): void {
    this.mzUserDisplayDescriptionForm.description = payload.description;
    this.mzUserDisplayTagsForm.tagList = payload.tagList;
    this.mzUserDisplayContactForm = payload.contact;
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

  @Mutation
  public setUserItems(payload: IUserItemStatus): void {
    this.mzItems =
      payload.status === 'all' ?
        payload.items :
        payload.items.filter((item: IUserItem) => item.status === payload.status);
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

  @Action
  public getAccountDetails() {
    const docRef = firebase
      .firestore()
      .collection('users')
      .doc(`${this.mzUserAccountMenuState.userInfo.uid}`);

    docRef.get().then((doc) => {
      if (doc.exists) {

        this.context.commit('setAccountDetails', doc.data());
      }
    }).catch((error) => {
      Notification.errorNotification(i18n.t(`notification.error`) as string, i18n.t(`notification.somethingWrong`) as string);
    });
  }

  @Action
  public updateDescription() {
    const docRef = firebase
      .firestore()
      .collection('users')
      .doc(`${this.mzUserAccountMenuState.userInfo.uid}`);

    docRef.get().then((doc) => {
      if (doc.exists) {
        docRef.update({
          description: this.mzUserDisplayDescriptionForm.description,
        });
        Notification.successNotification(i18n.t(`notification.success`) as string, i18n.t(`notification.savedData`) as string);
      } else {
        docRef.set(this.mzUserDisplayDescriptionForm);
      }
    }).catch((error) => {
      Notification.errorNotification(i18n.t(`notification.error`) as string, i18n.t(`notification.somethingWrong`) as string);
      throw new Error(error);
    });
  }

  @Action
  public updateTags() {
    const docRef = firebase
      .firestore()
      .collection('users')
      .doc(`${this.mzUserAccountMenuState.userInfo.uid}`);

    docRef.get().then((doc) => {
      if (doc.exists) {
        docRef.update({
          tagList: this.mzUserDisplayTagsForm.tagList,
        });
        Notification.successNotification(i18n.t(`notification.success`) as string, i18n.t(`notification.savedData`) as string);
      } else {
        docRef.set(this.mzUserDisplayTagsForm);
      }
    }).catch((error) => {
      Notification.errorNotification(i18n.t(`notification.error`) as string, i18n.t(`notification.somethingWrong`) as string);
      throw new Error(error);
    });
  }

  @Action
  public updateContact() {
    const docRef = firebase
      .firestore()
      .collection('users')
      .doc(`${this.mzUserAccountMenuState.userInfo.uid}`);

    docRef.get().then((doc) => {
      if (doc.exists) {
        docRef.update({
          contact: {
            ...this.mzUserDisplayContactForm,
          },
        });
        Notification.successNotification(i18n.t(`notification.success`) as string, i18n.t(`notification.savedData`) as string);
      } else {
        docRef.set(this.mzUserDisplayContactForm);
      }
    }).catch((error) => {
      Notification.errorNotification(i18n.t(`notification.error`) as string, i18n.t(`notification.somethingWrong`) as string);
      throw new Error(error);
    });
  }

  @Action
  public async getUserItems(status: string): Promise<void> {
    try {
      const { data } = await userAccountService.getUserItems();
      await this.context.commit('setUserItems', { ...data, status });
    } catch (e) {
      throw Error(e);
    }
  }
}
