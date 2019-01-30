import { fromJS } from 'immutable';
import * as types from '../actions/actionTypes';

const matchesInitialState = fromJS({
});

const matchesReducer = (state = matchesInitialState, action) => {
  switch (action.type) {
    case types.GET_MATCHES_SUCCESS: {
      return state.set('matches', action.matches);
    }
    default:
      return state;
  }
};

export default matchesReducer;
