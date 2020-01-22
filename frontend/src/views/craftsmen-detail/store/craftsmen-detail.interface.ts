export interface ICraftsmenDetail {
  craftsmenBaseInfo: ICraftsmenBaseInfo;
  craftsmenPortfolio: IPortfolio[] | [];
}

export interface IPortfolio {
  pictureUrl: string;
  title: string;
  description: string;
  tags: string[] | null;
}

export interface ICraftsmenBaseInfo {
  name: string;
  picture: string;
  ratings: IRatings[];
  socialMedia: ISocialMedia;
  craftsmenDescription: string;
  itemDescription: string;
  contact: IContact[];
  tags: string[];
}

export interface IRatings {
  label: string;
  value: number;
}

export interface ISocialMedia {
  facebook: string | null;
  twitter: string | null;
  youtube: string | null;
  instagram: string | null;
}
export interface IContact {
  label: string;
  value: string;
}

export interface ICraftsmenMenuLinks {
  label: string;
  nameUrl: string;
}
