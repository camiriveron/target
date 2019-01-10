import { List } from 'immutable';
import * as types from '../actions/actionTypes';
import mapInitialState from './mapInitialState';

const targetReducer = (state = mapInitialState, action) => {
  switch (action.type) {
    case types.START_NEW_TARGET: {
      return state.set('addingNewTarget', true)
        .set('newTarget', action.newTarget);
    }
    case types.END_NEW_TARGET: {
      return state.set('addingNewTarget', false);
    }
    case types.CREATE_TARGET_SUCCESS: {
      return state.update('targets', targetList => targetList.push(action.target))
        .set('addingNewTarget', false);
    }
    case types.GET_TOPICS_SUCCESS: {
      return state.set('topics', action.topics);
    }
    case types.GET_TARGETS_SUCCESS: {
      return state.set('targets', List(action.targets.map(({ target }) => target)));
    }
    case types.SELECT_TARGET: {
      return state.set('selectedTarget', action.target);
    }
    default:
      return state;
  }
};

export default targetReducer;
