import { ICustomer } from '@/views/product-detail/store/product-detail.interface';

export interface IMessageDetail {
  topic: ITopic;
  messages: IMessage[];
  customers?: ICustomer[];
}

export interface IMessage {
  name: string;
  uuid: string;
  message: string;
  date: string;
}

export interface ITopic {
  type: string;
  detail: ITopicDetail;
}

export interface ITopicDetail {
  uuid?: string | null;
  title: string;
  description?: string | null;
}

