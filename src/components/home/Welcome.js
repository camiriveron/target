import React from 'react';
import { FormattedMessage } from 'react-intl';
import { func } from 'prop-types';
import { connect } from 'react-redux';

import SmilesLogo from 'resources/icons/SmilesLogo';
import { welcomeSuccess } from 'actions/userActions';

const Welcome = ({ welcomeSuccess }) => (
  <div className="page-container page-container--full-height page-container--padded page-container--shrink show-for-medium" >
    <div className="container--spaced">
      <div className="container--centered">
        <SmilesLogo />
        <h1 className="title mb1"><FormattedMessage id="home.welcome" /></h1>
        <h2 className="subtitle mb4"><FormattedMessage id="home.subtitle" /></h2>
        <div className="list">
          <div className="list-item list-item--bullet">
            <FormattedMessage id="home.welcome.list1" />
          </div>
          <div className="list-item list-item--bullet">
            <FormattedMessage id="home.welcome.list2" />
          </div>
        </div>
      </div>
      <button className="primary-action" type="button" onClick={welcomeSuccess}>
        <FormattedMessage id="home.welcome.gotit" />
      </button>
    </div>
  </div>
);

Welcome.propTypes = {
  welcomeSuccess: func.isRequired,
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = dispatch => ({
  welcomeSuccess: () => dispatch(welcomeSuccess())
});

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
