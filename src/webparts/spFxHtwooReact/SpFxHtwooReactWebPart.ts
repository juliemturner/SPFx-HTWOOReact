import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import { symset } from '@n8d/htwoo-react/SymbolSet';
import { ThemeProvider } from '@microsoft/sp-component-base';
import { SPFxThemes, ISPFxThemes } from '@n8d/htwoo-react/SPFxThemes';

import SPFxHTWOOReact, { ISPFxHTWOOReactProps } from './components/SPFxHTWOOReact';

export interface ISpFxHtwooReactWebPartProps {
  webPartTitle: string;
}

export default class SpFxHtwooReactWebPart extends BaseClientSideWebPart<ISpFxHtwooReactWebPartProps> {
  private LOG_SOURCE = "🟢SpFxHtwooReactWebPart";
  private _spfxThemes: ISPFxThemes = new SPFxThemes();

  protected async onInit(): Promise<void> {
    // Initialize Icons Symbol Set
    await symset.initSymbols();

    // Consume the new ThemeProvider service
    const microsoftTeams = this.context.sdks?.microsoftTeams;
    const themeProvider = this.context.serviceScope.consume(ThemeProvider.serviceKey);
    this._spfxThemes.initThemeHandler(this.domElement, themeProvider, microsoftTeams);

    return super.onInit();
  }

  public render(): void {
    try {
      const element: React.ReactElement<ISPFxHTWOOReactProps> = React.createElement(SPFxHTWOOReact, {
        displayMode: this.displayMode,
        webPartTitle: this.properties.webPartTitle,
        updateTitle: (title: string) => {
          this.properties.webPartTitle = title;
        },
      });

      ReactDom.render(element, this.domElement);
    } catch (err) {
      console.error(`${this.LOG_SOURCE} (render) - ${err}`);
    }
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: []
    };
  }
}
