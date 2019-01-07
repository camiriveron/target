import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bool, func, number, array, object } from 'prop-types';
import { formValueSelector } from 'redux-form/immutable';

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  Circle
} from 'react-google-maps';

import { startNewTarget, endNewTarget } from 'actions/targetActions';
import targetIcon from 'resources/icons/target.png';
import Target from 'components/target/Target';

class Map extends Component {
  constructor() {
    super();

    this.onMapClick = this.onMapClick.bind(this);
  }

  state = { center: { lat: -34.91, lng: -56.163195 } };

  onMapClick({ latLng }) {
    const { addingNewTarget, startNewTarget, endNewTarget } = this.props;

    if (!addingNewTarget) {
      startNewTarget({
        lat: latLng.lat(),
        lng: latLng.lng()
      });
      this.setState({ center: { lat: latLng.lat(), lng: latLng.lng() } });
    } else {
      endNewTarget();
    }
  }

  render() {
    const { addingNewTarget, targetRadius, newTarget: { lat, lng }, targets, topics } = this.props;

    const defaultZoom = 15;
    const mapOptions = {
      streetViewControl: false,
      scaleControl: false,
      mapTypeControl: false,
      panControl: false,
      zoomControl: false,
      rotateControl: false,
      fullscreenControl: false,
      clickableIcons: false
    };
    const addingTargetCircleOptions = {
      strokeColor: '#efc638',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#fff',
      fillOpacity: 0.7,
      center: { lat, lng },
      radius: targetRadius
    };

    return (
      <GoogleMap
        defaultZoom={defaultZoom}
        center={this.state.center}
        onClick={this.onMapClick}
        defaultOptions={mapOptions}
      >
        {addingNewTarget &&
          <Fragment>
            <Marker icon={{ url: targetIcon }} position={{ lat, lng }} />
            <Circle options={addingTargetCircleOptions} />
          </Fragment>}
        {targets && targets.map((target, key) => <Target target={target} key={key} topics={topics} />)}
      </GoogleMap>
    );
  }
}

Map.propTypes = {
  addingNewTarget: bool,
  startNewTarget: func.isRequired,
  targetRadius: number,
  newTarget: object,
  targets: object,
  topics: array,
  endNewTarget: func.isRequired,
};

const formSelector = formValueSelector('create-target');

const mapState = state => ({
  addingNewTarget: state.getIn(['target', 'addingNewTarget']),
  targetRadius: formSelector(state, 'radius'),
  newTarget: state.getIn(['target', 'newTarget']),
  targets: state.getIn(['target', 'targets']),
  topics: state.getIn(['target', 'topics'])
});

const mapDispatch = dispatch => ({
  startNewTarget: latlng => dispatch(startNewTarget(latlng)),
  endNewTarget: () => dispatch(endNewTarget())
});

export default connect(mapState, mapDispatch)(withScriptjs(withGoogleMap(Map)));
