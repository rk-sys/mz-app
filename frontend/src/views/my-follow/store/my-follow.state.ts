import { IMyFollow, IMyFollowMenu } from './my-follow.interface';

export const menuFollow: IMyFollowMenu = {
  isOpen: false,
  menuLinks: [
    {
      title: 'myFollow',
      icon: 'icon-heart',
      activeName: 'follow',
      links: [
        {
          name: 'My follow craftsmen',
          label: 'myFollowCraftsmen',
        },
        {
          name: 'My follow items',
          label: 'myFollowItems',
        },
        {
          name: 'My follow offer',
          label: 'myFollowOffer',
        },
      ],
    },
  ],
};

export const myFollow: IMyFollow = {
  craftsmen: [],
  productList: [],
};
