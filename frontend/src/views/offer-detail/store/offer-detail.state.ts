import { IOffer } from '@/views/offer-detail/store/offer-detail.interface';

export const mzOffer: IOffer = {
  craftsman: {
    name: '',
    city: '',
    picture: '',
    uuid: '',
  },
  offerDetail: {
    follow: false,
    type: '',
    title: '',
    price: 0,
    currency: '',
    isFinalPrice: false,
    description: '',
    images: [],
  },
  customers: [],
};
