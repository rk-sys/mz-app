import { IRate, IRatings } from '../../craftsmen-detail/store/craftsmen-detail.interface';

export interface IProductDetail {
  craftsman: ICraftsman;
  product: IProduct;
}

export interface ICraftsman {
  name: string;
  id: number;
  ratings: IRatings[];
  picture: string;
  tags: string[];
  socialMedia: ISocialMedia;
}

export interface IProduct {
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
}

export interface ISocialMedia {
  facebook: string | null;
  twitter: string | null;
  youtube: string | null;
  instagram: string | null;
}
