import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'CoreGraphWebPartStrings';
import CoreGraph from './components/CoreGraph';
import { ICoreGraphProps } from './components/ICoreGraphProps';

export interface ICoreGraphWebPartProps {
  description: string;
}

export default class CoreGraphWebPart extends BaseClientSideWebPart <ICoreGraphWebPartProps> {
  public render(): void {
    const element: React.ReactElement<ICoreGraphProps> = React.createElement(
      CoreGraph,
      this.context.sdks.microsoftTeams ? 
        {
          title: "Welcome to Teams!",
          subTitle: "Building custom enterprise tabs for your business.",
          siteTabTitle: "We are in the context of following Team: TEAMS",
          description: this.properties.description
        } :
        {
          title: "Welcome to SharePoint!",
          subTitle: "Building custom enterprise NOTtabs :) for your business.",
          siteTabTitle: "We are in the context of following Team: SharePoint",
          description: this.properties.description
        }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
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
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
