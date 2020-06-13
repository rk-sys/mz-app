export interface IMyMessage {
  type: string;
  uuid: string;
  craftsmen: IMyMessageCraftsmen;
  message: IMyMessageInfo;
}

export interface IMyMessageCraftsmen {
  uuid: string;
  picture: string;
  name: string;
}

export interface IMyMessageInfo {
  title: string;
  isNewMessage: boolean;
  description: string;
}
