import { IProductDetail }                           from './product-detail.interface';
import { IDelivery, IPersonalPickupDeliveryOption } from '@/views/user-administration/user-administration-products/add-item/store/user-account-add-item.interface';

export const productDetail: IProductDetail = {
  craftsman: {
    name: '',
    id: 0,
    ratings: [],
    picture: '',
    tags: [],
    socialMedia: {
      facebook: '',
      twitter: '',
      youtube: '',
      instagram: '',
    },
  },
  product: {
    id: '',
    title: '',
    description: '',
    price: 0,
    currency: 'zl',
    tags: [],
    pictures: [],
    mainRange: '',
    mainCategory: '',
    subCategory: '',
    gender: '',
    isNew: true,
    productDeliveryOptions: [],
  },
};

