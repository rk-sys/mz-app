export interface IAddItemGeneralInfo {
  listOfMainRange: IAddItemList[];
  listOfCategory: IAddItemListOfCategory[];
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
}

export interface IAddItemPicture {
  url: string;
  file: Blob | null;
}

