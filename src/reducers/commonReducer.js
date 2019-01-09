import * as types from '../actions/actionTypes';
import commonInitialState from './commonInitialState';

const commonReducer = (state = commonInitialState, action) => {
  switch (action.type) {
    case types.GENERIC_ERROR: {
      return state.update('errors', errorList => errorList.push(action.error));
    }
    case types.CLEAR_ERROR:
    case types.END_NEW_TARGET: {
      return state.update('errors', errorList => errorList.filterNot(error => error == action.error));
    }
    default:
      return state;
  }
};

export default commonReducer;
