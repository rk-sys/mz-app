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

export interface IUserDisplayContactForm {
  phone: string;
  email: string;
  facebook: string;
  website: string;
  address: string;
}

export interface IContact {
  type: string;
  icon: string;
}

export interface IUserItem {
  avatar: string;
  description: string;
  name: string;
  price: number;
  status: string;
}

export interface IUserItemStatus {
  items: IUserItem[];
  status: string;
}

export interface IItemPortfolio {
  title: string;
  description: string;
  tags: string[];
  picture: IPicture;
}

export interface IPicture {
  url: string;
  file: Blob | null;
}
