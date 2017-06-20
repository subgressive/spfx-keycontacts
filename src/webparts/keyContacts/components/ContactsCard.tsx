import * as React from 'react';
import {
  Persona
} from 'office-ui-fabric-react/lib/Persona';

import {IContact} from './IModels';

export class ContactCards extends React.Component<any, void>{
  public render() {
    var col = (this.props.items)?this.props.items:[];
    return (
      <div className="ms-Grid">
        <div className="ms-Grid-row">
          <h2>{this.props.header}</h2>
          {
            col.map((item: IContact) => {
              var thisPicture = '/_layouts/15/images/personplaceholder.96x96x32.png';
              if (item.UserInfo.Picture != null) {
                  thisPicture = item.UserInfo.Picture.Url;
              }
              console.log("thisPicture = " + thisPicture)
              return (
              <div className="ms-Grid-col ms-u-sm12 ms-u-md6 ms-u-lg3">
                <Persona
                  imageUrl={thisPicture}
                  imageInitials='SS'
                  primaryText={item.Contact.Title}
                  secondaryText={item.Title}
                  tertiaryText={item.Contact.WorkPhone}
                />
              </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}