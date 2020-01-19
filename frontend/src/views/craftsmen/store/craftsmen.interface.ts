export interface ICraftsmenList {
  craftsmenSortOption: string[];
  defaultCraftsmenSortOption: string;
  filters: ICraftsmenFilters;
  craftsmenList: ICraftsmen[];
}

export interface ICraftsmenFilters {
  category: ICategory[];
  targetGroup: ITargetGroup[];
  tags: string[];
}

export interface ICategory {
  value: string;
  icon: string;
}

export interface ITargetGroup {
  value: string;
  isSelected: boolean;
}

export interface ICraftsmen {
  city: string;
  name: string;
  rating: number;
  tags: string[];
  image: string;
  id: number | null;
}
