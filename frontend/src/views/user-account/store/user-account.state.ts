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
      url: 'account/edit',
    },
    {
      label: 'settings',
      url: 'account/settings',
    },
    {
      label: 'message',
      url: 'account/message',
    },
    {
      label: 'calendar',
      url: 'account/calendar',
    },
  ],
};
