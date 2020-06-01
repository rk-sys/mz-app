export interface IOffer {
  craftsman: IOfferDetailCraftsman;
  offerDetail: IOfferDetail;
  customers: ICustomer[];
}

export interface IOfferDetail {
  type: string;
  title: string;
  price: {
    from: number;
    to: number;
  };
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
