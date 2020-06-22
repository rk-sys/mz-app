export interface IMyMessage {
  forMe: IMessageGeneral[];
  archive: IMessageGeneral[];
  items: IMessageItem[];
  offers: IMessageOffer[];
}

export interface IMessageGeneral {
  type: string;
  uuid: string;
  craftsmen: ICraftsmen;
}

export interface ICraftsmen {
  uuid: string;
  name: string;
  picture: string;
  message: IMessage;
}

export interface IMessage {
  title: string;
  isNewMessage: boolean;
  description: string;
}

export interface IMessageItem {
  uuid: string;
  image: string;
  description: string;
  title: string;
  price: number;
  currency: string;
  quantityChat: number;
}

export interface IMessageOffer {
  uuid: string;
  image: string;
  description: string;
  title: string;
  price: number;
  currency: string;
  quantityChat: number;
  type: string;
}
