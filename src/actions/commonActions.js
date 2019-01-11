import * as types from './actionTypes';

export const clearErrors = error => ({
  type: types.CLEAR_ERROR,
  error
});

export const genericError = error => ({
  type: types.GENERIC_ERROR,
  error
});

export const showLoading = () => ({
  type: types.SHOW_LOADING
});

export const hideLoading = () => ({
  type: types.HIDE_LOADING
});
