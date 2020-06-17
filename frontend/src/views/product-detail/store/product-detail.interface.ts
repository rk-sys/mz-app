import { IDelivery } from '../../product-checkout/store/product-checkout.interface';

export interface IProductDetail {
  craftsman: ICraftsman;
  product: IProduct;
  customers: ICustomer[];
}

export interface ICraftsman {
  name: string;
  uuid: number;
  rating: number;
  picture: string;
  city: string;
}

export interface IProduct {
  follow: boolean;
  title: string;
  description: string;
  price: number;
  currency: string;
  tags: string[];
  pictures: string[];
  mainRange: string;
  mainCategory: string;
  subCategory: string;
  gender: string;
  isNew: boolean;
  uuid: string;
  productDeliveryOptions: IDelivery[];
}

export interface ICustomer {
  name: string;
  uuid: string;
  picture: string;
  newMessage: number;
}
