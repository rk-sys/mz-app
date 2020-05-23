import { IUserAdministration } from '@/views/user-administration/store/user-administration.interface';

export const menuAdministration: IUserAdministration = {
  isOpen: false,
  menuLinks: [
    {
      title: 'products',
      icon: 'icon-shop',
      activeName: 'products',
      links: [
        {
          name: 'User administration my items',
          label: 'myProducts',
        },
        {
          name: 'User administration add product',
          label: 'addProduct',
        },
        {
          name: 'User administration product in realization',
          label: 'productInRealization',
        },
      ],
    },
    {
      title: 'offer',
      icon: 'icon-tag',
      activeName: 'offer',
      links: [
        {
          name: 'User administration my offers',
          label: 'myOffers',
        },
        {
          name: 'Login',
          label: 'addOffer',
        },
        {
          name: 'User administration offers in realization',
          label: 'offerInRealization',
        },
      ],
    },
    {
      title: 'history',
      icon: 'icon-shop',
      activeName: 'history',
      links: [
        {
          name: 'User administration history product list',
          label: 'products',
        },
        {
          name: 'User administration history offer list',
          label: 'offer',
        },
      ],
    },
  ],
};
