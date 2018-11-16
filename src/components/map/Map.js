import React from 'react';

// import { Helmet } from 'react-helmet';
// import { GOOGLE_MAPS_KEY } from 'constants/constants';
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';

const Map = () => {
  const center = { lat: -34.91, lng: -56.163195 };
  const defaultZoom = 15;

  return (
    <GoogleMap defaultZoom={defaultZoom} defaultCenter={center} />
  );
};

export default withScriptjs(withGoogleMap(Map));
