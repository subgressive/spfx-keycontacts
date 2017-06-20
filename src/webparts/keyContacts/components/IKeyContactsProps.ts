import { SPHttpClient } from '@microsoft/sp-http';

export interface IKeyContactsProps {
  title: string;
  listName: string;
  client: SPHttpClient;
  webUrl: string;
  itemCount: string;
}
