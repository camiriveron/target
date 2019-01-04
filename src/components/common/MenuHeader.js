import React, { PureComponent } from 'react';
import { string, func } from 'prop-types';

export default class MenuHeader extends PureComponent {
  static propTypes = {
    title: string.isRequired,
    goBack: func.isRequired
  };

  render() {
    const { title, goBack } = this.props;

    return (
      <div className="menu-header show-for-medium">
        <a className="back-arrow" onClick={goBack}>
          <span>&lt;</span>
        </a>
        <span className="menu-header__title">{ title }</span>
      </div>
    );
  }
}
