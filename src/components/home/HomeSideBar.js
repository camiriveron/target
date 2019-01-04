import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { string } from 'prop-types';

import SmilesLogo from 'resources/icons/SmilesLogo';
import UserMenu from 'components/user/UserMenu';

const HomeSideBar = ({ username }) => (
  <div className="page-container page-container--full-height page-container--shrink show-for-medium" >
    <div className="container--spaced">
      <div className="container--spaced">
        <div>
          <h1 className="title mb1">Target</h1>
          <UserMenu username={username} />
        </div>
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
      </div>
      <div className="footer">
        <SmilesLogo className="logo--small" />
        <div />
      </div>
    </div>
  </div>
);

HomeSideBar.propTypes = {
  username: string,
};

const mapStateToProps = state => ({
  username: state.getIn(['session', 'user', 'username'])
});

export default connect(mapStateToProps)(HomeSideBar);
