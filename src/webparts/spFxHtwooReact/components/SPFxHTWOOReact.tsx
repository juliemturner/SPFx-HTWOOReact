import { DisplayMode } from "@microsoft/sp-core-library";
import HOOLabel from "@n8d/htwoo-react/HOOLabel";
import HOOWebPartTitle from "@n8d/htwoo-react/HOOWebPartTitle";
import * as React from "react";
import * as strings from "SpFxHtwooReactWebPartStrings";
import styles from "./SPFxHTWOOReact.module.scss";

export interface ISPFxHTWOOReactProps {
  displayMode: DisplayMode;
  webPartTitle: string;
  updateTitle: (title: string) => void;
}

export interface ISPFxHTWOOReactState {
}

export class SPFxHTWOOReactState implements ISPFxHTWOOReactState {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public constructor() { }
}

export default class SPFxHTWOOReact extends React.PureComponent<ISPFxHTWOOReactProps, ISPFxHTWOOReactState> {
  private LOG_SOURCE = "🟢SPFxHTWOOReact";

  public constructor(props: ISPFxHTWOOReactProps) {
    super(props);
    this.state = new SPFxHTWOOReactState();
  }

  public render(): React.ReactElement<ISPFxHTWOOReactProps> {
    try {
      return (
        <div data-component={this.LOG_SOURCE} className={styles.sPFxHtwooReact}>
          <HOOWebPartTitle
            title={this.props.webPartTitle}
            placeholder={strings.WebPartTitle}
            editMode={this.props.displayMode === DisplayMode.Edit}
            updateTitle={this.props.updateTitle}
          />
          <HOOLabel label="Hello World" />
        </div>
      );
    } catch (err) {
      console.error(`${this.LOG_SOURCE} (render) - ${err}`);
      return null;
    }
  }
}