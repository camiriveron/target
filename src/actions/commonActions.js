import * as types from './actionTypes';

export const clearErrors = error => ({
  type: types.CLEAR_ERROR,
  error
});

export const genericError = error => ({
  type: types.GENERIC_ERROR,
  error
});
