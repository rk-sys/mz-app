import { IUserAccountMenu } from '@/views/user-account/store/user-account.interface';

export const userAccountMenu: IUserAccountMenu = {
  userInfo: {
    displayName: '',
    photoURL: '',
    emailVerified: '',
    email: '',
    uid: '',
  },
  links: [
    {
      label: 'editProfile',
      nameUrl: 'User account edit',
    },
    {
      label: 'accountInformation',
      nameUrl: 'User account information',
    },
    {
      label: 'items',
      nameUrl: 'User items',
    },
    {
      label: 'message',
      nameUrl: 'Login',
    },
    {
      label: 'calendar',
      nameUrl: 'Registration',
    },
  ],
};

export interface IVueElementFormReference {
  validate: (arg: (valid: boolean) => void) => any;
  clearValidate: () => void;
}
