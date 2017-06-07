import * as React from 'react';
import styles from './KeyContacts.module.scss';
import { IKeyContactsProps } from './IKeyContactsProps';
import { escape } from '@microsoft/sp-lodash-subset';
import {
  Persona,
  PersonaInitialsColor,
} from 'office-ui-fabric-react/lib/Persona';
import { SPHttpClient, ISPHttpClientConfiguration, SPHttpClientResponse } from '@microsoft/sp-http';

export interface IKeyContacts {
  Title: string;
  Contact:IUser;
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

export class ContactCards extends React.Component<any, void>{
  public render() {
    return (
      <div className="ms-Grid">
        <div className="ms-Grid-row">
          <h2>{this.props.header}</h2>
          {
            this.props.items.map((item: IKeyContacts) => {
              return (
              <div className="ms-Grid-col ms-u-sm12 ms-u-md6 ms-u-lg3">
                <Persona
                  imageUrl='./images/boom.png'
                  imageInitials='BM'
                  primaryText={item.Contact.Title}
                  secondaryText={item.Title}
                  tertiaryText={item.Contact.WorkPhone}
                />
              </div>
              )
            })
          }
        </div>
      </div >
    )
  }
}

export default class KeyContacts extends React.Component<IKeyContactsProps, any> {
  constructor() {
    super();

    this.state = {
      contacts: []
    }
  }

  componentDidMount(){
    this._getContacts();
  }

  public render(): React.ReactElement<IKeyContactsProps> {
    return (
      <div>
        <ContactCards header={this.props.title} items={this.state.contacts} />
      </div>
    );
  }

  private _getContacts() {
    var url = "https://subgressive.sharepoint.com/_api/web/lists/GetByTitle('Key Contacts')/items?$expand=Contact/Id&$select=Title,Contact/Id,Contact/EMail,Contact/FirstName,Contact/LastName,Contact/Title,Contact/WorkPhone,Contact/Department,Contact/JobTitle";
    this._getSPData(url)
      .then(data => {
        //console.log('get the data' + data);
        this.setState({ contacts: data });
      });
  }

  private _getSPData(url): Promise<string[]> {
    return this.props.client.get(url, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        return response.json();
      }).then(data => {
        return data.value;
      });
  }
}
