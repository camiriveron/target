import React from 'react';
import { bool, object } from 'prop-types';
import { connect } from 'react-redux';

import Map from 'components/map/Map';
import Welcome from 'components/home/Welcome';
import HomeSideBar from 'components/home/HomeSideBar';
import CreateNewTarget from 'components/target/CreateNewTarget';
import TargetDetails from 'components/target/TargetDetails';
import ErrorBox from 'components/common/ErrorBox';

import { GOOGLE_MAPS_URL } from 'constants/constants';

const HomePage = ({ signedUp, addingNewTarget, selectedTarget, errors }) =>
  <div className="home">
    {!addingNewTarget && !selectedTarget &&
      <div className="home__menu show-for-medium" >
        {signedUp ? <Welcome /> : <HomeSideBar />}
      </div>}
    {(addingNewTarget || selectedTarget) &&
      <div className="home__menu" >
        {addingNewTarget && <CreateNewTarget /> }
        {selectedTarget && <TargetDetails /> }
      </div>}
    <div className="home__map">
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
  </div>;

HomePage.propTypes = {
  signedUp: bool,
  addingNewTarget: bool,
  selectedTarget: object,
  errors: object
};

const mapStateToProps = state => ({
  signedUp: state.getIn(['signup', 'signedUp']),
  addingNewTarget: state.getIn(['target', 'addingNewTarget']),
  selectedTarget: state.getIn(['target', 'selectedTarget']),
  errors: state.getIn(['common', 'errors'])
});

export default connect(mapStateToProps)(HomePage);
