import { ICraftsman }    from '@/views/product-detail/store/product-detail.interface';
import { IProductsList } from '@/views/products-list/store/products.interface';

export interface IMyFollowMenu {
  isOpen: boolean;
  menuLinks: IMenuFollow[];
}

export interface IMenuFollow {
  title: string;
  icon: string;
  activeName: string;
  links: IMenuLinks[];
}

export interface IMenuLinks {
  name: string;
  label: string;
}

export interface IMyFollow {
  craftsmen: ICraftsman[];
  productList: IProductsList[];
}
