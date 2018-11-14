import React, { PureComponent } from 'react';
import { bool, func } from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import LoginForm from 'components/user/LoginForm';
import { login } from 'actions/sessionActions';
import routes from 'constants/routesPaths';

import demo from '../resources/images/demo3x.png';
import SmilesLogo from '../resources/icons/SmilesLogo';

class LoginPage extends PureComponent {
  static propTypes = {
    login: func.isRequired,
    authenticated: bool.isRequired,
  }

  render() {
    const { login, authenticated } = this.props;

    if (authenticated) {
      return <Redirect to={routes.index} />;
    }

    return (
      <div className="grid-x">
        <div className="cell small-12 medium-6">
          <div className="page-container page-container--full-height page-container--shrink">
            <SmilesLogo />
            <h1 className="title"><FormattedMessage id="login.title" /></h1>
            <h2 className="subtitle"><FormattedMessage id="login.subtitle" /></h2>
            <h3 className="copy"><FormattedMessage id="login.copy" /></h3>            
            <LoginForm onSubmit={login} />
            <Link className="link link-separator" to={routes.signUp}>
              <FormattedMessage id="login.signup" />
            </Link>
          </div>
        </div>
        <div className="cell show-for-medium medium-6">
          <div className="demo">
            <img className="demo__img" src={demo} alt="Demo video" />
          </div>
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  authenticated: state.getIn(['session', 'authenticated'])
});

const mapDispatch = dispatch => ({
  login: user => dispatch(login(user.toJS()))
});

export default connect(mapState, mapDispatch)(LoginPage);
