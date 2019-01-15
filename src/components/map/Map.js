import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bool, func, number, array, object, oneOfType } from 'prop-types';
import { formValueSelector } from 'redux-form/immutable';

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  Circle
} from 'react-google-maps';

import { startNewTarget, endNewTarget, getTargets, getTopics, endSelectedTarget } from 'actions/targetActions';
import targetIcon from 'resources/icons/target.png';
import Target from 'components/target/Target';
import { COLORS } from 'constants/constants';

class Map extends Component {
  constructor() {
    super();

    this.onMapClick = this.onMapClick.bind(this);
  }

  state = { center: { lat: -34.91, lng: -56.163195 } };

  componentDidMount() {
    const { topics, targets, getTargets, getTopics } = this.props;

    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      this.setState({ center: { lat: latitude, lng: longitude } });
    });

    !topics && getTopics();
    !targets.size && getTargets();
  }

  onMapClick({ latLng }) {
    const { addingNewTarget, startNewTarget, endNewTarget, selectedTarget, endSelectedTarget } = this.props;

    selectedTarget && endSelectedTarget();

    if (!selectedTarget && !addingNewTarget) {
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
    const { addingNewTarget, targetRadius, newTarget: { lat, lng }, targets, topics, selectedTarget } = this.props;

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
      strokeColor: COLORS.yellow,
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: COLORS.white,
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
        {targets &&
          targets.map((target, key) => (
            <Target
              isSelectedTarget={selectedTarget && selectedTarget.id === target.id}
              target={target}
              key={key}
              topics={topics}
            />
          ))}
      </GoogleMap>
    );
  }
}

Map.propTypes = {
  addingNewTarget: bool,
  startNewTarget: func.isRequired,
  targetRadius: number,
  newTarget: object,
  targets: oneOfType([
    array,
    object
  ]),
  topics: array,
  endNewTarget: func.isRequired,
  getTargets: func.isRequired,
  getTopics: func.isRequired,
  selectedTarget: object,
  endSelectedTarget: func.isRequired
};

const formSelector = formValueSelector('create-target');

const mapState = state => ({
  addingNewTarget: state.getIn(['target', 'addingNewTarget']),
  targetRadius: formSelector(state, 'radius'),
  newTarget: state.getIn(['target', 'newTarget']),
  targets: state.getIn(['target', 'targets']),
  topics: state.getIn(['target', 'topics'])
});

const mapDispatch = ({
  startNewTarget,
  endNewTarget,
  getTargets,
  getTopics,
  endSelectedTarget
});

export default connect(mapState, mapDispatch)(withScriptjs(withGoogleMap(Map)));
