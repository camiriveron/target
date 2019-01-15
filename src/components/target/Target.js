import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { object, func, bool } from 'prop-types';
import { Marker, Circle } from 'react-google-maps';
import { COLORS } from 'constants/constants';
import { selectTarget } from 'actions/targetActions';

const Target = (props) => {
  const { target, selectTarget, isSelectedTarget } = props;
  const { id, lat, lng, radius } = target;

  return (
    <Fragment key={`fragment${id}`}>
      <Marker
        key={`marker${id}`}
        icon={{ url: target.topic ? target.topic.icon : '', anchor: { x: 15, y: 15 }, scaledSize: { width: 30, height: 30 } }}
        position={{ lat, lng }}
        onClick={() => { selectTarget(target); }}
      />
      <Circle
        key={`circle${id}`}
        options={{
          strokeColor: isSelectedTarget ? COLORS.blue : COLORS.yellow,
          strokeOpacity: 0.8,
          strokeWeight: 5,
          fillColor: COLORS.white,
          fillOpacity: 0.8,
          center: { lat, lng },
          radius
        }}
        onClick={() => { selectTarget(target); }}
      />
    </Fragment>
  );
};

Target.propTypes = {
  target: object.isRequired,
  selectTarget: func.isRequired,
  isSelectedTarget: bool
};

const mapDispatch = dispatch => ({
  selectTarget: target => dispatch(selectTarget(target))
});

export default connect(null, mapDispatch)(Target);
