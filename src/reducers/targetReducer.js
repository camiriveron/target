import * as types from '../actions/actionTypes';
import mapInitialState from './mapInitialState';

const targetReducer = (state = mapInitialState, action) => {
  switch (action.type) {
    case types.START_NEW_TARGET: {
      return state.set('addingNewTarget', true)
        .set('newTargetLat', action.payload.lat)
        .set('newTargetLong', action.payload.lng);
    }
    case types.END_NEW_TARGET: {
      return state.set('addingNewTarget', false)
        .set('targetRadius', mapInitialState.get('targetRadius'))
        .set('targetErrors', {});
    }
    case types.UPDATE_RADIUS: {
      return state.set('targetRadius', action.payload);
    }
    case types.CREATE_TARGET: {
      return state.set('targetRadius', action.payload);
    }
    case types.CREATE_TARGET_SUCCESS: {
      return state.update('targets', targetList => targetList.push(action.payload.target))
        .set('targetErrors', {})
        .set('addingNewTarget', false)
        .set('targetRadius', mapInitialState.get('targetRadius'));
    }
    case types.CREATE_TARGET_ERROR: {
      return state.set('targetErrors', action.payload.errors);
    }
    case types.GET_TOPICS_SUCCESS: {
      return state.set('topics', action.payload.topics);
    }
    case types.GET_TOPICS_ERROR: {
      return state.set('targetErrors', action.payload.errors);
    }
    default:
      return state;
  }
};

export default targetReducer;
