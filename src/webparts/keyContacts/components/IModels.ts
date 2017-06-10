export interface IContact {
  Title: string;
  Contact: IUser;
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