import * as types from '../actions/actionTypes';
import mapInitialState from './mapInitialState';

const targetReducer = (state = mapInitialState, action) => {
  switch (action.type) {
    case types.START_NEW_TARGET: {
      return state.set('addingNewTarget', true)
        .set('newTarget', action.newTarget);
    }
    case types.END_NEW_TARGET: {
      return state.set('addingNewTarget', false)
        .set('targetErrors', {});
    }
    case types.CREATE_TARGET_SUCCESS: {
      return state.update('targets', targetList => targetList.push(action.target))
        .set('targetErrors', {})
        .set('addingNewTarget', false);
    }
    case types.API_ERROR: {
      return state.set('targetErrors', action.errors);
    }
    case types.GET_TOPICS_SUCCESS: {
      return state.set('topics', action.topics);
    }
    default:
      return state;
  }
};

export default targetReducer;
