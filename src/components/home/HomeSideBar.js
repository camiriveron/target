import React from 'react';
import { connect } from 'react-redux';
import { string, object } from 'prop-types';

import SmilesLogo from 'resources/icons/SmilesLogo';
import UserMenu from 'components/user/UserMenu';
import FirstTarget from './FirstTarget';
import Matches from './Matches';

const HomeSideBar = ({ username, targets }) => (
  <div className="page-container page-container--full-height page-container--shrink show-for-medium" >
    <div className="container--spaced">
      <div>
        <h1 className="title mb1">Target</h1>
        <UserMenu username={username} />
      </div>
      <div className="container--spaced">
        {targets.size ? <Matches /> : <FirstTarget />}
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
  targets: object
};

const mapStateToProps = state => ({
  username: state.getIn(['session', 'user', 'username']),
  targets: state.getIn(['target', 'targets'])
});

export default connect(mapStateToProps)(HomeSideBar);
