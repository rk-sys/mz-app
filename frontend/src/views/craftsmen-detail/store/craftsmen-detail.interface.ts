import { IProduct } from '@/views/products-list/store/products.interface';

export interface ICraftsmenDetail {
  craftsmenBaseInfo: ICraftsmenBaseInfo;
  craftsmenPortfolio: IPortfolio[] | [];
  craftsmenComments: IComment[];
  craftsmenProducts: IProduct[];
}

export interface IPortfolio {
  pictureUrl: string;
  title: string;
  description: string;
  tags: string[] | null;
}

export interface IComment {
  description: string;
  customer: string;
  customerId: string;
  pictureUrl: string;
  date: string;
  rate: IRate;
  reply: IReply | null;
}

export interface IReply {
  description: string;
  author: string;
  date: string;
}

export interface IRate {
  quality: string;
  price: string;
  contact: string;
  punctuality: string;
}

export interface ICraftsmenBaseInfo {
  name: string;
  picture: string;
  ratings: IRatings[];
  socialMedia: ISocialMedia;
  craftsmenDescription: string;
  itemDescription: string;
  contact: IContact[];
  tags: string[];
}

export interface IRatings {
  label: string;
  value: number;
}

export interface ISocialMedia {
  facebook: string | null;
  twitter: string | null;
  youtube: string | null;
  instagram: string | null;
}

export interface IContact {
  label: string;
  value: string;
}

export interface ICraftsmenMenuLinks {
  label: string;
  nameUrl: string;
}
