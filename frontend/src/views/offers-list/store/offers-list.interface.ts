export type TSort = 'name_ASC' | 'name_DESC' | 'price_ASC' | 'price_DESC';
export type TOfferStatus = 'create' | 'lookingFor';

export interface IOffersState {
  defaultOffersSortOption: TSort;
  offersSortOption: TSort[];
  offersList: IOffer[];
  filters: IFilters;
}

export interface IOffer {
  uuid: number;
  title: string;
  status: TOfferStatus;
  image: string;
  additionalImages: string[];
  description: string;
  startPrice: number;
  finalPrice: number;
}

export interface IFilters {
  category: IFilterCategory[];
  targetGroup: IFilterTargetGroup[];
  tags: string[];
}

export interface IFilterCategory {
  value: string;
  icon?: string;
}

export interface IFilterTargetGroup {
  value: string;
  isSelected: boolean;
}
