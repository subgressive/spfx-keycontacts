import * as React from 'react';
import styles from './KeyContacts.module.scss';
import { IKeyContactsProps } from './IKeyContactsProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { SPHttpClient, ISPHttpClientConfiguration, SPHttpClientResponse } from '@microsoft/sp-http';

import { ContactCards } from './ContactsCard';
import { css } from 'office-ui-fabric-react';

export default class KeyContacts extends React.Component<IKeyContactsProps, any> {
  constructor() {
    super();

    this.state = {
      contacts: []
    }
  }

  componentDidMount() {
    this._getContacts();
  }

  componentDidUpdate(preProps, prevState) {
    if (this.props.itemCount != preProps.itemCount ||
      this.props.listName != preProps.listName) {
      this._getContacts();
    }
  }



  public render(): React.ReactElement<IKeyContactsProps> {
    return (
      <div className={css('KeyContactsOverrides',styles.keyContacts)}>
        <ContactCards header={this.props.title} items={this.state.contacts} />
      </div>
    );
  }

  private _getContacts() {
    var myListName = this.props.listName;
    var maxCount = this.props.itemCount;
    console.log("maxCount=" + maxCount);
    console.log("myListName=" + myListName);

    var url = this.props.webUrl + "/_api/web/lists/GetByTitle('" + myListName + "')/items?$top=" + maxCount + "&$expand=Contact/Id&$select=Title,Contact/Id,Contact/EMail,Contact/FirstName,Contact/LastName,Contact/Title,Contact/WorkPhone,Contact/Department,Contact/JobTitle";
    //var url = this.props.webUrl + "/_api/web/lists/getbytitle('Contacts')/items?$expand=Contact/Id&$select=Title,Contact/Id,Contact/EMail,Contact/FirstName,Contact/LastName,Contact/Title,Contact/WorkPhone,Contact/Department,Contact/JobTitle";
    console.log("url = " + url);
    var colContacts = [];
    this._getSPData(url)
      .then(data => {
        this._getSPUserInfo()
          .then(ui => {
            let colContacts = data;
            let colUI = ui;
            colContacts.map(item => {
              for (var i = 0; i < colUI.length; i++) {
                var thisItemContactId = item["Contact"]["Id"];
                var thisColUIId = colUI[i]["Id"];
                if (item["Contact"]["Id"] == colUI[i]["Id"]) {
                  item["UserInfo"] = colUI[i];
                  //console.log("before break");
                  break;
                }
              }
              //console.log("outside for loop , thisItemContactId = " + thisItemContactId + " , thisColUIId = " + thisColUIId);    
            });
            this.setState({ contacts: colContacts });
        });
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

  private _getSPUserInfo(): Promise<string[]> {
    var uri = this.props.webUrl + "/_api/web/lists/getbytitle('User Information List')/items?$filter=EMail ne null&select=Id,Picture,UserName";
    console.log("get user info : uri = " + uri);
    return this._getSPData(uri)
      .then(data => {
        //console.log('get the data' + data);
        return data;
      });
  }
}