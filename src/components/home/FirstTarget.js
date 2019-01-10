import React, { Fragment } from 'react';
import { FormattedMessage } from 'react-intl';

const FirstTarget = () => (
  <Fragment>
    <h2 className="subtitle center">
      <FormattedMessage id="home.sidebar.firstTarget" />
    </h2>
    <div>
      <span className="copy copy--bold">
        <FormattedMessage id="home.sidebar.popular" />
      </span>
      <div className="list">
        <div className="list-item list-item--bullet">
          <FormattedMessage id="home.sidebar.target1" />
        </div>
        <div className="list-item list-item--bullet">
          <FormattedMessage id="home.sidebar.target2" />
        </div>
        <div className="list-item list-item--bullet">
          <FormattedMessage id="home.sidebar.target3" />
        </div>
      </div>
    </div>
  </Fragment>
);

export default FirstTarget;
