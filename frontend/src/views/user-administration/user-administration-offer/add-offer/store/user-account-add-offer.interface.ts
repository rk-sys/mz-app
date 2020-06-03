export interface IAddOfferGeneralInfo {
  listOfType: IAddOfferList[];
  listOfMainRange: IAddOfferList[];
  listOfCategory: IAddOfferListOfCategory[];
  currency: IAddOfferList[];
  gender: IAddOfferList[];
}

export interface IAddOfferListOfCategory {
  mainCategory: string;
  selected: boolean;
  listOfSubCategory: IAddOfferList[];
}

export interface IAddOfferList {
  label: string;
}

export interface IAddNewOffer {
  type: '';
  mainRange: string;
  mainCategory: string;
  subCategory: string;
  title: string;
  price: string;
  isFinalPrice: boolean;
  description: string;
  tags: string[];
  pictures: IAddOfferPicture[];
  mainPicture: IAddOfferPicture;
  currency: string;
}

export interface IAddOfferPicture {
  url: string;
  file: Blob | null;
}

