import { IContact, IUserAccountMenu } from '@/views/user-account/store/user-account.interface';

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

export const items: any = [
  {
    avatar: 'https://marketplace.canva.com/MADGyBSJY_o/4/thumbnail_large/canva-brown-hatchet-on-log-MADGyBSJY_o.jpg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    name: 'Siekiera',
    price: 200,
    status: 'active',
  },
  {
    avatar: 'https://marketplace.canva.com/MADGyBSJY_o/4/thumbnail_large/canva-brown-hatchet-on-log-MADGyBSJY_o.jpg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    name: 'Zbroja',
    price: 100,
    status: 'in-progress',
  },
  {
    avatar: 'https://marketplace.canva.com/MADGyBSJY_o/4/thumbnail_large/canva-brown-hatchet-on-log-MADGyBSJY_o.jpg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    name: 'Buty',
    price: 250,
    status: 'ended',
  },
  {
    avatar: 'https://marketplace.canva.com/MADGyBSJY_o/4/thumbnail_large/canva-brown-hatchet-on-log-MADGyBSJY_o.jpg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    name: 'Włócznia',
    price: 300,
    status: 'active',
  },
  {
    avatar: 'https://marketplace.canva.com/MADGyBSJY_o/4/thumbnail_large/canva-brown-hatchet-on-log-MADGyBSJY_o.jpg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    name: 'Hełm',
    price: 100,
    status: 'active',
  },
  {
    avatar: 'https://marketplace.canva.com/MADGyBSJY_o/4/thumbnail_large/canva-brown-hatchet-on-log-MADGyBSJY_o.jpg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    name: 'Miecz',
    price: 230,
    status: 'ended',
  },
  {
    avatar: 'https://marketplace.canva.com/MADGyBSJY_o/4/thumbnail_large/canva-brown-hatchet-on-log-MADGyBSJY_o.jpg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    name: 'Włócznia',
    price: 300,
    status: 'active',
  },
  {
    avatar: 'https://marketplace.canva.com/MADGyBSJY_o/4/thumbnail_large/canva-brown-hatchet-on-log-MADGyBSJY_o.jpg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    name: 'Hełm',
    price: 100,
    status: 'in-progress',
  },
  {
    avatar: 'https://marketplace.canva.com/MADGyBSJY_o/4/thumbnail_large/canva-brown-hatchet-on-log-MADGyBSJY_o.jpg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    name: 'Miecz',
    price: 230,
    status: 'ended',
  },
  {
    avatar: 'https://marketplace.canva.com/MADGyBSJY_o/4/thumbnail_large/canva-brown-hatchet-on-log-MADGyBSJY_o.jpg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    name: 'Włócznia',
    price: 300,
    status: 'active',
  },
  {
    avatar: 'https://marketplace.canva.com/MADGyBSJY_o/4/thumbnail_large/canva-brown-hatchet-on-log-MADGyBSJY_o.jpg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    name: 'Hełm',
    price: 100,
    status: 'active',
  },
  {
    avatar: 'https://marketplace.canva.com/MADGyBSJY_o/4/thumbnail_large/canva-brown-hatchet-on-log-MADGyBSJY_o.jpg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    name: 'Miecz',
    price: 230,
    status: 'ended',
  },
];

export interface IVueElementFormReference {
  validate: (arg: (valid: boolean) => void) => any;
  clearValidate: () => void;
}
