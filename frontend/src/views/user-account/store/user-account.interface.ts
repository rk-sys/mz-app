export interface IUserAccountMenu {
  userInfo: IUserInfo;
  links: IUserAccountMenuLinks[];
}

export interface IUserAccountMenuLinks {
  label: string;
  nameUrl: string;
}

export interface IUserInfo {
  displayName: string;
  photoURL: string;
  emailVerified: string;
  email: string;
  uid: string;
}

export interface IUserEmailForm {
  email: string;
  repeatEmail: string;
}

export interface IUserPasswordForm {
  password: string;
  repeatPassword: string;
}

export interface IUserDisplayNameForm {
  displayName: string;
}

export interface IUserDisplayDescriptionForm {
  description: string;
}

export interface IUserDisplayTagsForm {
  tagList: string[];
}
