import React, { PureComponent } from 'react';
import { bool, func } from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import { signUp } from 'actions/userActions';
import SignUpForm from 'components/user/SignUpForm';
import routes from 'constants/routesPaths';

import demo from '../resources/images/demo3x.png';

class SignUpPage extends PureComponent {
  static propTypes = {
    signUp: func.isRequired,
    authenticated: bool.isRequired
  }

  render() {
    const { signUp, authenticated } = this.props;

    if (authenticated) {
      return <Redirect to={routes.index} />;
    }

    return (
      <div className="grid-x">
        <div className="cell small-12 medium-6">
          <div className="page-container page-container--full-height">
            <h1 className="title"><FormattedMessage id="signup.title" /></h1>
            <SignUpForm onSubmit={signUp} />
            <Link className="link link-separator" to={routes.login}>
              <FormattedMessage id="signup.signin" />
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
  signUp: user => dispatch(signUp(user.toJS()))
});

export default connect(mapState, mapDispatch)(SignUpPage);
