import React from 'react';
import { bool } from 'prop-types';
import { connect } from 'react-redux';

import Map from 'components/map/Map';
import Welcome from 'components/home/Welcome';
import HomeSideBar from 'components/home/HomeSideBar';
import CreateNewTarget from 'components/map/CreateNewTarget';

import { GOOGLE_MAPS_URL } from 'constants/constants';

const HomePage = ({ signedUp, addingNewTarget }) =>
  <div className="home">
    <div className="relative home__menu show-for-medium" >
      {signedUp ? <Welcome /> : <HomeSideBar />}
      {addingNewTarget && <CreateNewTarget /> }
    </div>
    {addingNewTarget && <div className="relative home__menu show-for-small-only" >
       <CreateNewTarget /> 
    </div>}   
    <div className="home__map">
      <Map
        googleMapURL={GOOGLE_MAPS_URL}
        loadingElement={<div className="loading-map" />}
        containerElement={<div className="map-container" />}
        mapElement={<div className="map" />}
      />
    </div>
  </div>;

HomePage.propTypes = {
  signedUp: bool,
  addingNewTarget: bool
};

const mapStateToProps = state => ({
  signedUp: state.getIn(['signup', 'signedUp']),
  addingNewTarget: state.getIn(['target', 'addingNewTarget']),
});

export default connect(mapStateToProps)(HomePage);
