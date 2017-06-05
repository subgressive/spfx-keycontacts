import * as React from 'react';
import styles from './KeyContacts.module.scss';
import { IKeyContactsProps } from './IKeyContactsProps';
import { escape } from '@microsoft/sp-lodash-subset';
import {
  Persona,
  PersonaInitialsColor,
} from 'office-ui-fabric-react/lib/Persona';

export class ContactCards extends React.Component<any, any>{
  public render() {
    return (
      <div className="ms-Grid">
        <div className="ms-Grid-row">
          <div className="ms-Grid-col ms-u-sm12 ms-u-md6 ms-u-lg3">
            <Persona
              imageUrl='./images/boom.png'
              imageInitials='BM'
              primaryText='Boom Monkey'
              secondaryText='Persuader'
              tertiaryText='In a meeting'
            />
          </div>
          <div className="ms-Grid-col ms-u-sm12 ms-u-md6 ms-u-lg3">
            <Persona
              imageUrl='./images/randal.png'
              imageInitials='PR'
              primaryText='Purple Randal'
              secondaryText='Sneak Thief'
              tertiaryText='In a meeting'
            />
          </div>
          <div className="ms-Grid-col ms-u-sm12 ms-u-md6 ms-u-lg3">
            <Persona
              imageUrl='./images/spock.png'
              imageInitials='MS'
              primaryText='Mr Spock'
              secondaryText='Transvulcan'
              tertiaryText='In a meeting'
            />
          </div>
          <div className="ms-Grid-col ms-u-sm12 ms-u-md6 ms-u-lg3">
            <Persona
              imageUrl='./images/banana.png'
              imageInitials='FS'
              primaryText='Fruit Monkey'
              secondaryText='Spruiker'
              tertiaryText='In a meeting'
            />
          </div>
        </div>
      </div >
    )
  }
}

export default class KeyContacts extends React.Component<IKeyContactsProps, void> {
  public render(): React.ReactElement<IKeyContactsProps> {
    return (
      <div className={styles.helloWorld}>
        <div className={styles.container}>
          <h2>Key Contacts</h2>
          <ContactCards />
        </div>
      </div>
    );
  }
}
