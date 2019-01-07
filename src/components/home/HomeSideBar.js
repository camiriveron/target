import React from 'react';
import { connect } from 'react-redux';
import { string } from 'prop-types';

import SmilesLogo from 'resources/icons/SmilesLogo';
import UserMenu from 'components/user/UserMenu';
import FirstTarget from './FirstTarget';

const HomeSideBar = ({ username }) => (
  <div className="page-container page-container--full-height page-container--shrink show-for-medium" >
    <div className="container--spaced">
      <div className="container--spaced">
        <div>
          <h1 className="title mb1">Target</h1>
          <UserMenu username={username} />
        </div>
        <FirstTarget />
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
