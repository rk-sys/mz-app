import { IContact, IUserAccountMenu, IUserAccountTarget } from '@/views/user-account/store/user-account.interface';

export const userAccountTarget: IUserAccountTarget = {
  myTargetsGroup: [
    {
      value: 'reko',
      isSelected: true,
    },
    {
      value: 'larp',
      isSelected: true,
    },
    {
      value: 'cosplay',
      isSelected: true,
    },
  ],
  showMeTargetsGroup: [
    {
      value: 'reko',
      isSelected: true,
    },
    {
      value: 'larp',
      isSelected: true,
    },
    {
      value: 'cosplay',
      isSelected: true,
    },
  ],
};

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
      label: 'editAccount',
      nameUrl: 'User account edit',
    },
    {
      label: 'editProfile',
      nameUrl: 'User account information',
    },
    {
      label: 'portfolio',
      nameUrl: 'User portfolio',
    },
  ],
};

export const contactList: IContact[] = [
  {
    type: 'phone',
    icon: 'phone',
  },
  {
    type: 'email',
    icon: 'mail',
  },
  {
    type: 'facebook',
    icon: 'facebook',
  },
  {
    type: 'website',
    icon: 'domain',
  },
  {
    type: 'address',
    icon: 'pin',
  },
];

export interface IVueElementFormReference {
  validate: (arg: (valid: boolean) => void) => any;
  clearValidate: () => void;
}
