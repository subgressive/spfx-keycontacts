export interface IContact {
  Title: string;
  Contact: IUser;
  UserInfo:UserInfo;
}

export interface IUser {
  EMail: string;
  FirstName: string;
  LastName: string;
  Title: string;
  WorkPhone: string;
  Department: string;
  JobTitle: string;
}

export interface UserInfo {
  Id: string;
  Picture: IPicture;
  UserName: string;
}

export interface IPicture {
  Description: string;
  Url: string;
}