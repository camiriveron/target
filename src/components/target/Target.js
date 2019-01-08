import React, { Fragment } from 'react';
import { object, array } from 'prop-types';
import { Marker, Circle } from 'react-google-maps';
import { COLORS } from 'constants/constants';

const Target = (props) => {
  const { target: { id, topicId, lat, lng, radius } } = props;

  const getTopicIcon = (topicId) => {
    const { topics } = props;
    const topic = topics.find(topic => topic.topic.id == topicId);
    return topic ? topic.topic.icon : '';
  };

  return (
    <Fragment key={`fragment${id}`}>
      <Marker
        key={`marker${id}`}
        icon={{ url: getTopicIcon(topicId), anchor: { x: 15, y: 15 }, scaledSize: { width: 30, height: 30 } }}
        position={{ lat, lng }}
      />
      <Circle
        key={`circle${id}`}
        options={{
          strokeColor: COLORS.yellow,
          strokeOpacity: 0.8,
          strokeWeight: 5,
          fillColor: COLORS.white,
          fillOpacity: 0.8,
          center: { lat, lng },
          radius
        }}
      />
    </Fragment>
  );
};

Target.propTypes = {
  target: object.isRequired,
  topics: array
};

export default Target;
