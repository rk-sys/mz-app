export interface IUserOffers {
  avatar: string;
  description: string;
  title: string;
  price: number;
  uuid: string;
  status: string;
  type: string;
}

export interface IDeleteOffer {
  uuid: string;
  title: string;
}
