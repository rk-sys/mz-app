import { IOffersState } from '@/views/offers-list/store/offers-list.interface';

export const mzOffers: IOffersState = {
  defaultOffersSortOption: 'name_ASC',
  offersSortOption: [ 'name_ASC', 'name_DESC', 'price_ASC', 'price_DESC' ],
  offersList: [],
  filters: {
    category: [
      {
        value: 'tailoring',
      },
      {
        value: 'gunsmith',
      },
    ],
    targetGroup: [
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
    tags: [ 'miecze', 'topory', 'pianka', 'league of legends' ],
  },
};
