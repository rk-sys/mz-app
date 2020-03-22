export interface IProductCheckout {
  productSummary: IProductSummary;
  productDeliveryOptions: IDelivery[];
}

export interface IProductSummary {
  title: string;
  description: string;
  price: number | null;
  currency: string;
  city: string;
  craftsman: {
    picture: string
    name: string;
  };
}

export interface IDelivery {
  label: string;
  options?: IDeliveryOptions[] | string;
}

export interface IDeliveryOptions {
  title: string;
  price: number;
}

export interface IDeliveryAtPoints {
  parcelLockerCode: string;
  name: string;
  phone: string;
  mail: string;
}

export interface IDeliveryLetter {
  address: string;
  zipCode: string;
  name: string;
  city: string;
  phone: string;
  mail: string;
}

export interface IInformationCheckout {
  label: string | IDeliveryOptions;
  deliveryOption: string | IDeliveryOptions;
  address: {
    selected: boolean;
    data: IDeliveryLetter | IDeliveryAtPoints | null
  };
}
