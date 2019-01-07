import targetApi from 'api/targetApi';
import * as types from './actionTypes';

export const startNewTarget = newTarget => ({
  type: types.START_NEW_TARGET,
  newTarget
});

export const endNewTarget = () => ({
  type: types.END_NEW_TARGET,
});

export const createTargetSuccess = target => ({
  type: types.CREATE_TARGET_SUCCESS,
  target
});

export const getTopicsSuccess = topics => ({
  type: types.GET_TOPICS_SUCCESS,
  topics
});

export const apiError = errors => ({
  type: types.API_ERROR,
  errors
});

export const createTarget = target => dispatch =>
  targetApi.createTarget(target).then(({ target }) => {
    dispatch(createTargetSuccess(target));
  }).catch(({ errors }) => {
    dispatch(apiError(errors));
  });

export const getTopics = () => dispatch =>
  targetApi.getTopics().then(({ topics }) => {
    dispatch(getTopicsSuccess(topics));
  }).catch(({ errors }) => {
    dispatch(apiError(errors));
  });
