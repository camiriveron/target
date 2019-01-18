import { SubmissionError } from 'redux-form/immutable';
import { sessionService } from 'redux-react-session';

import sessionApi from 'api/sessionApi';
import * as types from './actionTypes';

export const userSignedup = () => ({
  type: types.USER_SIGNED_UP,
});

export const welcomeSuccess = () => ({
  type: types.WELCOME_SUCCESS,
});

export const updateUser = user => () => {
  sessionService.loadUser().then((sessionUser) => {
    const userId = sessionUser.id;

    return sessionApi.updateUser(user, userId).then(({ user }) => {
      sessionService.saveUser(user);
    }).catch(({ errors, error }) => {
      throw new SubmissionError(typeof errors === 'object' ? errors : { _error: errors || error });
    });
  });
};

export const signUp = user =>
  async (dispatch) => {
    try {
      const response = await sessionApi.signUp({ user });
      dispatch(userSignedup());
      sessionService.saveUser(response);
    } catch (err) {
      throw new SubmissionError(err.errors);
    }
  };
