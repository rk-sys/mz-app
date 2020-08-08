import { Action, Module, Mutation, VuexModule }            from 'vuex-module-decorators';
import cloneDeep                                           from 'lodash/cloneDeep';
import { contactList, userAccountMenu, userAccountTarget } from './user-account.state';
import * as userAccountService                             from './user-account.service';
import 'firebase/auth';
import {
  IUserAccountMenu,
  IUserDisplayNameForm,
  IUserEmailForm,
  IUserInfo,
  IUserPasswordForm,
  IUserDisplayDescriptionForm,
  IUserDisplayTagsForm, IContact, IUserDisplayContactForm, IUserItem, IUserItemStatus, IItemPortfolio, IUserAccountMenuLinks, IUserAccountTarget,
}                                                          from '@/views/user-account/store/user-account.interface';
import Notification                                        from '@/components/notification/notifications';
import { i18n }                                            from '@/i18n/i18n';
import firebase                                            from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';

@Module({ namespaced: true, stateFactory: true })
export default class mzUserAccountModule extends VuexModule {
  public mzUserAccountMenuState: IUserAccountMenu = cloneDeep(userAccountMenu);
  public mzContactList: IContact[] = cloneDeep(contactList);
  public mzUserTargetsGroup: IUserAccountTarget = cloneDeep(userAccountTarget);
  public mzItems: IUserItem[] = [];
  public mzItemsPortfolio: IItemPortfolio[] = [];
  public mzMobileMenu: boolean = true;
  public dialogVisible: boolean = false;
  public mzRemoveModalItemPortfolio: boolean = false;
  public mzRemovedItemFromPortfolio: IItemPortfolio = {
    title: '',
    description: '',
    tags: [],
    pictureUrl: '',
  };

  public mzNewItemPortfolio: IItemPortfolio = {
    title: '',
    description: '',
    tags: [],
    pictureUrl: '',
  };

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

  public craftsmanDescription: IUserDisplayDescriptionForm = {
    description: '',
  };

  public productDescription: IUserDisplayDescriptionForm = {
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

  get userAccountMenuLinks(): IUserAccountMenuLinks[] {
    return this.mzUserAccountMenuState.links;
  }

  get userAccountInfo(): IUserInfo {
    return this.mzUserAccountMenuState.userInfo;
  }

  get accountProgress(): number {
    let percentage: number = 0;
    const list: Array<string | string[]> = [
      this.craftsmanDescription.description,
      this.productDescription.description,
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

    return Math.round(percentage * 100) / 100;
  }

  @Mutation
  public setUserTargetsGroup(payload: IUserAccountTarget): void {
    this.mzUserTargetsGroup = payload;
  }

  @Mutation
  public setMzItemsPortfolio(payload: IItemPortfolio[]): void {
    this.mzItemsPortfolio = payload;
  }

  @Mutation
  public setShowMeTargetGroupSelectAll(): void {
    this.mzUserTargetsGroup.showMeTargetsGroup.forEach((element) => {
      element.isSelected = true;
    });
  }

  @Mutation
  public setMyTargetGroupSelectAll(): void {
    this.mzUserTargetsGroup.myTargetsGroup.forEach((element) => {
      element.isSelected = true;
    });
  }

  @Mutation
  public setMzNewItemPortfolio(payload: IItemPortfolio): void {
    this.mzNewItemPortfolio = payload;
  }

  @Mutation
  public resetNewItemPortfolio(): void {
    this.mzNewItemPortfolio = {
      title: '',
      description: '',
      tags: [],
      pictureUrl: '',
    };
  }

  @Mutation
  public setNewItemPortfolioPicture(payload: string): void {
    this.mzNewItemPortfolio.pictureUrl = payload;
  }

  @Mutation
  public setTagToNewItemPortfolio(payload: string): void {
    this.mzNewItemPortfolio.tags.push(payload);
  }

  @Mutation
  public removeTagFromNewItemPortfolio(payload: number): void {
    this.mzNewItemPortfolio.tags.splice(payload, 1);
  }

  @Mutation
  public setMzRemoveModalItemPortfolio(payload: boolean): void {
    this.mzRemoveModalItemPortfolio = payload;
  }

  @Mutation
  public setMzRemovedItemFromPortfolio(payload: IItemPortfolio): void {
    this.mzRemovedItemFromPortfolio = payload;
  }

  @Mutation
  public setDialogVisible(payload: boolean): void {
    this.dialogVisible = payload;
  }

  @Mutation
  public addTagToList(payload: string): void {
    this.mzUserDisplayTagsForm.tagList.push(payload);
  }

  @Mutation
  public changeStateOfMobileMenu(): void {
    this.mzMobileMenu = !this.mzMobileMenu;
  }

  @Mutation
  public removeTagFromList(payload: number): void {
    this.mzUserDisplayTagsForm.tagList.splice(payload, 1);
  }

  @Mutation
  public setAccountDetails(payload: any): void {
    this.craftsmanDescription.description = payload.craftsmanDescription;
    this.productDescription.description = payload.productDescription;
    this.mzUserDisplayTagsForm.tagList = payload.tagList;
    this.mzUserDisplayContactForm = payload.contact;
  }

  @Mutation
  public setUserPasswordForm(payload: IUserPasswordForm): void {
    this.mzUserPasswordForm = payload;
  }

  @Mutation
  public setUserDisplayNameForm(payload: IUserDisplayNameForm): void {
    this.mzUserDisplayNameForm = payload;
  }

  @Mutation
  public setUserEmailForm(payload: IUserEmailForm): void {
    this.mzUserEmailForm = payload;
  }

  @Mutation
  public setUserInfo(payload: IUserInfo): void {
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
  public checkShowMeTargetsGroup(): void {
    if (!this.mzUserTargetsGroup.showMeTargetsGroup[ 0 ].isSelected
      && !this.mzUserTargetsGroup.showMeTargetsGroup[ 1 ].isSelected
      && !this.mzUserTargetsGroup.showMeTargetsGroup[ 2 ].isSelected) {
      this.context.commit('setShowMeTargetGroupSelectAll');
    }
  }

  @Action
  public checkMyTargetsGroup(): void {
    if (!this.mzUserTargetsGroup.myTargetsGroup[ 0 ].isSelected
      && !this.mzUserTargetsGroup.myTargetsGroup[ 1 ].isSelected
      && !this.mzUserTargetsGroup.myTargetsGroup[ 2 ].isSelected) {
      this.context.commit('setMyTargetGroupSelectAll');
    }
  }

  @Action
  public async getCurrentUserInfo(): Promise<void> {
    try {
      const user = await userAccountService.getCurrentLoginUser();
      this.context.commit('setUserInfo', user);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Action
  public async changeUserPassword(): Promise<void> {
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
  public async changeUserEmail(): Promise<void> {
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
  public async changeUserPicture(payload: any): Promise<void> {
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
  public getAccountDetails(): void {
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
      throw new Error(error);
    });
  }

  @Action
  public updateDescriptionCraftsman(): void {
    const docRef = firebase
      .firestore()
      .collection('users')
      .doc(`${this.mzUserAccountMenuState.userInfo.uid}`);

    docRef.get().then((doc) => {
      if (doc.exists) {
        docRef.update({
          craftsmanDescription: this.craftsmanDescription.description,
        });
        Notification.successNotification(i18n.t(`notification.success`) as string, i18n.t(`notification.savedData`) as string);
      } else {
        docRef.set(this.craftsmanDescription);
      }
    }).catch((error) => {
      Notification.errorNotification(i18n.t(`notification.error`) as string, i18n.t(`notification.somethingWrong`) as string);
      throw new Error(error);
    });
  }

  @Action
  public updateDescriptionProduct(): void {
    const docRef = firebase
      .firestore()
      .collection('users')
      .doc(`${this.mzUserAccountMenuState.userInfo.uid}`);

    docRef.get().then((doc) => {
      if (doc.exists) {
        docRef.update({
          productDescription: this.productDescription.description,
        });
        Notification.successNotification(i18n.t(`notification.success`) as string, i18n.t(`notification.savedData`) as string);
      } else {
        docRef.set(this.productDescription);
      }
    }).catch((error) => {
      Notification.errorNotification(i18n.t(`notification.error`) as string, i18n.t(`notification.somethingWrong`) as string);
      throw new Error(error);
    });
  }

  @Action
  public updateTags(): void {
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
  public updateContact(): void {
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

  @Action
  public async getUserItemsPortfolio(): Promise<void> {
    try {
      const response = await userAccountService.getUserItemsPortfolio();
      this.context.commit('setMzItemsPortfolio', response.data);
    } catch (e) {
      throw new Error(e);
    }
  }

  @Action
  public saveNewItemPortfolio(): void {
    this.context.commit('resetNewItemPortfolio');
    this.context.commit('setDialogVisible', false);
  }
}
