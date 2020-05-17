export interface IUserItem {
  avatar: string;
  description: string;
  title: string;
  price: number;
  uuid: string;
  status: string;
}

export interface IDeleteItem {
  uuid: string;
  title: string;
}