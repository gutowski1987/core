import * as React from 'react';
import styles from './CoreGraph.module.scss';
import { ICoreGraphProps } from './ICoreGraphProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class CoreGraph extends React.Component<ICoreGraphProps, {}> {
  public render(): React.ReactElement<ICoreGraphProps> {
    return (
      <div className={ styles.coreGraph }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>{this.props.title}</span>
              <p className={ styles.subTitle }>{this.props.subTitle}</p>
              <p className={ styles.description }>{this.props.siteTabTitle}</p>
              <p className={ styles.description }>Description property value - {escape(this.props.description)}</p>
              <a href="https://aka.ms/spfx" className={ styles.button }>
                <span className={ styles.label }>Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
