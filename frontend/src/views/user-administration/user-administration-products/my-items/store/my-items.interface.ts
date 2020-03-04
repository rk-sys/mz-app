export interface IUserItem {
  avatar: string;
  description: string;
  title: string;
  price: number;
  uuid: string;
}

export interface IUserItemStatus {
  items: IUserItem[];
  status: string;
}

export interface IDeleteItem {
  uuid: string;
  title: string;
}
