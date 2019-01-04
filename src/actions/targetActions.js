import targetApi from 'api/targetApi';
import * as types from './actionTypes';

export const startNewTarget = latlng => ({
  type: types.START_NEW_TARGET,
  payload: latlng
});

export const endNewTarget = () => ({
  type: types.END_NEW_TARGET,
});

export const createTargetSuccess = newTarget => ({
  type: types.CREATE_TARGET_SUCCESS,
  payload: newTarget
});

export const createTargetError = error => ({
  type: types.CREATE_TARGET_ERROR,
  payload: error
});

export const getTopicsSuccess = topics => ({
  type: types.GET_TOPICS_SUCCESS,
  payload: topics
});

export const getTopicsError = error => ({
  type: types.GET_TOPICS_ERROR,
  payload: error
});

export const updateRadius = radius => ({
  type: types.UPDATE_RADIUS,
  payload: radius
});

export const createTarget = target => dispatch =>
  targetApi.createTarget(target).then((newTarget) => {
    dispatch(createTargetSuccess(newTarget));
  }).catch((error) => {
    dispatch(createTargetError(error));
  });

export const getTopics = () => dispatch =>
  targetApi.getTopics().then((topics) => {
    dispatch(getTopicsSuccess(topics));
  }).catch((error) => {
    dispatch(getTopicsError(error));
  });
