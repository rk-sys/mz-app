import { IProductDetail } from './product-detail.interface';

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
  },
};

