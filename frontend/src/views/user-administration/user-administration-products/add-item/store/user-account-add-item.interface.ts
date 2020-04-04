export interface IAddItemGeneralInfo {
  listOfMainRange: IAddItemList[];
  listOfCategory: IAddItemListOfCategory[];
  currency: IAddItemList[];
  gender: IAddItemList[];
}

export interface IAddItemListOfCategory {
  mainCategory: string;
  selected: boolean;
  listOfSubCategory: IAddItemList[];
}

export interface IAddItemList {
  label: string;
}

export interface IDeliveryOption {
  isSelected: boolean;
  title: string;
  options: IDelivery[];
}

export interface IPersonalPickupDeliveryOption {
  title: string;
  isSelected: boolean;
  address: string;
  name: string;
  city: string;
  phone: string;
  mail: string;
}

export interface IDelivery {
  label: string | null;
  price: string;
}

export interface IAddItemNewItem {
  mainRange: string;
  mainCategory: string;
  subCategory: string;
  title: string;
  price: string;
  description: string;
  gender: string;
  tags: string[];
  isNew: boolean;
  pictures: IAddItemPicture[];
  mainPicture: IAddItemPicture;
  currency: string;
  parcelLockerDelivery: IDelivery[];
  courierDelivery: IDelivery[];
  letterDelivery: IDelivery[];
  personalPickupDelivery: IPersonalPickupDeliveryOption | null;
}

export interface IAddItemPicture {
  url: string;
  file: Blob | null;
}

