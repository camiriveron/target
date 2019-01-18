import React from 'react';
import { object } from 'prop-types';
import { connect } from 'react-redux';

import Map from 'components/map/Map';
import EditProfile from 'components/user/EditProfile';
import ErrorBox from 'components/common/ErrorBox';

import { GOOGLE_MAPS_URL } from 'constants/constants';

const EditProfilePage = ({ errors, history }) =>
  <div className="home">
    <div className="home__menu" >
      <EditProfile history={history} />
    </div>
    <div className="home__map">
      {errors && <ErrorBox errors={errors} />}
      <Map
        googleMapURL={GOOGLE_MAPS_URL}
        loadingElement={<div className="loading-map" />}
        containerElement={<div className="map-container" />}
        mapElement={<div className="map" />}
        clickEnabled={false}
      />
    </div>
  </div>;

EditProfilePage.propTypes = {
  errors: object,
  history: object
};

const mapStateToProps = state => ({
  errors: state.getIn(['common', 'errors'])
});

export default connect(mapStateToProps)(EditProfilePage);
