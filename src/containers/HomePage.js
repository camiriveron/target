import React, { PureComponent, Fragment } from 'react';
import { bool, object, string } from 'prop-types';
import { connect } from 'react-redux';

import Map from 'components/map/Map';
import Welcome from 'components/home/Welcome';
import HomeSideBar from 'components/home/HomeSideBar';
import CreateNewTarget from 'components/target/CreateNewTarget';
import TargetDetails from 'components/target/TargetDetails';
import ErrorBox from 'components/common/ErrorBox';

import { GOOGLE_MAPS_URL } from 'constants/constants';
import Avatar from 'components/common/Avatar';
import Drawer from '@material/react-drawer';
import UserMenu from 'components/user/UserMenu';

export class HomePage extends PureComponent {
  constructor() {
    super();

    this.toggleSideMenu = this.toggleSideMenu.bind(this);
  }
  state = {
    openDrawer: false,
  }

  toggleSideMenu() {
    this.setState({ openDrawer: !this.state.openDrawer });
  }

  render() {
    const { signedUp, addingNewTarget, selectedTarget, errors, avatar, avatarAlt, username } = this.props;
    const userImage = avatar || avatarAlt;

    return (
      <Fragment>
        <div className="container">
          {!addingNewTarget && !selectedTarget &&
            <div className="container__menu show-for-medium" >
              {signedUp ? <Welcome /> : <HomeSideBar />}
            </div>}
          {(addingNewTarget || selectedTarget) &&
            <div className="container__menu" >
              {addingNewTarget && <CreateNewTarget /> }
              {selectedTarget && <TargetDetails /> }
            </div>}
          <Drawer className="show-for-small-only" dismissible open={this.state.openDrawer}>
            <h1 className="title mb1">Target</h1>
            <UserMenu username={username} avatar={userImage} />
          </Drawer>
          <div className="container__map">
            {errors && <ErrorBox errors={errors} />}
            <Map
              selectedTarget={selectedTarget}
              googleMapURL={GOOGLE_MAPS_URL}
              loadingElement={<div className="loading-map" />}
              containerElement={<div className="map-container" />}
              mapElement={<div className="map" />}
              clickEnabled
            />
          </div>
          <div className="mobile__menu show-for-small-only" >
            <span className="avatar avatar--clickable" onClick={this.toggleSideMenu}>
              <Avatar avatar={userImage} />
            </span>
          </div>
        </div>
      </Fragment>
    );
  }
}

HomePage.propTypes = {
  signedUp: bool,
  addingNewTarget: bool,
  selectedTarget: object,
  errors: object,
  avatar: string,
  avatarAlt: string,
  username: string
};

const mapStateToProps = state => ({
  signedUp: state.getIn(['signup', 'signedUp']),
  addingNewTarget: state.getIn(['target', 'addingNewTarget']),
  selectedTarget: state.getIn(['target', 'selectedTarget']),
  errors: state.getIn(['common', 'errors']),
  avatar: state.getIn(['session', 'user', 'avatar', 'normalUrl']),
  avatarAlt: state.getIn(['session', 'user', 'avatar', 'normal', 'url']),
  username: state.getIn(['session', 'user', 'username']),
});

export default connect(mapStateToProps)(HomePage);
