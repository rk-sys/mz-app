export interface IHome {
  craftsmen: IHomeCustomer[];
  products: IHomeProduct[];
  events: IHomeEvent[];
}

export interface IHomeCustomer {
  image: string;
  tag: string[];
  title: string;
  uuid: string;
}

export interface IHomeProduct {
  price: string;
  title: string;
  image: string;
  uuid: string;
}

export interface IHomeEvent {
  title: string;
  image: string;
  uuid: string;
  url: string;
}
