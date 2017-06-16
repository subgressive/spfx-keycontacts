import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneSlider
} from '@microsoft/sp-webpart-base';

import * as strings from 'keyContactsStrings';
import KeyContacts from './components/KeyContacts';
import { IKeyContactsProps } from './components/IKeyContactsProps';
import { IKeyContactsWebPartProps } from './IKeyContactsWebPartProps';

export default class KeyContactsWebPart extends BaseClientSideWebPart<IKeyContactsWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IKeyContactsProps > = React.createElement(
      KeyContacts,
      {
        title: this.properties.title,
        listName: this.properties.listName,
        client: this.context.spHttpClient,
        webUrl: this.context.pageContext.web.absoluteUrl,
        itemCount: this.properties.count
    }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('title', {
                  label: "Title"
                }),
                PropertyPaneTextField('listName', {
                  label: "Contacts list name"
                }),
                PropertyPaneSlider('count', {
                  label: "Number of contact cards",
                  min: 1,
                  max: 20,
                  value: 4
                })
              ]
            }
          ]
        }
      ]
    };
  }

  protected get disableReactivePropertyChanges(): boolean {
    return true;
  }
}
