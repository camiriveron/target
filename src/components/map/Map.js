import React from 'react';

import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';

const Map = () => {
  const center = { lat: -34.91, lng: -56.163195 };
  const defaultZoom = 15;
  const disableDefaultUI = true;

  return (
    <GoogleMap defaultZoom={defaultZoom} defaultCenter={center} disableDefaultUI={disableDefaultUI} />
  );
};

export default withScriptjs(withGoogleMap(Map));
