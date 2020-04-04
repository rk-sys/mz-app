import { ICraftsmenDetail, ICraftsmenMenuLinks } from './craftsmen-detail.interface';

export const craftsmenDetail: ICraftsmenDetail = {
  craftsmenBaseInfo: {
    name: '',
    picture: '',
    ratings: [],
    socialMedia: {
      facebook: null,
      twitter: null,
      youtube: null,
      instagram: null,
    },
    craftsmenDescription: '',
    itemDescription: '',
    contact: [],
    tags: [],
  },
  craftsmenPortfolio: [],
  craftsmenComments: [],
  craftsmenProducts: [],
};

export const craftsmenMenuLinks: ICraftsmenMenuLinks[] = [
  {
    label: 'info',
    nameUrl: 'Craftsmen detail info',
  },
  {
    label: 'portfolio',
    nameUrl: 'Craftsmen detail portfolio',
  },
  {
    label: 'products',
    nameUrl: 'Craftsmen detail items',
  },
  {
    label: 'comment',
    nameUrl: 'Comments and rating',
  },
];
