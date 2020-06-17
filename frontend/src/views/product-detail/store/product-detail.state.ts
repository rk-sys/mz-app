import { IProductDetail } from './product-detail.interface';

export const productDetail: IProductDetail = {
  craftsman: {
    name: '',
    uuid: 0,
    city: '',
    rating: 0,
    picture: '',
  },
  product: {
    follow: false,
    uuid: '',
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
  customers: [],
};

