export interface IUserItem {
  avatar: string;
  description: string;
  title: string;
  price: number;
}

export interface IUserItemStatus {
  items: IUserItem[];
  status: string;
}
