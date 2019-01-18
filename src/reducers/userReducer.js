import { fromJS } from 'immutable';
// import * as types from '../actions/actionTypes';

const userInitialState = fromJS({
  profileUpdated: false
});

const userReducer = (state = userInitialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default userReducer;
