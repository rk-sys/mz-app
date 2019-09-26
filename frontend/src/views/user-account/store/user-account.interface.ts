export interface IUserAccountMenu {
  userInfo: IUserInfo;
  links: IUserAccountMenuLinks[];
}

export interface IUserAccountMenuLinks {
  label: string;
  url: string;
}

export interface IUserInfo {
  displayName: string;
  photoURL: string;
  emailVerified: string;
  email: string;
  uid: string;
}
