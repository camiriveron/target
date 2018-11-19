import React from 'react';
import { bool } from 'prop-types';
import { connect } from 'react-redux';

import Map from 'components/map/Map';
import Welcome from 'components/home/Welcome';
import HomeSideBar from 'components/home/HomeSideBar';

import { GOOGLE_MAPS_URL } from 'constants/constants';

const HomePage = ({ signedUp }) =>
  <div className="grid-x">
    <div className="cell small-12 medium-3 show-for-medium " >
      {signedUp ? <Welcome /> : <HomeSideBar />}
    </div>
    <div className="cell medium-9">
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
};

const mapStateToProps = state => ({
  signedUp: state.getIn(['signup', 'signedUp'])
});

export default connect(mapStateToProps)(HomePage);
