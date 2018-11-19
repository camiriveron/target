import * as types from '../actions/actionTypes';
import initialState from './initialState';

const signUpReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.USER_SIGNED_UP: {
      return state.set('signedUp', true);
    }
    case types.WELCOME_SUCCESS: {
      return state.set('signedUp', false);
    }
    default:
      return state;
  }
};

export default signUpReducer;
