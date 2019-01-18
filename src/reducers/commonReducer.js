import { fromJS } from 'immutable';
import * as types from '../actions/actionTypes';

const commonInitialState = fromJS({
  errors: [],
  showLoading: false
});

const commonReducer = (state = commonInitialState, action) => {
  switch (action.type) {
    case types.GENERIC_ERROR: {
      return state.update('errors', (errorList) => {
        if (!errorList.some(error => error === action.error)) {
          return errorList.push(action.error);
        }

        return errorList;
      });
    }
    case types.CLEAR_ERROR:
    case types.END_NEW_TARGET: {
      return state.update('errors', errorList => errorList.filterNot(error => error === action.error));
    }
    case types.SHOW_LOADING: {
      return state.set('showLoading', true);
    }
    case types.HIDE_LOADING: {
      return state.set('showLoading', false);
    }
    default:
      return state;
  }
};

export default commonReducer;
