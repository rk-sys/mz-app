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
          name: 'Login',
          label: 'searchCraftsmen',
        },
        {
          name: 'Login',
          label: 'buyProduct',
        },
        {
          name: 'Login',
          label: 'craftProduct',
        },
        {
          name: 'Login',
          label: 'addOffer',
        },
        {
          name: 'Login',
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
          name: 'Login',
          label: 'offer',
        },
        {
          name: 'Login',
          label: 'products',
        },
      ],
    },
  ],
};
