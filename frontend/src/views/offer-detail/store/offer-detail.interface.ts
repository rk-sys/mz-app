export interface IOffer {
  craftsman: IOfferDetailCraftsman;
  offerDetail: IOfferDetail;
  customers: ICustomer[];
}

export interface IOfferDetail {
  follow: boolean;
  type: string;
  title: string;
  price: number;
  currency: string;
  isFinalPrice: boolean;
  description: string;
  images: string[];
}

export interface IOfferDetailCraftsman {
  name: string;
  city: string;
  picture: string;
  uuid: string;
}

export interface ICustomer {
  name: string;
  picture: string;
  newMessages: number;
  uuid: string;
  orderStatus: IOrderStatus;
}

export interface IOrderStatus {
  status: string;
  price: {
    value: number | null;
    status: string
  };
  date: {
    value: string | null;
    status: string
  };
  progress: {
    value: string | null;
    accept: boolean;
  };
}

export interface IMessage {
  name: string;
  uuid: string;
  message: string;
  date: string;
}
