import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bool, func, number, array } from 'prop-types';

import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  Circle
}
  from 'react-google-maps';

import { startNewTarget, endNewTarget } from 'actions/targetActions';
import targetIcon from 'resources/icons/target.png';

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

  getTopicIcon(topicId) {
    const { topics } = this.props;
    const topic = topics.find(topic => topic.topic.id == topicId);
    return topic ? topic.topic.icon : '';
  }

  render() {
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

    const { addingNewTarget, targetRadius, newTargetLat, newTargetLong, targets } = this.props;

    return (
      <GoogleMap
        defaultZoom={defaultZoom}
        center={this.state.center}
        onClick={this.onMapClick}
        defaultOptions={mapOptions}
      >
        {addingNewTarget && <Marker icon={{ url: targetIcon }} position={{ lat: newTargetLat, lng: newTargetLong }} />}
        {addingNewTarget &&
          <Circle options={{
            strokeColor: '#efc638',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FFFFFF',
            fillOpacity: 0.7,
            center: { lat: newTargetLat, lng: newTargetLong },
            radius: targetRadius
          }}
          />}
        {targets && targets.map(({ id, radius, lat, lng, topicId }) =>
          <Fragment key={`fragment${id}`}>
            <Marker
              key={`marker${id}`}
              icon={{ url: this.getTopicIcon(topicId), anchor: { x: 15, y: 15 }, scaledSize: { width: 30, height: 30 } }}
              position={{ lat, lng }}
            />
            <Circle
              key={`circle${id}`}
              options={{
                strokeColor: '#efc638',
                strokeOpacity: 0.8,
                strokeWeight: 5,
                fillColor: '#ffffff',
                fillOpacity: 0.8,
                center: { lat, lng },
                radius
              }}
            />
          </Fragment>)
        }
      </GoogleMap>
    );
  }
}

Map.propTypes = {
  addingNewTarget: bool,
  startNewTarget: func.isRequired,
  targetRadius: number.isRequired,
  newTargetLat: number,
  newTargetLong: number,
  targets: array,
  topics: array,
  endNewTarget: func.isRequired,
};

const mapState = state => ({
  addingNewTarget: state.getIn(['target', 'addingNewTarget']),
  targetRadius: state.getIn(['target', 'targetRadius']),
  newTargetLat: state.getIn(['target', 'newTargetLat']),
  newTargetLong: state.getIn(['target', 'newTargetLong']),
  targets: state.getIn(['target', 'targets']),
  topics: state.getIn(['target', 'topics'])
});

const mapDispatch = dispatch => ({
  startNewTarget: latlng => dispatch(startNewTarget(latlng)),
  endNewTarget: () => dispatch(endNewTarget())
});

export default connect(mapState, mapDispatch)(withScriptjs(withGoogleMap(Map)));
